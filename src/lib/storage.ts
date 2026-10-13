import { StartupIdea } from "./types";

const STORAGE_KEY = "founder_companion_ideas_v1";

export const SEED_IDEAS: StartupIdea[] = [
  {
    id: "seed-1",
    track: "idea",
    title: "AI Invoicing for Freelance Creators",
    pitch: "Automated invoice auditing and international payout collection built for creators with international sponsors.",
    targetCustomer: "Digital creators and YouTube channels earning over $5,000/mo from foreign sponsors.",
    currentWorkaround: "Manual PayPal invoices with 4.5% cross-border fees and delayed Wire transfers.",
    monetization: "Flat $19/month plus 0.5% transaction fee.",
    status: "active_pursuit",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    report: {
      verdict: "VIABLE_WITH_PIVOT",
      verdictHeadline: "Dangerous general market, but defensible micro-niche exists.",
      executiveSummary: "Competing directly with Stripe or Deel on standard payment processing is suicidal due to banking licensing costs. However, targeting international creator brand sponsorships that get hit by 5% foreign exchange penalties provides a focused, high-margin wedge.",
      dealbreakerFlags: [
        {
          flag: "Fintech Regulatory Capital Requirements",
          severity: "HIGH",
          reasoning: "Money transmission licenses (MTL) across state/international jurisdictions will bleed early capital. You must white-label an existing rail (like Stripe Connect or Wise Platform) rather than hold custody."
        },
        {
          flag: "Sponsor Payment Inertia",
          severity: "CRITICAL",
          reasoning: "Corporate brand sponsors have rigid 60-day Net payment terms with their own ERPs (SAP/Coupa) and will refuse to click third-party creator links."
        }
      ],
      activeCompetitors: [
        {
          name: "Deel",
          url: "https://www.deel.com",
          moat: "Global legal entities in 100+ countries with enterprise compliance trust.",
          vulnerability: "Exorbitant minimum contractor fees ($599/mo) make it hostile for solo creator sponsorships.",
          marketPosition: "Enterprise Global Payroll Leader"
        },
        {
          name: "Lumanu",
          url: "https://www.lumanu.com",
          moat: "Early brand partnerships and invoice factoring for top influencers.",
          vulnerability: "High fee structure on advances and limited multi-currency FX optimization.",
          marketPosition: "Influencer Cashflow Tool"
        }
      ],
      graveyardStartups: [
        {
          name: "Paywith",
          yearEnded: "2022",
          fundingBurned: "$3.2M",
          seductivePromise: "Universal instant creator payouts with debit cards.",
          fatalTrap: "Interchange revenue collapsed during rate hikes; CAC exceeded lifetime value by 3.8x because micro-influencer churn was over 8% monthly.",
          sourceUrl: "https://techcrunch.com"
        }
      ],
      survivalWedge: {
        strategy: "Asymmetric Agency Wedge",
        unfairWedge: "Do not market to individual creators. Partner directly with boutique talent management agencies that manage 10-25 creators and do the manual invoicing accounting in QuickBooks.",
        deadlyMistakeToAvoid: "Never offer credit advances or cash factoring yourself. The moment you act like a bank, non-performing accounts will sink you.",
        proposedPricingModel: "$49/month per agency workspace + pass-through FX fee at 0.75%."
      },
      momTestQuestions: [
        {
          hypothesis: "Creators lose significant income to cross-border payment fees.",
          questionToAsk: "On your last 3 international sponsor payouts, exactly how much money went missing between the agreed invoice amount and what hit your bank account?",
          trapToAvoid: "Don't ask: 'Would you pay $19 for an app that saves you fees?' (They will always say yes, but won't change their behavior)."
        },
        {
          hypothesis: "Agencies struggle to reconcile multi-currency creator payments.",
          questionToAsk: "Walk me through how your bookkeeper closed the books for foreign sponsor invoices last month. Where was the most annoying manual friction?",
          trapToAvoid: "Don't pitch your automated tool during the interview."
        }
      ],
      generatedAt: new Date(Date.now() - 86400000 * 3).toISOString()
    }
  },
  {
    id: "seed-2",
    track: "idea",
    title: "Dog Social Network & Walk Tracker",
    pitch: "An Instagram specifically for dogs where owners share photos and find local dog-walking buddies.",
    targetCustomer: "Urban dog owners aged 22-35.",
    currentWorkaround: "Instagram hashtags, Facebook dog groups, and Rover.",
    monetization: "$4.99/mo premium subscription with dog badge filters.",
    status: "killed",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    report: {
      verdict: "DEAD_ON_ARRIVAL",
      verdictHeadline: "Zero retention, lethal CAC-to-LTV math, cemetery of 20+ identical corpses.",
      executiveSummary: "B2C vertical social networks for pets suffer from the highest 30-day dropoff in consumer tech. Owners love their dogs, but human-to-human social graphs on Instagram and TikTok already satisfy this need with zero switching costs.",
      dealbreakerFlags: [
        {
          flag: "Unit Economics Deficit",
          severity: "CRITICAL",
          reasoning: "At $4.99/mo, paid acquisition costs ($15-$25 per install) require users to remain active for over 5 months. Average 30-day retention for pet social apps is under 4%."
        },
        {
          flag: "Absence of Organic Network Effects",
          severity: "CRITICAL",
          reasoning: "Users will post twice, notice their local neighbors aren't on the app, and revert back to Instagram where their actual friends already follow them."
        }
      ],
      activeCompetitors: [
        {
          name: "Rover",
          url: "https://www.rover.com",
          moat: "Two-sided marketplace liquidity with verified background checks and insurance.",
          vulnerability: "Focuses purely on booking utility rather than casual social community.",
          marketPosition: "Marketplace Incumbent"
        }
      ],
      graveyardStartups: [
        {
          name: "Doggy Date",
          yearEnded: "2019",
          fundingBurned: "$1.5M",
          seductivePromise: "Tinder for dogs to arrange playdates in city dog parks.",
          fatalTrap: "Users exchanged phone numbers on the first meetup and never opened the app again. Zero recurring utility.",
          sourceUrl: "https://failory.com"
        },
        {
          name: "Petzbe",
          yearEnded: "2021",
          fundingBurned: "Self-funded / Angel",
          seductivePromise: "No humans allowed—pure pet-only social network.",
          fatalTrap: "Novelty wore off in 2 weeks. Advertising CPMs in pet niche couldn't cover AWS server infrastructure.",
          sourceUrl: "https://techcrunch.com"
        }
      ],
      survivalWedge: {
        strategy: "Abandon Pure Social — Pivot to Local Service SaaS",
        unfairWedge: "If you want to be in the dog space, build B2B practice management for independent mobile dog groomers. They have real recurring billing needs and zero tech.",
        deadlyMistakeToAvoid: "Do not spend another dollar trying to acquire consumers for a social app.",
        proposedPricingModel: "Kill this idea immediately."
      },
      momTestQuestions: [
        {
          hypothesis: "People will open a dedicated app just to see dogs.",
          questionToAsk: "When was the last time you downloaded an app for your pet that you still opened this week?",
          trapToAvoid: "Don't ask: 'Do you love taking photos of your dog?' (Everyone says yes; that doesn't mean they want a new app)."
        }
      ],
      generatedAt: new Date(Date.now() - 86400000 * 5).toISOString()
    }
  }
];

