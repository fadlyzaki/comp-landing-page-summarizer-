/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Loader2, ArrowRight, Copy, Check, Link as LinkIcon, AlertCircle, Sparkles, Braces } from "lucide-react";
import { cn } from "./lib/utils";
import { motion, AnimatePresence } from "motion/react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface AnalysisResult {
  url: string;
  product_brand: string;
  core_value_proposition: string;
  target_audience: string;
  cta_strategy: string[] | string;
  information_hierarchy: string;
  trust_signals: string[] | string;
  ux_writing_notes: string;
  friction_points: string[] | string;
  design_opportunities: string[] | string;
  designer_summary: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const ADK_BASE_URL = (import.meta as any).env?.VITE_ADK_API_BASE_URL || "";
const ADK_APP_NAME = (import.meta as any).env?.VITE_ADK_APP_NAME || "competitor_summarizer";

const EXAMPLES = [
  "https://linear.app",
  "https://stripe.com",
  "https://vercel.com",
];

const RESULT_SECTIONS: { key: keyof AnalysisResult; label: string; tag: string }[] = [
  { key: "core_value_proposition", label: "Core Value Proposition", tag: "VALUE_PROP" },
  { key: "target_audience", label: "Likely Target Audience", tag: "AUDIENCE" },
  { key: "cta_strategy", label: "Main Calls to Action", tag: "CTA" },
  { key: "trust_signals", label: "Trust Signals", tag: "TRUST" },
  { key: "information_hierarchy", label: "Information Hierarchy", tag: "HIERARCHY" },
  { key: "ux_writing_notes", label: "UX Writing Observations", tag: "UX_COPY" },
  { key: "friction_points", label: "Potential Friction Points", tag: "FRICTION" },
  { key: "design_opportunities", label: "Design Opportunities", tag: "OPPORTUNITIES" },
  { key: "designer_summary", label: "Product Designer Summary", tag: "SUMMARY" },
];

// ─── ADK Client Helpers ──────────────────────────────────────────────────────

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

async function createAdkSession(userId: string, sessionId: string): Promise<void> {
  const url = `${ADK_BASE_URL}/apps/${ADK_APP_NAME}/users/${userId}/sessions/${sessionId}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ state: {} }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to create ADK session (${res.status}): ${text}`);
  }
}

async function runAdkAgent(
  userId: string,
  sessionId: string,
  message: string
): Promise<string> {
  const url = `${ADK_BASE_URL}/run`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      app_name: ADK_APP_NAME,
      user_id: userId,
      session_id: sessionId,
      new_message: {
        role: "user",
        parts: [{ text: message }],
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`ADK agent request failed (${res.status}): ${text}`);
  }

  const data = await res.json();

  // ADK can return events as an array or as an object with a content field.
  // Walk backwards through events to find the last text part from the model.
  const events = Array.isArray(data) ? data : [data];

  for (let i = events.length - 1; i >= 0; i--) {
    const event = events[i];

    // Try event.content.parts[].text (standard ADK shape)
    const parts = event?.content?.parts;
    if (parts && Array.isArray(parts)) {
      for (const part of parts) {
        if (part.text && typeof part.text === "string" && part.text.trim().length > 0) {
          return part.text;
        }
      }
    }

    // Fallback: some ADK versions use event.output or event.text
    if (typeof event?.output === "string" && event.output.trim().length > 0) {
      return event.output;
    }
    if (typeof event?.text === "string" && event.text.trim().length > 0) {
      return event.text;
    }
  }

  throw new Error(
    "No text response found in ADK agent events. " +
    "The agent may have failed to produce output. Please try again."
  );
}

// Required fields that must exist in a valid analysis result
const REQUIRED_FIELDS: (keyof AnalysisResult)[] = [
  "url", "product_brand", "core_value_proposition", "target_audience",
  "cta_strategy", "information_hierarchy", "trust_signals",
  "ux_writing_notes", "friction_points", "design_opportunities",
  "designer_summary",
];

