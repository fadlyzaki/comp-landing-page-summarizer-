# I Had 24 Tabs Open Doing Competitor Research. So I Built an AI Engine to Do It in 3 Seconds.

**A Staff Product Designer’s weekend journey turning messy browser tabs into structured competitive intelligence with Gemini 2.5 Flash and zero cloud budget.**

*By [Fadly Uzzaki](https://fadlyzaki-design.vercel.app/)*

---

It always begins with the most innocent intention.

You sit down on a Tuesday morning to kick off discovery for a new onboarding flow, and you tell yourself:  
*“I’ll just spend twenty minutes looking at how Linear, Stripe, and Vercel frame their value propositions.”*

Fast forward three hours. It is 1:30 AM. Your laptop fan is whirring like a jet engine, you have 24 browser tabs pinned across two monitors, and your Notion workspace has devolved into an unruly graveyard of half-copied headlines, fragmented bullet points, and blurry screenshot snippets.

You are mentally depleted. Your working memory is fried. And worst of all? **You haven’t made a single actual design decision.**

Staring at that chaotic sea of open tabs, a sobering question hit me:

> **Why are we spending 80% of our creative energy doing manual data entry, and only 20% on actual product strategy?**

As designers and product builders, we pride ourselves on cognitive ergonomics. We obsess over cutting two clicks from a user’s checkout flow, yet our own internal discovery workflows remain shockingly primitive: manually scanning marketing pages, parsing promotional jargon, and wrestling qualitative notes into spreadsheets.

The problem in tech has never been a lack of information.  
**The problem is the complete absence of a structured synthesis engine.**

So that weekend, I opened VS Code and decided to build one.

---

## The Trap: Why Most AI Summarizers Are Useless to Designers

When people first think about feeding landing pages into an LLM, they reach for generic summarization prompts. And without fail, they receive the exact same corporate fluff back:

> *“Stripe is a financial technology company that provides economic infrastructure for the internet...”*

That is completely useless to a product team.

When a seasoned designer or product manager evaluates a competitor, they aren’t reading for general trivia. They are executing an internal, highly specialized mental diagnostic:
- **What is the real Value Proposition?** (What concrete promise are they selling within 5 seconds of attention?)
- **Who is the true target archetype?** (Is this built for individual contributors or enterprise procurement leads?)
- **What is their CTA conversion velocity?** (Are they pushing an instant self-serve sandbox or gating access behind an enterprise sales demo?)
- **Where are the trust anchors?** (Do they lean on logos, uptime metrics, or compliance badges?)
- **Where are the subtle UX friction points?** (Where is their terminology intimidating or their pricing structure hidden?)

If an AI tool was going to provide real leverage, it couldn't just summarize text.  
**It had to think like a Senior Product Designer conducting a deep competitive teardown.**

```
┌────────────────────────────────────────────────────────────────────────┐
│               THE 9-DIMENSION DESIGN INTELLIGENCE TAXONOMY             │
├────────────────────────────────┬───────────────────────────────────────┤
│ 🎯 Core Value Proposition      │ 👥 Likely Target Audience             │
│ ⚡ Call-to-Action Strategy     │ 🛡️ Trust Signals & Social Proof Density│
│ 📐 Information Hierarchy Flow  │ ✍️ UX Writing & Tone Observations     │
│ ⚠️ Potential Friction Points   │ ✨ Strategic Gaps & Design Opportunities│
├────────────────────────────────┴───────────────────────────────────────┤
│ 🧭 Product Designer Takeaway (Decoupled Editorial Executive Synthesis) │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Architectural Principle: "Separating the Eyes from the Brain"

The most common failure mode in AI engineering is architectural entanglement. If you ask an LLM to navigate the live web directly, it gets easily distracted by tracker scripts, cookie banners, messy DOM nodes, and megabytes of SVG bloat.

To build a lightning-fast, resilient engine, I applied a foundational systems principle: **separate semantic ingestion from structured reasoning.**

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│   THE EYES      │       │   THE BRAIN     │       │   THE CANVAS    │
│ (Semantic DOM)  │ ────▶ │ (Gemini 2.5)    │ ────▶ │ (React 19 SPA)  │
│ Headless Scraper│       │ Strict JSON     │       │ Kinetic Grid &  │
│ Strips Bloat    │       │ Schema Contract │       │ Diff Matrix     │
└─────────────────┘       └─────────────────┘       └─────────────────┘
```

### 1. The Eyes (Headless Semantic Scraper)
Before the language model ever touches a byte, the page passes through a headless extraction pipeline. It aggressively strips away tracking scripts, stylesheet declarations, navigation cookies, and image blobs—leaving only pure semantic Markdown: headings, paragraph hierarchy, button labels, and structural anchors.

### 2. The Brain (Gemini 2.5 Flash)
We supply Gemini with a strict design constitution. It is constrained to output strict, schema-validated JSON conforming to our 9-dimension intelligence taxonomy and 4 product specifications (`primary_segment`, `monetization_model`, `conversion_path`, `design_signature`). Zero hallucination. Zero conversational filler.

### 3. The Canvas (React 19 + Kinetic Design System)
The extracted data is rendered into an artisan-grade, high-density interface. Featuring JetBrains Mono typography for technical data, subtle hairline borders, and symmetrical 2-column card layouts, the workspace feels like a tactical cockpit rather than an administrative form.

---

## The Zero-Dollar Constraint: Zero Cloud Bills Required

When building side projects and developer tools, infrastructure cost is the number-one killer of momentum. Nobody wants a weekend tool that racks up $50/month in cloud database bills or demands complex Google Cloud Platform (GCP) billing setups just to test out.

I established an uncompromising invariant: **100% Free-Tier & Production-Ready.**

1. **Free Google AI Studio Tier (BYOK)**: Instead of requiring paid Vertex AI credits, live arbitrary URL analysis runs directly against Google AI Studio's free-tier API endpoints (15 RPM / 1M TPM).
2. **Client-Side Privacy Boundary**: User API keys are stored strictly in `localStorage` and dispatched directly over TLS from the client to Google's API. No middleman logging server. No data tracking.
3. **100 Curated Benchmarks Pre-Compiled**: To ensure visitors experience instant utility without touching an API key, I pre-compiled **100 verified, full-fidelity teardowns** directly into the client bundle with 0ms server latency.

---

## The 100-Benchmark Directory: 5 Balanced Verticals

To make the platform immediately valuable across different sectors, the 100 pre-compiled benchmarks are distributed with exact 20-product parity across 5 key software archetypes:

```text
⚡ DevTools & Infra (20):     Linear, Stripe, Vercel, Supabase, GitHub, Cloudflare, Docker, Postman, Sentry, Resend...
🎨 Productivity & Design (20): Notion, Figma, Raycast, Miro, Loom, Slack, Coda, Arc, Obsidian, Superhuman...
🤖 Frontier AI & ML (20):     OpenAI, Claude, Perplexity, Cursor, Midjourney, Hugging Face, ElevenLabs, Mistral...
💳 Fintech & B2B SaaS (20):   Ramp, Brex, Mercury, Plaid, Deel, Gusto, Intercom, Webflow, Square, Rippling...
🌍 Consumer & Commerce (20):   Airbnb, Spotify, Uber, Shopify, Netflix, Duolingo, Substack, DoorDash, Strava...
```

The directory is wrapped in an **auto-balancing responsive 6-column grid** (`.category-directory-grid`) with domain-specific color dots, instant category filtering, and quick search.

---

## The Breakthrough: The Side-by-Side Comparison Matrix

Once individual page deconstructions were working, I realized something critical was still missing.

In actual product reviews, you never examine a competitor in isolation. You evaluate them in comparison. You ask:
- *“How does Linear’s keyboard-first positioning contrast with Notion’s flexible Lego blocks?”*
- *“How does Stripe’s developer-first pricing model compare to Supabase’s open-source compute tiers?”*
- *“Where is the whitespace between OpenAI’s enterprise posture and Claude’s collaborative Artifacts canvas?”*

So I engineered the **Side-by-Side Comparison Matrix**:

```
┌──────────────────────┬──────────────────────┬──────────────────────┐
│ Criteria             │ ⚡ Linear            │ 💳 Stripe            │
├──────────────────────┼──────────────────────┼──────────────────────┤
│ Core Value Prop      │ Keyboard-first speed │ Global financial API │
│ Primary CTA          │ 'Start using Linear' │ 'Start now'          │
│ Friction Point       │ High visual density  │ Separated pricing    │
│ Trust Density        │ OpenAI, Ramp, Scale  │ $1T+ processed       │
│ Design Signature     │ Dark Glassmorphism   │ Mesh Gradients       │
└──────────────────────┴──────────────────────┴──────────────────────┘
```

With one click, you can pin 2 to 4 competitors side-by-side, spot strategic positioning gaps, and export the entire table directly into **Markdown** (for your PRD), **CSV** (for your financial models), **JSON**, or a **Printable PDF**.

---

## What Building This Taught Me About AI-Native Design

Building this engine reinforced a core thesis that will define the next decade of software:

> **AI is not here to replace human product taste. It is here to eradicate extraction slop.**

When we automate the mechanical, high-friction toil of our jobs—scraping websites, re-typing bullet points, formatting tables—we liberate our working memory for the work that truly moves the needle:
- Developing high-conviction product intuition.
- Empathizing with unspoken user anxieties.
- Spotting bold, non-obvious market opportunities.

---

## Try It Live in Production

The engine is live on Vercel and completely free to explore:

- 🚀 **Live Web Application:** [https://comp-landing-page-summarizer-nine.vercel.app](https://comp-landing-page-summarizer-nine.vercel.app)
- 📦 **GitHub Repository:** [https://github.com/fadlyzaki/comp-landing-page-summarizer-](https://github.com/fadlyzaki/comp-landing-page-summarizer-)
- 🎨 **Portfolio & Design Work:** [https://fadlyzaki-design.vercel.app/](https://fadlyzaki-design.vercel.app/)

Click through the 100 curated benchmarks, compare your favorite SaaS products, or drop in your own URL. I’d love to hear your feedback!
