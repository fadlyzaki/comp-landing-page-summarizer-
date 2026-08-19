# Engineering the Signal: Building an Agentic Competitor Landing Page Summarizer

**[PRIVATE & CONFIDENTIAL]**
*Moving from noisy browser tabs to structured design insights using Google ADK, MCP, and Gemini 2.5 Flash.*

As a product designer, one of the most tedious parts of early-stage discovery is competitive benchmarking. You open a dozen tabs, manually scan through landing pages, take fragmented notes, and then spend hours converting those observations into structured documents. 

It’s a highly repetitive, inconsistent process. The problem isn't a lack of information—it’s the lack of a system to transform public web pages into **structured, design-relevant insights**. Unstructured competitor intelligence is just noise.

To solve this, I built the **Competitor Landing Page Summarizer**. At its core, it's a web application where you simply paste a competitor's URL, and an AI agent instantly reads the page to generate a structured, highly-visual breakdown of their value proposition, target audience, call-to-action strategy, trust signals, and design friction points. Under the hood, it's a full-stack, agentic intelligence pipeline that acts as a structured extraction engine for product design research.

---

## 🏗 The Architecture & Stack

A robust agentic system is measured by its tool composability, model governance, zero-cost accessibility, and extraction fidelity. I wanted zero hallucination on structured outputs, instant interactive demonstrations, and deterministic web data extraction.

The resulting stack is lean, modern, and production-ready:
- **The Intelligence Layer:** `Google ADK` + `Google Gemini 2.5 Flash` (with 100% Free-Tier Google AI Studio support and zero GCP billing requirements).
- **The Protocol Layer:** `MCP (Model Context Protocol)` decouples the AI agent from web-fetching logic.
- **The Scraper:** `requests` + `BeautifulSoup (lxml)` for backend MCP, paired with high-performance `Jina Reader` (`r.jina.ai`) for client-side live extraction.
- **The Benchmark Engine:** 8 pre-loaded live competitor datasets (**Linear, Stripe, Vercel, Supabase, Notion, Figma, Raycast, Airbnb**) for instant zero-latency benchmarking.
- **The Frontend:** React 19 + Vite 6 + TypeScript with TailwindCSS, Lucide icons, and Motion React for kinetic polish.
- **Comparison & Scoring:** Side-by-Side Competitor Comparison Matrix and 4-point UX Health Signal Scorecard.

---

## ⚡ The Secret Sauce: Flexible Multi-Engine Architecture

The platform operates on three flexible execution modes to ensure zero-barrier usability:

1. **Curated Live Demo Suite (Instant & 100% Free):**
   - 8 authentic, deeply-researched live benchmarks available on load.
   - Includes side-by-side comparative teardowns, UX scores, and visual hierarchy breakdowns.

2. **Free Live AI Engine (Zero GCP Credits Needed):**
   - Anyone can input any live public URL using a free Google AI Studio API key.
   - Clean DOM & semantic content is fetched on-the-fly and processed through Gemini 2.5 Flash with strict JSON schema enforcement.

3. **Google ADK + MCP Pipeline:**
   - The backend runs through the official ADK runtime (`adk api_server`) hosting an `LlmAgent` called `competitor_summarizer`.
   - The agent acts as an MCP client using `McpToolset` with `StdioConnectionParams` to invoke the decoupled `load_web_page` FastMCP server.

---

## 🎯 Not Just Another Summarizer: Artifact-Grade Insights

Most webpage summarizers are generic or optimized for SEO. This system is different because it is explicitly engineered for a **product designer's perspective**. 

When analyzing a page, it structures insights across 9 key design dimensions:
- **Core Value Proposition** (1-2 sentences on what is promised)
- **Likely Target Audience** (Specific segment targeted)
- **Call-to-Action Strategy** (Primary, secondary, and discovery paths)
- **Trust Signals & Social Proof** (Proof density, logos, metrics, certifications)
- **Information Hierarchy** (Top-to-bottom cognitive flow)
- **UX Writing Observations** (Tone, microcopy, and emotional resonance)
- **Potential Friction Points** (Cognitive overload, ambiguous copy, hidden pricing)
- **Design Opportunities & Winning Angles** (Actionable gaps for competitors to win)
- **Senior Designer Executive Takeaway** (Opinionated summary)

---

## 📊 Live Comparison & Multi-Format Export

Designers rarely evaluate a competitor in isolation. The application features:
- **Side-by-Side Comparison Matrix:** Compare 2 to 4 competitors simultaneously in a synchronized table.
- **UX Health & Signal Scorecard:** 4-point rating metrics (Value Prop Clarity, Conversion Velocity, Trust Density, Friction Resistance).
- **Multi-Format Export:** 1-click export to **Markdown** (PRD/Notion format), **JSON**, **CSV spreadsheet**, and **Printable PDF report**.

---

## 💡 Final Thoughts

By combining Google ADK's reasoning capabilities with MCP's decoupled tool integration and free-tier Gemini availability, we can build tools that do more than just chat. We can build intelligent pipelines that turn unstructured noise into artifact-grade intelligence. 

*A system is only as intelligent as the structure behind it. Architecture is survival.*
