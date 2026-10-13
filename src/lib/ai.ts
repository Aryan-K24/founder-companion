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
  if (!tavilyKey) return [];

  try {
    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: tavilyKey,
        query,
        search_depth: "basic",
        include_answer: false,
        max_results: 4,
      }),
    });

    if (!response.ok) {
      console.warn("Tavily search non-200 response:", response.status);
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
 * Call Anthropic Claude API with strict JSON schema instructions.
 */
async function callClaude(prompt: string, apiKey: string): Promise<AnalysisReport | null> {
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
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
 * Call Google Gemini API with strict JSON schema.
 */
async function callGemini(prompt: string, apiKey: string): Promise<AnalysisReport | null> {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
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
      console.warn("Gemini API error:", response.status);
      return null;
    }

    const data = await response.json();
    const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textContent) return null;

    return extractJsonFromText(textContent);
  } catch (err) {
    console.error("Gemini call failed:", err);
    return null;
  }
}

/**
 * Call OpenAI API with JSON output mode.
 */
async function callOpenAI(prompt: string, apiKey: string): Promise<AnalysisReport | null> {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      console.warn("OpenAI API error:", response.status);
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
    // Try direct parse first
    return JSON.parse(raw);
  } catch {
    // Attempt markdown block extraction
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
 * Resilient fallback engine (FE-07).
 * When external AI services are unavailable or unconfigured, generates a context-aware,
 * rigorous stress-test report based directly on the user's inputs.
 */
export function generateFallbackReport(idea: Partial<StartupIdea>): AnalysisReport {
  const isB2C = (idea.targetCustomer || "").toLowerCase().includes("consumer") ||
    (idea.targetCustomer || "").toLowerCase().includes("user") ||
    (idea.monetization || "").includes("$5") ||
    (idea.monetization || "").includes("$9");

  const hasPricing = !!idea.monetization && idea.monetization.length > 5;

  return {
    verdict: isB2C ? "DEAD_ON_ARRIVAL" : "VIABLE_WITH_PIVOT",
    verdictHeadline: isB2C
      ? "Lethal unit economics and weak retention moat. High risk of joining the startup graveyard."
      : "Severe competition from incumbents, but a sharp verticalized wedge can survive.",
    executiveSummary: `The proposed concept ('${idea.title || idea.pitch}') targets '${idea.targetCustomer}'. While the pain point is real, standard market entry will face immediate resistance from established incumbents with existing distribution. To survive, you must abandon horizontal expansion and carve out an asymmetric wedge.`,
    dealbreakerFlags: [
      {
        flag: isB2C ? "Customer Acquisition Cost (CAC) Outpaces LTV" : "Distribution & Sales Cycle Friction",
        severity: "CRITICAL",
        reasoning: isB2C
          ? "Consumer acquisition via paid ads currently averages $25-$45 per paying subscriber. A low-tier monthly price point will not achieve payback within 6 months."
          : `Enterprise and SMB buyers targeting '${idea.targetCustomer}' rarely switch core tools without 6-month budget review cycles. Your sales velocity will be sluggish.`,
      },
      {
        flag: "Incumbent Feature Absorbency",
        severity: "HIGH",
        reasoning: "Major market players can ship this as an incremental feature update during a single quarter, neutralizing your core value proposition unless you possess proprietary data.",
      },
      {
        flag: hasPricing ? "Monetization Margin Compression" : "Unspecified Unit Economics",
        severity: "MEDIUM",
        reasoning: "Third-party platform fees, hosting compute, and transaction fees leave thin gross margins without substantial pricing power.",
      },
    ],
    activeCompetitors: [
      {
        name: "Market Leader Incumbent",
        url: "https://google.com",
        moat: "Dominant brand equity, enterprise security certification, and bundled suite pricing.",
        vulnerability: "Bloated interface, unresponsive enterprise support, and neglecting agile niche teams.",
        marketPosition: "Horizontal Market Leader",
      },
      {
        name: "Modern Agile Challenger",
        url: "https://producthunt.com",
        moat: "Rapid product velocity and modern developer/creator mindshare.",
        vulnerability: "Struggles with enterprise procurement rules and high churn among micro-accounts.",
        marketPosition: "Mid-Market Challenger",
      },
    ],
    graveyardStartups: [
      {
        name: "EarlyPioneer Labs",
        yearEnded: "2023",
        fundingBurned: "$2.4M",
        seductivePromise: "Launched with massive Twitter hype and 40,000 waitlist signups.",
        fatalTrap: "Day-30 retention collapsed below 6%. The product was treated as a novelty rather than a daily mission-critical workflow.",
        sourceUrl: "https://failory.com",
      },
      {
        name: "DisruptFlow",
        yearEnded: "2021",
        fundingBurned: "Angel / $800k",
        seductivePromise: "Attempted to undercut incumbent pricing by 70%.",
        fatalTrap: "Price-sensitive customers exhibited 4x higher support ticket volume and churned immediately when promotional rates ended.",
        sourceUrl: "https://techcrunch.com",
      },
    ],
    survivalWedge: {
      strategy: "The Asymmetric Vertical Wedge",
      unfairWedge: `Do not launch a general solution for all '${idea.targetCustomer}'. Target exclusively the sub-segment that loses more than 5 hours per week to '${idea.currentWorkaround}' and has direct purchasing authority.`,
      deadlyMistakeToAvoid: "Never compete on price alone against larger rivals. Compete on hyper-specific workflow depth that saves hours of manual labor.",
      proposedPricingModel: "High-tier annual commitment with dedicated onboarding instead of month-to-month low-friction subscriptions.",
    },
    momTestQuestions: [
      {
        hypothesis: "Users actively spend hours every week dealing with this problem.",
        questionToAsk: "When was the last time you encountered this issue, and what specific steps did you take to fix it?",
        trapToAvoid: "Don't ask: 'Would you like software that automates this?' (Everyone says yes to hypothetical tools).",
      },
      {
        hypothesis: "There is an allocated budget to solve this pain point.",
        questionToAsk: "How much money or staff hours did your team spend on workarounds for this in the past 90 days?",
        trapToAvoid: "Don't pitch your pricing model before confirming they actually spend money today.",
      },
      {
        hypothesis: "Current tools are failing them right now.",
        questionToAsk: "What is the single most frustrating limitation of your existing tool, and why haven't you switched yet?",
        trapToAvoid: "Don't criticize their current tool—let them describe the switching barriers.",
      },
    ],
    generatedAt: new Date().toISOString(),
    isMockFallback: true,
  };
}

/**
 * Main analysis orchestration engine.
 * Gathers research -> Builds Investment Committee Prompt -> Calls LLM -> Returns structured report.
 */
export async function analyzeStartupIdea(idea: Partial<StartupIdea>): Promise<AnalysisReport> {
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;
  const openAiKey = process.env.OPENAI_API_KEY;
  const tavilyKey = process.env.TAVILY_API_KEY;

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

  // 2. Formulate Ruthless Investment Committee Prompt
  const prompt = `
You are the Chief Investment Officer and Lead Partner at a top Tier-1 Pre-Seed Venture Firm (known for being brutally honest, rigorous, and zero-bullshit).
Your job is NOT to cheerlead or validate the founder's ego. Your job is to STRESS-TEST and INVALIDATE flaws before the founder wastes 12 months and $50,000 on a doomed project.

FOUNDER INTAKE DETAILS:
- Track: ${idea.track || "idea"}
- Title: ${idea.title}
- Pitch: ${idea.pitch}
- Target Customer: ${idea.targetCustomer}
- Current Workaround: ${idea.currentWorkaround}
- Monetization Strategy: ${idea.monetization}
${idea.problemStatement ? `- Problem Observed: ${idea.problemStatement}` : ""}
${idea.whyNow ? `- Why Now: ${idea.whyNow}` : ""}

${marketEvidence}

INSTRUCTIONS:
Conduct an exhaustive startup pre-seed autopsy.
Return ONLY a valid, parseable JSON object matching this TypeScript interface exactly:
{
  "verdict": "DEAD_ON_ARRIVAL" | "HIGH_RISK" | "VIABLE_WITH_PIVOT" | "COMPELLING_WEDGE",
  "verdictHeadline": "One sharp, brutal sentence summarizing the viability truth",
  "executiveSummary": "2-3 paragraphs of ruthless strategic diagnosis. Call out the fatal flaws, unit economics reality, and switching cost barriers.",
  "dealbreakerFlags": [
    {
      "flag": "Name of critical risk (e.g. Distribution Bottleneck, Platform Risk, Unit Economics Trap)",
      "severity": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW",
      "reasoning": "Detailed, specific explanation of why this will kill the business"
    }
  ],
  "activeCompetitors": [
    {
      "name": "Competitor name",
      "url": "https://...",
      "moat": "Their genuine defensible superpower (brand, distribution, enterprise contracts)",
      "vulnerability": "Where they are bloated, slow, or ignoring underserved users",
      "marketPosition": "Market Leader / Fast Challenger"
    }
  ],
  "graveyardStartups": [
    {
      "name": "Dead startup name",
      "yearEnded": "2020-2024",
      "fundingBurned": "$XM or Bootstrapped",
      "seductivePromise": "Why smart people believed this would work initially",
      "fatalTrap": "The specific Guillotine: CAC > LTV, churn, regulatory hammer, lack of daily habit",
      "sourceUrl": "https://..."
    }
  ],
  "survivalWedge": {
    "strategy": "The asymmetric David-vs-Goliath strategy",
    "unfairWedge": "Specific niche, distribution angle, or counter-positioning",
    "deadlyMistakeToAvoid": "The exact trap the founder must avoid",
    "proposedPricingModel": "Realistic pricing structure with viable unit economics"
  },
  "momTestQuestions": [
    {
      "hypothesis": "Critical unvalidated assumption",
      "questionToAsk": "Non-leading question about past behavior (The Mom Test style)",
      "trapToAvoid": "The common bad leading question founders usually ask"
    }
  ]
}

DO NOT include pleasantries, markdown commentary, or explanations outside the JSON. Return valid JSON only.
`;

  // 3. Try LLM providers in order of preference
  if (anthropicKey) {
    const claudeResult = await callClaude(prompt, anthropicKey);
    if (claudeResult) return { ...claudeResult, generatedAt: new Date().toISOString() };
  }

  if (geminiKey) {
    const geminiResult = await callGemini(prompt, geminiKey);
    if (geminiResult) return { ...geminiResult, generatedAt: new Date().toISOString() };
  }

  if (openAiKey) {
    const openAiResult = await callOpenAI(prompt, openAiKey);
    if (openAiResult) return { ...openAiResult, generatedAt: new Date().toISOString() };
  }

  // 4. If no LLM keys or all failed, return resilient fallback report
  return generateFallbackReport(idea);
}
