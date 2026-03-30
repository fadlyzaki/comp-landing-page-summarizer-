# Competitor Landing Page Summarizer

An internal design research tool that analyzes competitor landing pages and extracts structured UX insights. Built by a designer who codes.

> "I don't chase chaos — I contain it."

## Architecture

```
Frontend (React + Vite + TypeScript)
  │
  ├─ POST /apps/{app}/users/{user}/sessions/{session}   → create session
  └─ POST /run                                           → run agent
        │
        ▼
ADK API Server (adk api_server)
  │
  └─ ADK Agent: competitor_summarizer
        │
        └─ MCPToolset (StdioConnectionParams)
              │
              ▼
        MCP Server: load_web_page tool
              │
              └─ requests + BeautifulSoup
                    │
                    ▼
              Structured page content
                    │
                    ▼
        Agent returns JSON analysis
              │
              ▼
        Frontend renders result cards
```

## Project Structure

```
competitor-landing-page-summarizer/
├── README.md
├── frontend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── index.html
│   ├── .env.example
│   ├── Dockerfile
│   └── src/
│       ├── main.tsx
│       ├── index.css
│       ├── App.tsx
│       └── lib/
│           └── utils.ts
└── backend/
    ├── requirements.txt
    ├── .env.example
    ├── Dockerfile
    ├── mcp_server/
    │   ├── __init__.py
    │   └── server.py          ← MCP tool: load_web_page
    └── agents/
        └── competitor_summarizer/
            ├── __init__.py
            └── agent.py       ← ADK agent with MCPToolset
```

## How It Works

1. The **frontend** sends the user's URL to the **ADK API Server** via standard ADK endpoints.
2. The **ADK Agent** receives the message and calls the `load_web_page` MCP tool.
3. The **MCP Server** fetches the page using `requests`, strips noisy elements with BeautifulSoup, and returns structured content (title, headings, paragraphs, buttons).
4. The agent analyzes the content and returns a structured JSON design-research summary.
5. The frontend parses the JSON and renders it as result cards.

## Local Development

### Prerequisites

- **Node.js** ≥ 18
- **Python** ≥ 3.11
- **Google Cloud SDK** (for Vertex AI authentication)
- A Google Cloud project with Vertex AI enabled

### 1. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your Google Cloud project details:
#   GOOGLE_CLOUD_PROJECT=your-project-id
#   GOOGLE_CLOUD_LOCATION=us-central1
#   GOOGLE_GENAI_USE_VERTEXAI=True

# Authenticate with Google Cloud
gcloud auth application-default login

# Start the ADK API Server
adk api_server agents --port 8080
```

The backend will be available at `http://localhost:8080`.

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start dev server (proxies /apps and /run to localhost:8080)
npm run dev
```

The frontend will be available at `http://localhost:3000`.

### 3. Use the App

1. Open `http://localhost:3000`
2. Paste a competitor landing page URL
3. Click **Analyze Page**
4. View the structured design-research analysis
5. Copy results as JSON or Markdown

## Environment Variables

### Backend (`backend/.env`)

| Variable                  | Description                     | Example          |
| ------------------------- | ------------------------------- | ---------------- |
| `GOOGLE_CLOUD_PROJECT`    | Your GCP project ID             | `my-project-123` |
| `GOOGLE_CLOUD_LOCATION`   | GCP region                      | `us-central1`    |
| `GOOGLE_GENAI_USE_VERTEXAI` | Enable Vertex AI              | `True`           |

### Frontend (`frontend/.env`)

| Variable                  | Description                            | Example                             |
| ------------------------- | -------------------------------------- | ----------------------------------- |
| `VITE_ADK_API_BASE_URL`   | Backend URL (empty for local dev)      | `https://backend-xyz.run.app`       |
| `VITE_ADK_APP_NAME`       | Agent name                             | `competitor_summarizer`             |

## Deployment to Google Cloud Run

### Backend

```bash
cd backend

# Build and deploy
gcloud run deploy competitor-summarizer-backend \
  --source . \
  --region us-central1 \
  --set-env-vars "GOOGLE_CLOUD_PROJECT=your-project-id,GOOGLE_CLOUD_LOCATION=us-central1,GOOGLE_GENAI_USE_VERTEXAI=True" \
  --allow-unauthenticated
```

### Frontend

```bash
cd frontend

# Build with the backend URL
docker build \
  --build-arg VITE_ADK_API_BASE_URL=https://your-backend-url.run.app \
  -t competitor-summarizer-frontend .

# Push to Artifact Registry and deploy
gcloud run deploy competitor-summarizer-frontend \
  --source . \
  --region us-central1 \
  --set-env-vars "PORT=4173" \
  --allow-unauthenticated
```

### Notes

- The backend runs via `adk api_server agents` — it is the official ADK runtime, not a custom server.
- The frontend Dockerfile builds the Vite app at build time and serves it with `vite preview`.
- For production, consider using a proper static server (nginx) instead of `vite preview`.
- CORS may need to be configured if frontend and backend are on different domains.

## Technology

| Layer     | Tech                                              |
| --------- | ------------------------------------------------- |
| Frontend  | React 19, Vite 6, TypeScript, TailwindCSS 4       |
| Backend   | Google ADK, MCP, Python 3.11                       |
| AI Model  | Gemini 2.0 Flash (via Vertex AI)                   |
| Scraping  | requests, BeautifulSoup, lxml                      |
| Hosting   | Google Cloud Run                                   |
