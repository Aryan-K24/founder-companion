import { AnalysisReport, StartupIdea, ProductCategory } from "./types";

interface TavilySearchResult {
  title: string;
  url: string;
  content: string;
}

let lastApiError: string | null = null;

/**
 * Detect product category from text
 */
export function detectProductCategory(text: string): ProductCategory {
  const lower = text.toLowerCase();
  const hardwareKeywords = [
    "box", "cooler", "bucket", "drink", "drinks", "bottle", "bottles", "can", "cans",
    "cold", "ice", "physical", "device", "hardware", "carry", "portable", "lightweight",
    "fabric", "material", "plastic", "steel", "metal", "container", "gear", "compact",
    "tool", "pack", "chill", "chilled", "tumbler", "cup", "thermal", "insulated", "gadget"
  ];

  if (hardwareKeywords.some((kw) => lower.includes(kw))) {
    return "physical_hardware";
  }

  const serviceKeywords = ["agency", "cleaning", "detailing", "coaching", "clinic", "salon", "service", "consulting"];
  if (serviceKeywords.some((kw) => lower.includes(kw))) {
    return "marketplace_service";
  }

  return "software_saas";
}

/**
 * Perform live competitor & post-mortem web research using Tavily API.
 */
async function searchWeb(query: string, tavilyKey?: string): Promise<TavilySearchResult[]> {
  const cleanKey = tavilyKey?.trim();
  if (!cleanKey) return [];

  try {
    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(3000),
      body: JSON.stringify({
        api_key: cleanKey,
        query,
        search_depth: "basic",
        include_answer: false,
        max_results: 4,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.warn("Tavily search non-200:", response.status, err);
      return [];
    }

    const data = await response.json();
    return (data.results || []).map((r: { title: string; url: string; content: string }) => ({
      title: r.title,
      url: r.url,
      content: r.content,
    }));
  } catch (err) {
    console.warn("Tavily search network error:", err);
    return [];
  }
}

/**
 * Call Google Gemini API with fallback to multiple models and robust error capture.
 */
async function callGemini(prompt: string, apiKey: string): Promise<AnalysisReport | null> {
  const cleanKey = apiKey.trim();
  if (!cleanKey) return null;

  let targetModels = ["gemini-1.5-flash", "gemini-1.5-pro"];
  let available: string[] = [];

  // 1. Check supported models and validate API key fast
  try {
    const listRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${cleanKey}`,
      { signal: AbortSignal.timeout(3500) }
    );
    if (listRes.ok) {
      const listData = await listRes.json();
      available = (listData.models || [])
        .filter((m: { supportedGenerationMethods?: string[] }) =>
          m.supportedGenerationMethods?.includes("generateContent")
        )
        .map((m: { name: string }) => m.name.replace(/^models\//, ""));

      if (available.length > 0) {
        // Exclude deprecated 2.5 and slow open-weight gemma models
        const activeGemini = available.filter(
          (m: string) => !m.includes("2.5") && !m.startsWith("gemma")
        );
        const preferred = [
          "gemini-flash-latest",
          "gemini-flash-lite-latest",
          "gemini-3.8-flash",
          "gemini-2.0-flash",
          "gemini-1.5-flash",
          ...activeGemini,
        ];
        const matched = preferred.filter((m) => activeGemini.includes(m));
        if (matched.length > 0) targetModels = Array.from(new Set(matched));
        else if (activeGemini.length > 0) targetModels = activeGemini;
        else targetModels = ["gemini-flash-latest", "gemini-flash-lite-latest"];
      }
    } else {
      const listErr = await listRes.text();
      lastApiError = `Gemini API key rejected (${listRes.status}): ${listErr}`;
      // Key rejected by Google (invalid, quota, or permission). Fail immediately so fallback returns instantly.
      return null;
    }
  } catch (err) {
    console.warn("Gemini ListModels check timed out or failed:", err);
  }

  // 2. Try candidate target models with a 6-second timeout each
  for (const model of targetModels.slice(0, 3)) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${cleanKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: AbortSignal.timeout(9000),
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        lastApiError = `Gemini (${model}) status ${response.status}: ${errorText}`;
        console.warn(lastApiError);
        continue;
      }

      const data = await response.json();
      const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!textContent) continue;

      const parsed = extractJsonFromText(textContent);
      if (parsed) {
        lastApiError = null;
        return parsed;
      }
    } catch (err) {
      lastApiError = `Gemini network/parse error on ${model}: ${err}`;
      console.error(lastApiError);
    }
  }

  if (lastApiError && available.length > 0) {
    lastApiError += ` | Available models: ${available.slice(0, 8).join(", ")}`;
  }

  return null;
}

/**
 * Call Anthropic Claude API.
 */
async function callClaude(prompt: string, apiKey: string): Promise<AnalysisReport | null> {
  const cleanKey = apiKey.trim();
  if (!cleanKey) return null;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": cleanKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 2500,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      lastApiError = `Claude status ${response.status}: ${err}`;
      return null;
    }

    const data = await response.json();
    const textContent = data.content?.[0]?.text;
    if (!textContent) return null;

    const parsed = extractJsonFromText(textContent);
    if (parsed) {
      lastApiError = null;
      return parsed;
    }
    return null;
  } catch (err) {
    lastApiError = `Claude call failed: ${err}`;
    return null;
  }
}

/**
 * Call OpenAI API.
 */
async function callOpenAI(prompt: string, apiKey: string): Promise<AnalysisReport | null> {
  const cleanKey = apiKey.trim();
  if (!cleanKey) return null;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cleanKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      lastApiError = `OpenAI status ${response.status}: ${err}`;
      return null;
    }

    const data = await response.json();
    const textContent = data.choices?.[0]?.message?.content;
    if (!textContent) return null;

    const parsed = extractJsonFromText(textContent);
    if (parsed) {
      lastApiError = null;
      return parsed;
    }
    return null;
  } catch (err) {
    lastApiError = `OpenAI call failed: ${err}`;
    return null;
  }
}

function extractJsonFromText(raw: string): AnalysisReport | null {
  try {
    return JSON.parse(raw);
  } catch {
    const match = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (match && match[1]) {
      try {
        return JSON.parse(match[1]);
      } catch {
        return null;
      }
    }
    return null;
  }
}

/**
 * Resilient domain logic fallback engine that respects product category.
 * If hardware, analyzes physical manufacturing, coolers, and real product economics.
 */
export function generateFallbackReport(idea: Partial<StartupIdea>): AnalysisReport {
  const combinedText = `${idea.title} ${idea.pitch} ${idea.targetCustomer} ${idea.currentWorkaround}`;
  const category = detectProductCategory(combinedText);

  if (category === "physical_hardware") {
    return {
      verdict: "VIABLE_WITH_PIVOT",
      verdictHeadline: "Solid consumer demand, but physical manufacturing and thermal physics are real hurdles.",
      productCategory: "physical_hardware",
      bottomLine: {
        isGoodIdea: "YES, BUT HARDWARE IS TRICKY",
        inPlainEnglish: "People genuinely hate carrying heavy, bulky square coolers to sports games and trips. A lightweight, slim vertical cooling box that holds multiple drinks is an appealing product. However, your danger is manufacturing costs (tooling molds) and making sure it keeps ice cold without becoming too heavy.",
        immediateNextStep: "Do NOT pay a factory to build 1,000 units yet. Make a rough 3D render or handmade prototype, take it to a weekend sports game, and see if coaches/parents offer to buy it on the spot.",
      },
      executiveSummary: `The concept for '${idea.title || idea.pitch}' solves an obvious physical annoyance: dragging bulky, rigid ice chests to sports games or day trips.\n\nWhile customers want this, hardware products live or die on three things: unit manufacturing costs, shipping bulk, and thermal performance. If a vertical box can't keep cans chilled for at least 4 to 6 hours in hot weather, customers will return it. To win, you must keep the design simple, sell directly to sports coaches or tournament parents, and validate demand before paying for expensive injection molds.`,
      dealbreakerFlags: [
        {
          flag: "The Physics Problem: Lightweight vs. Cold Retention",
          severity: "CRITICAL",
          reasoning: "Traditional coolers stay cold because they use 2 inches of thick, heavy foam. When you make a cooler lightweight and vertical, heat gets in much faster. You need high-efficiency vacuum insulation or cold-pack inserts so it doesn't turn into lukewarm puddle water in 1 hour.",
        },
        {
          flag: "Factory Molds & Upfront Production Costs",
          severity: "HIGH",
          reasoning: "Creating custom stainless steel or plastic molds typically requires $10,000–$25,000 in upfront tooling costs and minimum orders of 1,000 units. You must validate pre-orders before committing capital.",
        },
        {
          flag: "Shipping Box Volume & Fulfillment Costs",
          severity: "MEDIUM",
          reasoning: "Even lightweight boxes take up large cubic volume in shipping. Courier companies charge by dimensional weight, which will eat into your retail profit margin unless designed efficiently.",
        },
      ],
      activeCompetitors: [
        {
          name: "Yeti (Rambler Beverage Bucket & Hopper)",
          url: "https://www.yeti.com",
          moat: "Dominant global brand status and rugged rotational-molding durability.",
          vulnerability: "Very heavy, bulky, and premium luxury pricing ($250+) unreachable for youth tournaments.",
          marketPosition: "Global Market Leader (International)",
        },
        {
          name: "Milton / Hamilton Housewares",
          url: "https://www.milton.in",
          moat: "Deep domestic distribution across Tier-1/2/3 retail networks in India with trusted household brand equity.",
          vulnerability: "Traditional home/kitchen focus; slow to innovate specialized ergonomic sports vertical carry formats.",
          marketPosition: "National Market Leader (India)",
        },
        {
          name: "Coleman / CleverMade",
          url: "https://www.coleman.com",
          moat: "Global mass retail shelf presence in Walmart, Target, Amazon with budget $25–$45 price point.",
          vulnerability: "Zippers leak melted water, handles tear easily under weight, and collapsible bags crush cans.",
          marketPosition: "Global Mass Retailer (US/International)",
        },
        {
          name: "Cello World",
          url: "https://celloworld.com",
          moat: "Massive localized Indian manufacturing scale and competitive domestic pricing.",
          vulnerability: "Generic aesthetic and lack of vacuum insulation technology.",
          marketPosition: "National Competitor (India)",
        },
      ],
      graveyardStartups: [
        {
          name: "The Coolest Cooler",
          yearEnded: "2019",
          fundingBurned: "$13M (Kickstarter)",
          seductivePromise: "Raised $13 million as the 'ultimate high-tech cooler' with built-in blender, lights, and Bluetooth speaker.",
          fatalTrap: "Custom injection molds, electric motors, and ocean freight cost 3x more than budgeted. They couldn't fulfill orders and collapsed.",
          sourceUrl: "https://www.theverge.com",
        },
        {
          name: "Fin Robotics / Neyya Smart Ring",
          yearEnded: "2017",
          fundingBurned: "$5M (Indian Hardware Pioneer)",
          seductivePromise: "Promoted a wearable smart ring controller designed in Kerala and launched in Silicon Valley.",
          fatalTrap: "High component defect rates and lack of clear consumer use-cases drained working capital before manufacturing scale was achieved.",
          sourceUrl: "https://inc42.com",
        },
        {
          name: "Juicero",
          yearEnded: "2017",
          fundingBurned: "$118M",
          seductivePromise: "High-tech internet-connected home cold-press juice hardware machine.",
          fatalTrap: "Bloomberg revealed customers could squeeze the juice packets by hand with zero machine needed, destroying consumer trust overnight.",
          sourceUrl: "https://techcrunch.com",
        },
      ],
      survivalWedge: {
        strategy: "The Slim Vertical Caddy Form Factor",
        unfairWedge: "Do not build a generic picnic box. Build a slim, vertical caddy that holds exactly 4 to 6 cans vertically, fits inside a sports gym bag or car door pocket, and sells directly to sports coaches and tournament players.",
        deadlyMistakeToAvoid: "Never pay a factory for expensive molds before testing pre-orders. Make a 3D prototype first.",
        proposedPricingModel: "One-off physical purchase: Retail at $49 to $65. Target landed manufacturing cost under $16 for a healthy 70% gross margin.",
      },
      momTestQuestions: [
        {
          hypothesis: "Coaches and players actively find current coolers too annoying to carry.",
          questionToAsk: "When you brought cold drinks to your last 3 games or trips, what did you actually use to carry them, and what was annoying about it?",
          trapToAvoid: "Don't ask: 'Would you buy a cool vertical drink box?' (Everyone says yes to imaginary products, but won't pay).",
        },
        {
          hypothesis: "They are willing to pay $50+ for a better solution.",
          questionToAsk: "What was the last cooler, thermal bag, or sports gear item you bought, and how much did you spend on it?",
          trapToAvoid: "Don't pitch your pricing before confirming what they actually spend on sports accessories.",
        },
        {
          hypothesis: "Keeping drinks cold for 4+ hours without heavy ice is the primary need.",
          questionToAsk: "How long do you usually need your drinks to stay cold when you are out at the field or on the road?",
          trapToAvoid: "Don't assume how they use it—let them describe their actual game-day schedule.",
        },
      ],
      generatedAt: new Date().toISOString(),
      isMockFallback: true,
      apiErrorDetails: lastApiError || undefined,
    };
  }

  // Domain-specific intelligence for software & services
  const lowerText = combinedText.toLowerCase();

  // 1. Health / Clinics / Dental
  const isHealth = ["clinic", "dentist", "doctor", "health", "patient", "hospital", "dental", "medical", "pharma"].some(k => lowerText.includes(k));
  if (isHealth) {
    return {
      verdict: "VIABLE_WITH_PIVOT",
      verdictHeadline: "Solo clinics hate admin work, but established platforms dominate generic appointment booking.",
      productCategory: "software_saas",
      bottomLine: {
        isGoodIdea: "VIABLE WITH VERTICAL AUTOMATION",
        inPlainEnglish: "Healthcare practitioners are drowning in WhatsApp reminders, appointment no-shows, and manual records. While market giants own patient discovery, solo clinics will happily pay for specialized workflow automation that reduces staff front-desk overhead.",
        immediateNextStep: "Visit 5 local clinic front-desks tomorrow and observe their appointment check-in process for 30 minutes.",
      },
      executiveSummary: `For '${idea.title || idea.pitch}':\n\nHealthcare software is a split market. Massive platforms like Practo (in India) and Zocdoc (internationally) dominate customer acquisition and discovery. If you try to build another directory, you will burn out.\n\nHowever, independent clinics are desperate for private practice software—specifically automated patient intake, WhatsApp SMS reminders that slash no-shows, and zero-headache billing. To succeed, do not compete with marketplaces; sell a utility that integrates into their existing daily clinic workflow.`,
      dealbreakerFlags: [
        {
          flag: "Doctors Hate Learning Complex Software",
          severity: "CRITICAL",
          reasoning: "Physicians and clinic receptionists will abandon any tool requiring more than 2 minutes of daily training.",
        },
        {
          flag: "Marketplace Incumbents Control Search Discovery",
          severity: "HIGH",
          reasoning: "Practo and Zocdoc own Google search traffic for doctor listings, making a direct consumer discovery portal unviable.",
        },
        {
          flag: "Patient Health Data Compliance & Privacy",
          severity: "MEDIUM",
          reasoning: "Handling clinical records requires strict security, patient privacy compliance, and encrypted storage.",
        },
      ],
      activeCompetitors: [
        {
          name: "Practo (Ray Practice Management)",
          url: "https://www.practo.com",
          moat: "Dominant Indian healthcare network with millions of patient search visits and nationwide brand recall.",
          vulnerability: "High subscription listing fees and heavy-handed sales tactics that frustrate independent solo doctors.",
          marketPosition: "National Market Leader (India)",
        },
        {
          name: "Phreesia",
          url: "https://www.phreesia.com",
          moat: "Standardized patient intake and check-in workflows trusted by major US and European hospitals.",
          vulnerability: "Enterprise-only pricing ($500+/mo) and clunky legacy interfaces unsuited for small private clinics.",
          marketPosition: "Global Market Leader (US/International)",
        },
        {
          name: "Clinikk",
          url: "https://clinikk.com",
          moat: "Integrated physical-to-digital OPD health centres with comprehensive vernacular patient care in India.",
          vulnerability: "Capital-intensive physical clinic operations limit rapid software-only distribution.",
          marketPosition: "Indian HealthTech Challenger",
        },
        {
          name: "Zocdoc",
          url: "https://www.zocdoc.com",
          moat: "High-intent consumer booking marketplace in North America and international metros.",
          vulnerability: "Expensive per-booking commission model that eats clinic margins.",
          marketPosition: "Global Marketplace Leader (International)",
        },
      ],
      graveyardStartups: [
        {
          name: "Babylon Health",
          yearEnded: "2023",
          fundingBurned: "$1.2B",
          seductivePromise: "Promoted an AI-first doctor app to automate general healthcare consultations globally.",
          fatalTrap: "Over-promised on AI clinical diagnostic safety to the UK NHS; revenues collapsed when enterprise health authorities investigated diagnostics.",
          sourceUrl: "https://techcrunch.com",
        },
        {
          name: "Forward Health",
          yearEnded: "2024",
          fundingBurned: "$650M",
          seductivePromise: "Built futuristic self-service AI doctor pods in high-end shopping malls.",
          fatalTrap: "Exorbitant hardware manufacturing and real-estate lease costs drained capital without achieving recurring patient volume.",
          sourceUrl: "https://www.theverge.com",
        },
      ],
      survivalWedge: {
        strategy: "The Zero-Click WhatsApp Clinic Assistant",
        unfairWedge: "Do not build a massive EHR portal. Build an ultra-lightweight WhatsApp bot that automates appointment slot confirmations and sends payment links directly to patients.",
        deadlyMistakeToAvoid: "Never try to build a doctor discovery marketplace. Sell strictly private practice utilities.",
        proposedPricingModel: "Flat monthly software fee: ₹1,999/mo (India) or $49/mo (International) with unlimited reminder messages.",
      },
      momTestQuestions: [
        {
          hypothesis: "Patient no-shows cost clinics significant revenue every week.",
          questionToAsk: "How many patients missed their appointments last week, and what did your receptionist do to follow up with them?",
          trapToAvoid: "Don't ask: 'Would you pay for an automated reminder app?'",
        },
        {
          hypothesis: "Clinics rely on messy manual registers or personal WhatsApp chats.",
          questionToAsk: "Can you show me the exact screen or notebook where tomorrow's schedule is recorded right now?",
          trapToAvoid: "Don't criticize their current manual process.",
        },
        {
          hypothesis: "They are willing to pay for direct software without marketplace lock-in.",
          questionToAsk: "What software or digital tools does this clinic currently pay for on a monthly subscription?",
          trapToAvoid: "Don't propose your pricing before confirming if they have authority to spend software budgets.",
        },
      ],
      generatedAt: new Date().toISOString(),
      isMockFallback: true,
      apiErrorDetails: lastApiError || undefined,
    };
  }

  // 2. EdTech / Learning / Students
  const isEdTech = ["student", "college", "school", "course", "edtech", "tutor", "learning", "study", "exam", "campus", "teach"].some(k => lowerText.includes(k));
  if (isEdTech) {
    return {
      verdict: "VIABLE_WITH_PIVOT",
      verdictHeadline: "EdTech course selling is oversaturated. Win by selling verifiable outcomes, not generic content.",
      productCategory: "software_saas",
      bottomLine: {
        isGoodIdea: "PROMISING WITH OUTCOME FOCUS",
        inPlainEnglish: "Students and young professionals are tired of pre-recorded video lectures that they never finish. The winning angle is interactive practice, AI-evaluated portfolios, and direct career proof.",
        immediateNextStep: "Find 3 students who recently bought an online course and ask them if they actually finished it.",
      },
      executiveSummary: `For '${idea.title || idea.pitch}':\n\nThe EdTech sector has experienced a massive reckoning. Players like Coursera globally and PhysicsWallah/Unacademy in India dominate mass video streaming. Selling generic courses will fail because free content on YouTube is already excellent.\n\nTo survive and build a sustainable business, focus on high-accountability cohort workflows: automated code/assignment grading, AI mock interviews, or micro-credentials that directly link to job interviews.`,
      dealbreakerFlags: [
        {
          flag: "Course Completion Rates Fall Below 10%",
          severity: "CRITICAL",
          reasoning: "Without interactive cohort accountability, self-paced video courses suffer 90%+ dropout rates, destroying student referrals.",
        },
        {
          flag: "Skyrocketing Student Acquisition Costs (CAC)",
          severity: "HIGH",
          reasoning: "Paid social ads to acquire students are fiercely competitive and often exceed first-month revenue.",
        },
        {
          flag: "Free High-Quality YouTube Competition",
          severity: "MEDIUM",
          reasoning: "If your core offering is just recorded lectures, students will default to free creators.",
        },
      ],
      activeCompetitors: [
        {
          name: "PhysicsWallah (PW)",
          url: "https://pw.live",
          moat: "Massive cult following among Indian students, high trust, and disruptive affordable fee structures.",
          vulnerability: "Heavy focus on traditional Indian competitive exams (JEE/NEET), leaving specialized modern tech skills open.",
          marketPosition: "National Market Leader (India)",
        },
        {
          name: "Coursera",
          url: "https://coursera.org",
          moat: "Global university credential brand partnerships and enterprise corporate learning contracts.",
          vulnerability: "Passive video format with abysmal course completion rates (<12%) for independent learners.",
          marketPosition: "Global Market Leader (International)",
        },
        {
          name: "Unacademy",
          url: "https://unacademy.com",
          moat: "Extensive educator roster and multi-category test prep dominance in India.",
          vulnerability: "High marketing burn and historical dependence on aggressive sales calls.",
          marketPosition: "Major Indian EdTech Competitor",
        },
        {
          name: "Duolingo",
          url: "https://duolingo.com",
          moat: "World-class habit-forming gamification loops and viral global social presence.",
          vulnerability: "Strong on daily streaks and casual engagement, weak on deep professional career mastery.",
          marketPosition: "Global Gamified Learning Leader",
        },
      ],
      graveyardStartups: [
        {
          name: "FrontRow",
          yearEnded: "2023",
          fundingBurned: "$18M",
          seductivePromise: "Indian celebrity vocational learning platform teaching singing, gaming, and comedy from stars.",
          fatalTrap: "Customer acquisition cost exceeded lifetime value by 4x. Casual hobbyists refused to pay for recurring courses.",
          sourceUrl: "https://inc42.com",
        },
        {
          name: "Lido Learning",
          yearEnded: "2022",
          fundingBurned: "$20M",
          seductivePromise: "Interactive small-group live online tutoring for K-12 school students in India.",
          fatalTrap: "High sales team commissions and parent refund demands drained liquid working capital before achieving sustainability.",
          sourceUrl: "https://yourstory.com",
        },
        {
          name: "Quibi",
          yearEnded: "2020",
          fundingBurned: "$1.75B",
          seductivePromise: "Quick-bite 10-minute mobile educational and entertainment videos backed by Hollywood titans.",
          fatalTrap: "Completely misunderstood user habits: students preferred free YouTube and TikTok over a paid mobile-only subscription.",
          sourceUrl: "https://www.theverge.com",
        },
      ],
      survivalWedge: {
        strategy: "The Proof-of-Work Portfolio Engine",
        unfairWedge: "Don't sell video lectures. Sell an automated workspace where students build 3 real projects and receive automated AI feedback and instant GitHub/Live verification badges.",
        deadlyMistakeToAvoid: "Never pay upfront celebrity fees or license generic course libraries.",
        proposedPricingModel: "Freemium evaluation with a ₹999/mo ($19/mo) Pro tier for real-time portfolio reviews.",
      },
      momTestQuestions: [
        {
          hypothesis: "Students abandon online courses due to lack of practical feedback.",
          questionToAsk: "What was the last online course or certification you enrolled in, and did you actually complete the final project?",
          trapToAvoid: "Don't ask: 'Would you like an AI learning assistant?'",
        },
        {
          hypothesis: "They care about verifiable proof for recruiters, not certificates.",
          questionToAsk: "When applying for your last internship or job, what specific project did the interviewer ask you about?",
          trapToAvoid: "Don't assume grades matter—ask what got them the interview.",
        },
        {
          hypothesis: "They have discretionary budget for tools that give career edges.",
          questionToAsk: "What tools, subscriptions, or books have you personally paid for in the past 6 months to improve your skills?",
          trapToAvoid: "Don't pitch pricing before checking existing personal spend.",
        },
      ],
      generatedAt: new Date().toISOString(),
      isMockFallback: true,
      apiErrorDetails: lastApiError || undefined,
    };
  }

  // 3. FinTech & Payments
  const isFintech = ["finance", "payment", "invoice", "billing", "accounting", "money", "loan", "credit", "bank", "crypto", "wealth"].some(k => lowerText.includes(k));
  if (isFintech) {
    return {
      verdict: "VIABLE_WITH_PIVOT",
      verdictHeadline: "Payment gateways are commoditized; the real profit is in workflow automation and reconciliation.",
      productCategory: "software_saas",
      bottomLine: {
        isGoodIdea: "STRONG NEED — HIGH REGULATORY BAR",
        inPlainEnglish: "Businesses struggle with cash-flow visibility and chasing overdue invoices. Instead of trying to build a payment gateway, build an automated receivables and collection assistant that connects to existing banks.",
        immediateNextStep: "Ask 3 small business owners how many unpaid invoices are currently sitting in their inbox right now.",
      },
      executiveSummary: `For '${idea.title || idea.pitch}':\n\nFinTech is dominated by multi-billion dollar payment rails: Stripe globally and Razorpay/Pine Labs in India. Competing directly on transaction processing fees is suicide because margins are razor-thin.\n\nHowever, back-office financial software—invoice reconciliation, automated WhatsApp payment links, expense auditing, and cash-flow forecasting—is an enormous high-margin opportunity. Build on top of existing rails rather than reinventing payment processing.`,
      dealbreakerFlags: [
        {
          flag: "Strict Financial Regulatory Compliance",
          severity: "CRITICAL",
          reasoning: "Central bank licensing (RBI / international regulators) requires immense capital and legal infrastructure.",
        },
        {
          flag: "Ultra-Thin Payment Processing Margins",
          severity: "HIGH",
          reasoning: "Interchange fees and UPI zero-MDR leave negligible revenue on pure payment collection.",
        },
        {
          flag: "Fraud, Chargebacks & Security Liability",
          severity: "HIGH",
          reasoning: "Financial tools are prime targets for automated credential stuffing and payment fraud.",
        },
      ],
      activeCompetitors: [
        {
          name: "Razorpay",
          url: "https://razorpay.com",
          moat: "Dominant developer-friendly payment gateway, UPI stack, and neo-banking suite in India.",
          vulnerability: "Lengthy business KYC and compliance checks can deter very small unorganized merchants.",
          marketPosition: "National Market Leader (India)",
        },
        {
          name: "Stripe",
          url: "https://stripe.com",
          moat: "Gold-standard global developer APIs, billing engine, and international internet commerce dominance.",
          vulnerability: "Higher cross-border transaction fees and rigid automated account risk freezing.",
          marketPosition: "Global Market Leader (International)",
        },
        {
          name: "Khatabook",
          url: "https://khatabook.com",
          moat: "Tens of millions of Indian merchant khata ledgers digitized with simple vernacular mobile UX.",
          vulnerability: "Monetizing free merchant bookkeeping into recurring paid subscriptions remains challenging.",
          marketPosition: "Indian Merchant Utility Leader",
        },
        {
          name: "Square (Block)",
          url: "https://squareup.com",
          moat: "Complete ecosystem of point-of-sale hardware and merchant software across North America and Europe.",
          vulnerability: "Not optimized for Indian UPI payment habits or emerging market cash-on-delivery flows.",
          marketPosition: "Global SMB Commerce Leader",
        },
      ],
      graveyardStartups: [
        {
          name: "Fast",
          yearEnded: "2022",
          fundingBurned: "$120M",
          seductivePromise: "Promoted 1-click checkout buttons across the internet with massive global marketing campaigns.",
          fatalTrap: "Burned $10M/month on sports sponsorships while generating under $50,000/month in actual merchant transaction revenue.",
          sourceUrl: "https://techcrunch.com",
        },
        {
          name: "ZestMoney",
          yearEnded: "2023",
          fundingBurned: "$140M",
          seductivePromise: "Indian Buy-Now-Pay-Later (BNPL) pioneer providing digital credit at point-of-sale for uncarded consumers.",
          fatalTrap: "Central bank regulatory tightening on digital lending guidelines combined with high default rates eroded unit economics.",
          sourceUrl: "https://inc42.com",
        },
        {
          name: "Simple Bank",
          yearEnded: "2021",
          fundingBurned: "$15M",
          seductivePromise: "First viral US neo-bank with budgeting built into checking accounts.",
          fatalTrap: "Could not generate enough interchange fee revenue to offset bank partnership compliance and customer support costs.",
          sourceUrl: "https://www.theverge.com",
        },
      ],
      survivalWedge: {
        strategy: "The Automated Receivables Chaser",
        unfairWedge: "Don't build a new wallet. Build a lightweight tool that reads QuickBooks/Tally and sends polite, automated WhatsApp payment reminders with one-click payment links.",
        deadlyMistakeToAvoid: "Never hold customer funds in your own account without an escrow or licensed banking partner.",
        proposedPricingModel: "Subscription-based B2B SaaS: ₹2,499/mo ($39/mo) based on volume of invoices managed.",
      },
      momTestQuestions: [
        {
          hypothesis: "Chasing overdue customer invoices takes hours of awkward phone calls.",
          questionToAsk: "How do you currently track which clients owe you money, and who in your office contacts them?",
          trapToAvoid: "Don't ask: 'Would you like an automatic invoicing tool?'",
        },
        {
          hypothesis: "Clients delay payments because payment links are inconvenient.",
          questionToAsk: "When a customer pays you late, what is the usual reason they give?",
          trapToAvoid: "Don't assume—listen to their collection excuses.",
        },
        {
          hypothesis: "Businesses already pay monthly fees for accounting tools.",
          questionToAsk: "What accounting or invoicing software did you pay for this year?",
          trapToAvoid: "Don't pitch your pricing before knowing their existing software stack.",
        },
      ],
      generatedAt: new Date().toISOString(),
      isMockFallback: true,
      apiErrorDetails: lastApiError || undefined,
    };
  }

  // 4. Default General B2B SaaS, AI & Productivity
  return {
    verdict: "VIABLE_WITH_PIVOT",
    verdictHeadline: "Horizontal platforms dominate general productivity. Win by building for a single, neglected vertical.",
    productCategory: "software_saas",
    bottomLine: {
      isGoodIdea: "NEEDS A SHARP SPECIALIST ANGLE",
      inPlainEnglish: "The headache is real, but massive software giants already exist. If you build a general tool for 'everyone', you will drown in marketing costs. Pick one specific industry and solve their full workflow to survive.",
      immediateNextStep: "Interview 5 specific target users about their current manual workflow before writing any code.",
    },
    executiveSummary: `For '${idea.title || idea.pitch}':\n\nGeneral software is fiercely competitive. Powerhouses like Zoho in India and HubSpot/Salesforce globally offer dozens of bundled tools at prices you cannot beat.\n\nTrying to compete on features alone will fail because incumbents can easily absorb simple features. Your survival wedge is vertical specialization: tailor every form, workflow, and integration to one specific persona (e.g. freelance accountants, wedding photographers, or real estate brokers) where general tools are too bloated.`,
    dealbreakerFlags: [
      {
        flag: "High Customer Acquisition Costs (CAC)",
        severity: "CRITICAL",
        reasoning: "Paid Google and social ads in B2B software are cost-prohibitive without organic word-of-mouth distribution.",
      },
      {
        flag: "Incumbents Can Absorb This as a Feature",
        severity: "HIGH",
        reasoning: "Established platforms with thousands of engineers can clone simple features within a single release cycle.",
      },
      {
        flag: "Day-30 User Retention Dropoff",
        severity: "MEDIUM",
        reasoning: "Unless the software is embedded into their daily operational routine, users will cancel within 60 days.",
      },
    ],
    activeCompetitors: [
      {
        name: "Zoho",
        url: "https://zoho.com",
        moat: "Bootstrapped Indian tech powerhouse offering 55+ integrated business applications at unbeatable price-to-value.",
        vulnerability: "Broad suite approach can result in generic, less modern user experiences compared to focused point solutions.",
        marketPosition: "National Market Leader (India & Global)",
      },
      {
        name: "Freshworks",
        url: "https://freshworks.com",
        moat: "Indian-born SaaS pioneer (Nasdaq listed) with polished SMB-friendly CRM and customer support suites.",
        vulnerability: "Increasing enterprise focus has pushed entry-level pricing higher, leaving solo operators behind.",
        marketPosition: "Indian SaaS Pioneer (Global)",
      },
      {
        name: "HubSpot",
        url: "https://hubspot.com",
        moat: "The global gold standard for inbound marketing, CRM workflows, and community ecosystem.",
        vulnerability: "Costs escalate steeply from $50/mo to $1,500+/mo as business contact databases grow.",
        marketPosition: "Global Market Leader (International)",
      },
      {
        name: "Notion",
        url: "https://notion.so",
        moat: "Highly viral modular workspace with millions of active users and massive community template support.",
        vulnerability: "Unstructured blank-canvas syndrome; requires significant manual configuration before teams see value.",
        marketPosition: "Global Productivity Challenger",
      },
    ],
    graveyardStartups: [
      {
        name: "Koo",
        yearEnded: "2024",
        fundingBurned: "$60M",
        seductivePromise: "Indian vernacular micro-blogging platform built to rival Twitter across regional Indian languages.",
        fatalTrap: "Customer acquisition depended heavily on political controversy; daily active user engagement collapsed and advertising failed to cover server costs.",
        sourceUrl: "https://inc42.com",
      },
      {
        name: "InVision",
        yearEnded: "2024",
        fundingBurned: "$350M",
        seductivePromise: "Former $2 billion design collaboration and prototyping platform used by 100% of the Fortune 100.",
        fatalTrap: "Failed to evolve into a full design canvas. When Figma launched browser-based real-time design, InVision became obsolete overnight.",
        sourceUrl: "https://techcrunch.com",
      },
      {
        name: "Hike Messenger",
        yearEnded: "2021",
        fundingBurned: "$260M",
        seductivePromise: "Indian messaging super-app with stickers, offline messaging, and local cultural themes backed by SoftBank.",
        fatalTrap: "Could not overcome WhatsApp's entrenched network effects; feature bloat alienated users and monetization never materialized.",
        sourceUrl: "https://yourstory.com",
      },
    ],
    survivalWedge: {
      strategy: "The Specialist Vertical Angle",
      unfairWedge: `Do not market to all '${idea.targetCustomer}'. Target exclusively the sub-group that loses the most time to '${idea.currentWorkaround}'.`,
      deadlyMistakeToAvoid: "Never compete on price alone against larger rivals.",
      proposedPricingModel: "Charge a clear, upfront fee (₹1,499/mo in India or $49/mo globally) that reflects real operational value.",
    },
    momTestQuestions: [
      {
        hypothesis: "People waste hours on this problem every week.",
        questionToAsk: "When was the last time you dealt with this, and what steps did you take?",
        trapToAvoid: "Don't ask: 'Would you use software that automates this?'",
      },
      {
        hypothesis: "There is real money allocated to fix this.",
        questionToAsk: "How much money or staff hours did you spend on workarounds in the last 90 days?",
        trapToAvoid: "Don't pitch pricing before confirming current spend.",
      },
      {
        hypothesis: "Current workarounds are failing.",
        questionToAsk: "What is the single most frustrating thing about your current tool?",
        trapToAvoid: "Don't criticize their current tools.",
      },
    ],
    generatedAt: new Date().toISOString(),
    isMockFallback: true,
    apiErrorDetails: lastApiError || undefined,
  };
}

