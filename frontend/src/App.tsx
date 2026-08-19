/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import {
  Loader2,
  ArrowRight,
  Copy,
  Check,
  Link as LinkIcon,
  AlertCircle,
  Braces,
  Download,
  Key,
  Columns3,
  Search,
  ExternalLink,
  Printer,
  Target,
  Users,
  MousePointerClick,
  ShieldCheck,
  Layers,
  PenTool,
  AlertTriangle,
  Sparkles,
  Compass,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  AnalysisResult,
  LIVE_DEMO_DATASETS,
  DEMO_URLS,
} from "./lib/liveDemos";
import {
  getStoredGeminiKey,
  analyzeWithGeminiFree,
} from "./lib/geminiAnalyzer";
import { ProductSpecsBar } from "./components/ProductSpecsBar";
import { ApiKeyModal } from "./components/ApiKeyModal";
import { ComparisonMatrix } from "./components/ComparisonMatrix";

// ─── Constants & Configurations ─────────────────────────────────────────────

const ADK_BASE_URL = (import.meta as any).env?.VITE_ADK_API_BASE_URL || "";
const ADK_APP_NAME = (import.meta as any).env?.VITE_ADK_APP_NAME || "competitor_summarizer";

type ResultSectionKey =
  | "core_value_proposition"
  | "target_audience"
  | "cta_strategy"
  | "trust_signals"
  | "information_hierarchy"
  | "ux_writing_notes"
  | "friction_points"
  | "design_opportunities"
  | "designer_summary";

interface SectionConfig {
  key: ResultSectionKey;
  label: string;
  category: "strategy" | "ux" | "opportunities" | "summary";
  icon: React.ReactNode;
}