export function getStoredIdeas(): StartupIdea[] {
  if (typeof window === "undefined") {
    return SEED_IDEAS;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_IDEAS));
      return SEED_IDEAS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SEED_IDEAS;
  } catch (e) {
    console.error("Failed to load stored ideas:", e);
    return SEED_IDEAS;
  }
}

export function saveIdea(idea: StartupIdea): void {
  if (typeof window === "undefined") return;

  try {
    const current = getStoredIdeas();
    const index = current.findIndex((i) => i.id === idea.id);
    let updated: StartupIdea[];
    if (index >= 0) {
      updated = [...current];
      updated[index] = { ...idea, updatedAt: new Date().toISOString() };
    } else {
      updated = [idea, ...current];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to save idea:", e);
  }
}

export function getIdeaById(id: string): StartupIdea | undefined {
  const ideas = getStoredIdeas();
  return ideas.find((i) => i.id === id);
}

export function deleteIdea(id: string): void {
  if (typeof window === "undefined") return;

  try {
    const current = getStoredIdeas();
    const updated = current.filter((i) => i.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to delete idea:", e);
  }
}

export function updateIdeaStatus(id: string, status: StartupIdea["status"]): void {
  const idea = getIdeaById(id);
  if (idea) {
    saveIdea({ ...idea, status });
  }
}
