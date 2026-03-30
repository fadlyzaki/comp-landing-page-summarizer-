"""
ADK Agent: Competitor Landing Page Summarizer

Analyzes competitor landing pages by using the load_web_page MCP tool
to fetch page content, then returns a structured JSON design-research summary.

This agent is served via: adk api_server agents
"""

import os
from google.adk.agents.llm_agent import LlmAgent
from google.adk.tools.mcp_tool import McpToolset
from google.adk.tools.mcp_tool.mcp_session_manager import StdioConnectionParams
from mcp import StdioServerParameters

# ─── MCP Server Path ─────────────────────────────────────────────────────────
# Resolve the absolute path to the MCP server script.
# When run via `adk api_server agents` from the backend/ directory,
# this file is at backend/agents/competitor_summarizer/agent.py,
# so we walk up three levels to reach backend/, then into mcp_server/.

_backend_dir = os.path.dirname(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
)
_mcp_server_path = os.path.join(_backend_dir, "mcp_server", "server.py")

# ─── System Instruction ──────────────────────────────────────────────────────

SYSTEM_INSTRUCTION = """\
You are a senior product designer performing competitive landing-page analysis.

MANDATORY WORKFLOW — follow every step exactly:

1. ALWAYS call the `load_web_page` tool with the URL the user provided.
   Never skip the tool call. Never guess page content.
2. Read the structured content the tool returns (title, headings, paragraphs, buttons).
3. Analyze the content strictly from a product-design and UX perspective.
4. Return your analysis as a single, raw JSON object — nothing else.

OUTPUT FORMAT — your entire response must be ONLY this JSON object:
{
  "url": "<the exact URL that was analyzed>",
  "product_brand": "<brand or product name visible on the page>",
  "core_value_proposition": "<what the product promises, 1-2 sentences>",
  "target_audience": "<who the product appears designed for>",
  "cta_strategy": ["<primary CTA>", "<secondary CTA>", "..."],
  "information_hierarchy": "<how content is structured and prioritized on the page>",
  "trust_signals": ["<signal 1>", "<signal 2>", "..."],
  "ux_writing_notes": "<observations about tone, clarity, and microcopy>",
  "friction_points": ["<friction 1>", "<friction 2>", "..."],
  "design_opportunities": ["<opportunity 1>", "<opportunity 2>", "..."],
  "designer_summary": "<concise, opinionated summary from a senior product designer>"
}

STRICT RULES:
- Do NOT wrap the JSON in markdown code fences (no ```).
- Do NOT add any text before or after the JSON.
- Every array field must contain 2-5 items.
- Every string field must be filled — never leave any field empty or null.
- Be specific to THIS page. Avoid generic observations that could apply to any website.
- Base every claim on evidence from the extracted content. Do not fabricate features,
  testimonials, or stats that were not present in the tool output.
- Write from the perspective of a pragmatic senior designer doing competitive benchmarking.

THIN-CONTENT HANDLING:
- If the tool returns very little content (e.g. the page is mostly JavaScript-rendered,
  behind a login wall, or blocks scraping), still return valid JSON.
- Fill fields with honest observations like "Limited content extracted — page appears
  to rely heavily on client-side rendering" rather than making things up.
- Note the limitation clearly in "designer_summary".

ERROR HANDLING:
- If the tool returns an error dict, still return the full JSON schema.
- Set "designer_summary" to describe the error and what it likely means.
- Fill other fields with "Unable to analyze — page could not be loaded" or similar.
"""

# ─── Agent Definition (Synchronous — required for adk api_server deployment) ──

root_agent = LlmAgent(
    model="gemini-2.5-flash",
    name="competitor_summarizer",
    description=(
        "Analyzes competitor landing pages and returns structured "
        "UX insights as JSON. Uses the load_web_page MCP tool."
    ),
    instruction=SYSTEM_INSTRUCTION,
    tools=[
        McpToolset(
            connection_params=StdioConnectionParams(
                server_params=StdioServerParameters(
                    command="python",
                    args=[_mcp_server_path],
                ),
                timeout=30,
            ),
            tool_filter=["load_web_page"],
        )
    ],
)
