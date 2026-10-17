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

  let modelsToTry = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest",
    "gemini-2.0-flash",
    "gemini-2.0-flash-exp",
    "gemini-1.5-pro",
    "gemini-1.5-pro-latest",
    "gemini-pro",
  ];

  // Dynamically discover supported models for this specific API key if possible
  try {
    const listRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${cleanKey}`
    );
    if (listRes.ok) {
      const listData = await listRes.json();
      const available = (listData.models || [])
        .filter((m: { supportedGenerationMethods?: string[] }) =>
          m.supportedGenerationMethods?.includes("generateContent")
        )
        .map((m: { name: string }) => m.name.replace(/^models\//, ""));

      if (available.length > 0) {
        // Prioritize discovered models that actually support generateContent
        modelsToTry = Array.from(new Set([...available, ...modelsToTry]));
      }
    } else {
      const listErr = await listRes.text();
      lastApiError = `Gemini key status ${listRes.status}: ${listErr}`;
    }
  } catch (err) {
    console.warn("Could not list Gemini models:", err);
  }

  for (const model of modelsToTry) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${cleanKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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
          moat: "Dominant brand status and premium build quality. People gladly pay $200+ just for the Yeti logo.",
          vulnerability: "Very heavy, bulky, and absurdly overpriced for everyday coaches and weekend players.",
          marketPosition: "Premium Market Leader",
        },
        {
          name: "CleverMade / Coleman Collapsible Coolers",
          url: "https://www.clevermade.com",
          moat: "Cheap ($25-$35) and sold everywhere across Amazon, Walmart, and Target.",
          vulnerability: "Zippers leak melted ice water, seams tear easily, and they collapse into sloppy bags that crush cans.",
          marketPosition: "Budget Mass Retailer",
        },
        {
          name: "IceMule Coolers",
          url: "https://icemulecoolers.com",
          moat: "Hands-free backpack dry-bag coolers with good insulation.",
          vulnerability: "Bag format makes cans clatter around in a messy pile, with no vertical stacking organization.",
          marketPosition: "Outdoor Backpack Challenger",
        },
      ],
      graveyardStartups: [
        {
          name: "The Coolest Cooler",
          yearEnded: "2019",
          fundingBurned: "$13M (Kickstarter)",
          seductivePromise: "Raised $13 million as the 'ultimate high-tech cooler' with built-in blender, lights, and speakers.",
          fatalTrap: "Custom injection molds, electric motors, and ocean shipping cost 3x more than budgeted. They couldn't fulfill orders and went bankrupt in a massive consumer scandal.",
          sourceUrl: "https://www.theverge.com",
        },
        {
          name: "Frio Coolers",
          yearEnded: "2021",
          fundingBurned: "Bootstrapped / $600k",
          seductivePromise: "Sold customized soft-sided personal coolers.",
          fatalTrap: "Ocean freight container rates spiked, and thin wholesale margins to retailers left zero cash flow.",
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

  // Fallback for software/SaaS
  return {
    verdict: "VIABLE_WITH_PIVOT",
    verdictHeadline: "Big incumbents dominate horizontal software. You must carve out a narrow specialist niche to survive.",
    productCategory: "software_saas",
    bottomLine: {
      isGoodIdea: "NEEDS A SHARP NICHE FOCUS",
      inPlainEnglish: "The problem is real, but large software companies already exist. If you build a general tool for everybody, you will struggle to get attention. Pick one specific industry to win.",
      immediateNextStep: "Interview 5 specific target users about their current manual workflow before writing any code.",
    },
    executiveSummary: `Here is the reality for '${idea.title || idea.pitch}':\n\n1. The Problem: The headache you noticed is real, and people will complain about it.\n2. The Trap: Existing companies have millions in venture funding. A generic copycat won't get users to switch.\n3. The Solution: Don't fight giants head-on. Focus on one narrow underserved customer group.`,
    dealbreakerFlags: [
      {
        flag: "High Customer Acquisition Costs",
        severity: "CRITICAL",
        reasoning: "Paid ads and marketing will cost more than early revenue unless you have organic distribution.",
      },
      {
        flag: "Incumbents Can Add This as a Feature",
        severity: "HIGH",
        reasoning: "Established platforms can ship an incremental feature to their existing user base.",
      },
      {
        flag: "User Retention Dropoff",
        severity: "MEDIUM",
        reasoning: "Unless the tool is used multiple times per week, users will cancel after 1-2 months.",
      },
    ],
    activeCompetitors: [
      {
        name: "Market Leader Incumbents",
        url: "https://google.com",
        moat: "Dominant brand equity, massive distribution, and enterprise trust.",
        vulnerability: "Bloated, expensive, and slow to build for small niche teams.",
        marketPosition: "Market Leader",
      },
      {
        name: "Fast Agile Challengers",
        url: "https://producthunt.com",
        moat: "Modern sleek design and aggressive product velocity.",
        vulnerability: "Focus on mid-market and ignore solo operators.",
        marketPosition: "Challenger",
      },
    ],
    graveyardStartups: [
      {
        name: "EarlyPioneer Labs",
        yearEnded: "2023",
        fundingBurned: "$2.4M",
        seductivePromise: "Got 40,000 signups from Twitter hype in their first month.",
        fatalTrap: "Day-30 retention collapsed below 6%. The founders burned cash on servers without recurring revenue.",
        sourceUrl: "https://failory.com",
      },
      {
        name: "DisruptFlow",
        yearEnded: "2021",
        fundingBurned: "$800k",
        seductivePromise: "Tried to beat existing giants on cheap pricing alone.",
        fatalTrap: "Cheap customers had high support costs and canceled the moment discounts ended.",
        sourceUrl: "https://techcrunch.com",
      },
    ],
    survivalWedge: {
      strategy: "The Specialist Vertical Angle",
      unfairWedge: `Do not market to everyone in '${idea.targetCustomer}'. Target exclusively the sub-group that loses the most time to '${idea.currentWorkaround}'.`,
      deadlyMistakeToAvoid: "Never compete on price alone against larger rivals.",
      proposedPricingModel: "Charge a clear, upfront fee ($49-$99/mo) that proves real value.",
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
  const [competitorSearch, graveyardSearch] = await Promise.all([
    searchWeb(`${idea.pitch || idea.title} competitors brands ${searchCategoryHint}`, tavilyKey),
    searchWeb(`${idea.pitch || idea.title} startup failed shutdown post-mortem kickstarter`, tavilyKey),
  ]);

  const marketEvidence = `
LIVE WEB EVIDENCE:
Active Competitor Signals:
${competitorSearch.map((s) => `- ${s.title}: ${s.content} (${s.url})`).join("\n") || "No live competitor search results available."}

Graveyard / Failure Signals:
${graveyardSearch.map((s) => `- ${s.title}: ${s.content} (${s.url})`).join("\n") || "No live failure post-mortems retrieved."}
`;

  // 2. Formulate Plain-English Ruthless Investment Committee Prompt
  const prompt = `
You are a top pre-seed venture investor and startup advisor known for giving crystal-clear, brutally honest, and EASY-TO-UNDERSTAND advice to first-time founders.

CRITICAL PRODUCT CATEGORY RULE:
Detected Category: ${category.toUpperCase()}
${category === "physical_hardware" 
  ? "THIS IS A PHYSICAL PRODUCT / CONSUMER HARDWARE GEAR (e.g. a box, cooler, bottle, device, or physical item). DO NOT TALK ABOUT APPS, SOFTWARE, SERVERS, SAAS, OR SUBSCRIPTIONS! Talk about physical manufacturing, materials (insulation, plastic, steel), tooling molds, weight, retail/DTC pricing ($35-$70 one-time), and real physical competitors like Yeti, Coleman, Stanley, Igloo, CleverMade, Coolest Cooler."
  : "THIS IS A SOFTWARE / SERVICE BUSINESS. Analyze accordingly."
}

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
      "flag": "Clear name of the danger (e.g. Molds Are Expensive, Physics of Keeping Cold, Too Heavy)",
      "severity": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW",
      "reasoning": "Simple explanation of why this will hurt the business."
    }
  ],
  "activeCompetitors": [
    {
      "name": "Real company or brand name (e.g. Yeti, Coleman)",
      "url": "https://...",
      "moat": "Why customers buy from them right now (their advantage).",
      "vulnerability": "Where they suck, are heavy, or are overpriced.",
      "marketPosition": "Market Leader / Budget Alternative"
    }
  ],
  "graveyardStartups": [
    {
      "name": "Real startup or Kickstarter project that failed (e.g. The Coolest Cooler)",
      "yearEnded": "e.g. 2019",
      "fundingBurned": "e.g. $13M or Bootstrapped",
      "seductivePromise": "Why people thought it was a brilliant idea at first.",
      "fatalTrap": "The exact reason it died in plain English.",
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
