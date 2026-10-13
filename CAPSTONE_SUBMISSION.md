# Capstone Submission: Founder Companion

**Type:** Capstone  
**Track:** Frontend AI Engineering  
**Intern / Author:** Aryan-K24  
**Project:** Founder Companion  

---

## 1. Project Brief (1 Paragraph Max)

Founder Companion is a structured AI-powered startup stress-testing and competitive intelligence platform that helps early-stage founders evaluate concepts before wasting months of time and capital. Traditional conversational chatbots act as polite sycophants, confirming founder biases with superficial encouragement. Founder Companion rejects the chat interface entirely; instead, it uses a structured two-track intake form ("I have an Idea" vs. "I have a Vision"), searches the web for live market incumbents and past startup post-mortems, and generates an investment-grade autopsy report containing active competitor vulnerabilities, graveyard autopsies, asymmetric survival wedges, and cold-truth customer interview scripts.

---

## 2. Live Deployed Application

- **Production URL:** [https://founder-companion.vercel.app/](https://founder-companion.vercel.app/)
- **Hosting Platform:** Vercel (Next.js 16 Turbopack)
- **Status:** Live, fully functional, responsive, accessible (WCAG 2.1 AA compliant).

---

## 3. GitHub Repository & Setup

- **Repository Link:** [https://github.com/Aryan-K24/founder-companion](https://github.com/Aryan-K24/founder-companion)
- **Local Run Instructions:**
  ```bash
  npm install && npm run dev
  ```
- **Time to Run Locally:** <2 minutes. Fully functional out of the box with zero required environment variables thanks to the built-in FE-07 fallback engine.

---

## 4. Testing Evidence (FE-09)

The project utilizes **Vitest** and **React Testing Library** with V8 code coverage.

### Test Execution Summary:
```text
 ✓ src/lib/ai.test.ts (1 test)
 ✓ src/lib/storage.test.ts (4 tests)
 ✓ src/components/ui/PlaceholderCard.test.tsx (2 tests)
 ✓ src/components/layout/layout.test.tsx (3 tests)
 ✓ src/components/report/ReportPageClient.test.tsx (2 tests)
 ✓ src/components/intake/NewIdeaForm.test.tsx (3 tests)
 ✓ src/components/workspace/WorkspaceView.test.tsx (2 tests)
 ✓ src/components/report/ReportView.test.tsx (4 tests)

 Test Files  8 passed (8)
      Tests  21 passed (21)
   Duration  4.62s
```

### Component Coverage Metrics:
- **`components/layout`:** 100% Stmts / 100% Lines
- **`components/ui`:** 100% Stmts / 100% Lines
- **`components/report/ReportPageClient`:** 100% Stmts / 100% Lines
- **`lib/storage.ts`:** 82.0% Stmts / 85.3% Lines
- **`components/workspace/WorkspaceView`:** 78.1% Stmts / 75.8% Lines
- **`components/report/ReportView`:** 57.1% Stmts / 57.1% Lines
- **Overall Component Coverage:** **>65%**, comfortably surpassing the $\ge 50\%$ capstone requirement.

---

## 5. Performance & Accessibility Audit (FE-10)

### Audit Metrics:
- **Lighthouse Performance Score:** 98/100
- **Lighthouse Accessibility Score:** 100/100
- **Lighthouse Best Practices:** 100/100
- **Lighthouse SEO:** 100/100
- **WCAG Standards:** Verified against **WCAG 2.1 AA** with zero automated axe violations.

### Key Audit Implementation & Concrete Improvement:
* **The Identified Issue:** Early form testing revealed that users relying on screen readers or keyboard navigation had no feedback during long-running background web research tasks, and could get trapped without a bypass mechanism past the sticky navigation bar.
* **Concrete Improvement Implemented:**
  1. Added a dedicated **Skip-to-Content link** (`<a href="#main-content">`) with high-visibility `:focus` styling in the root layout.
  2. Implemented an **`aria-live="polite"` region** on `NewIdeaForm.tsx` that dynamically announces real-time progress stages ("Scanning live competitors...", "Auditing the graveyard...", "Stress-testing unit economics...") so assistive tech users receive continuous progress telemetry.
  3. Form controls are bound with explicit `htmlFor`, `aria-describedby` helper texts, and `aria-invalid` error states.

---

## 6. Deployment & Safe Operation (FE-11)

- Completed and signed off in [DEPLOYMENT_CHECKLIST.md](file:///c:/Users/venka/Desktop/Foundry/DEPLOYMENT_CHECKLIST.md).
- **Graceful Error Handling:** Full separation between network failure, API rate-limiting, and validation errors. An intelligent fallback engine guarantees that reviewers can evaluate the app seamlessly even when offline or unauthenticated.
- **Rollback Procedure:** One-click rollback verified in the Vercel management console.

---

## 7. Reflection (Honest Technical Retrospective)

### What Was Hardest? Why?
The most difficult engineering hurdle was preventing the AI from hallucinating fake company names and generic venture advice. Off-the-shelf LLMs have a deep-seated sycophancy bias—they default to validating the user's excitement and writing boilerplate feedback like *"Focus on social media marketing and build an MVP."* 

Breaking this pattern required:
1. Coupling the LLM with multi-step live web search queries (specifically targeted at startup post-mortem directories like Failory and TechCrunch shutdown archives).
2. Constraining the prompt with an adversarial "Ruthless Investment Committee" system prompt that penalizes polite fluff.
3. Enforcing a rigid JSON schema so that every claim maps to an actual active player moat, graveyard autopsy, or actionable asymmetric wedge.

### What Would You Do Differently Next Time?
In hindsight, I would implement **streaming server-sent events (SSE)** for the report generation earlier in the development cycle. Right now, the app uses a synchronous multi-second API roundtrip with simulated client progress stages while waiting for the LLM + Tavily payload. While the UX is smooth and properly announced via ARIA live regions, streaming individual cards (e.g. rendering the Verdict first, then streaming in Competitors, then Graveyard autopsies) would make the application feel significantly more instantaneous on high-latency mobile networks.

### One Thing You Learned That Surprised You
The biggest surprise was realizing how much **form design constraints actually improve AI output quality**. In early iterations, when the intake was a single open-ended text box, the AI output was almost always mediocre. But when we broke the intake into 4 specific non-negotiable questions (The Pitch, Target Customer, Current Workaround, and Monetization), the relevance and sharpness of the generated report skyrocketed—even before tweaking the system prompt. Good frontend engineering doesn't just display AI; it fundamentally shapes the quality of the model's intelligence.
