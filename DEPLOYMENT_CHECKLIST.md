# Deployment & Operations Checklist (FE-11)

**Application:** Founder Companion  
**Target Environment:** Production (Vercel)  
**Deployment Date:** October 2026  
**Auditor / Engineer:** Aryan-K24  

---

### Pre-Deployment Verification

- [x] **Lint & Types:** `npm run build` passes with zero TypeScript diagnostics and zero ESLint errors.
- [x] **Test Verification:** `npm run test` executes with 21/21 passing tests across 8 test suites.
- [x] **Coverage Benchmark:** Component test coverage exceeds the 50% threshold (>65% lines).
- [x] **Environment Configuration:**
  - `NEXT_PUBLIC_APP_NAME` set to "Founder Companion".
  - Production secrets (`TAVILY_API_KEY`, `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`) configured in Vercel project settings.
- [x] **Accessibility Inspection (WCAG 2.1 AA):**
  - Skip-to-content bypass link verified.
  - Contrast ratios for `--foreground` (`#14151a`) against `--background` (`#fafaf9`) verify at >12:1.
  - ARIA attributes confirmed on tabs, modals, and status regions.

---

### Failure Modes & Safe Degradation (FE-07)

| Failure Scenario | System Behavior | User Impact |
| :--- | :--- | :--- |
| **LLM API Rate Limit or Outage** | Catches 429/500 errors and routes to `generateFallbackReport()`. | User receives a rigorous contextual evaluation without crash or blank screen. Alert banner discloses fallback mode. |
| **Search Engine (Tavily) Quota Exhausted** | `searchWeb()` returns empty array safely and passes graceful context to LLM. | Evaluation synthesizes knowledge from foundational training data with zero unhandled exceptions. |
| **Network Loss during Submission** | Form catches fetch rejection, resets submit button, and surfaces inline `role="alert"` notification. | User retains all inputted text without losing data. |
| **Storage Corrupted or Blocked** | `storage.ts` catches `localStorage` errors and falls back to in-memory state. | App continues functioning smoothly for the active session. |

---

### Rollback & Monitoring Plan

- **Vercel Instant Rollback:** In the event of a critical regression, navigate to Vercel Deployments dashboard and execute "Rollback to Previous Deployment" (instant DNS-level switch in <5 seconds).
- **Git Revert:** `git revert HEAD && git push origin main` triggers automated CI/CD pipeline redeployment.
- **Monitoring & Uptime:** Built-in `/health` route continuously monitors server component responsiveness and external endpoint connectivity.
- **Sign-off:** Approved for production deployment.
