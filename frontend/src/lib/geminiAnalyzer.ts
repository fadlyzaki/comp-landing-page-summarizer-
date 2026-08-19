/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnalysisResult } from "./liveDemos";

const STORAGE_KEY = "COMP_SUMMARIZER_GEMINI_KEY";

export function getStoredGeminiKey(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && stored.trim()) return stored.trim();
  } catch {
    // localStorage not accessible
  }
  return (import.meta as any).env?.VITE_GEMINI_API_KEY || "";
}

export function setStoredGeminiKey(key: string): void {
  try {
    if (!key || !key.trim()) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, key.trim());
    }
  } catch {
    // localStorage not accessible
  }
}

/**
 * Test a Gemini API key with a lightweight ping
 */
export async function testGeminiApiKey(apiKey: string): Promise<boolean> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey.trim()}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: "Respond with only the word OK" }] }],
      generationConfig: { maxOutputTokens: 10 },
    }),
  });

  if (!res.ok) {
    const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`;
    const fallbackRes = await fetch(fallbackUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "Respond with only the word OK" }] }],
        generationConfig: { maxOutputTokens: 10 },
      }),
    });
    if (!fallbackRes.ok) {
      const errText = await fallbackRes.text().catch(() => "");
      throw new Error(`API key verification failed (${fallbackRes.status}): ${errText}`);
    }
    return true;
  }
  return true;
}

/**
 * Fetches page content using Jina Reader or CORS fallback
 */
export async function fetchLiveWebPageContent(targetUrl: string): Promise<string> {
  const cleanUrl = targetUrl.trim();

  // Try Jina Reader
  try {
    const jinaUrl = `https://r.jina.ai/${cleanUrl}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const res = await fetch(jinaUrl, {
      signal: controller.signal,
      headers: {
        "Accept": "text/plain, text/markdown",
        "X-Return-Format": "markdown",
      },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const text = await res.text();
      if (text && text.trim().length > 100) {
        return text.slice(0, 20000);
      }
    }
  } catch (err) {
    console.warn("Direct Jina fetch failed, attempting fallback...", err);
  }

  // Fallback: allorigins proxy
  try {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(cleanUrl)}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(proxyUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const html = await res.text();
      const cleanText = extractTextFromHtml(html);
      if (cleanText.length > 100) {
        return cleanText.slice(0, 20000);
      }
    }
  } catch (err) {
    console.warn("Proxy fetch failed:", err);
  }

  return `Target URL: ${cleanUrl}. Direct page fetch was limited. Please analyze based on public brand presence and standard product design patterns for ${cleanUrl}.`;
}

function extractTextFromHtml(html: string): string {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const noisySelectors = ["script", "style", "noscript", "svg", "iframe", "nav", "footer"];
    noisySelectors.forEach((sel) => {
      doc.querySelectorAll(sel).forEach((el) => el.remove());
    });

    const title = doc.title || "";
    const headings = Array.from(doc.querySelectorAll("h1, h2, h3"))
      .map((h) => h.textContent?.trim())
      .filter(Boolean)
      .join("\n");
    const paragraphs = Array.from(doc.querySelectorAll("p"))
      .map((p) => p.textContent?.trim())
      .filter(Boolean)
      .slice(0, 30)
      .join("\n");
    const buttons = Array.from(doc.querySelectorAll("button, a"))
      .map((b) => b.textContent?.trim())
      .filter((t) => t && t.length > 2 && t.length < 50)
      .slice(0, 20)
      .join(" | ");

    return `# ${title}\n\n## Headings\n${headings}\n\n## Paragraphs\n${paragraphs}\n\n## CTAs & Buttons\n${buttons}`;
  } catch {
    return html.replace(/<[^>]*>?/gm, " ").slice(0, 10000);
  }
}

