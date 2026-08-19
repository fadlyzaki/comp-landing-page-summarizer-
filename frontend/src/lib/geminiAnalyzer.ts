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
    // Fallback test on gemini-1.5-flash if 2.5-flash has specific region flags
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
      throw new Error(`Invalid API key or request error (${fallbackRes.status}): ${errText}`);
    }
    return true;
  }
  return true;
}

/**
 * Fetches page content using the free Jina Reader API or CORS fallback
 */
export async function fetchLiveWebPageContent(targetUrl: string): Promise<string> {
  const cleanUrl = targetUrl.trim();

  // Try Jina Reader free service (returns structured markdown directly, no key needed)
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
        return text.slice(0, 20000); // Truncate for optimal context window
      }
    }
  } catch (err) {
    console.warn("Jina Reader fetch failed, trying CORS proxy fallback...", err);
  }

  // Fallback 1: allorigins raw proxy
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

  // If both fail, return a fallback text prompt indicating we will analyze based on URL domain info
  return `Target URL: ${cleanUrl}. Note: direct scraping was blocked or rate-limited. Please analyze based on known public brand positioning, domain name, and standard landing page patterns for ${cleanUrl}.`;
}

function extractTextFromHtml(html: string): string {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Remove noise
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
You are an elite Senior Product Designer and Competitive Intelligence Architect performing in-depth landing page benchmarking.

Your task is to analyze the extracted webpage content and return a structured product-design analysis in strict JSON format.

JSON Structure:
{
  "url": "<the exact analyzed URL>",
  "product_brand": "<Product or company brand name>",
  "tagline": "<Hero tagline or primary headline, 1 concise sentence>",
  "category": "<Product category e.g. Fintech / Payments, Developer Cloud, etc.>",
  "logo_emoji": "<1 fitting emoji symbol for the brand>",
  "core_value_proposition": "<What the product promises and why it matters, 1-2 sentences>",
  "target_audience": "<Who this page is specifically designed to convert>",
  "cta_strategy": ["<Primary CTA>", "<Secondary CTA>", "<Tertiary/Discovery CTA>"],
  "information_hierarchy": "<Detailed breakdown of how content flows from top to bottom>",
  "trust_signals": ["<Signal 1 (e.g. customer logos)>", "<Signal 2 (e.g. metrics)>", "<Signal 3 (e.g. compliance/security)>"],
  "ux_writing_notes": "<Observations on tone, clarity, microcopy, and emotional resonance>",
  "friction_points": ["<Friction point 1>", "<Friction point 2>", "<Friction point 3>"],
  "design_opportunities": ["<Actionable design opportunity 1>", "<Opportunity 2>", "<Opportunity 3>"],
  "designer_summary": "<Opinionated, high-signal takeaway from a Senior Product Designer>",
  "scores": {
    "valuePropClarity": <number 70-100 based on how clearly the core value is communicated>,
    "conversionVelocity": <number 70-100 based on how friction-free the primary CTA path is>,
    "trustDensity": <number 70-100 based on volume and authority of social proof/metrics>,
    "frictionResistance": <number 70-100 based on how well the page minimizes cognitive overload>
  }
}

STRICT RULES:
- Output ONLY valid, parsable JSON. No markdown backticks, no markdown fences, no preamble, no commentary.
- Every array must contain between 2 and 5 specific, high-quality bullet points.
- Ground your analysis in the provided webpage text content.
- Be opinionated, actionable, and specific to THIS product. Avoid generic boilerplate.
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
    throw new Error("Gemini API key is required. Please add your free key in Settings.");
  }

  // 1. Fetch live page text
  const pageContent = await fetchLiveWebPageContent(targetUrl);

  const prompt = `Analyze this competitor landing page:\n\nURL: ${targetUrl}\n\nPAGE CONTENT EXTRACT:\n${pageContent}\n\nReturn ONLY the structured JSON response as instructed.`;

  // 2. Call Gemini API
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

  // Fallback to gemini-1.5-flash if model name differs
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
    throw new Error(`Gemini API error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error("Gemini produced an empty response. Please try again.");
  }

  // 3. Clean and parse JSON
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
    console.error("JSON parse error on text:", rawText);
    throw new Error(`Failed to parse AI output into JSON: ${err}`);
  }

  // Ensure default structure
  const result: AnalysisResult = {
    url: parsed.url || targetUrl,
    product_brand: parsed.product_brand || "Analyzed Competitor",
    tagline: parsed.tagline || "",
    category: parsed.category || "Web Application",
    logo_emoji: parsed.logo_emoji || "🌐",
    core_value_proposition: parsed.core_value_proposition || "Value proposition extracted from page content.",
    target_audience: parsed.target_audience || "Modern digital consumers and professionals.",
    cta_strategy: Array.isArray(parsed.cta_strategy) ? parsed.cta_strategy : [String(parsed.cta_strategy || "Get Started")],
    information_hierarchy: parsed.information_hierarchy || "Structured hero to footer workflow.",
    trust_signals: Array.isArray(parsed.trust_signals) ? parsed.trust_signals : [String(parsed.trust_signals || "Brand credibility markers")],
    ux_writing_notes: parsed.ux_writing_notes || "Professional, direct copywriting.",
    friction_points: Array.isArray(parsed.friction_points) ? parsed.friction_points : [String(parsed.friction_points || "Initial discovery curve")],
    design_opportunities: Array.isArray(parsed.design_opportunities) ? parsed.design_opportunities : [String(parsed.design_opportunities || "Optimize onboarding flow")],
    designer_summary: parsed.designer_summary || "Insightful competitive breakdown.",
    scores: parsed.scores || {
      valuePropClarity: 90,
      conversionVelocity: 88,
      trustDensity: 89,
      frictionResistance: 87,
    },
    analyzed_at: new Date().toISOString().split("T")[0] + " (Live AI Analysis)",
    is_live_demo: false,
  };

  return result;
}
