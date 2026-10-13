export type IdeaTrack = "idea" | "vision";

export type IdeaStatus = "under_review" | "killed" | "active_pursuit";

export type SeverityLevel = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

export type VerdictType =
  | "DEAD_ON_ARRIVAL"
  | "HIGH_RISK"
  | "VIABLE_WITH_PIVOT"
  | "COMPELLING_WEDGE";

export interface DealbreakerFlag {
  flag: string;
  severity: SeverityLevel;
  reasoning: string;
}

export interface ActiveCompetitor {
  name: string;
  url?: string;
  moat: string;
  vulnerability: string;
  marketPosition: string;
}

export interface GraveyardStartup {
  name: string;
  yearEnded: string;
  fundingBurned?: string;
  seductivePromise: string;
  fatalTrap: string;
  sourceUrl?: string;
}

export interface SurvivalWedge {
  strategy: string;
  unfairWedge: string;
  deadlyMistakeToAvoid: string;
  proposedPricingModel: string;
}

export interface MomTestQuestion {
  hypothesis: string;
  questionToAsk: string;
  trapToAvoid: string;
}

export interface AnalysisReport {
  verdict: VerdictType;
  verdictHeadline: string;
  executiveSummary: string;
  dealbreakerFlags: DealbreakerFlag[];
  activeCompetitors: ActiveCompetitor[];
  graveyardStartups: GraveyardStartup[];
  survivalWedge: SurvivalWedge;
  momTestQuestions: MomTestQuestion[];
  generatedAt: string;
  isMockFallback?: boolean;
}

export interface StartupIdea {
  id: string;
  track: IdeaTrack;
  title: string;
  pitch: string;
  targetCustomer: string;
  currentWorkaround: string;
  monetization: string;
  problemStatement?: string;
  whyNow?: string;
  status: IdeaStatus;
  createdAt: string;
  updatedAt: string;
  report?: AnalysisReport;
  parentIdeaId?: string; // For pivots
}