const SYSTEM_PROMPT = `\
You are an experienced Senior Product Designer and UX Researcher performing competitor landing page benchmarking.

Your task is to analyze the extracted webpage content and return a structured product-design analysis in strict JSON format.

JSON Schema:
{
  "url": "<exact analyzed URL>",
  "product_brand": "<brand or product name>",
  "tagline": "<hero tagline or headline, 1 sentence>",
  "category": "<product category, e.g. Developer Tools, Fintech, Workflow Automation>",
  "core_value_proposition": "<what the product promises, 1-2 clear sentences>",
  "target_audience": "<who the page is designed for>",
  "cta_strategy": ["<Primary CTA>", "<Secondary CTA>", "<Discovery path CTA>"],
  "information_hierarchy": "<flow and priority of content on the page>",
  "trust_signals": ["<Signal 1 (logos/case studies)>", "<Signal 2 (metrics/uptime)>", "<Signal 3 (compliance/security)>"],
  "ux_writing_notes": "<observations on tone, clarity, and microcopy>",
  "friction_points": ["<Friction point 1>", "<Friction point 2>", "<Friction point 3>"],
  "design_opportunities": ["<Design opportunity 1>", "<Opportunity 2>", "<Opportunity 3>"],
  "designer_summary": "<opinionated, actionable summary from a senior product designer>",
  "specs": {
    "primary_segment": "<e.g. Early-stage Engineering Teams>",
    "monetization_model": "<e.g. Freemium / Per-Seat SaaS>",
    "conversion_path": "<e.g. Self-serve Instant Signup>",
    "design_signature": "<e.g. Dark Mode / Keyboard Shortcuts>"
  }
}

STRICT RULES:
- Return ONLY the raw JSON object. Do NOT wrap in markdown fences (no \`\`\`json).
- Every array must contain between 2 and 4 specific, actionable items.
- Ground your analysis strictly in the provided text. Avoid generic boilerplate.
`;

/**
 * Runs free live Gemini AI analysis on the target URL
 */
export async function analyzeWithGeminiFree(
  targetUrl: string,
  apiKey: string
): Promise<AnalysisResult> {
  const cleanKey = apiKey.trim();
  if (!cleanKey) {
    throw new Error("Gemini API key is required. Please configure your key in Settings.");
  }

  const pageContent = await fetchLiveWebPageContent(targetUrl);
  const prompt = `Analyze this competitor landing page:\n\nURL: ${targetUrl}\n\nPAGE CONTENT EXTRACT:\n${pageContent}\n\nReturn ONLY the structured JSON response.`;

  const model = "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${cleanKey}`;

  let res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    }),
  });

  if (!res.ok) {
    const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${cleanKey}`;
    res = await fetch(fallbackUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      }),
    });
  }

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Gemini API request failed (${res.status}): ${errText}`);
  }

  const data = await res.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error("The model produced an empty response. Please try again.");
  }

  let cleaned = rawText.trim()
    .replace(/^```(?:json)?\s*\n?/i, "")
    .replace(/\n?```\s*$/i, "")
    .trim();

  if (!cleaned.startsWith("{")) {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start !== -1 && end > start) {
      cleaned = cleaned.substring(start, end + 1);
    }
  }

  let parsed: any;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    console.error("JSON parse error:", rawText);
    throw new Error(`Could not parse analysis output as JSON: ${err}`);
  }

  const result: AnalysisResult = {
    url: parsed.url || targetUrl,
    product_brand: parsed.product_brand || "Analyzed Product",
    tagline: parsed.tagline || "",
    category: parsed.category || "Web Application",
    core_value_proposition: parsed.core_value_proposition || "Extracted value proposition.",
    target_audience: parsed.target_audience || "Target users and teams.",
    cta_strategy: Array.isArray(parsed.cta_strategy) ? parsed.cta_strategy : [String(parsed.cta_strategy || "Get Started")],
    information_hierarchy: parsed.information_hierarchy || "Structured content flow.",
    trust_signals: Array.isArray(parsed.trust_signals) ? parsed.trust_signals : [String(parsed.trust_signals || "Social proof markers")],
    ux_writing_notes: parsed.ux_writing_notes || "Copywriting observations.",
    friction_points: Array.isArray(parsed.friction_points) ? parsed.friction_points : [String(parsed.friction_points || "Initial learning curve")],
    design_opportunities: Array.isArray(parsed.design_opportunities) ? parsed.design_opportunities : [String(parsed.design_opportunities || "Optimize conversion path")],
    designer_summary: parsed.designer_summary || "Competitive design summary.",
    specs: parsed.specs || {
      primary_segment: "Digital Teams",
      monetization_model: "SaaS",
      conversion_path: "Self-Serve Signup",
      design_signature: "Modern Web",
    },
    analyzed_at: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
    is_live_demo: false,
  };

  return result;
}
