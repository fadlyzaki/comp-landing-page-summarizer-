/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { AnalysisResult, LIVE_DEMO_DATASETS, DEMO_URLS } from "../lib/liveDemos";
import { X, Plus, Download, Copy, Check, Sparkles, ExternalLink } from "lucide-react";

interface Props {
  selectedItems: AnalysisResult[];
  onRemoveItem: (url: string) => void;
  onAddItem: (item: AnalysisResult) => void;
  onClose: () => void;
}

export function ComparisonMatrix({
  selectedItems,
  onRemoveItem,
  onAddItem,
  onClose,
}: Props) {
  const [copiedMd, setCopiedMd] = useState(false);
  const [copiedCsv, setCopiedCsv] = useState(false);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);

  const availableToAdd = DEMO_URLS.filter(
    (url) => !selectedItems.some((item) => item.url === url)
  );

  const handleExportMarkdown = () => {
    let md = `# Competitor Landing Page Comparison Matrix\n\n`;
    md += `| Criteria | ${selectedItems.map((i) => `**${i.product_brand}** (${i.url})`).join(" | ")} |\n`;
    md += `|---|${selectedItems.map(() => "---").join("|")}|\n`;

    // Row: Value Prop
    md += `| **Core Value Prop** | ${selectedItems.map((i) => i.core_value_proposition.replace(/\|/g, "\\|")).join(" | ")} |\n`;

    // Row: Target Audience
    md += `| **Target Audience** | ${selectedItems.map((i) => i.target_audience.replace(/\|/g, "\\|")).join(" | ")} |\n`;

    // Row: CTAs
    md += `| **Main CTAs** | ${selectedItems.map((i) => i.cta_strategy.join("<br>").replace(/\|/g, "\\|")).join(" | ")} |\n`;

    // Row: Trust Signals
    md += `| **Trust Signals** | ${selectedItems.map((i) => i.trust_signals.join("<br>").replace(/\|/g, "\\|")).join(" | ")} |\n`;

    // Row: Friction Points
    md += `| **Friction Points** | ${selectedItems.map((i) => i.friction_points.join("<br>").replace(/\|/g, "\\|")).join(" | ")} |\n`;

    // Row: Design Opportunities
    md += `| **Design Opportunities** | ${selectedItems.map((i) => i.design_opportunities.join("<br>").replace(/\|/g, "\\|")).join(" | ")} |\n`;

    // Row: Designer Summary
    md += `| **Designer Summary** | ${selectedItems.map((i) => i.designer_summary.replace(/\|/g, "\\|")).join(" | ")} |\n`;

    navigator.clipboard.writeText(md);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const handleExportCsv = () => {
    const escapeCsv = (str: string) => `"${(str || "").replace(/"/g, '""')}"`;
    const headers = ["Criteria", ...selectedItems.map((i) => i.product_brand)];

    const rows = [
      ["URL", ...selectedItems.map((i) => i.url)],
      ["Tagline", ...selectedItems.map((i) => i.tagline || "")],
      ["Core Value Proposition", ...selectedItems.map((i) => i.core_value_proposition)],
      ["Target Audience", ...selectedItems.map((i) => i.target_audience)],
      ["Main CTAs", ...selectedItems.map((i) => i.cta_strategy.join("; "))],
      ["Trust Signals", ...selectedItems.map((i) => i.trust_signals.join("; "))],
      ["UX Writing Notes", ...selectedItems.map((i) => i.ux_writing_notes)],
      ["Friction Points", ...selectedItems.map((i) => i.friction_points.join("; "))],
      ["Design Opportunities", ...selectedItems.map((i) => i.design_opportunities.join("; "))],
      ["Designer Summary", ...selectedItems.map((i) => i.designer_summary)],
    ];

    const csvContent =
      headers.map(escapeCsv).join(",") +
      "\n" +
      rows.map((r) => r.map(escapeCsv).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `competitor-comparison-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();

    setCopiedCsv(true);
    setTimeout(() => setCopiedCsv(false), 2000);
  };

  return (
    <div
      style={{
        background: "var(--bg-card)",
        borderRadius: "var(--radius-card)",
        border: "1.5px solid var(--border-card)",
        boxShadow: "var(--shadow-card)",
        marginBottom: "40px",
        overflow: "hidden",
      }}
    >
      {/* Top Header */}
      <div
        style={{
          padding: "20px 24px",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
          background: "rgba(245, 245, 247, 0.6)",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              color: "var(--accent-blue)",
              marginBottom: "4px",
            }}
          >
            [COMPETITOR_BENCHMARK_MATRIX]
          </div>
          <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)" }}>
            Side-by-Side Competitive Matrix ({selectedItems.length} Competitors)
          </h2>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          {/* Add Competitor Dropdown */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
              disabled={availableToAdd.length === 0}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 14px",
                borderRadius: "8px",
                border: "1px dashed var(--accent-blue)",
                background: "var(--accent-blue-light)",
                color: "var(--accent-blue)",
                fontSize: "0.75rem",
                fontWeight: 600,
                cursor: availableToAdd.length === 0 ? "not-allowed" : "pointer",
              }}
            >
              <Plus style={{ width: 14, height: 14 }} />
              Add Competitor
            </button>

            {isAddMenuOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  marginTop: "6px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-card)",
                  borderRadius: "10px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                  minWidth: "220px",
                  zIndex: 50,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "8px 12px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    color: "var(--text-muted)",
                    borderBottom: "1px solid var(--border-subtle)",
                  }}
                >
                  SELECT BENCHMARK TO ADD
                </div>
                {availableToAdd.map((u) => {
                  const demo = LIVE_DEMO_DATASETS[u];
                  return (
                    <button
                      key={u}
                      onClick={() => {
                        onAddItem(demo);
                        setIsAddMenuOpen(false);
                      }}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        textAlign: "left",
                        background: "transparent",
                        border: "none",
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        borderBottom: "1px solid var(--border-subtle)",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-primary)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <span>{demo.logo_emoji || "⚡"}</span>
                      <span>{demo.product_brand}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button
            onClick={handleExportMarkdown}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              borderRadius: "8px",
              border: "1px solid var(--border-card)",
              background: "var(--bg-card)",
              color: "var(--text-primary)",
              fontSize: "0.75rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {copiedMd ? <Check style={{ width: 14, height: 14, color: "var(--status-green)" }} /> : <Copy style={{ width: 14, height: 14 }} />}
            {copiedMd ? "Copied MD!" : "Copy MD Table"}
          </button>

          <button
            onClick={handleExportCsv}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              borderRadius: "8px",
              border: "1px solid var(--border-card)",
              background: "var(--bg-card)",
              color: "var(--text-primary)",
              fontSize: "0.75rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {copiedCsv ? <Check style={{ width: 14, height: 14, color: "var(--status-green)" }} /> : <Download style={{ width: 14, height: 14 }} />}
            {copiedCsv ? "Exported!" : "Export CSV"}
          </button>

          <button
            onClick={onClose}
            style={{
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid var(--border-card)",
              background: "var(--bg-card)",
              color: "var(--text-muted)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title="Close matrix view"
          >
            <X style={{ width: 16, height: 16 }} />
          </button>
        </div>
      </div>

      {/* Scrollable Matrix Table */}
      <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.875rem",
            textAlign: "left",
            minWidth: `${selectedItems.length * 300 + 200}px`,
          }}
        >
          <thead>
            <tr style={{ background: "var(--bg-primary)" }}>
              <th
                style={{
                  padding: "16px 20px",
                  width: "180px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  color: "var(--text-muted)",
                  borderBottom: "1px solid var(--border-card)",
                  position: "sticky",
                  left: 0,
                  background: "var(--bg-primary)",
                  zIndex: 20,
                }}
              >
                CRITERIA
              </th>
              {selectedItems.map((item) => (
                <th
                  key={item.url}
                  style={{
                    padding: "16px 20px",
                    borderBottom: "1px solid var(--border-card)",
                    borderLeft: "1px solid var(--border-subtle)",
                    verticalAlign: "top",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                        <span style={{ fontSize: "1.25rem" }}>{item.logo_emoji || "⚡"}</span>
                        <span style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--text-primary)" }}>
                          {item.product_brand}
                        </span>
                      </div>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6875rem",
                          color: "var(--accent-blue)",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        {item.url.replace("https://", "")} <ExternalLink style={{ width: 10, height: 10 }} />
                      </a>
                    </div>

                    {selectedItems.length > 1 && (
                      <button
                        onClick={() => onRemoveItem(item.url)}
                        style={{
                          background: "transparent",
                          border: "none",
                          padding: "4px",
                          color: "var(--text-muted)",
                          cursor: "pointer",
                        }}
                        title="Remove from comparison"
                      >
                        <X style={{ width: 14, height: 14 }} />
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Value Proposition */}
            <MatrixRow label="Core Value Prop" tag="VALUE_PROP" items={selectedItems} render={(i) => (
              <p style={{ margin: 0, fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.6 }}>
                {i.core_value_proposition}
              </p>
            )} />

            {/* Target Audience */}
            <MatrixRow label="Target Audience" tag="AUDIENCE" items={selectedItems} render={(i) => (
              <p style={{ margin: 0, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                {i.target_audience}
              </p>
            )} />

            {/* CTA Strategy */}
            <MatrixRow label="Main CTAs" tag="CTA" items={selectedItems} render={(i) => (
              <ul style={{ margin: 0, paddingLeft: "16px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                {i.cta_strategy.map((cta, idx) => (
                  <li key={idx} style={{ marginBottom: "4px" }}>{cta}</li>
                ))}
              </ul>
            )} />

            {/* Trust Signals */}
            <MatrixRow label="Trust Signals" tag="TRUST" items={selectedItems} render={(i) => (
              <ul style={{ margin: 0, paddingLeft: "16px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                {i.trust_signals.map((ts, idx) => (
                  <li key={idx} style={{ marginBottom: "4px" }}>{ts}</li>
                ))}
              </ul>
            )} />

            {/* Friction Points */}
            <MatrixRow label="Friction Points" tag="FRICTION" items={selectedItems} render={(i) => (
              <ul style={{ margin: 0, paddingLeft: "16px", color: "var(--status-red)", lineHeight: 1.5, opacity: 0.9 }}>
                {i.friction_points.map((fp, idx) => (
                  <li key={idx} style={{ marginBottom: "4px" }}>{fp}</li>
                ))}
              </ul>
            )} />

            {/* Design Opportunities */}
            <MatrixRow label="Design Opportunities" tag="OPPORTUNITIES" items={selectedItems} render={(i) => (
              <ul style={{ margin: 0, paddingLeft: "16px", color: "var(--accent-blue)", lineHeight: 1.5 }}>
                {i.design_opportunities.map((opp, idx) => (
                  <li key={idx} style={{ marginBottom: "4px" }}>{opp}</li>
                ))}
              </ul>
            )} />

            {/* Designer Summary */}
            <MatrixRow label="Designer Takeaway" tag="SUMMARY" items={selectedItems} render={(i) => (
              <p style={{ margin: 0, fontSize: "0.8125rem", fontStyle: "italic", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                "{i.designer_summary}"
              </p>
            )} />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MatrixRow({
  label,
  tag,
  items,
  render,
}: {
  label: string;
  tag: string;
  items: AnalysisResult[];
  render: (item: AnalysisResult) => React.ReactNode;
}) {
  return (
    <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
      <td
        style={{
          padding: "16px 20px",
          fontFamily: "var(--font-mono)",
          fontSize: "0.6875rem",
          fontWeight: 700,
          color: "var(--text-muted)",
          verticalAlign: "top",
          position: "sticky",
          left: 0,
          background: "var(--bg-card)",
          zIndex: 10,
          borderRight: "1px solid var(--border-card)",
        }}
      >
        <div style={{ color: "var(--accent-blue)", marginBottom: "4px" }}>[{tag}]</div>
        {label}
      </td>
      {items.map((item) => (
        <td
          key={item.url}
          style={{
            padding: "16px 20px",
            verticalAlign: "top",
            borderLeft: "1px solid var(--border-subtle)",
          }}
        >
          {render(item)}
        </td>
      ))}
    </tr>
  );
}
