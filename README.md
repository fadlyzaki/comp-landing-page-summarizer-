# The Benchmarking Engine: System Architecture v1.0

**Engineering Philosophy:** _"Unstructured competitor intelligence is noise. We do not just scrape pages; we engineer an agentic pipeline where algorithmic extraction meets structured design intelligence — converting public landing pages into actionable product benchmarking datasets. Signal over noise. Human by Design."_

Welcome to the source matrix of the **Competitor Landing Page Summarizer** — a production-grade, agentic AI system built with Google ADK and deployed on Google Cloud Run.

This repository is not a scraping script. It is a **full-stack, agentic intelligence pipeline** and a real-world proof-of-concept demonstrating the application of Model Context Protocol (MCP) and Agent Development Kit (ADK) for product design research. Engineered for Product and Engineering teams who need systematic, artifact-grade competitor intelligence — not ad-hoc browser screenshots.

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.11+-blue)
![Google ADK](https://img.shields.io/badge/Google%20ADK-1.0%2B-orange)
![Cloud Run](https://img.shields.io/badge/deployed-Cloud%20Run-4285F4?logo=googlecloud)

---

## 🏗 Architectural Topography & Core Infrastructure

A robust agentic system is measured by its tool composability, model governance, and extraction fidelity. The stack is a lean, purpose-built pipeline targeting zero hallucination on structured outputs and deterministic web data extraction.

- **The Intelligence Layer:** `Google ADK (Agent Development Kit)` — Orchestrates the agentic loop. The `competitor_summarizer` agent manages tool invocation, prompt engineering, and structured JSON output under a strict schema contract.
- **The Protocol Layer:** `MCP (Model Context Protocol)` — Decouples the AI agent from web-fetching logic via a `StdioConnectionParams` MCP server. The `load_web_page` tool is an isolated, independently testable microservice.
- **The Model:** `Gemini 2.0 Flash (via Vertex AI)` — High-throughput, low-latency inference. Selected for best-in-class structured output fidelity and native Google Cloud authentication.
- **The Scraper:** `requests + BeautifulSoup (lxml)` — Deterministic DOM extraction. Strips noise (scripts, styles, navbars) and returns a structured payload: title, headings, paragraphs, and CTAs.
- **The Frontend:** `React 19 + Vite 6 + TypeScript` — Type-safe interface with TailwindCSS 4. Framer Motion (`motion`) for kinetic polish. Lucide React for semantic iconography.
- **The Edge:** `Google Cloud Run` — Fully containerized, stateless, auto-scaling deployment for both frontend and backend. Zero infrastructure maintenance overhead.

---

## ⚡ System Signal Flow

```
Frontend (React 19 + Vite 6 + TypeScript)
  │
  ├─ POST /apps/{app}/users/{user}/sessions/{session}  → create session
  └─ POST /run                                         → submit URL prompt
        │
        ▼
ADK API Server  [ adk api_server ]
  │
  └─ Agent: competitor_summarizer
        │
        └─ MCPToolset  [ StdioConnectionParams ]
              │
              ▼
        MCP Server  [ load_web_page ]
              │
              └─ requests + BeautifulSoup (lxml)
                    │
                    ▼
              Structured DOM Payload
              (title, headings, paragraphs, CTAs)
                    │
                    ▼
        Gemini 2.0 Flash  →  Structured JSON Analysis
              │
              ▼
        Frontend renders benchmarking result cards
```

---

## 📂 System Topography

```
competitor-landing-page-summarizer/
├── LICENSE
├── README.md
├── PRESENTATION.md
├── frontend/                         ← View Layer
│   ├── Dockerfile
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── .env.example
│   └── src/
│       ├── main.tsx
│       ├── index.css
│       ├── App.tsx
│       └── lib/
│           └── utils.ts
└── backend/                          ← Intelligence + Protocol Layer
    ├── Dockerfile
    ├── requirements.txt
    ├── .env.example
    ├── mcp_server/
    │   ├── __init__.py
    │   └── server.py                 ← MCP tool: load_web_page
    └── agents/
        └── competitor_summarizer/
            ├── __init__.py
            └── agent.py              ← ADK agent with MCPToolset
```

**Layer breakdown:**

| Layer | Role |
|---|---|
| **View Layer** | React 19 frontend — URL input, streaming result cards, copy-to-JSON/Markdown |
| **Intelligence Layer** | ADK agent — agentic loop, tool orchestration, structured output enforcement |
| **Protocol Layer** | MCP server — isolated, stateless `load_web_page` tool |
| **Extraction Layer** | `requests` + `BeautifulSoup` — deterministic DOM scraping |
| **Model Layer** | Gemini 2.0 Flash via Vertex AI — structured JSON synthesis |
| **Infrastructure** | Google Cloud Run — containerized, stateless, auto-scaling |

---

## 🧬 Sub-Systems & Architectural Highlights

### 1. ADK Agentic Loop (`agents/competitor_summarizer/agent.py`)
The core intelligence unit. Wraps `MCPToolset` with `StdioConnectionParams` to spawn the MCP server as a subprocess. Enforces a strict JSON output schema via prompt engineering — guaranteeing parse-safe results for downstream UI rendering. No hallucinated structure; the schema is a hard contract.

### 2. MCP Extraction Tool (`mcp_server/server.py`)
Stateless, independently testable web-fetching microservice. Receives a URL, executes a `requests.get`, and applies a `BeautifulSoup` + `lxml` pipeline to strip noise and return a clean semantic DOM payload. Decoupled by design — swappable with any headless browser engine without touching the agent.

### 3. Session-Stateful Frontend (`frontend/src/App.tsx`)
React 19 component orchestrating ADK session lifecycle. Creates a user session on mount, streams the agent run via `/run`, and parses the streaming response into structured result cards. Type-safe via TypeScript throughout.

### 4. Containerized Deployment Protocol
Both services ship as independent Docker containers to Google Cloud Run. The backend runs the official `adk api_server` runtime — not a custom FastAPI wrapper. The frontend builds via Vite at image build-time and serves the static bundle via `vite preview`.

---

## 🚀 Deployment Protocol & CI/CD Pipeline

### Local Ignition

**Prerequisites:**
- **Node.js** ≥ 18
- **Python** ≥ 3.11
- **Google Cloud SDK** (for Vertex AI authentication)
- GCP project with **Vertex AI API** enabled

```bash
# 1. Backend — provision and ignite
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

cp .env.example .env
# Configure: GOOGLE_CLOUD_PROJECT, GOOGLE_CLOUD_LOCATION, GOOGLE_GENAI_USE_VERTEXAI

gcloud auth application-default login
adk api_server agents --port 8080

# 2. Frontend — provision and boot
cd frontend
npm install
npm run dev
# → http://localhost:3000
```

### Production Environment (Google Cloud Run)

```bash
# Backend
cd backend
gcloud run deploy competitor-summarizer-backend \
  --source . \
  --region us-central1 \
  --set-env-vars "GOOGLE_CLOUD_PROJECT=your-project-id,GOOGLE_CLOUD_LOCATION=us-central1,GOOGLE_GENAI_USE_VERTEXAI=True" \
  --allow-unauthenticated

# Frontend
cd frontend
gcloud run deploy competitor-summarizer-frontend \
  --source . \
  --region us-central1 \
  --set-env-vars "VITE_ADK_API_BASE_URL=https://your-backend-url.run.app" \
  --allow-unauthenticated
```

> **Infrastructure note:** The backend runs via `adk api_server agents` — the official ADK runtime. No custom server is required. CORS headers must be configured if frontend and backend are deployed to separate Cloud Run services.

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example |
|---|---|---|
| `GOOGLE_CLOUD_PROJECT` | GCP project ID | `my-project-123` |
| `GOOGLE_CLOUD_LOCATION` | GCP region | `us-central1` |
| `GOOGLE_GENAI_USE_VERTEXAI` | Enable Vertex AI backend | `True` |

### Frontend (`frontend/.env`)

| Variable | Description | Example |
|---|---|---|
| `VITE_ADK_API_BASE_URL` | Backend Cloud Run URL (empty = localhost) | `https://backend-xyz.run.app` |
| `VITE_ADK_APP_NAME` | Registered ADK agent name | `competitor_summarizer` |

---

## 🔬 Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite 6, TypeScript, TailwindCSS 4, Framer Motion |
| **Backend** | Google ADK ≥ 1.0, MCP ≥ 1.0, Python 3.11 |
| **AI Model** | Gemini 2.0 Flash (via Vertex AI) |
| **Scraping** | requests, BeautifulSoup4, lxml |
| **Hosting** | Google Cloud Run (frontend + backend) |
| **Containerization** | Docker |

---

## 📄 License

MIT License — see [LICENSE](./LICENSE) for full terms.

---

_Engineered by **Fadly Uzzaki**. A system is only as intelligent as the structure behind it. Architecture is survival. © 2025–2026. All Rights Reserved._