/**
 * Main analysis orchestration engine.
 */
export async function analyzeStartupIdea(idea: Partial<StartupIdea>): Promise<AnalysisReport> {
  const anthropicKey = process.env.ANTHROPIC_API_KEY?.trim();
  const geminiKey = process.env.GEMINI_API_KEY?.trim();
  const openAiKey = process.env.OPENAI_API_KEY?.trim();
  const tavilyKey = process.env.TAVILY_API_KEY?.trim();

  const combinedText = `${idea.title} ${idea.pitch} ${idea.targetCustomer} ${idea.currentWorkaround}`;
  const category = detectProductCategory(combinedText);

  // 1. Gather live market intelligence if Tavily key is present
  const searchCategoryHint = category === "physical_hardware" ? "physical product cooler gear brand" : "startup companies";
  const [globalCompSearch, indiaCompSearch, graveyardSearch] = await Promise.all([
    searchWeb(`${idea.pitch || idea.title} global international competitors brands market leaders ${searchCategoryHint}`, tavilyKey),
    searchWeb(`${idea.pitch || idea.title} india competitors startups companies inc42 yourstory ${searchCategoryHint}`, tavilyKey),
    searchWeb(`${idea.pitch || idea.title} startup failed shutdown post-mortem dead collapse`, tavilyKey),
  ]);

  const marketEvidence = `
LIVE WEB EVIDENCE:
Global Competitor Signals:
${globalCompSearch.map((s) => `- ${s.title}: ${s.content} (${s.url})`).join("\n") || "No global competitor search results available."}

Indian Competitor Signals:
${indiaCompSearch.map((s) => `- ${s.title}: ${s.content} (${s.url})`).join("\n") || "No Indian competitor search results available."}

Graveyard / Failure Signals:
${graveyardSearch.map((s) => `- ${s.title}: ${s.content} (${s.url})`).join("\n") || "No live failure post-mortems retrieved."}
`;

  // 2. Formulate Plain-English Ruthless Investment Committee Prompt
  const prompt = `
You are a top pre-seed venture investor and startup advisor known for giving crystal-clear, brutally honest, and ACCURATE market intelligence to first-time founders.

CRITICAL PRODUCT CATEGORY RULE:
Detected Category: ${category.toUpperCase()}
${category === "physical_hardware" 
  ? "THIS IS A PHYSICAL PRODUCT / CONSUMER HARDWARE GEAR (e.g. a box, cooler, bottle, device, or physical item). DO NOT TALK ABOUT APPS, SOFTWARE, SERVERS, SAAS, OR SUBSCRIPTIONS! Talk about physical manufacturing, materials (insulation, plastic, steel), tooling molds, weight, retail/DTC pricing ($35-$70 one-time), and real physical brands (e.g. Yeti, Coleman, Stanley, Milton, Cello, Igloo, Coolest Cooler)."
  : "THIS IS A SOFTWARE / SERVICE BUSINESS. Analyze accordingly."
}

CRITICAL ACCURACY & GEOGRAPHY REQUIREMENTS (ZERO HALLUCINATIONS):
1. REAL COMPANIES ONLY:
   - NEVER invent or hallucinate fake placeholder company names (DO NOT use "Market Leader Incumbents", "EarlyPioneer", or generic names).
   - Every single company in "activeCompetitors" and "graveyardStartups" MUST be a REAL, VERIFIABLE company that actually exists or genuinely shut down.
   - Provide their real website URL.
2. DUAL-GEOGRAPHY COVERAGE (BOTH INTERNATIONAL AND INDIA):
   - In "activeCompetitors", provide 3 to 4 REAL companies featuring:
     * Real Global / International Market Leaders (e.g. US/Europe/International leaders).
     * Real National Leaders in India (e.g. prominent Indian startups, established Indian domestic leaders).
   - In "marketPosition", explicitly specify their region, e.g.:
     * "Global Market Leader (International)"
     * "National Market Leader (India)"
     * "Indian Direct Competitor"
     * "Global Challenger"
3. REAL STARTUP GRAVEYARD (REAL AUTOPSIES):
   - In "graveyardStartups", provide 2 to 3 REAL startups or funded projects that shut down, went bankrupt, or severely failed in this sector.
   - Include real failure post-mortems from both Global tech (e.g. Quibi, InVision, Fast, Coolest Cooler, Pebble, Juicero, Theranos) and Indian startup history (e.g. Koo, FrontRow, Stayzilla, TinyOwl, Lido Learning, Dunzo B2C, Hike).
   - Provide real year ended, real funding burned, and the actual fatal trap in plain English.

LANGUAGE RULES:
- Write in simple, everyday conversational English that any 18-year-old can instantly understand.
- NO corporate MBA jargon (no 'asymmetric verticalization', 'unit economics deficit', 'platform absorbency').

FOUNDER INTAKE DETAILS:
- Title: ${idea.title}
- Pitch: ${idea.pitch}
- Target Customer: ${idea.targetCustomer}
- Current Workaround: ${idea.currentWorkaround}
- Monetization Strategy: ${idea.monetization}
${idea.problemStatement ? `- Problem Observed: ${idea.problemStatement}` : ""}
${idea.whyNow ? `- Why Now: ${idea.whyNow}` : ""}

${marketEvidence}

INSTRUCTIONS:
Analyze this concept thoroughly. Return ONLY a valid JSON object matching this schema:
{
  "verdict": "DEAD_ON_ARRIVAL" | "HIGH_RISK" | "VIABLE_WITH_PIVOT" | "COMPELLING_WEDGE",
  "verdictHeadline": "One clear, punchy sentence in plain English stating the honest bottom line.",
  "bottomLine": {
    "isGoodIdea": "YES, BUT HARDWARE IS TRICKY" | "GOOD CONCEPT — HIGH RISK" | "DEAD ON ARRIVAL" | "STRONG OPPORTUNITY",
    "inPlainEnglish": "2-3 simple sentences directly answering: Is this a good idea or bad idea, and why?",
    "immediateNextStep": "The single most practical thing the founder should do tomorrow morning."
  },
  "executiveSummary": "2-3 short, clear paragraphs explaining the reality in everyday language.",
  "dealbreakerFlags": [
    {
      "flag": "Clear name of the danger (e.g. Molds Are Expensive, Physics of Keeping Cold, High CAC)",
      "severity": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW",
      "reasoning": "Simple explanation of why this will hurt the business."
    }
  ],
  "activeCompetitors": [
    {
      "name": "Real company or brand name (e.g. Yeti, Milton, Practo, Zoho, Salesforce)",
      "url": "https://...",
      "moat": "Why customers buy from them right now (their advantage).",
      "vulnerability": "Where they suck, are expensive, or are flawed.",
      "marketPosition": "Global Market Leader (International) | National Market Leader (India) | Indian Competitor"
    }
  ],
  "graveyardStartups": [
    {
      "name": "Real startup or Kickstarter project that actually failed (e.g. The Coolest Cooler, FrontRow, Koo, InVision)",
      "yearEnded": "e.g. 2024",
      "fundingBurned": "e.g. $18M or Bootstrapped",
      "seductivePromise": "Why people thought it was a brilliant idea at first.",
      "fatalTrap": "The exact real reason it died in plain English.",
      "sourceUrl": "https://..."
    }
  ],
  "survivalWedge": {
    "strategy": "Simple strategy name in plain English",
    "unfairWedge": "Clear advice on the single narrow angle or target group to start with.",
    "deadlyMistakeToAvoid": "The single dumbest mistake to avoid.",
    "proposedPricingModel": "A realistic, one-time or monthly price that makes sense for this product type."
  },
  "momTestQuestions": [
    {
      "hypothesis": "The big assumption you need to test",
      "questionToAsk": "A non-leading question about past actions.",
      "trapToAvoid": "The trap question that gives fake polite answers."
    }
  ]
}

DO NOT include any markdown commentary outside the JSON. Return valid JSON only.
`;

  // 3. Try LLM providers with trimmed keys
  if (geminiKey) {
    const geminiResult = await callGemini(prompt, geminiKey);
    if (geminiResult) {
      return {
        ...geminiResult,
        productCategory: category,
        generatedAt: new Date().toISOString(),
      };
    }
  }

  if (anthropicKey) {
    const claudeResult = await callClaude(prompt, anthropicKey);
    if (claudeResult) {
      return {
        ...claudeResult,
        productCategory: category,
        generatedAt: new Date().toISOString(),
      };
    }
  }

  if (openAiKey) {
    const openAiResult = await callOpenAI(prompt, openAiKey);
    if (openAiResult) {
      return {
        ...openAiResult,
        productCategory: category,
        generatedAt: new Date().toISOString(),
      };
    }
  }

  // 4. Return intelligent category-aware fallback
  return generateFallbackReport(idea);
}
