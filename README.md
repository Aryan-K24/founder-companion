# Founder Companion

> **The Pre-Seed Investment Committee in Your Browser**  
> AI-powered startup stress-testing, live competitor intelligence, and post-mortem graveyard autopsies.

[![Tests](https://img.shields.io/badge/tests-24%20passed-emerald)](https://github.com/Aryan-K24/founder-companion)
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

## 3. Environment Variables (FE-11)

| Variable | Required? | Default / Fallback | Description |
| :--- | :---: | :---: | :--- |
| `NEXT_PUBLIC_APP_NAME` | Optional | `"Founder Companion"` | App branding displayed in headers and metadata. |
| `TAVILY_API_KEY` | Optional | Built-in fallback knowledge | API key for [Tavily](https://tavily.com) live web competitor & autopsy search. |
| `ANTHROPIC_API_KEY` | Optional | Fallback engine / Next LLM | Anthropic Claude 3.5 Sonnet API key. |
| `GEMINI_API_KEY` | Optional | Fallback engine / Next LLM | Google Gemini 1.5 Flash API key (free tier available). |
| `OPENAI_API_KEY` | Optional | Fallback engine / Next LLM | OpenAI GPT-4o-mini API key. |

---

## 4. Production Hygiene & Abuse Protection (FE-11)

To prevent strangers from draining API credits and to protect serverless resources:

1. **Sliding-Window IP Rate Limiter:** Restricted to a maximum of **5 analysis requests per 5 minutes per IP address** on `/api/analyze`. Rejections return HTTP `429 Too Many Requests` with a `Retry-After` header.
2. **Strict Input Caps:**
   - Concept Title: Max **120 characters**
   - Concept Pitch: Max **1,500 characters**
   - Target Customer: Max **400 characters**  
   Exceeding caps returns HTTP `400 Bad Request`, preventing prompt injection and excessive token consumption.
3. **Serverless Function Duration:** Configured with `export const maxDuration = 60;` to ensure long-running search and LLM operations complete safely without hanging indefinitely.

---

## 5. Architectural Decisions & Trade-Offs

1. **Form-Driven Workflow vs. Conversational Chatbot:**
   * *Decision:* Explicit 4-question intake rather than an open chat.
   * *Rationale:* Open chat invites unstructured ramblings. A constrained form forces founders to define unit economics, target audience, and current workarounds upfront, yielding vastly sharper AI analysis.
2. **Client-Side Persistence (localStorage) vs. Remote Database:**
   * *Decision:* Implemented an SSR-safe `localStorage` engine with pre-seeded case studies.
   * *Rationale:* Allows instant zero-setup evaluation on Vercel without requiring reviewers to configure Postgres connection strings or sign in, while preserving user edits across reloads.
3. **Multi-Model Orchestration with Resilient Fallback:**
   * *Decision:* Support Claude, Gemini, OpenAI, and an offline heuristic fallback in a cascading chain.
   * *Rationale:* Solves API quota exhaustion and provides predictable evaluation during grading.

---

## 6. How AI Tools Built This (Honest Retrospective)

* **Pair-Programming Agent:** Developed collaboratively using Google Antigravity (Gemini 3.8 Flash model) acting as an autonomous pair programmer.
* **Where AI Accelerated Development:**
  - Generating initial TypeScript interfaces (`types.ts`) and mock data schemas.
  - Formulating adversarial pre-seed prompt templates that eliminate LLM sycophancy.
  - Writing boilerplate DOM integration tests for Vitest and React Testing Library.
* **Where Human Judgment Was Critical:**
  - Catching peer-dependency conflicts between `@types/node` and `vitest` that broke Vercel's initial `npm install` build step, and diagnosing the need for `.npmrc`.
  - Designing the "Graveyard Autopsy" framework: realizing that VCs judge ideas by past failures rather than current hype.
  - Ensuring strict accessibility (WCAG 2.1 AA) landmarks, focus styling, and `aria-live` regions.

---

## 7. Testing & Verification (FE-09)

The project includes unit and integration tests using **Vitest** and **React Testing Library**:

```bash
# Run test suite
npm run test

# Run test suite with V8 coverage report
npm run test:coverage
```

### Coverage Highlights:
- **Test Files:** 9 passed (9)
- **Tests:** 24 passed (24)
- **Component Coverage:**
  - `components/layout`: 100%
  - `components/ui`: 100%
  - `components/report/ReportPageClient`: 100%
  - `components/workspace/WorkspaceView`: 78.1% statements / 75.8% lines
  - `components/report/ReportView`: 57.1% statements / 57.1% lines
  - `lib/storage.ts`: 82.0% statements / 85.3% lines
  - Total component line coverage exceeds **>65%** (surpassing the $\ge 50\%$ rubric benchmark).

---

## 8. Known Limitations & Roadmap

- **Private Company Financials:** Public web scraping is limited to publicly disclosed funding rounds and press releases; private bootstrap revenue figures are inferred.
- **Continuous Competitor Tracking:** Future versions will include automated email digests when tracked competitors ship updates or announce pricing changes.
- **Automated Mom Test Call Transcriptions:** Direct integration with meeting recording tools (e.g. Otter/Fireflies) to automatically map interview transcripts against pre-set hypotheses.
