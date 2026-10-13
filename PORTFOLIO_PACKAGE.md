# Final Portfolio Package & Capstone Index (FL-10)

**Project:** Founder Companion  
**Author:** Aryan Kulkarni (Aryan-K24)  
**Track:** Frontend AI Engineering & AI Fluency  
**Date:** October 2026  

---

## 1. Master Deliverables Index

| Deliverable | Description | Link |
| :--- | :--- | :--- |
| **Live Production Application** | Deployed Next.js 16 app on Vercel | [https://founder-companion.vercel.app/](https://founder-companion.vercel.app/) |
| **Source Code Repository** | Complete GitHub repository with clean git history | [https://github.com/Aryan-K24/founder-companion](https://github.com/Aryan-K24/founder-companion) |
| **Project Documentation** | Production README with architecture, setup & env vars | [README.md](README.md) |
| **Demo Video (FL-09)** | 3-5 minute live walkthrough & narration | *(Paste your unlisted YouTube / Loom link here)* |
| **Video Script** | Click-by-click narration script with decision & limitation | [DEMO_VIDEO_SCRIPT.md](DEMO_VIDEO_SCRIPT.md) |
| **Deployment Checklist (FE-11)** | Signed-off deployment hygiene & rollback plan | [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) |
| **Automated Test Evidence** | 24 passing Vitest tests with >65% component coverage | [CAPSTONE_SUBMISSION.md](CAPSTONE_SUBMISSION.md) |

---

## 2. Retrospective: A Letter to the Person I Was in Week 1

*(Word Count: ~650 words)*

Dear Week 1 Aryan,

Eight weeks ago, you thought building an "AI application" meant slapping an input box in front of an OpenAI API key and watching the tokens stream back. You thought the hardest part of software engineering was writing code from scratch, and that an LLM’s job was to be an all-knowing oracle that gives users good advice.

You were wrong about almost all of that, and understanding *why* you were wrong is the most valuable thing that happened this semester.

### What We Set Out to Do vs. What Changed
When we started Founder Companion, the initial instinct was to build another AI brainstorm chatbot—a conversational assistant where aspiring founders could type: *"Here is my idea, what do you think?"*

Within days of working with real users, the fundamental flaw became glaring: **LLMs are trained to be people-pleasers.** If you tell a language model about a social network for dogs, it will hallucinate a \$10B addressable market and cheerlead you off a cliff. Chat interfaces don't solve this; they make it worse by hiding structure behind open-ended prompts that first-time founders don't know how to write.

What changed was our entire posture. We threw out the chat interface entirely. We turned Founder Companion into a **structured pre-seed investment committee**. Instead of asking: *"How can AI be nice to the founder?"*, we asked: *"How can software ruthlessly invalidate fatal flaws in 3 minutes before the founder wastes 6 months of their life?"* We anchored the tool in live web search (Tavily) to find the **Startup Graveyard**—real companies that burned real venture capital trying the same idea and died.

### What I Would Build Next
If I had another 4 weeks, I would close the loop between desk research and customer discovery. Right now, Founder Companion scripts five non-leading *Mom Test* customer interview questions. Next, I would build an automated audio-transcription intake where a founder uploads a recording of an actual customer call, and the agent cross-references the transcript against their original assumptions to automatically update the idea’s risk score.

### The Three Most Transferable Things I Learned

1. **Form Constraints Shape AI Quality More Than Prompt Engineering:**  
   In Week 1, you thought prompt engineering was about finding magic adjectives. In Week 8, you realized that input architecture is 80% of the battle. When we forced founders to answer four non-negotiable form fields—Target Audience, Current Workaround, Monetization, and Pitch—the AI’s strategic output improved tenfold. Constraints produce clarity.

2. **Resilience and Production Hygiene Are What Separate Hobbyists from Engineers:**  
   Anyone can make an AI call work in a local test script on a happy path. But when you deploy to Vercel, reality hits: dependencies fail peer-resolution, APIs rate-limit, and strangers attempt prompt injections. Adding `.npmrc` for build resolution, an in-memory sliding-window IP rate limiter, strict character caps, and an offline contextual fallback (FE-07) taught me that production AI engineering is mostly defensive engineering.

3. **Honesty Reads as Credibility:**  
   In early demos, you wanted the tool to look like it could do everything. By Week 8, you learned that being upfront about limitations—admitting that public web scraping cannot see private company margins or replace real human customer interviews—is what actually earns trust with technical reviewers, investors, and users.

You’re shipping real software now. Keep building what actually matters.

— Aryan, Week 8

---

## 3. Build-in-Public Showcase Post (Ready to Copy-Paste)

> **Copy-paste this to LinkedIn, Twitter/X, or your FlyRank Showcase Thread:**
>
> 🚀 **Just shipped Founder Companion — an AI-powered pre-seed validation platform.**
> 
> Most startup ideas don't fail from bad code; they fail from structural traps that were predictable on Day 1 (lethal CAC-to-LTV math, lack of distribution, or building a feature incumbents easily absorb).
>
> Default AI chatbots are polite cheerleaders that validate founder delusions. We built something different:
>
> 🔍 **What it does:**  
> • Two-track intake: "I have an Idea" vs. "I have a Vision"  
> • Scours live web signals for active incumbents & their vulnerabilities  
> • Autopsies the **Startup Graveyard** (real dead startups & the fatal trap that killed them)  
> • Generates an Asymmetric Survival Playbook & Mom Test interview scripts  
> • Built-in Kanban Triage Workspace  
>
> 🛠️ **Tech Stack:** Next.js 16 (Turbopack), Tailwind CSS, Vitest (24/24 tests passing, >65% coverage), Google Gemini + Tavily search API, deployed on Vercel with automated IP rate-limiting.
>
> 🎯 **One Key Design Decision:** We killed the conversational chat UI completely. Form-driven intake forces founders to define unit economics and current workarounds upfront, yielding vastly sharper analysis.
>
> ⚠️ **One Real Limitation:** Public web indexing can't see private unit economics or quiet cash bleed in bootstrapped competitors. It provides due diligence, but never replaces talking to paying customers.
>
> Check it out live: https://founder-companion.vercel.app/  
> Source Code: https://github.com/Aryan-K24/founder-companion
