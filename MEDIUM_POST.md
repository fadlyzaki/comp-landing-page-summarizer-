# I Had 24 Tabs Open Doing Competitor Research. So I Built an AI Agent to Do It for Me.

**A designer's weekend journey turning messy browser tabs into structured product intelligence with Gemini and zero cloud budget.**

*By Fadly Uzzaki*

---

It always starts the same way. 

You’re kicking off discovery for a new product feature, and you tell yourself: *“I’ll just quickly check out how Linear, Stripe, and Vercel frame their onboarding.”*

Two hours later, it’s 11:30 PM. You have 24 browser tabs open, your fan is whirring, and your Notion doc is a graveyard of half-copied headlines, fragmented bullet points, and blurry screenshots. You’re mentally exhausted, and you haven’t made a single actual design decision.

That night, staring at the chaotic tabs, a frustrating thought hit me:

> **Why am I spending 80% of my time doing manual data entry, and only 20% on actual design strategy?**

As a product designer, I care deeply about cognitive load. When you’re forced to manually parse dense marketing jargon just to extract what a company actually does, your working memory gets drained. The problem was never a lack of information. The problem was the complete absence of a structured system.

So that weekend, I opened VS Code and decided to build one.

---

## The Core Problem: Most AI Summarizers Are Useless to Designers

When I first thought about feeding landing pages to an LLM, I tried standard summarizers. They all gave back the same generic fluff:

> *“Stripe is a technology company that builds economic infrastructure for the internet...”*

That tells me nothing as a designer. 

When a designer or PM looks at a competitor, they aren't asking for an encyclopedia entry. They’re running a mental checklist:
- **What is the real Value Proposition?** (What promise are they selling in 5 seconds?)
- **Who are they actually targeting?** (Is this for indie devs or enterprise CFOs?)
- **What is their CTA conversion velocity?** (Are they pushing a free trial, a credit card upfront, or a sales call?)
- **Where are their trust anchors?** (Do they use customer logos, uptime stats, or compliance badges?)
- **What are their subtle UX friction points?** (Where is their microcopy confusing or intimidating?)

If I was going to build an AI tool, it couldn't just summarize. It had to think like a seasoned product designer doing deep competitive benchmarking.

---

## The Weekend Architecture: "Splitting the Brain from the Eyes"

The biggest trap when building with AI is tangling everything together. If you ask an LLM to browse the web directly, it gets easily distracted by cookie banners, CSS styles, tracker scripts, and popups.

To fix this, I used a principle I love: **separate the brain from the eyes.**

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│   The Eyes      │       │   The Brain     │       │   The Canvas    │
│  (Fast Scraper) │ ────▶ │ (Gemini 2.5)    │ ────▶ │ (React 19 UI)   │
│ Clean DOM text  │       │ UX taxonomy     │       │ Kinetic Matrix  │
└─────────────────┘       └─────────────────┘       └─────────────────┘
```

1. **The Eyes (The Scraper):** I built a lightweight extraction pipeline that aggressively strips away all the visual junk—no tracking pixels, no script tags, no SVG icons. It extracts only pure semantic content: the hero heading, subheadings, value paragraphs, and action button labels.
2. **The Brain (Gemini 2.5 Flash):** I gave Gemini a strict product-design constitution: *“Analyze this strictly across 9 design dimensions and output ONLY a structured JSON payload. Never hallucinate features not present in the DOM.”*
3. **The Canvas (React 19 + Motion):** I built a tactile, clean interface with JetBrains Mono typography, glassmorphic headers, and smooth micro-interactions that make competitive benchmarking feel like an artisan craft rather than a spreadsheet chore.

---

## The Zero-Dollar Constraint: Why It Needed to Be 100% Free

When building personal side projects, the biggest friction is infrastructure cost. Nobody wants a fun weekend tool that racks up $40/month in cloud infrastructure bills or requires complex Google Cloud billing accounts just to test out.

I made an intentional architectural decision: **Zero Cloud Billing Required.**

- **Free Google AI Studio Tier:** Instead of requiring paid Vertex AI credits, the system integrates directly with Google AI Studio's generous free-tier API keys. 
- **Pre-Loaded Live Demo Suite:** I didn’t want visitors to hit a login wall or an empty state. When you land on the app, 8 authentic, deeply-analyzed competitor benchmarks (**Linear, Stripe, Vercel, Supabase, Notion, Figma, Raycast, and Airbnb**) are already pre-loaded with instant 0-second latency.
- **Privacy-First (BYOK):** If you want to analyze any live website on the internet, you can paste your own free Gemini key in settings. It lives strictly inside your browser's `localStorage` and talks directly to Google’s API. No middleman server. No tracking.

---

## The Breakthrough: The Side-by-Side Comparison Matrix

Once the individual summaries were working, I realized something was still missing. 

In real product design reviews, you never look at a competitor in a silo. You look at them in comparison. You ask: *“How does Linear’s keyboard-first positioning compare to Notion’s all-in-one flexibility? How does Stripe’s developer-first pricing compare to Supabase’s open-source transparency?”*

So I added the **Side-by-Side Comparison Matrix**:

```
┌──────────────────────┬──────────────────────┬──────────────────────┐
│ Criteria             │ ⚡ Linear            │ 💳 Stripe            │
├──────────────────────┼──────────────────────┼──────────────────────┤
│ Core Value Prop      │ Keyboard-first speed │ Global financial API │
│ Primary CTA          │ 'Start using Linear' │ 'Start now'          │
│ Friction Point       │ High visual density  │ Separated pricing    │
│ Trust Density        │ OpenAI, Ramp, Scale  │ $1T+ processed       │
└──────────────────────┴──────────────────────┴──────────────────────┘
```

With one click, you can pin 2 to 4 competitors side-by-side, spot strategic positioning gaps, and export the entire table directly into Markdown (for your PRD) or CSV (for your spreadsheet).

---

## What Building This Taught Me About AI-Native Design

Building this side project reinforced a fundamental belief of mine:

**AI is not here to replace the designer’s intuition. It is here to eradicate extraction slop.**

When we automate the mechanical, high-friction parts of our job—scraping pages, organizing notes, formatting bullet points—we reclaim the headspace needed for the things that actually matter:
- Having high-conviction product taste.
- Understanding human emotional friction.
- Spotting non-obvious market opportunities.

---

## Try It Out (It's Live!)

I deployed the app on Vercel, and you can play with it right now:

👉 **Live Web App:** [https://comp-landing-page-summarizer-nine.vercel.app](https://comp-landing-page-summarizer-nine.vercel.app)  
👉 **Source Code:** [GitHub Repository](https://github.com/fadlyzaki/comp-landing-page-summarizer-)

Feel free to click through the live demos, compare your favorite SaaS tools, or drop in your own URL. 

I’d love to hear how you use it in your own design and product discovery workflows.

---

*Fadly Uzzaki is a product designer exploring the intersection of human intuition, cognitive ergonomics, and AI-native systems.*
