# 3-Minute Demo Video Recording Script (FL-09)

> **Time:** 3 to 5 minutes  
> **Tool:** Loom (free tier) or OBS Studio  
> **Destination:** Upload as Unlisted YouTube Link or Loom Share Link  
> **Rule:** Real live app only — NO SLIDE DECKS!

---

## [0:00 - 0:45] Introduction & The Core Problem
* **Screen:** Show your browser open to `https://founder-companion.vercel.app/`
* **Say:**  
  > "Hi everyone, I'm Aryan, and this is Founder Companion — an AI-powered pre-seed validation and competitive intelligence platform.
  > 
  > The problem I wanted to solve is simple: 90% of early-stage startups fail, usually from predictable flaws like lethal unit economics or building something that incumbents can easily copy. 
  > 
  > Default AI chatbots like ChatGPT are terrible at helping founders because they're trained to be polite cheerleaders — they confirm your biases. Founder Companion rejects the chat interface entirely; it acts like a ruthless venture investment committee that stress-tests your idea before you waste months of time and money."

---

## [0:45 - 1:45] Live Walkthrough & The Two Intake Tracks
* **Screen:** Scroll down on the homepage, click **"Start Free Analysis"** to navigate to `/idea/new`.
* **Say:**  
  > "We support two distinct intake funnels:
  > 1. 'I have an Idea' — for founders with a specific product hypothesis.
  > 2. 'I have a Vision' — for founders who observed a real problem but haven't shaped the software solution yet.
  > 
  > Notice the form design: instead of an open text box, we force the founder to specify their target audience, current workarounds, and monetization model upfront."

* **Screen:** Type in a sample idea:
  * Title: `MicroClinic CRM`
  * Pitch: `Automated scheduling and SMS reminder platform for solo dental clinics.`
  * Target Customer: `Independent dentists with under 3 chairs.`
  * Click **"Run Pre-Seed Autopsy & Analysis"**.
* **Say:**  
  > "When I click submit, the application doesn't just prompt an LLM. In the background, it dispatches search queries to Tavily to scour live competitors and search startup post-mortem databases for companies that failed in this space."

---

## [1:45 - 2:45] The Report & Explaining ONE Key Design Decision (Required by Rubric)
* **Screen:** Show the generated Report Card at `/idea/[id]/report`.
* **Say:**  
  > "Here is our report. Notice how it's structured:
  > 1. First, a binary **Viability Verdict** and **Structural Dealbreaker Flags**.
  > 2. Second, **The Active Survivors** — showing incumbent moats and where they bleed.
  > 3. Third, **The Startup Graveyard** — showing dead startups, their funding burned, and the fatal trap that killed them.
  > 
  > **Here is a key design decision I made:**  
  > I deliberately separated verified web data from AI inference, and added an **Asymmetric Survival Playbook** that tells David how to beat Goliath via verticalization. Plus, we generate a **Mom Test Discovery Script** so founders know the exact non-leading questions to ask real customers."

---

## [2:45 - 3:30] The Workspace & Explaining ONE Key Limitation (Required by Rubric)
* **Screen:** Click on **"Workspace"** in the navbar to show the 3-column Kanban board (`Under Review`, `Active Pursuit`, `Killed`).
* **Say:**  
  > "In the workspace, founders can triage their ideas across stages, spin off pivots with one click, or send dead ideas to the graveyard.
  > 
  > **Now, to be honest about one real limitation of this system:**  
  > Because the intelligence engine relies on public web scraping and search indexing, it cannot access private company financials or the internal unit economics of bootstrapped competitors. For example, if a competitor is quietly losing money on customer acquisition, public web signals won't reveal that. This tool is designed to give you pre-seed due diligence, but it cannot replace talking to actual paying customers."

---

## [3:30 - 3:50] Conclusion & Wrap-Up
* **Screen:** Show the top of the Workspace or Home Page.
* **Say:**  
  > "The app is deployed live on Vercel with automated rate-limiting, comprehensive Vitest test coverage over 65%, and WCAG 2.1 AA accessibility.
  > 
  > Thank you for watching!"