function parseAgentJson(raw: string): AnalysisResult {
  let cleaned = raw.trim();

  // Strip markdown code fences: ```json ... ```, ``` ... ```, ~~~json ... ~~~
  cleaned = cleaned
    .replace(/^```(?:json)?\s*\n?/i, "")
    .replace(/\n?```\s*$/i, "")
    .replace(/^~~~(?:json)?\s*\n?/i, "")
    .replace(/\n?~~~\s*$/i, "")
    .trim();

  // If the response contains text before/after JSON, try to extract the JSON object
  if (!cleaned.startsWith("{")) {
    const jsonStart = cleaned.indexOf("{");
    const jsonEnd = cleaned.lastIndexOf("}");
    if (jsonStart !== -1 && jsonEnd > jsonStart) {
      cleaned = cleaned.substring(jsonStart, jsonEnd + 1);
    }
  }

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(cleaned);
  } catch (e) {
    // Show a preview of what we got for debugging
    const preview = raw.length > 200 ? raw.substring(0, 200) + "..." : raw;
    throw new Error(
      `Could not parse the agent response as JSON.\n\n` +
      `This usually means the target page blocked automated access, ` +
      `the page content was too thin for analysis, or the agent ` +
      `returned an unexpected format.\n\n` +
      `Raw response preview:\n${preview}`
    );
  }

  // Validate that required fields exist
  const missing = REQUIRED_FIELDS.filter((f) => !(f in parsed));
  if (missing.length > 0) {
    throw new Error(
      `The agent returned JSON but it is missing required fields: ` +
      `${missing.join(", ")}. The analysis may be incomplete.`
    );
  }

  return parsed as unknown as AnalysisResult;
}

// ─── Render Helpers ──────────────────────────────────────────────────────────

function formatValue(value: string | string[]): string {
  if (Array.isArray(value)) {
    return value.map((v) => `• ${v}`).join("\n");
  }
  return value;
}

// ─── App Component ───────────────────────────────────────────────────────────

