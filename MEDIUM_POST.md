# Engineering the Signal: Building an Agentic Competitor Landing Page Summarizer

**[PRIVATE & CONFIDENTIAL]**
*Moving from noisy browser tabs to structured design insights using Google ADK, MCP, and Gemini.*

As a product designer, one of the most tedious parts of early-stage discovery is competitive benchmarking. You open a dozen tabs, manually scan through landing pages, take fragmented notes, and then spend hours converting those observations into structured documents. 

It’s a highly repetitive, inconsistent process. The problem isn't a lack of information—it’s the lack of a system to transform public web pages into **structured, design-relevant insights**. Unstructured competitor intelligence is just noise.

To solve this, I built the **Competitor Landing Page Summarizer**. At its core, it's a web application where you simply paste a competitor's URL, and an AI agent instantly reads the page to generate a structured, highly-visual breakdown of their value proposition, target audience, call-to-action strategy, and design friction points. Under the hood, it's a full-stack, agentic intelligence pipeline that acts as a structured extraction engine for product design research. 

Here is a look under the hood at how I engineered it using Google’s Agent Development Kit (ADK) and the Model Context Protocol (MCP).

---

## 🏗 The Architecture & Stack

A robust agentic system is measured by its tool composability, model governance, and extraction fidelity. I wanted zero hallucination on structured outputs and deterministic web data extraction.

The resulting stack is lean and purpose-built:
- **The Intelligence Layer:** `Google ADK` orchestrates the agentic loop.
- **The Protocol Layer:** `MCP (Model Context Protocol)` decouples the AI agent from web-fetching logic.
- **The Model:** `Gemini 2.5 Flash` (via Vertex AI) for high-throughput, structured inference.
- **The Scraper:** `requests` + `BeautifulSoup (lxml)` for deterministic DOM extraction.
- **The Frontend:** React 19 + Vite 6 + TypeScript with TailwindCSS and Framer Motion for kinetic polish.
- **The Edge:** `Google Cloud Run` for containerized, stateless, auto-scaling deployment.

---

## ⚡ The Secret Sauce: ADK + MCP Integration

At the core of the system is the interplay between Google ADK and MCP. The backend runs through the official ADK runtime (`adk api_server`) and hosts a dedicated `LlmAgent` named `competitor_summarizer`.

Instead of baking the web-scraping logic directly into the agent, I used MCP as the tool integration layer. I built a custom FastMCP server that exposes a webpage-loading tool (`load_web_page`). The ADK agent acts as an MCP client (using `McpToolset` with `StdioConnectionParams`), discovering and invoking the tool via stdio transport.

**The Signal Flow:**
1. **User Input:** A user pastes a competitor URL into the React frontend.
2. **Session Creation:** The frontend communicates with the ADK API Server to create a session.
3. **Agent Invocation:** The ADK agent (`competitor_summarizer` running Gemini) is invoked.
4. **Tool Execution:** The agent calls the MCP `load_web_page` tool. The tool fetches the page, strips out the noise (scripts, styles, SVGs), and returns a clean, semantic DOM payload (title, headings, paragraphs, buttons).
5. **Structured Synthesis:** The agent analyzes the content against product-design criteria and returns a strict JSON schema.

---

## 🎯 Not Just Another Summarizer

Most webpage summarizers are generic or optimized for SEO. This system is different because it is explicitly engineered for a **product designer's perspective**. 

The agent’s system instruction enforces analysis through UX-specific lenses. When you feed it a URL, you don't just get a summary. You get a structured JSON response containing:
- **Core Value Proposition**
- **Likely Target Audience**
- **Call-to-Action Strategy**
- **Trust Signals**
- **Information Hierarchy**
- **UX Writing Observations**
- **Friction Points & Design Opportunities**

The frontend then renders these insights into a clean, animated card-based interface with one-click export to JSON or Markdown. 

---

## 🚀 Deployment on the Edge

To ensure zero infrastructure maintenance overhead, both the frontend and backend are fully containerized using Docker and deployed to **Google Cloud Run**. 

The backend runs the official `adk api_server` runtime without needing a custom FastAPI wrapper, while the frontend is built at image build-time and served via Vite preview. This allows the system to auto-scale seamlessly while leveraging native Google Cloud authentication for Vertex AI.

---

## 💡 Final Thoughts

By combining Google ADK's reasoning capabilities with MCP's decoupled tool integration, we can build tools that do more than just chat. We can build intelligent pipelines that turn unstructured noise into artifact-grade intelligence. 

*A system is only as intelligent as the structure behind it. Architecture is survival.*
