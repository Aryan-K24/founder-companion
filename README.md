# Founder Companion

> **The Pre-Seed Investment Committee in Your Browser**  
> AI-powered startup stress-testing, live competitor intelligence, and post-mortem graveyard autopsies.

[![Tests](https://img.shields.io/badge/tests-21%20passed-emerald)](https://github.com/Aryan-K24/founder-companion)
[![Coverage](https://img.shields.io/badge/coverage-%3E65%25-blue)](https://github.com/Aryan-K24/founder-companion)
[![WCAG](https://img.shields.io/badge/WCAG-2.1%20AA%20Compliant-success)](https://github.com/Aryan-K24/founder-companion)
[![Next.js](https://img.shields.io/badge/Next.js-16%20Turbopack-black)](https://nextjs.org)

**Live Production URL:** [https://founder-companion.vercel.app/](https://founder-companion.vercel.app/)  
**GitHub Repository:** [https://github.com/Aryan-K24/founder-companion](https://github.com/Aryan-K24/founder-companion)

---

## 1. Project Brief

**Problem:** 90% of early-stage startups fail within 12 months, predominantly from structural flaws that were predictable on day one—unfavorable unit economics, lethal competition, or building a feature that incumbents easily absorb. Default AI chatbots (like standard ChatGPT) act as polite sycophants, confirming founder delusions rather than testing viability.

**Audience:** Aspiring founders, solo hackers, and venture studios evaluating pre-seed concepts before committing engineering time and capital.

**Why this project:** We rejected the generic chatbot format in favor of a structured research and decision-support application. By pairing real-time competitor research with the "Startup Graveyard" (autopsies of failed startups that tried the same concept), Founder Companion invalidates bad ideas in 3 minutes rather than letting founders waste 6 months of their lives.

---

## 2. Quickstart & Local Setup

Run the application locally in under 2 minutes:

```bash
# 1. Clone the repository
git clone https://github.com/Aryan-K24/founder-companion.git
cd founder-companion

# 2. Install dependencies
npm install

# 3. (Optional) Configure API Keys
cp .env.local.example .env.local

# 4. Start local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

> **Zero-Config Resilient Fallback (FE-07):** If no API keys are configured, the built-in deterministic contextual fallback engine automatically activates. Reviewers can test the complete end-to-end workflow immediately without creating API accounts or incurring costs.

---

## 3. Architecture Overview

```
src/
├── app/
│   ├── api/analyze/route.ts      # Edge API route orchestrating live research & LLM synthesis
│   ├── idea/
│   │   ├── new/page.tsx          # Two-track intake workflow (Idea vs. Vision)
│   │   └── [id]/report/page.tsx  # Dynamic SSR/Client report card route
│   ├── workspace/page.tsx        # Persistent Triage Kanban board
│   ├── health/page.tsx           # Health check endpoint verification
│   ├── layout.tsx                # Root layout with WCAG skip-link & accessible landmarks
│   └── page.tsx                  # Strategic hero & value-pillar landing page
├── components/
│   ├── intake/NewIdeaForm.tsx    # Accessible ARIA-compliant two-track intake form
│   ├── report/ReportView.tsx     # The Ruthless Investment Committee Report Card
│   ├── workspace/WorkspaceView.tsx # Kanban triage board with stage transitions
│   └── layout/                   # Accessible Containers, Navbars, and Headers
├── lib/
│   ├── ai.ts                     # Multi-provider LLM caller + Tavily search + FE-07 fallback
│   ├── storage.ts                # SSR-safe localStorage persistence layer with seed data
│   └── types.ts                  # Strict TypeScript data models and schema definitions
```

---

## 4. AI & Research Engine Integration

### How AI Fits Meaningfully (Not a Chatbot)
Instead of an open-ended chat conversation, AI powers a **structured evaluation pipeline**:

1. **Information Retrieval:** When an idea is submitted, the backend dispatches targeted queries to **Tavily Search API**:
   - `"[idea] competitors startups companies"` (Active survivors)
   - `"[idea] startup shutdown failed post-mortem"` (Graveyard casualties)
2. **Investment Committee Persona:** Contextual search data and founder inputs are fed into the LLM (Anthropic Claude 3.5 Sonnet / Google Gemini / OpenAI) with strict instructions to act as a **Ruthless Pre-Seed Investment Partner**.
3. **Structured JSON Output:** The model is constrained to return a strict JSON schema containing:
   - **Viability Verdict:** `DEAD_ON_ARRIVAL`, `HIGH_RISK`, `VIABLE_WITH_PIVOT`, or `COMPELLING_WEDGE`.
   - **Dealbreaker Risk Flags:** Binary risk warnings with severity ratings.
   - **Active Survivors Matrix:** Defensible moats vs. operational vulnerabilities.
   - **Graveyard Autopsy:** Funding burned, seductive premise, and fatal guillotine.
   - **Asymmetric Wedge:** David-vs-Goliath beachhead strategy and pricing guidance.
   - **The Mom Test Discovery Script:** 5 non-leading customer interview questions.

---

## 5. Testing & Verification (FE-09)

The project includes unit and integration tests using **Vitest** and **React Testing Library**:

```bash
# Run test suite
npm run test

# Run test suite with V8 coverage report
npm run test:coverage
```

### Coverage Highlights:
- **Test Files:** 8 passed (8)
- **Tests:** 21 passed (21)
- **Component Coverage:**
  - `components/layout`: 100%
  - `components/ui`: 100%
  - `components/report/ReportPageClient`: 100%
  - `components/workspace/WorkspaceView`: 78.1% statements / 75.8% lines
  - `components/report/ReportView`: 57.1% statements / 57.1% lines
  - `lib/storage.ts`: 82.0% statements / 85.3% lines

---

## 6. Accessibility & Performance (FE-10)

- **WCAG 2.1 AA Compliance:**
  - Accessible Skip-to-Content link on root layout.
  - Semantic landmark elements (`<header>`, `<main>`, `<nav>`, `<form>`, `<section>`).
  - Strict form labeling (`<label htmlFor="...">`, `aria-describedby`, `aria-invalid`).
  - ARIA Live regions (`aria-live="polite"`) announcing real-time research progression stages.
  - High-contrast color palette exceeding 4.5:1 ratio for text and 3:1 for interactive UI components.
  - Fully keyboard operable (Tab, Space, Enter, Escape).

---

## 7. Resilience & Error Handling (FE-07)

- **Graceful API Degradation:** If external LLMs or search APIs timeout or exhaust quota, the system falls back to a deterministic domain evaluation engine without throwing 500 errors.
- **Client-Side Safe Hydration:** Storage engine guards against SSR hydration mismatches with resilient initial seed state.
- **Form Error States:** Inline accessible alert banners notify users of missing required inputs before dispatching server requests.

---

## 8. Known Limitations & Roadmap

- **Private Company Financials:** Public web scraping is limited to publicly disclosed funding rounds and press releases; private bootstrap revenue figures are inferred.
- **Continuous Competitor Tracking:** Future versions will include automated email digests when tracked competitors ship updates or announce pricing changes.
- **Automated Mom Test Call Transcriptions:** Direct integration with meeting recording tools (e.g. Otter/Fireflies) to automatically map interview transcripts against pre-set hypotheses.