export default function App() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [copiedMd, setCopiedMd] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  const handleAnalyze = async (targetUrl: string) => {
    let formattedUrl = targetUrl.trim();
    if (!formattedUrl) return;

    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = "https://" + formattedUrl;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setUrl(formattedUrl);

    try {
      const userId = "designer";
      const sessionId = generateId();

      // 1. Create ADK session
      await createAdkSession(userId, sessionId);

      // 2. Run the agent
      const rawText = await runAdkAgent(
        userId,
        sessionId,
        `Analyze the competitor landing page at this URL: ${formattedUrl}`
      );

      // 3. Parse JSON from agent response
      const data = parseAgentJson(rawText);
      setResult(data);
    } catch (err: any) {
      console.error("Analysis error:", err);
      setError(err.message || "Failed to analyze. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyMarkdown = () => {
    if (!result) return;

    const md = `# ${result.product_brand} — Design Research Summary
**URL:** ${result.url}

## Core Value Proposition
${result.core_value_proposition}

## Likely Target Audience
${result.target_audience}

## Main Calls to Action
${formatValue(result.cta_strategy)}

## Information Hierarchy
${result.information_hierarchy}

## Trust Signals
${formatValue(result.trust_signals)}

## UX Writing Observations
${result.ux_writing_notes}

## Potential Friction Points
${formatValue(result.friction_points)}

## Design Opportunities
${formatValue(result.design_opportunities)}

## Product Designer Summary
${result.designer_summary}`;

    navigator.clipboard.writeText(md);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const handleCopyJson = () => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>

      {/* Top Bar */}
      <div style={{
        borderBottom: '1px solid var(--border-subtle)',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6875rem',
        color: 'var(--text-muted)',
        letterSpacing: '0.04em',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="status-dot" />
          <span>SYSTEM ONLINE</span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span style={{ color: 'var(--text-secondary)' }}>DESIGN_RESEARCH_v2.0</span>
        </div>
        <a href="https://fadlyzaki-design.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', transition: 'opacity 0.2s ease', opacity: 0.5 }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}>fadly.uzzaki ↗</a>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* Header */}
        <header style={{ marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '8px',
            background: 'var(--accent-blue-light)',
            border: '1px solid rgba(0, 122, 255, 0.12)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            fontWeight: 500,
            color: 'var(--accent-blue)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase' as const,
            marginBottom: '20px',
          }}>
            <Sparkles style={{ width: 12, height: 12 }} />
            ADK_AGENT · MCP_TOOL
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: 'var(--text-primary)',
            margin: '0 0 12px 0',
            textTransform: 'uppercase' as const,
          }}>
            COMPETITOR LANDING PAGE<br />
            <span style={{ color: 'var(--accent-blue)' }}>SUMMARIZER</span>
          </h1>

          <p style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: '1.25rem',
            color: 'var(--text-secondary)',
            margin: 0,
            maxWidth: '560px',
            lineHeight: 1.5,
          }}>
            Paste a competitor's URL to extract structured UX and product design insights. Powered by a Gemini ADK agent with a custom MCP web loader.
          </p>
        </header>

        {/* Input Section */}
        <div className="input-brand" style={{
          padding: '8px',
          display: 'flex',
          flexDirection: 'row',
          gap: '8px',
          position: 'relative',
          zIndex: 10,
        }}>
          <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
            <LinkIcon style={{
              position: 'absolute',
              left: '16px',
              width: '18px',
              height: '18px',
              color: 'var(--text-muted)',
            }} />
            <input
              id="url-input"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze(url)}
              placeholder="https://example.com"
              disabled={loading}
              style={{
                width: '100%',
                paddingLeft: '48px',
                paddingRight: '16px',
                paddingTop: '16px',
                paddingBottom: '16px',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '1rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-primary)',
              }}
            />
          </div>
          <button
            id="analyze-btn"
            onClick={() => handleAnalyze(url)}
            disabled={loading || !url}
            className="btn-primary"
            style={{
              padding: '16px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.875rem',
              whiteSpace: 'nowrap' as const,
            }}
          >
            {loading ? (
              <>
                <Loader2 style={{ width: 18, height: 18, animation: 'spin 1s linear infinite' }} />
                Analyzing...
              </>
            ) : (
              <>
                Analyze Page
                <ArrowRight style={{ width: 18, height: 18 }} />
              </>
            )}
          </button>
        </div>

        {/* Examples */}
        {!loading && !result && !error && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              marginTop: '20px',
              display: 'flex',
              flexWrap: 'wrap' as const,
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span className="mono-label">TRY EXAMPLE →</span>
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => handleAnalyze(ex)}
                className="chip"
              >
                {ex.replace("https://", "")}
              </button>
            ))}
          </motion.div>
        )}

        {/* Error State */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                marginTop: '32px',
                padding: '20px',
                borderRadius: 'var(--radius-card)',
                background: '#FFF5F5',
                border: '1px solid rgba(255, 59, 48, 0.15)',
                boxShadow: '3px 3px 0px 0px rgba(255, 59, 48, 0.3)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
              }}
            >
              <AlertCircle style={{ width: 20, height: 20, color: 'var(--status-red)', marginTop: 2, flexShrink: 0 }} />
              <div>
                <h3 style={{ margin: '0 0 4px', fontWeight: 600, fontSize: '0.875rem', color: 'var(--status-red)' }}>
                  [ERROR] Analysis Failed
                </h3>
                <p style={{ margin: 0, fontSize: '0.8125rem', color: '#CC2D25', opacity: 0.85, lineHeight: 1.5 }}>
                  {error}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                marginTop: '48px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '16px',
              }}
            >
              <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <Loader2 style={{ width: 20, height: 20, color: 'var(--accent-blue)', animation: 'spin 1s linear infinite' }} />
                <span className="mono-label" style={{ color: 'var(--accent-blue)' }}>[ ADK AGENT ANALYZING PAGE... THIS USUALLY TAKES 10-20 SECONDS ]</span>
              </div>
              {RESULT_SECTIONS.map((section, i) => {
                const isFullWidth = section.key === "information_hierarchy" || section.key === "design_opportunities" || section.key === "designer_summary";
                return (
                  <div
                    key={`skeleton-${i}`}
                    className="skeleton-shimmer"
                    style={{
                      padding: '24px',
                      borderRadius: 'var(--radius-card)',
                      gridColumn: isFullWidth ? '1 / -1' : undefined,
                      minHeight: section.key === "designer_summary" ? '160px' : '140px',
                    }}
                  >
                    <div className="skeleton-line" style={{ width: '40px', marginBottom: '16px' }} />
                    <div className="skeleton-line" style={{ width: '60%' }} />
                    <div className="skeleton-line" style={{ width: '90%' }} />
                    <div className="skeleton-line" style={{ width: '75%' }} />
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{ marginTop: '48px' }}
            >
              {/* Results Header */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                paddingBottom: '24px',
                borderBottom: '1px solid var(--border-subtle)',
                marginBottom: '28px',
                flexWrap: 'wrap' as const,
                gap: '16px',
                position: 'sticky',
                top: 0,
                zIndex: 40,
                background: 'rgba(245, 245, 247, 0.85)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                paddingTop: '24px',
                margin: '0 -24px 28px',
                paddingLeft: '24px',
                paddingRight: '24px',
              }}>
                <div>
                  <div className="mono-label" style={{ marginBottom: '6px' }}>
                    [ANALYSIS_COMPLETE]
                  </div>
                  <h2 style={{
                    margin: '0 0 4px',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-primary)',
                  }}>
                    {result.product_brand}
                  </h2>
                  <a
                    href={result.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--accent-blue)',
                      textDecoration: 'none',
                    }}
                  >
                    {result.url} ↗
                  </a>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <CopyButton
                    id="copy-json-btn"
                    label="Copy JSON"
                    copiedLabel="Copied!"
                    icon={<Braces style={{ width: 15, height: 15 }} />}
                    copied={copiedJson}
                    onClick={handleCopyJson}
                  />
                  <CopyButton
                    id="copy-md-btn"
                    label="Copy Markdown"
                    copiedLabel="Copied!"
                    icon={<Copy style={{ width: 15, height: 15 }} />}
                    copied={copiedMd}
                    onClick={handleCopyMarkdown}
                  />
                </div>
              </div>

              {/* Result Cards Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '16px',
              }}>
                {RESULT_SECTIONS.map((section, i) => {
                  const isOpportunities = section.key === "design_opportunities";
                  const isSummary = section.key === "designer_summary";
                  const isFullWidth = section.key === "information_hierarchy" || isOpportunities || isSummary;
                  const value = result[section.key];

                  return (
                    <motion.div
                      key={section.key}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      className={isOpportunities ? "card-accent" : "card-brand"}
                      style={{
                        padding: '24px',
                        gridColumn: isFullWidth ? '1 / -1' : undefined,
                        ...(isSummary ? {
                          background: 'var(--accent-blue-light)',
                          borderColor: 'rgba(0, 122, 255, 0.12)',
                        } : {}),
                      }}
                    >
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase' as const,
                        marginBottom: '12px',
                        color: isOpportunities ? 'rgba(255,255,255,0.6)' : 'var(--text-muted)',
                      }}>
                        [{section.tag}]
                      </div>
                      <h3 style={{
                        margin: '0 0 8px',
                        fontSize: '0.9375rem',
                        fontWeight: 700,
                        letterSpacing: '-0.01em',
                        color: isOpportunities ? '#FFFFFF' : 'var(--text-primary)',
                      }}>
                        {section.label}
                      </h3>
                      {Array.isArray(value) ? (
                        <ul style={{
                          margin: 0,
                          paddingLeft: '18px',
                          fontSize: '0.875rem',
                          lineHeight: 1.7,
                          color: isOpportunities ? 'rgba(255,255,255,0.85)' : 'var(--text-secondary)',
                        }}>
                          {value.map((item, j) => (
                            <li key={j} style={{ marginBottom: '4px' }}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p style={{
                          margin: 0,
                          fontSize: '0.875rem',
                          lineHeight: 1.7,
                          color: isOpportunities ? 'rgba(255,255,255,0.85)' : 'var(--text-secondary)',
                        }}>
                          {value}
                        </p>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Footer */}
      <div style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '16px 24px',
        textAlign: 'center' as const,
        fontFamily: 'var(--font-mono)',
        fontSize: '0.625rem',
        color: 'var(--text-muted)',
        letterSpacing: '0.06em',
        textTransform: 'uppercase' as const,
      }}>
        BUILT BY <a href="https://fadlyzaki-design.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'none', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '2px', transition: 'border-color 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--text-primary)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-subtle)'}>FADLY UZZAKI</a> · POWERED BY GEMINI AI · ADK + MCP
      </div>
    </div>
  );
}

// ─── Copy Button Component ───────────────────────────────────────────────────

function CopyButton({
  id, label, copiedLabel, icon, copied, onClick,
}: {
  id: string;
  label: string;
  copiedLabel: string;
  icon: React.ReactNode;
  copied: boolean;
  onClick: () => void;
}) {
  return (
    <button
      id={id}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 14px',
        borderRadius: '8px',
        border: '1px solid var(--border-card)',
        background: 'var(--bg-card)',
        cursor: 'pointer',
        fontSize: '0.75rem',
        fontWeight: 600,
        fontFamily: 'var(--font-sans)',
        color: 'var(--text-primary)',
        boxShadow: 'var(--shadow-card)',
        transition: 'box-shadow 0.15s ease',
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-blue-sm)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)'; }}
    >
      {copied ? <Check style={{ width: 15, height: 15, color: 'var(--status-green)' }} /> : icon}
      {copied ? copiedLabel : label}
    </button>
  );
}
