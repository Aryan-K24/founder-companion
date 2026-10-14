import { AnalysisReport, StartupIdea } from "./types";

interface TavilySearchResult {
  title: string;
  url: string;
  content: string;
}

/**
 * Perform live competitor & post-mortem web research using Tavily API.
 * Fails safely if no key is present or network fails.
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
      console.warn("Tavily search non-200 response:", response.status, await response.text());
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
 * Call Google Gemini API with fallback to gemini-2.0-flash / gemini-1.5-flash.
 */
async function callGemini(prompt: string, apiKey: string): Promise<AnalysisReport | null> {
  const cleanKey = apiKey.trim();
  if (!cleanKey) return null;

  const modelsToTry = ["gemini-1.5-flash", "gemini-2.0-flash", "gemini-1.5-pro"];

  for (const model of modelsToTry) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${cleanKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: "application/json",
            },
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`Gemini (${model}) failed with status ${response.status}:`, errorText);
        continue; // Try next model
      }

      const data = await response.json();
      const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!textContent) continue;

      const parsed = extractJsonFromText(textContent);
      if (parsed) return parsed;
    } catch (err) {
      console.error(`Gemini call error on ${model}:`, err);
    }
  }

  return null;
}

/**
 * Call Anthropic Claude API with strict JSON schema instructions.
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
      console.warn("Anthropic API error:", response.status, await response.text());
      return null;
    }

    const data = await response.json();
    const textContent = data.content?.[0]?.text;
    if (!textContent) return null;

    return extractJsonFromText(textContent);
  } catch (err) {
    console.error("Claude call failed:", err);
    return null;
  }
}

/**
 * Call OpenAI API with JSON output mode.
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
      console.warn("OpenAI API error:", response.status, await response.text());
      return null;
    }

    const data = await response.json();
    const textContent = data.choices?.[0]?.message?.content;
    if (!textContent) return null;

    return extractJsonFromText(textContent);
  } catch (err) {
    console.error("OpenAI call failed:", err);
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
 * Resilient fallback engine in crystal clear, everyday conversational English.
 */