const RESULT_SECTIONS: SectionConfig[] = [
  {
    key: "core_value_proposition",
    label: "Core Value Proposition",
    category: "strategy",
    icon: <Target style={{ width: 16, height: 16, color: "var(--accent-blue)" }} />,
  },
  {
    key: "target_audience",
    label: "Likely Target Audience",
    category: "strategy",
    icon: <Users style={{ width: 16, height: 16, color: "#6366F1" }} />,
  },
  {
    key: "cta_strategy",
    label: "Calls to Action & Conversion Paths",
    category: "strategy",
    icon: <MousePointerClick style={{ width: 16, height: 16, color: "#059669" }} />,
  },
  {
    key: "trust_signals",
    label: "Trust Signals & Social Proof",
    category: "strategy",
    icon: <ShieldCheck style={{ width: 16, height: 16, color: "#2563EB" }} />,
  },
  {
    key: "information_hierarchy",
    label: "Information Hierarchy & Page Flow",
    category: "ux",
    icon: <Layers style={{ width: 16, height: 16, color: "#7C3AED" }} />,
  },
  {
    key: "ux_writing_notes",
    label: "UX Writing & Tone Observations",
    category: "ux",
    icon: <PenTool style={{ width: 16, height: 16, color: "#D97706" }} />,
  },
  {
    key: "friction_points",
    label: "Potential Friction Points",
    category: "opportunities",
    icon: <AlertTriangle style={{ width: 16, height: 16, color: "#DC2626" }} />,
  },
  {
    key: "design_opportunities",
    label: "Design Opportunities & Strategic Gaps",
    category: "opportunities",
    icon: <Sparkles style={{ width: 16, height: 16, color: "#2563EB" }} />,
  },
  {
    key: "designer_summary",
    label: "Product Designer Takeaway",
    category: "summary",
    icon: <Compass style={{ width: 16, height: 16, color: "#0F172A" }} />,
  },
];

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export default function App() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("Analyzing landing page...");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [activeCategory, setActiveCategory] = useState<"all" | "strategy" | "ux" | "opportunities">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals & Matrix
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const [comparisonList, setComparisonList] = useState<AnalysisResult[]>([]);

  // Clipboard & export feedback
  const [copiedMd, setCopiedMd] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [copiedCsv, setCopiedCsv] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2500);
  };

  // Keyboard shortcuts (/ to focus input, Esc to close modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === "Escape") {
        setShowMatrix(false);
        setIsApiKeyModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Initialize key status and initial benchmark
  useEffect(() => {
    const key = getStoredGeminiKey();
    setHasApiKey(Boolean(key && key.trim()));

    setComparisonList([
      LIVE_DEMO_DATASETS["https://linear.app"],
      LIVE_DEMO_DATASETS["https://stripe.com"],
      LIVE_DEMO_DATASETS["https://vercel.com"],
    ]);

    setResult(LIVE_DEMO_DATASETS["https://linear.app"]);
    setUrl("https://linear.app");
  }, []);

  const handleKeySaved = (key: string) => {
    setHasApiKey(Boolean(key && key.trim()));
    showToast(key.trim() ? "API key saved" : "API key cleared");
  };

  const handleSelectDemo = (demoUrl: string) => {
    setUrl(demoUrl);
    setError(null);
    const demoData = LIVE_DEMO_DATASETS[demoUrl];
    if (demoData) {
      setResult(demoData);
      showToast(`Loaded ${demoData.product_brand} benchmark`);
    }
  };

  const handleAnalyze = async (targetUrl: string) => {
    let formattedUrl = targetUrl.trim();
    if (!formattedUrl) return;

    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = "https://" + formattedUrl;
    }

    setUrl(formattedUrl);
    setError(null);

    if (LIVE_DEMO_DATASETS[formattedUrl]) {
      setResult(LIVE_DEMO_DATASETS[formattedUrl]);
      showToast(`Loaded ${LIVE_DEMO_DATASETS[formattedUrl].product_brand} benchmark`);
      return;
    }

    setLoading(true);
    setResult(null);

    const apiKey = getStoredGeminiKey();

    try {
      if (apiKey) {
        setLoadingStep("Fetching clean page content...");
        await new Promise((r) => setTimeout(r, 200));
        setLoadingStep("Extracting product design insights with Gemini...");

        const liveAnalysis = await analyzeWithGeminiFree(formattedUrl, apiKey);
        setResult(liveAnalysis);
        showToast(`Analyzed ${liveAnalysis.product_brand}`);

        if (!comparisonList.some((c) => c.url === liveAnalysis.url)) {
          setComparisonList((prev) => [liveAnalysis, ...prev.slice(0, 3)]);
        }
      } else {
        setLoadingStep("Connecting to backend service...");
        try {
          const userId = "designer";
          const sessionId = generateId();

          const sessionRes = await fetch(`${ADK_BASE_URL}/apps/${ADK_APP_NAME}/users/${userId}/sessions/${sessionId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ state: {} }),
          });

          if (!sessionRes.ok) throw new Error("Backend unavailable");

          const runRes = await fetch(`${ADK_BASE_URL}/run`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              app_name: ADK_APP_NAME,
              user_id: userId,
              session_id: sessionId,
              new_message: { role: "user", parts: [{ text: `Analyze the competitor landing page at: ${formattedUrl}` }] },
            }),
          });

          const data = await runRes.json();
          const events = Array.isArray(data) ? data : [data];
          let rawText = "";
          for (let i = events.length - 1; i >= 0; i--) {
            const parts = events[i]?.content?.parts;
            if (parts && Array.isArray(parts)) {
              for (const part of parts) {
                if (part.text) {
                  rawText = part.text;
                  break;
                }
              }
            }
          }

          if (!rawText) throw new Error("No response generated");
          const cleaned = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();
          const parsed = JSON.parse(cleaned);
          setResult({
            ...parsed,
            specs: {
              primary_segment: "Target Audience",
              monetization_model: "SaaS",
              conversion_path: "Self-Serve",
              design_signature: "Web Interface",
            },
            analyzed_at: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
            is_live_demo: false,
          });
        } catch {
          setIsApiKeyModalOpen(true);
          throw new Error(
            "To analyze arbitrary live URLs, please add a free Gemini API key in Settings (No credit card or cloud credits required)."
          );
        }
      }
    } catch (err: any) {
      console.error("Analysis error:", err);
      setError(err.message || "Could not analyze the landing page. Please verify the URL or configure your API key.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyMarkdown = () => {
    if (!result) return;
    const md = `# ${result.product_brand} — Competitor Design Analysis
**URL:** ${result.url}
**Category:** ${result.category || "Web Application"}

## Core Value Proposition
${result.core_value_proposition}

## Likely Target Audience
${result.target_audience}

## Calls to Action
${Array.isArray(result.cta_strategy) ? result.cta_strategy.map((c) => `- ${c}`).join("\n") : result.cta_strategy}

## Information Hierarchy
${result.information_hierarchy}

## Trust Signals
${Array.isArray(result.trust_signals) ? result.trust_signals.map((t) => `- ${t}`).join("\n") : result.trust_signals}

## UX Writing Observations
${result.ux_writing_notes}

## Potential Friction Points
${Array.isArray(result.friction_points) ? result.friction_points.map((f) => `- ${f}`).join("\n") : result.friction_points}

## Design Opportunities
${Array.isArray(result.design_opportunities) ? result.design_opportunities.map((o) => `- ${o}`).join("\n") : result.design_opportunities}

## Designer Summary
${result.designer_summary}`;

    navigator.clipboard.writeText(md);
    setCopiedMd(true);
    showToast("Markdown copied to clipboard");
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const handleCopyJson = () => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopiedJson(true);
    showToast("JSON payload copied");
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleExportCsv = () => {
    if (!result) return;
    const escapeCsv = (str: string) => `"${(str || "").replace(/"/g, '""')}"`;
    const headers = ["Dimension", "Details"];
    const rows = [
      ["Product Brand", result.product_brand],
      ["URL", result.url],
      ["Category", result.category || ""],
      ["Core Value Proposition", result.core_value_proposition],
      ["Target Audience", result.target_audience],
      ["CTA Strategy", Array.isArray(result.cta_strategy) ? result.cta_strategy.join("; ") : result.cta_strategy],
      ["Information Hierarchy", result.information_hierarchy],
      ["Trust Signals", Array.isArray(result.trust_signals) ? result.trust_signals.join("; ") : result.trust_signals],
      ["UX Writing Notes", result.ux_writing_notes],
      ["Friction Points", Array.isArray(result.friction_points) ? result.friction_points.join("; ") : result.friction_points],
      ["Design Opportunities", Array.isArray(result.design_opportunities) ? result.design_opportunities.join("; ") : result.design_opportunities],
      ["Designer Summary", result.designer_summary],
    ];

    const csvContent = headers.join(",") + "\n" + rows.map((r) => r.map(escapeCsv).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${result.product_brand.toLowerCase()}-benchmark.csv`;
    link.click();

    setCopiedCsv(true);
    showToast("CSV exported");
    setTimeout(() => setCopiedCsv(false), 2000);
  };

  const handleAddToComparison = () => {
    if (!result) return;
    if (!comparisonList.some((c) => c.url === result.url)) {
      setComparisonList([result, ...comparisonList]);
    }
    setShowMatrix(true);
  };

  // Filter sections based on active category and search query
  const filteredSections = RESULT_SECTIONS.filter((section) => {
    if (activeCategory !== "all") {
      if (activeCategory === "strategy" && section.category !== "strategy") return false;
      if (activeCategory === "ux" && section.category !== "ux") return false;
      if (activeCategory === "opportunities" && section.category !== "opportunities") return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const val = result ? result[section.key] : "";
      const textVal = Array.isArray(val) ? val.join(" ") : String(val || "");
      return section.label.toLowerCase().includes(q) || textVal.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
      {/* Top Navigation */}
      <nav
        style={{
          borderBottom: "1px solid var(--border-subtle)",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--bg-surface)",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--text-primary)", letterSpacing: "-0.01em", display: "flex", alignItems: "center", gap: "6px" }}>
            <span>⚡</span> Competitor Summarizer
          </span>
          <span style={{ color: "var(--border-subtle)" }}>/</span>
          <span style={{ fontSize: "0.75rem", color: "var(--text-subtle)", display: "flex", alignItems: "center", gap: "6px" }}>
            <span className="live-status-dot" />
            {hasApiKey ? "Gemini 2.5 Flash" : "8 Benchmarks Ready"}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={() => setShowMatrix(!showMatrix)}
            className="btn-action-compare"
            style={{ padding: "5px 10px", fontSize: "0.75rem" }}
          >
            <Columns3 style={{ width: 13, height: 13 }} />
            <span>Compare ({comparisonList.length})</span>
          </button>

          <button
            onClick={() => setIsApiKeyModalOpen(true)}
            className="btn-secondary"
            style={{ padding: "5px 10px", fontSize: "0.75rem" }}
          >
            <Key style={{ width: 13, height: 13 }} />
            <span>{hasApiKey ? "API Key Configured" : "Add API Key"}</span>
          </button>

          <a
            href="https://fadlyzaki-design.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              color: "var(--text-muted)",
              fontSize: "0.75rem",
              marginLeft: "6px",
            }}
          >
            fadly.uzzaki ↗
          </a>
        </div>
      </nav>

      <main style={{ maxWidth: "880px", margin: "0 auto", padding: "48px 24px 80px" }}>
        {/* Header */}
        <header style={{ marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              color: "var(--text-primary)",
              margin: "0 0 10px 0",
            }}
          >
            Competitor Landing Page Intelligence
          </h1>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--text-secondary)",
              margin: 0,
              maxWidth: "600px",
              lineHeight: 1.5,
            }}
          >
            Extract structured product-design insights from competitor pages. Benchmark value propositions, conversion paths, trust signals, and UX friction points.
          </p>
        </header>

        {/* Input Bar */}
        <div className="input-section" style={{ marginBottom: "20px" }}>
          <div
            className="clean-input-wrapper"
            style={{
              padding: "6px 8px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <LinkIcon
              style={{
                width: "16px",
                height: "16px",
                color: "var(--text-muted)",
                marginLeft: "8px",
                flexShrink: 0,
              }}
            />
            <input
              ref={inputRef}
              id="url-input"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze(url)}
              placeholder="Paste competitor URL (e.g. https://linear.app)..."
              disabled={loading}
              style={{
                width: "100%",
                padding: "10px 8px",
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: "0.875rem",
                fontFamily: "var(--font-mono)",
                color: "var(--text-primary)",
              }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  fontSize: "0.6875rem",
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-muted)",
                  background: "var(--bg-subtle)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "4px",
                  padding: "2px 6px",
                  display: "none",
                }}
                className="md:inline-block"
              >
                /
              </span>
              <button
                id="analyze-btn"
                onClick={() => handleAnalyze(url)}
                disabled={loading || !url.trim()}
                className="btn-primary"
                style={{
                  padding: "10px 18px",
                  whiteSpace: "nowrap",
                  fontSize: "0.8125rem",
                }}
              >
                {loading ? (
                  <>
                    <Loader2 style={{ width: 14, height: 14, animation: "spin 1s linear infinite" }} />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze Page
                    <ArrowRight style={{ width: 14, height: 14 }} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Curated Benchmark Pills (Royal Blue Active) */}
        <div style={{ marginBottom: "36px" }}>
          <div
            style={{
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "var(--text-muted)",
              marginBottom: "8px",
            }}
          >
            Curated Benchmarks:
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {DEMO_URLS.map((demoUrl) => {
              const demo = LIVE_DEMO_DATASETS[demoUrl];
              const isSelected = result?.url === demoUrl;
              return (
                <button
                  key={demoUrl}
                  onClick={() => handleSelectDemo(demoUrl)}
                  className={`demo-chip ${isSelected ? "active" : ""}`}
                >
                  {demo.product_brand}
                </button>
              );
            })}
          </div>
        </div>

        {/* Error Notice */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              style={{
                marginBottom: "28px",
                padding: "16px 20px",
                borderRadius: "var(--radius-lg)",
                background: "#FEF2F2",
                border: "1px solid #FEE2E2",
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
              }}
            >
              <AlertCircle style={{ width: 18, height: 18, color: "#DC2626", marginTop: 2, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <p style={{ margin: "0 0 10px", fontSize: "0.8125rem", color: "#991B1B", lineHeight: 1.5 }}>
                  {error}
                </p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <button
                    onClick={() => setIsApiKeyModalOpen(true)}
                    className="btn-primary"
                    style={{ padding: "5px 12px", fontSize: "0.75rem" }}
                  >
                    Add Free Gemini API Key
                  </button>
                  <button
                    onClick={() => handleSelectDemo("https://linear.app")}
                    className="btn-secondary"
                    style={{ padding: "5px 12px", fontSize: "0.75rem" }}
                  >
                    View Linear Benchmark
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Skeletons */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                marginTop: "24px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "16px",
              }}
            >
              <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <Loader2 style={{ width: 16, height: 16, color: "var(--text-secondary)", animation: "spin 1s linear infinite" }} />
                <span style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", fontWeight: 500 }}>
                  {loadingStep}
                </span>
              </div>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={`skeleton-${i}`}
                  className="skeleton-shimmer"
                  style={{
                    padding: "20px",
                    minHeight: "120px",
                  }}
                >
                  <div className="skeleton-line" style={{ width: "80px", marginBottom: "14px" }} />
                  <div className="skeleton-line" style={{ width: "60%" }} />
                  <div className="skeleton-line" style={{ width: "90%" }} />
                  <div className="skeleton-line" style={{ width: "70%" }} />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Comparison Matrix */}
        {showMatrix && (
          <ComparisonMatrix
            selectedItems={comparisonList}
            onRemoveItem={(remUrl) => setComparisonList((prev) => prev.filter((p) => p.url !== remUrl))}
            onAddItem={(newItem) => {
              if (!comparisonList.some((c) => c.url === newItem.url)) {
                setComparisonList([...comparisonList, newItem]);
              }
            }}
            onClose={() => setShowMatrix(false)}
          />
        )}

        {/* Main Result */}
        <AnimatePresence>
          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Product Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  paddingBottom: "16px",
                  borderBottom: "1px solid var(--border-subtle)",
                  marginBottom: "20px",
                  flexWrap: "wrap",
                  gap: "14px",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
                    <h2
                      style={{
                        margin: 0,
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        color: "var(--text-primary)",
                      }}
                    >
                      {result.product_brand}
                    </h2>
                    {result.category && (
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--text-secondary)",
                          background: "var(--bg-track)",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontWeight: 500,
                        }}
                      >
                        {result.category}
                      </span>
                    )}
                  </div>

                  <a
                    href={result.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontSize: "0.75rem",
                      fontFamily: "var(--font-mono)",
                      color: "var(--accent-blue)",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    {result.url} <ExternalLink style={{ width: 11, height: 11 }} />
                  </a>
                </div>

                {/* Distinct Action Buttons */}
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  <button onClick={handleAddToComparison} className="btn-action-compare" title="Add to comparison matrix">
                    <Columns3 style={{ width: 13, height: 13 }} />
                    Compare
                  </button>

                  <button onClick={handleCopyJson} className="btn-action-json" title="Copy raw JSON">
                    {copiedJson ? <Check style={{ width: 13, height: 13, color: "var(--accent-amber)" }} /> : <Braces style={{ width: 13, height: 13 }} />}
                    {copiedJson ? "Copied" : "JSON"}
                  </button>

                  <button onClick={handleCopyMarkdown} className="btn-action-markdown" title="Copy Markdown summary">
                    {copiedMd ? <Check style={{ width: 13, height: 13, color: "var(--accent-emerald)" }} /> : <Copy style={{ width: 13, height: 13 }} />}
                    {copiedMd ? "Copied" : "Markdown"}
                  </button>

                  <button onClick={handleExportCsv} className="btn-action-csv" title="Download CSV spreadsheet">
                    {copiedCsv ? <Check style={{ width: 13, height: 13, color: "var(--accent-blue)" }} /> : <Download style={{ width: 13, height: 13 }} />}
                    {copiedCsv ? "Exported" : "CSV"}
                  </button>

                  <button onClick={() => window.print()} className="btn-secondary" style={{ padding: "5px 10px", fontSize: "0.75rem" }} title="Print / PDF">
                    <Printer style={{ width: 13, height: 13 }} />
                  </button>
                </div>
              </div>

              {/* Product Specifications Bar */}
              <ProductSpecsBar specs={result.specs} brand={result.product_brand} />

              {/* Filter & Search Bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "18px",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {/* Segmented Control Category Tabs */}
                <div className="segmented-tab-track">
                  {(
                    [
                      { id: "all", label: "All Insights" },
                      { id: "strategy", label: "Value & Strategy" },
                      { id: "ux", label: "Hierarchy & Microcopy" },
                      { id: "opportunities", label: "Friction & Gaps" },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveCategory(tab.id)}
                      className={`segmented-tab ${activeCategory === tab.id ? "active" : ""}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div style={{ position: "relative", minWidth: "200px" }}>
                  <Search
                    style={{
                      position: "absolute",
                      left: "9px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "13px",
                      height: "13px",
                      color: "var(--text-muted)",
                    }}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search in insights..."
                    style={{
                      width: "100%",
                      paddingLeft: "28px",
                      paddingRight: "8px",
                      paddingTop: "6px",
                      paddingBottom: "6px",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-card)",
                      background: "var(--bg-surface)",
                      fontSize: "0.75rem",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              {/* Cards Grid: Perfectly Balanced */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
                  gap: "16px",
                }}
              >
                {filteredSections.map((section, i) => {
                  const isSummary = section.key === "designer_summary";
                  const isFriction = section.key === "friction_points";
                  const isOpportunities = section.key === "design_opportunities";

                  // In "All" view, summary spans full width at the bottom as the conclusion
                  const isFullSpan = activeCategory === "all" && isSummary;
                  const value = result[section.key];

                  return (
                    <motion.div
                      key={section.key}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03, duration: 0.2 }}
                      className="clean-card"
                      style={{
                        padding: "20px",
                        gridColumn: isFullSpan ? "1 / -1" : undefined,
                        display: "flex",
                        flexDirection: "column",
                        ...(isSummary
                          ? {
                              background: "var(--bg-subtle)",
                              borderColor: "var(--border-subtle)",
                            }
                          : {}),
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                        {section.icon}
                        <h3
                          style={{
                            margin: 0,
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            color: isFriction ? "#B91C1C" : isOpportunities ? "#1D4ED8" : "var(--text-primary)",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {section.label}
                        </h3>
                      </div>

                      <div style={{ flex: 1 }}>
                        {Array.isArray(value) ? (
                          <ul
                            style={{
                              margin: 0,
                              paddingLeft: "18px",
                              fontSize: "0.8125rem",
                              lineHeight: 1.6,
                              color: "var(--text-secondary)",
                            }}
                          >
                            {value.map((item, j) => (
                              <li key={j} style={{ marginBottom: "5px" }}>
                                {item}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p
                            style={{
                              margin: 0,
                              fontSize: "0.8125rem",
                              lineHeight: 1.6,
                              color: isSummary ? "var(--text-primary)" : "var(--text-secondary)",
                              fontWeight: isSummary ? 500 : 400,
                            }}
                          >
                            {String(value || "")}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Toast Feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            style={{
              position: "fixed",
              bottom: "24px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#0F172A",
              color: "#FFFFFF",
              padding: "8px 16px",
              borderRadius: "9999px",
              fontSize: "0.75rem",
              fontWeight: 500,
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)",
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Check style={{ width: 14, height: 14, color: "#4ADE80" }} />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--border-subtle)",
          padding: "16px 24px",
          textAlign: "center",
          fontSize: "0.75rem",
          color: "var(--text-muted)",
          background: "var(--bg-surface)",
        }}
      >
        <span>Crafted by </span>
        <a
          href="https://fadlyzaki-design.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "var(--text-primary)",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Fadly Uzzaki
        </a>
        <span> · Competitor Landing Page Intelligence</span>
      </footer>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onKeySaved={handleKeySaved}
      />
    </div>
  );
}
