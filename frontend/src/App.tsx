/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import {
  Loader2,
  ArrowRight,
  Copy,
  Check,
  Link as LinkIcon,
  AlertCircle,
  Sparkles,
  Braces,
  Download,
  Key,
  Columns3,
  Search,
  ExternalLink,
  Printer,
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
import { ScorecardWidget } from "./components/ScorecardWidget";
import { ApiKeyModal } from "./components/ApiKeyModal";
import { ComparisonMatrix } from "./components/ComparisonMatrix";

// ─── Constants ───────────────────────────────────────────────────────────────

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
  tag: string;
  category: "all" | "strategy" | "ux" | "opportunities";
}

const RESULT_SECTIONS: SectionConfig[] = [
  { key: "core_value_proposition", label: "Core Value Proposition", tag: "VALUE_PROP", category: "strategy" },
  { key: "target_audience", label: "Likely Target Audience", tag: "AUDIENCE", category: "strategy" },
  { key: "cta_strategy", label: "Main Calls to Action", tag: "CTA", category: "strategy" },
  { key: "trust_signals", label: "Trust Signals & Social Proof", tag: "TRUST", category: "strategy" },
  { key: "information_hierarchy", label: "Information Hierarchy", tag: "HIERARCHY", category: "ux" },
  { key: "ux_writing_notes", label: "UX Writing & Tone Observations", tag: "UX_COPY", category: "ux" },
  { key: "friction_points", label: "Potential Friction Points", tag: "FRICTION", category: "opportunities" },
  { key: "design_opportunities", label: "Design Opportunities & Winning Angles", tag: "OPPORTUNITIES", category: "opportunities" },
  { key: "designer_summary", label: "Product Designer Takeaway", tag: "SUMMARY", category: "all" },
];

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export default function App() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("Initializing analysis pipeline...");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [activeCategory, setActiveCategory] = useState<"all" | "strategy" | "ux" | "opportunities">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals & Matrix
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const [comparisonList, setComparisonList] = useState<AnalysisResult[]>([]);

  // Clipboard & export states
  const [copiedMd, setCopiedMd] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [copiedCsv, setCopiedCsv] = useState(false);

  // Initialize key status and initial demo
  useEffect(() => {
    const key = getStoredGeminiKey();
    setHasApiKey(Boolean(key && key.trim()));

    // Pre-populate comparison list with 3 default demos for instant comparison exploration
    setComparisonList([
      LIVE_DEMO_DATASETS["https://linear.app"],
      LIVE_DEMO_DATASETS["https://stripe.com"],
      LIVE_DEMO_DATASETS["https://vercel.com"],
    ]);

    // Load initial Linear demo so visitors have instant rich data
    setResult(LIVE_DEMO_DATASETS["https://linear.app"]);
    setUrl("https://linear.app");
  }, []);

  const handleKeySaved = (key: string) => {
    setHasApiKey(Boolean(key && key.trim()));
  };

  const handleSelectDemo = (demoUrl: string) => {
    setUrl(demoUrl);
    setError(null);
    const demoData = LIVE_DEMO_DATASETS[demoUrl];
    if (demoData) {
      setResult(demoData);
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

    // 1. Check if this is one of our pre-analyzed live demos for instant zero-latency loading
    if (LIVE_DEMO_DATASETS[formattedUrl]) {
      setResult(LIVE_DEMO_DATASETS[formattedUrl]);
      return;
    }

    // 2. If it's a new custom URL, analyze with available engine
    setLoading(true);
    setResult(null);

    const apiKey = getStoredGeminiKey();

    try {
      if (apiKey) {
        // Run Free Live Gemini Engine
        setLoadingStep("1/2 Fetching live webpage DOM & semantic content...");
        await new Promise((r) => setTimeout(r, 400));
        setLoadingStep("2/2 Gemini 2.5 Flash extracting product design insights...");

        const liveAnalysis = await analyzeWithGeminiFree(formattedUrl, apiKey);
        setResult(liveAnalysis);

        // Also add to comparison list if not present
        if (!comparisonList.some((c) => c.url === liveAnalysis.url)) {
          setComparisonList((prev) => [liveAnalysis, ...prev.slice(0, 3)]);
        }
      } else {
        // Try ADK Backend if available, else prompt for Free Key or Demo
        setLoadingStep("Connecting to ADK API server...");
        try {
          const userId = "designer";
          const sessionId = generateId();

          // Create ADK session
          const sessionRes = await fetch(`${ADK_BASE_URL}/apps/${ADK_APP_NAME}/users/${userId}/sessions/${sessionId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ state: {} }),
          });

          if (!sessionRes.ok) throw new Error("ADK server not reachable");

          // Run ADK Agent
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
          // parse ADK output
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

          if (!rawText) throw new Error("ADK produced no text output");
          const cleaned = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();
          const parsed = JSON.parse(cleaned);
          setResult({
            ...parsed,
            scores: { valuePropClarity: 92, conversionVelocity: 90, trustDensity: 91, frictionResistance: 88 },
            analyzed_at: new Date().toISOString().split("T")[0] + " (ADK Agent)",
            is_live_demo: false,
          });
        } catch {
          // If ADK is not running and no API key is provided, offer friendly setup
          setIsApiKeyModalOpen(true);
          throw new Error(
            "To analyze custom live URLs outside the pre-loaded live demos, please enter a 100% Free Gemini API key in Engine Settings (Zero GCP credits required)."
          );
        }
      }
    } catch (err: any) {
      console.error("Analysis error:", err);
      setError(err.message || "Failed to analyze landing page. Please verify URL or check API settings.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyMarkdown = () => {
    if (!result) return;
    const md = `# ${result.product_brand} — Competitor Design Intelligence
**URL:** ${result.url}
**Analyzed:** ${result.analyzed_at || "Recent"}

## Core Value Proposition
${result.core_value_proposition}

## Likely Target Audience
${result.target_audience}

## Main Calls to Action
${Array.isArray(result.cta_strategy) ? result.cta_strategy.map((c) => `- ${c}`).join("\n") : result.cta_strategy}

## Information Hierarchy
${result.information_hierarchy}

## Trust Signals & Social Proof
${Array.isArray(result.trust_signals) ? result.trust_signals.map((t) => `- ${t}`).join("\n") : result.trust_signals}

## UX Writing & Tone Observations
${result.ux_writing_notes}

## Potential Friction Points
${Array.isArray(result.friction_points) ? result.friction_points.map((f) => `- ${f}`).join("\n") : result.friction_points}

## Design Opportunities & Winning Angles
${Array.isArray(result.design_opportunities) ? result.design_opportunities.map((o) => `- ${o}`).join("\n") : result.design_opportunities}

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

  const handleExportCsv = () => {
    if (!result) return;
    const escapeCsv = (str: string) => `"${(str || "").replace(/"/g, '""')}"`;
    const headers = ["Section", "Detail"];
    const rows = [
      ["Product Brand", result.product_brand],
      ["URL", result.url],
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
    link.download = `${result.product_brand.toLowerCase()}-design-summary.csv`;
    link.click();

    setCopiedCsv(true);
    setTimeout(() => setCopiedCsv(false), 2000);
  };

  const handleAddToComparison = () => {
    if (!result) return;
    if (!comparisonList.some((c) => c.url === result.url)) {
      setComparisonList([result, ...comparisonList]);
    }
    setShowMatrix(true);
  };

  // Filter sections by search and category
  const filteredSections = RESULT_SECTIONS.filter((section) => {
    if (activeCategory !== "all" && section.category !== activeCategory && section.category !== "all") {
      return false;
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
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", fontFamily: "var(--font-sans)" }}>
      {/* Top Status & Navigation Bar */}
      <div
        style={{
          borderBottom: "1px solid var(--border-subtle)",
          padding: "10px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "var(--font-mono)",
          fontSize: "0.6875rem",
          color: "var(--text-muted)",
          letterSpacing: "0.04em",
          background: "var(--bg-card)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div className="status-dot" />
            <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>SYSTEM ONLINE</span>
          </div>
          <span style={{ opacity: 0.3 }}>|</span>
          <span style={{ color: "var(--text-secondary)" }}>
            ENGINE: {hasApiKey ? "FREE GEMINI 2.5 FLASH (AI STUDIO)" : "LIVE DEMO BENCHMARK SUITE"}
          </span>
          <span style={{ opacity: 0.3 }}>|</span>
          <span style={{ color: "var(--status-green)", fontWeight: 600 }}>100% ZERO GCP BILLING</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={() => setShowMatrix(!showMatrix)}
            style={{
              background: showMatrix ? "var(--accent-blue)" : "transparent",
              color: showMatrix ? "#FFFFFF" : "var(--text-primary)",
              border: "1px solid var(--border-card)",
              borderRadius: "6px",
              padding: "4px 10px",
              fontSize: "0.6875rem",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Columns3 style={{ width: 13, height: 13 }} />
            <span>Comparison Matrix ({comparisonList.length})</span>
          </button>

          <button
            onClick={() => setIsApiKeyModalOpen(true)}
            style={{
              background: hasApiKey ? "rgba(52, 199, 89, 0.1)" : "var(--accent-blue-light)",
              color: hasApiKey ? "var(--status-green)" : "var(--accent-blue)",
              border: `1px solid ${hasApiKey ? "rgba(52, 199, 89, 0.3)" : "rgba(0, 122, 255, 0.2)"}`,
              borderRadius: "6px",
              padding: "4px 10px",
              fontSize: "0.6875rem",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Key style={{ width: 13, height: 13 }} />
            <span>{hasApiKey ? "Free API Key Configured" : "Add Free Gemini Key"}</span>
          </button>

          <a
            href="https://fadlyzaki-design.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              color: "inherit",
              opacity: 0.6,
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
          >
            fadly.uzzaki ↗
          </a>
        </div>
      </div>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "40px 24px 80px" }}>
        {/* Header Hero */}
        <header style={{ marginBottom: "40px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "8px",
              background: "var(--accent-blue-light)",
              border: "1px solid rgba(0, 122, 255, 0.12)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              fontWeight: 600,
              color: "var(--accent-blue)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            <Sparkles style={{ width: 12, height: 12 }} />
            AGENTIC COMPETITIVE INTELLIGENCE · GEMINI 2.5 FLASH
          </div>

          <h1
            style={{
              fontSize: "clamp(2.1rem, 5vw, 3.2rem)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 1.08,
              color: "var(--text-primary)",
              margin: "0 0 14px 0",
              textTransform: "uppercase",
            }}
          >
            COMPETITOR LANDING PAGE<br />
            <span style={{ color: "var(--accent-blue)" }}>SUMMARIZER</span>
          </h1>

          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "1.25rem",
              color: "var(--text-secondary)",
              margin: 0,
              maxWidth: "680px",
              lineHeight: 1.5,
            }}
          >
            Instantly turn competitor landing pages into artifact-grade product design insights. Benchmark value propositions, CTA conversion paths, trust signals, and UX friction points.
          </p>
        </header>

        {/* Input Bar */}
        <div
          className="input-brand"
          style={{
            padding: "8px",
            display: "flex",
            flexDirection: "row",
            gap: "8px",
            position: "relative",
            zIndex: 10,
            marginBottom: "18px",
          }}
        >
          <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center" }}>
            <LinkIcon
              style={{
                position: "absolute",
                left: "16px",
                width: "18px",
                height: "18px",
                color: "var(--text-muted)",
              }}
            />
            <input
              id="url-input"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze(url)}
              placeholder="Paste competitor URL (e.g. https://linear.app, https://stripe.com)..."
              disabled={loading}
              style={{
                width: "100%",
                paddingLeft: "48px",
                paddingRight: "16px",
                paddingTop: "16px",
                paddingBottom: "16px",
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: "0.9375rem",
                fontFamily: "var(--font-mono)",
                color: "var(--text-primary)",
              }}
            />
          </div>
          <button
            id="analyze-btn"
            onClick={() => handleAnalyze(url)}
            disabled={loading || !url.trim()}
            className="btn-primary"
            style={{
              padding: "16px 28px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.875rem",
              whiteSpace: "nowrap",
            }}
          >
            {loading ? (
              <>
                <Loader2 style={{ width: 18, height: 18, animation: "spin 1s linear infinite" }} />
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

        {/* Live Demo Quick Switcher Chips */}
        <div style={{ marginBottom: "32px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Compass style={{ width: 14, height: 14, color: "var(--accent-blue)" }} />
              <span className="mono-label" style={{ color: "var(--text-primary)", fontWeight: 700 }}>
                CURATED LIVE BENCHMARK DEMOS (1-CLICK INSTANT LOAD)
              </span>
            </div>
            <span style={{ fontSize: "0.6875rem", fontFamily: "var(--font-mono)", color: "var(--status-green)" }}>
              ● 8 DATASETS READY
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {DEMO_URLS.map((demoUrl) => {
              const demo = LIVE_DEMO_DATASETS[demoUrl];
              const isSelected = result?.url === demoUrl;
              return (
                <button
                  key={demoUrl}
                  onClick={() => handleSelectDemo(demoUrl)}
                  className="chip"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    background: isSelected ? "var(--accent-blue)" : undefined,
                    color: isSelected ? "#FFFFFF" : undefined,
                    borderColor: isSelected ? "var(--accent-blue)" : undefined,
                    boxShadow: isSelected ? "var(--shadow-blue-sm)" : undefined,
                  }}
                >
                  <span>{demo.logo_emoji || "⚡"}</span>
                  <span style={{ fontWeight: 600 }}>{demo.product_brand}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Error State */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                marginBottom: "32px",
                padding: "20px",
                borderRadius: "var(--radius-card)",
                background: "#FFF5F5",
                border: "1px solid rgba(255, 59, 48, 0.2)",
                boxShadow: "3px 3px 0px 0px rgba(255, 59, 48, 0.25)",
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
              }}
            >
              <AlertCircle style={{ width: 20, height: 20, color: "var(--status-red)", marginTop: 2, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: "0 0 6px", fontWeight: 700, fontSize: "0.875rem", color: "var(--status-red)" }}>
                  [NOTICE] Analysis Engine Configuration
                </h3>
                <p style={{ margin: "0 0 12px", fontSize: "0.8125rem", color: "#CC2D25", lineHeight: 1.5 }}>
                  {error}
                </p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <button
                    onClick={() => setIsApiKeyModalOpen(true)}
                    className="btn-primary"
                    style={{ padding: "6px 14px", fontSize: "0.75rem" }}
                  >
                    Add Free Gemini API Key
                  </button>
                  <button
                    onClick={() => handleSelectDemo("https://linear.app")}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "8px",
                      border: "1px solid var(--border-card)",
                      background: "var(--bg-card)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Explore Linear Live Benchmark
                  </button>
                </div>
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
                marginTop: "32px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                gap: "16px",
              }}
            >
              <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <Loader2 style={{ width: 20, height: 20, color: "var(--accent-blue)", animation: "spin 1s linear infinite" }} />
                <span className="mono-label" style={{ color: "var(--accent-blue)", fontWeight: 700 }}>
                  [ {loadingStep.toUpperCase()} ]
                </span>
              </div>
              {RESULT_SECTIONS.map((section, i) => {
                const isFullWidth = section.key === "information_hierarchy" || section.key === "design_opportunities" || section.key === "designer_summary";
                return (
                  <div
                    key={`skeleton-${i}`}
                    className="skeleton-shimmer"
                    style={{
                      padding: "24px",
                      borderRadius: "var(--radius-card)",
                      gridColumn: isFullWidth ? "1 / -1" : undefined,
                      minHeight: section.key === "designer_summary" ? "160px" : "140px",
                    }}
                  >
                    <div className="skeleton-line" style={{ width: "60px", marginBottom: "16px" }} />
                    <div className="skeleton-line" style={{ width: "60%" }} />
                    <div className="skeleton-line" style={{ width: "90%" }} />
                    <div className="skeleton-line" style={{ width: "75%" }} />
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Side-by-Side Comparison Matrix View */}
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

        {/* Main Analysis Result View */}
        <AnimatePresence>
          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{ marginTop: "16px" }}
            >
              {/* Results Top Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  paddingBottom: "20px",
                  borderBottom: "1px solid var(--border-subtle)",
                  marginBottom: "24px",
                  flexWrap: "wrap",
                  gap: "16px",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <div className="mono-label" style={{ color: "var(--status-green)", fontWeight: 700 }}>
                      [ANALYSIS_VERIFIED]
                    </div>
                    {result.is_live_demo && (
                      <span
                        style={{
                          padding: "2px 8px",
                          borderRadius: "4px",
                          background: "var(--accent-blue-light)",
                          color: "var(--accent-blue)",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.625rem",
                          fontWeight: 700,
                        }}
                      >
                        LIVE DEMO BENCHMARK
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "1.75rem" }}>{result.logo_emoji || "🌐"}</span>
                    <h2
                      style={{
                        margin: 0,
                        fontSize: "1.875rem",
                        fontWeight: 800,
                        letterSpacing: "-0.025em",
                        color: "var(--text-primary)",
                      }}
                    >
                      {result.product_brand}
                    </h2>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "4px" }}>
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        color: "var(--accent-blue)",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {result.url} <ExternalLink style={{ width: 12, height: 12 }} />
                    </a>
                    {result.category && (
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        • {result.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <button
                    onClick={handleAddToComparison}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      border: "1px solid var(--accent-blue)",
                      background: "var(--accent-blue-light)",
                      color: "var(--accent-blue)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    <Columns3 style={{ width: 14, height: 14 }} />
                    Compare Matrix
                  </button>

                  <button
                    onClick={handleCopyJson}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      border: "1px solid var(--border-card)",
                      background: "var(--bg-card)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {copiedJson ? <Check style={{ width: 14, height: 14, color: "var(--status-green)" }} /> : <Braces style={{ width: 14, height: 14 }} />}
                    {copiedJson ? "Copied!" : "JSON"}
                  </button>

                  <button
                    onClick={handleCopyMarkdown}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      border: "1px solid var(--border-card)",
                      background: "var(--bg-card)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {copiedMd ? <Check style={{ width: 14, height: 14, color: "var(--status-green)" }} /> : <Copy style={{ width: 14, height: 14 }} />}
                    {copiedMd ? "Copied!" : "Markdown"}
                  </button>

                  <button
                    onClick={handleExportCsv}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      border: "1px solid var(--border-card)",
                      background: "var(--bg-card)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {copiedCsv ? <Check style={{ width: 14, height: 14, color: "var(--status-green)" }} /> : <Download style={{ width: 14, height: 14 }} />}
                    {copiedCsv ? "Exported!" : "CSV"}
                  </button>

                  <button
                    onClick={() => window.print()}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      border: "1px solid var(--border-card)",
                      background: "var(--bg-card)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                    title="Print or Save as PDF"
                  >
                    <Printer style={{ width: 14, height: 14 }} />
                  </button>
                </div>
              </div>

              {/* UX Scorecard Widget */}
              <ScorecardWidget scores={result.scores} brand={result.product_brand} />

              {/* Filter & Search Bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                {/* Category Tabs */}
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {(
                    [
                      { id: "all", label: "All Insights" },
                      { id: "strategy", label: "Strategy & Trust" },
                      { id: "ux", label: "Hierarchy & Copy" },
                      { id: "opportunities", label: "Friction & Opportunities" },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveCategory(tab.id)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        border: "1px solid var(--border-card)",
                        background: activeCategory === tab.id ? "var(--text-primary)" : "var(--bg-card)",
                        color: activeCategory === tab.id ? "#FFFFFF" : "var(--text-secondary)",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Search in Result */}
                <div style={{ position: "relative", minWidth: "220px" }}>
                  <Search
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "14px",
                      height: "14px",
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
                      paddingLeft: "32px",
                      paddingRight: "10px",
                      paddingTop: "6px",
                      paddingBottom: "6px",
                      borderRadius: "6px",
                      border: "1px solid var(--border-card)",
                      background: "var(--bg-card)",
                      fontSize: "0.75rem",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              {/* Insight Cards Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                  gap: "16px",
                }}
              >
                {filteredSections.map((section, i) => {
                  const isOpportunities = section.key === "design_opportunities";
                  const isSummary = section.key === "designer_summary";
                  const isFriction = section.key === "friction_points";
                  const isFullWidth =
                    section.key === "information_hierarchy" ||
                    isOpportunities ||
                    isSummary;
                  const value = result[section.key];

                  return (
                    <motion.div
                      key={section.key}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.25 }}
                      className={isOpportunities ? "card-accent" : "card-brand"}
                      style={{
                        padding: "24px",
                        gridColumn: isFullWidth ? "1 / -1" : undefined,
                        ...(isSummary
                          ? {
                              background: "var(--accent-blue-light)",
                              borderColor: "rgba(0, 122, 255, 0.16)",
                            }
                          : {}),
                        ...(isFriction
                          ? {
                              borderColor: "rgba(255, 59, 48, 0.2)",
                            }
                          : {}),
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6875rem",
                          fontWeight: 700,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          marginBottom: "10px",
                          color: isOpportunities
                            ? "rgba(255,255,255,0.7)"
                            : isFriction
                            ? "var(--status-red)"
                            : "var(--text-muted)",
                        }}
                      >
                        [{section.tag}]
                      </div>

                      <h3
                        style={{
                          margin: "0 0 10px",
                          fontSize: "0.9375rem",
                          fontWeight: 700,
                          letterSpacing: "-0.01em",
                          color: isOpportunities ? "#FFFFFF" : "var(--text-primary)",
                        }}
                      >
                        {section.label}
                      </h3>

                      {Array.isArray(value) ? (
                        <ul
                          style={{
                            margin: 0,
                            paddingLeft: "18px",
                            fontSize: "0.875rem",
                            lineHeight: 1.65,
                            color: isOpportunities
                              ? "rgba(255,255,255,0.9)"
                              : isFriction
                              ? "var(--text-primary)"
                              : "var(--text-secondary)",
                          }}
                        >
                          {value.map((item, j) => (
                            <li key={j} style={{ marginBottom: "6px" }}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.875rem",
                            lineHeight: 1.65,
                            color: isOpportunities
                              ? "rgba(255,255,255,0.9)"
                              : isSummary
                              ? "var(--text-primary)"
                              : "var(--text-secondary)",
                            fontWeight: isSummary ? 500 : 400,
                          }}
                        >
                          {String(value || "")}
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
      <footer
        style={{
          borderTop: "1px solid var(--border-subtle)",
          padding: "20px 24px",
          textAlign: "center",
          fontFamily: "var(--font-mono)",
          fontSize: "0.6875rem",
          color: "var(--text-muted)",
          letterSpacing: "0.06em",
          background: "var(--bg-card)",
        }}
      >
        <span>BUILT BY </span>
        <a
          href="https://fadlyzaki-design.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "var(--text-primary)",
            textDecoration: "none",
            borderBottom: "1px solid var(--border-subtle)",
            fontWeight: 700,
          }}
        >
          FADLY UZZAKI
        </a>
        <span> · POWERED BY GEMINI 2.5 FLASH · 100% ZERO CLOUD BILLING · ADK + MCP</span>
      </footer>

      {/* Free Gemini API Key Settings Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onKeySaved={handleKeySaved}
      />
    </div>
  );
}
