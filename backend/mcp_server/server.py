"""
MCP Server: load_web_page tool

A Model Context Protocol server that exposes a single tool for fetching
and extracting structured content from public web pages. Designed to be
consumed by an ADK agent via StdioConnectionParams.

Usage:
    python mcp_server/server.py
"""

import json
import logging

import requests
from bs4 import BeautifulSoup
from mcp.server.fastmcp import FastMCP

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ─── MCP Server Instance ─────────────────────────────────────────────────────

mcp = FastMCP("web_loader")

# ─── Constants ────────────────────────────────────────────────────────────────

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    ),
    "Accept": (
        "text/html,application/xhtml+xml,application/xml;"
        "q=0.9,image/avif,image/webp,*/*;q=0.8"
    ),
    "Accept-Language": "en-US,en;q=0.5",
}

NOISY_TAGS = [
    "script", "style", "noscript", "svg",
    "img", "video", "iframe",
]

MAX_CONTENT_LENGTH = 15_000  # Keep output concise for model context


# ─── Tool Definition ─────────────────────────────────────────────────────────

@mcp.tool()
def load_web_page(url: str) -> dict:
    """Fetch a public web page and extract its structured text content.

    Removes noisy elements (scripts, styles, images, iframes) and
    returns the page title, headings, paragraph text, and button/link labels.

    Args:
        url: The full URL of the web page to load (must start with http).

    Returns:
        A dict with keys: title, headings, paragraphs, buttons.
        On error, returns a dict with an 'error' key.
    """
    logger.info(f"Fetching URL: {url}")

    try:
        response = requests.get(url, headers=HEADERS, timeout=20)
        response.raise_for_status()
    except requests.RequestException as e:
        logger.error(f"Failed to fetch {url}: {e}")
        return {
            "error": f"Failed to fetch the page: {str(e)}",
            "title": "",
            "headings": [],
            "paragraphs": [],
            "buttons": [],
        }

    soup = BeautifulSoup(response.text, "lxml")

    # Remove noisy elements
    for tag_name in NOISY_TAGS:
        for tag in soup.find_all(tag_name):
            tag.decompose()

    # Extract structured content
    title = ""
    if soup.title and soup.title.string:
        title = soup.title.string.strip()

    headings = [
        h.get_text(strip=True)
        for h in soup.find_all(["h1", "h2", "h3"])
        if h.get_text(strip=True)
    ]

    paragraphs = [
        p.get_text(strip=True)
        for p in soup.find_all("p")
        if p.get_text(strip=True)
    ]

    buttons = [
        el.get_text(strip=True)
        for el in soup.find_all(["a", "button"])
        if el.get_text(strip=True)
    ]

    # Build result with truncation limits
    result = {
        "title": title,
        "headings": headings[:50],
        "paragraphs": paragraphs[:80],
        "buttons": buttons[:40],
    }

    # Safety truncation — re-check after serialization
    serialized = json.dumps(result, ensure_ascii=False)
    if len(serialized) > MAX_CONTENT_LENGTH:
        result["paragraphs"] = result["paragraphs"][:30]
        result["buttons"] = result["buttons"][:15]

    logger.info(
        f"Extracted content from {url}: "
        f"{len(headings)} headings, {len(paragraphs)} paragraphs, "
        f"{len(buttons)} buttons"
    )

    return result


# ─── Entry Point ──────────────────────────────────────────────────────────────

if __name__ == "__main__":
    mcp.run(transport="stdio")