export function generateFallbackReport(idea: Partial<StartupIdea>): AnalysisReport {
  const isB2C = (idea.targetCustomer || "").toLowerCase().includes("consumer") ||
    (idea.targetCustomer || "").toLowerCase().includes("user") ||
    (idea.monetization || "").includes("$5") ||
    (idea.monetization || "").includes("$9");

  return {
    verdict: isB2C ? "DEAD_ON_ARRIVAL" : "VIABLE_WITH_PIVOT",
    verdictHeadline: isB2C
      ? "Very high risk of failing fast. People might like the idea, but almost nobody will pay for it long-term."
      : "The big players will crush you if you launch for everybody. You must focus on one specific group to survive.",
    executiveSummary: `Here is the honest truth about '${idea.title || idea.pitch}':\n\n1. The Problem: The headache you noticed is real, and people will complain about it.\n2. The Trap: Existing companies already have millions in funding and established trust. If you build a generic version of what they already do, customers won't bother switching.\n3. The Solution: Don't fight the giants head-on. Pick one narrow group that is currently getting ignored or overcharged, and solve their exact problem 10x better.`,
    dealbreakerFlags: [
      {
        flag: isB2C ? "High Marketing Costs vs Low Price" : "Slow Decision-Making by Customers",
        severity: "CRITICAL",
        reasoning: isB2C
          ? "You will spend $30-$50 on Instagram/Google ads just to get one person to sign up for a cheap subscription. You'll run out of money before you make a profit."
          : `Companies targeting '${idea.targetCustomer}' take 3 to 6 months to approve any new tool. As an early startup, waiting months for one customer to say yes will drain your bank account.`,
      },
      {
        flag: "Big Competitors Can Copy This Quickly",
        severity: "HIGH",
        reasoning: "If this starts working, an established company can build your core feature in a few weeks and give it to their existing users for free.",
      },
      {
        flag: "Hard to Keep Users Active",
        severity: "MEDIUM",
        reasoning: "Users might sign up out of curiosity, but unless this solves a daily, painful chore, they will stop using it after 2 or 3 weeks.",
      },
    ],
    activeCompetitors: [
      {
        name: "Industry Giants (Market Leaders)",
        url: "https://google.com",
        moat: "Millions of existing users, huge advertising budgets, and trusted security certifications.",
        vulnerability: "Their software is bloated, confusing, expensive, and they don't care about smaller customers.",
        marketPosition: "Market Leader",
      },
      {
        name: "Modern Venture-Backed Challengers",
        url: "https://producthunt.com",
        moat: "Fast product updates, modern sleek design, and aggressive marketing.",
        vulnerability: "They prioritize big enterprise accounts and ignore niche or solo teams.",
        marketPosition: "Fast Challenger",
      },
    ],
    graveyardStartups: [
      {
        name: "EarlyPioneer Labs",
        yearEnded: "2023",
        fundingBurned: "$2.4M",
        seductivePromise: "Got 40,000 signups from Twitter/social media hype in their first month.",
        fatalTrap: "After 30 days, 94% of users stopped opening the app. The founders burned through $2M on servers and marketing without real recurring revenue.",
        sourceUrl: "https://failory.com",
      },
      {
        name: "DisruptFlow",
        yearEnded: "2021",
        fundingBurned: "$800k",
        seductivePromise: "Tried to beat existing giants simply by offering cheap pricing.",
        fatalTrap: "Cheap customers complained constantly, took up huge customer support time, and canceled the moment free discounts ended.",
        sourceUrl: "https://techcrunch.com",
      },
    ],
    survivalWedge: {
      strategy: "The Specialist Angle (Niche Down)",
      unfairWedge: `Do not market to everyone in '${idea.targetCustomer}'. Pick the single most desperate sub-group who wastes hours on '${idea.currentWorkaround}' every week and has a credit card ready to pay.`,
      deadlyMistakeToAvoid: "Never try to compete on price alone against larger rivals. Compete on making the setup effortless for one specific type of user.",
      proposedPricingModel: "Charge a clear, upfront monthly fee ($49-$99/mo) that proves customers actually value the solution.",
    },
    momTestQuestions: [
      {
        hypothesis: "People waste real hours on this problem every single week.",
        questionToAsk: "When was the last time you had to deal with this, and what did you actually do to handle it?",
        trapToAvoid: "Don't ask: 'Would you use an app that fixes this?' (People always say yes to be polite, but never pay).",
      },
      {
        hypothesis: "They have a real budget or cash to spend on this.",
        questionToAsk: "How much money or staff time did you spend trying to fix this in the past 3 months?",
        trapToAvoid: "Don't pitch your pricing before they prove they already spend money on workarounds.",
      },
      {
        hypothesis: "Their current workaround is frustrating enough that they will switch.",
        questionToAsk: "What is the most annoying thing about your current process, and why haven't you switched yet?",
        trapToAvoid: "Don't criticize their current tools—let them explain the honest hurdles to switching.",
      },
    ],
    generatedAt: new Date().toISOString(),
    isMockFallback: true,
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

  // 1. Gather live market intelligence if Tavily key is present
  const [competitorSearch, graveyardSearch] = await Promise.all([
    searchWeb(`${idea.pitch || idea.title} competitors startups companies`, tavilyKey),
    searchWeb(`${idea.pitch || idea.title} startup shutdown failed post-mortem`, tavilyKey),
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

LANGUAGE & TONE RULES (CRITICAL):
- Write in simple, conversational, everyday English.
- STRICTLY FORBIDDEN: dense MBA jargon or academic buzzwords (no "asymmetric verticalization", "margin compression", "paradigm shift", "platform absorbency").
- Write so that any smart 18-year-old can instantly understand every sentence.
- Use real company names and websites from the research evidence whenever possible.

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
Analyze this startup idea thoroughly. Return ONLY a valid JSON object matching this schema:
{
  "verdict": "DEAD_ON_ARRIVAL" | "HIGH_RISK" | "VIABLE_WITH_PIVOT" | "COMPELLING_WEDGE",
  "verdictHeadline": "One clear, punchy sentence in plain English stating the honest bottom line.",
  "executiveSummary": "2-3 short, clear paragraphs explaining why this idea will succeed or fail in everyday language. Explain the biggest hurdles simply.",
  "dealbreakerFlags": [
    {
      "flag": "Clear name of the danger in plain English (e.g. Too Expensive to Get Customers, Big Companies Will Copy Fast, People Won't Pay Long-Term)",
      "severity": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW",
      "reasoning": "Clear, practical explanation of why this will hurt the business."
    }
  ],
  "activeCompetitors": [
    {
      "name": "Real company name",
      "url": "https://...",
      "moat": "Plain English: Why customers stick with them right now (their unfair advantage).",
      "vulnerability": "Plain English: Where this company is weak, bloated, too expensive, or annoying.",
      "marketPosition": "Market Leader / Fast Challenger"
    }
  ],
  "graveyardStartups": [
    {
      "name": "Real or historical startup that tried this and failed",
      "yearEnded": "e.g. 2022",
      "fundingBurned": "e.g. $2.5M or Bootstrapped",
      "seductivePromise": "Why people thought it was a brilliant idea at first.",
      "fatalTrap": "The exact, simple reason it died (e.g. Ads cost 4x more than subscriptions, users stopped opening the app after 2 weeks).",
      "sourceUrl": "https://..."
    }
  ],
  "survivalWedge": {
    "strategy": "The simple strategy name in plain English",
    "unfairWedge": "Clear advice on the single narrow niche or group to target first so big companies don't crush you.",
    "deadlyMistakeToAvoid": "The single dumbest mistake the founder could make with this idea.",
    "proposedPricingModel": "A realistic, straightforward pricing model that actually makes sense."
  },
  "momTestQuestions": [
    {
      "hypothesis": "The big assumption you need to test",
      "questionToAsk": "A non-leading question about past behavior (never ask if they 'like' the idea).",
      "trapToAvoid": "The trap question that gives fake polite answers."
    }
  ]
}

DO NOT include any markdown commentary outside the JSON. Return valid JSON only.
`;

  // 3. Try LLM providers with trimmed keys
  if (geminiKey) {
    const geminiResult = await callGemini(prompt, geminiKey);
    if (geminiResult) return { ...geminiResult, generatedAt: new Date().toISOString() };
  }

  if (anthropicKey) {
    const claudeResult = await callClaude(prompt, anthropicKey);
    if (claudeResult) return { ...claudeResult, generatedAt: new Date().toISOString() };
  }

  if (openAiKey) {
    const openAiResult = await callOpenAI(prompt, openAiKey);
    if (openAiResult) return { ...openAiResult, generatedAt: new Date().toISOString() };
  }

  // 4. If no LLM keys or calls failed, return plain-English fallback report
  return generateFallbackReport(idea);
}
