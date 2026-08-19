/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { AnalysisResult, LIVE_DEMO_DATASETS, DEMO_URLS } from "../lib/liveDemos";
import { X, Plus, Download, Copy, Check, ExternalLink, Search } from "lucide-react";

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
  const [addMenuSearch, setAddMenuSearch] = useState("");

  const availableToAdd = DEMO_URLS.filter(
    (url) => !selectedItems.some((item) => item.url === url)
  ).filter((url) => {
    if (!addMenuSearch.trim()) return true;
    const item = LIVE_DEMO_DATASETS[url];
    const q = addMenuSearch.toLowerCase();
    return (
      item.product_brand.toLowerCase().includes(q) ||
      (item.category || "").toLowerCase().includes(q) ||
      item.url.toLowerCase().includes(q)
    );
  });

  const handleExportMarkdown = () => {
    let md = `# Competitor Landing Page Comparison Matrix\n\n`;
    md += `| Dimension | ${selectedItems.map((i) => `**${i.product_brand}** (${i.url})`).join(" | ")} |\n`;
    md += `|---|${selectedItems.map(() => "---").join("|")}|\n`;

    md += `| **Core Value Prop** | ${selectedItems.map((i) => i.core_value_proposition.replace(/\|/g, "\\|")).join(" | ")} |\n`;
    md += `| **Target Audience** | ${selectedItems.map((i) => i.target_audience.replace(/\|/g, "\\|")).join(" | ")} |\n`;
    md += `| **Main CTAs** | ${selectedItems.map((i) => i.cta_strategy.join("<br>").replace(/\|/g, "\\|")).join(" | ")} |\n`;
    md += `| **Trust Signals** | ${selectedItems.map((i) => i.trust_signals.join("<br>").replace(/\|/g, "\\|")).join(" | ")} |\n`;
    md += `| **Friction Points** | ${selectedItems.map((i) => i.friction_points.join("<br>").replace(/\|/g, "\\|")).join(" | ")} |\n`;
    md += `| **Design Opportunities** | ${selectedItems.map((i) => i.design_opportunities.join("<br>").replace(/\|/g, "\\|")).join(" | ")} |\n`;
    md += `| **Designer Summary** | ${selectedItems.map((i) => i.designer_summary.replace(/\|/g, "\\|")).join(" | ")} |\n`;

    navigator.clipboard.writeText(md);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const handleExportCsv = () => {
    const escapeCsv = (str: string) => `"${(str || "").replace(/"/g, '""')}"`;
    const headers = ["Dimension", ...selectedItems.map((i) => i.product_brand)];

    const rows = [
      ["URL", ...selectedItems.map((i) => i.url)],
      ["Category", ...selectedItems.map((i) => i.category || "")],
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
    link.download = `competitor-matrix-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();

    setCopiedCsv(true);
    setTimeout(() => setCopiedCsv(false), 2000);
  };

  return (
    <div
      style={{
        background: "var(--bg-surface)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border-card)",
        boxShadow: "var(--shadow-card)",
        marginBottom: "32px",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
          background: "var(--bg-subtle)",
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)" }}>
            Side-by-Side Comparison Matrix
          </h2>
          <p style={{ margin: "2px 0 0", fontSize: "0.75rem", color: "var(--text-muted)" }}>
            Benchmarking {selectedItems.length} products across core design dimensions
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          {/* Add Competitor with Search */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
              className="btn-action-compare"
              style={{ padding: "6px 12px", fontSize: "0.75rem" }}
            >
              <Plus style={{ width: 13, height: 13 }} />
              Add Competitor ({availableToAdd.length} available)
            </button>

            {isAddMenuOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  marginTop: "6px",
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-card)",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "var(--shadow-modal)",
                  minWidth: "260px",
                  maxHeight: "320px",
                  zIndex: 50,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ padding: "8px", borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-subtle)" }}>
                  <div style={{ position: "relative" }}>
                    <Search style={{ position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)", width: "12px", height: "12px", color: "var(--text-muted)" }} />
                    <input
                      type="text"
                      value={addMenuSearch}
                      onChange={(e) => setAddMenuSearch(e.target.value)}
                      placeholder="Search 100 benchmarks..."
                      style={{
                        width: "100%",
                        paddingLeft: "26px",
                        paddingRight: "8px",
                        paddingTop: "4px",
                        paddingBottom: "4px",
                        fontSize: "0.75rem",
                        borderRadius: "4px",
                        border: "1px solid var(--border-card)",
                        outline: "none",
                      }}
                      autoFocus
                    />
                  </div>
                </div>

                <div style={{ overflowY: "auto", flex: 1, maxHeight: "240px" }}>
                  {availableToAdd.length === 0 ? (
                    <div style={{ padding: "12px", fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center" }}>
                      No matching competitors
                    </div>
                  ) : (
                    availableToAdd.map((u) => {
                      const demo = LIVE_DEMO_DATASETS[u];
                      return (
                        <button
                          key={u}
                          onClick={() => {
                            onAddItem(demo);
                            setIsAddMenuOpen(false);
                            setAddMenuSearch("");
                          }}
                          style={{
                            width: "100%",
                            padding: "8px 12px",
                            textAlign: "left",
                            background: "transparent",
                            border: "none",
                            fontSize: "0.8125rem",
                            color: "var(--text-primary)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "8px",
                            borderBottom: "1px solid var(--border-subtle)",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-hover)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          <span style={{ fontWeight: 500 }}>{demo.product_brand}</span>
                          <span style={{ fontSize: "0.6875rem", color: "var(--text-muted)" }}>{demo.group || demo.category}</span>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>

          <button onClick={handleExportMarkdown} className="btn-action-markdown" style={{ padding: "6px 12px", fontSize: "0.75rem" }}>
            {copiedMd ? <Check style={{ width: 13, height: 13 }} /> : <Copy style={{ width: 13, height: 13 }} />}
            {copiedMd ? "Copied" : "Copy Markdown"}
          </button>

          <button onClick={handleExportCsv} className="btn-action-csv" style={{ padding: "6px 12px", fontSize: "0.75rem" }}>
            {copiedCsv ? <Check style={{ width: 13, height: 13 }} /> : <Download style={{ width: 13, height: 13 }} />}
            {copiedCsv ? "Exported" : "CSV"}
          </button>

          <button
            onClick={onClose}
            style={{
              padding: "6px",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-subtle)",
              background: "var(--bg-surface)",
              color: "var(--text-muted)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title="Close comparison"
          >
            <X style={{ width: 15, height: 15 }} />
          </button>
        </div>
      </div>

      {/* Scrollable Matrix Table */}
      <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.8125rem",
            textAlign: "left",
            minWidth: `${selectedItems.length * 280 + 160}px`,
          }}
        >
          <thead>
            <tr style={{ background: "var(--bg-subtle)" }}>
              <th
                style={{
                  padding: "14px 18px",
                  width: "160px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  borderBottom: "1px solid var(--border-card)",
                  position: "sticky",
                  left: 0,
                  background: "var(--bg-subtle)",
                  zIndex: 20,
                }}
              >
                Dimension
              </th>
              {selectedItems.map((item) => (
                <th
                  key={item.url}
                  style={{
                    padding: "14px 18px",
                    borderBottom: "1px solid var(--border-card)",
                    borderLeft: "1px solid var(--border-subtle)",
                    verticalAlign: "top",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px" }}>
                    <div>
                      <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "2px" }}>
                        {item.product_brand}
                      </div>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          fontSize: "0.6875rem",
                          fontFamily: "var(--font-mono)",
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
                          padding: "2px",
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
            <MatrixRow label="Value Proposition" items={selectedItems} render={(i) => (
              <p style={{ margin: 0, color: "var(--text-primary)", lineHeight: 1.5 }}>
                {i.core_value_proposition}
              </p>
            )} />

            <MatrixRow label="Target Audience" items={selectedItems} render={(i) => (
              <p style={{ margin: 0, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                {i.target_audience}
              </p>
            )} />

            <MatrixRow label="Calls to Action" items={selectedItems} render={(i) => (
              <ul style={{ margin: 0, paddingLeft: "16px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                {i.cta_strategy.map((cta, idx) => (
                  <li key={idx} style={{ marginBottom: "3px" }}>{cta}</li>
                ))}
              </ul>
            )} />

            <MatrixRow label="Trust Signals" items={selectedItems} render={(i) => (
              <ul style={{ margin: 0, paddingLeft: "16px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                {i.trust_signals.map((ts, idx) => (
                  <li key={idx} style={{ marginBottom: "3px" }}>{ts}</li>
                ))}
              </ul>
            )} />

            <MatrixRow label="Friction Points" items={selectedItems} render={(i) => (
              <ul style={{ margin: 0, paddingLeft: "16px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                {i.friction_points.map((fp, idx) => (
                  <li key={idx} style={{ marginBottom: "3px" }}>{fp}</li>
                ))}
              </ul>
            )} />

            <MatrixRow label="Design Opportunities" items={selectedItems} render={(i) => (
              <ul style={{ margin: 0, paddingLeft: "16px", color: "var(--accent-blue)", lineHeight: 1.5 }}>
                {i.design_opportunities.map((opp, idx) => (
                  <li key={idx} style={{ marginBottom: "3px" }}>{opp}</li>
                ))}
              </ul>
            )} />

            <MatrixRow label="Designer Takeaway" items={selectedItems} render={(i) => (
              <p style={{ margin: 0, fontSize: "0.75rem", fontStyle: "italic", color: "var(--text-secondary)", lineHeight: 1.5 }}>
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
  items,
  render,
}: {
  label: string;
  items: AnalysisResult[];
  render: (item: AnalysisResult) => React.ReactNode;
}) {
  return (
    <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
      <td
        style={{
          padding: "14px 18px",
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "var(--text-secondary)",
          verticalAlign: "top",
          position: "sticky",
          left: 0,
          background: "var(--bg-surface)",
          zIndex: 10,
          borderRight: "1px solid var(--border-card)",
        }}
      >
        {label}
      </td>
      {items.map((item) => (
        <td
          key={item.url}
          style={{
            padding: "14px 18px",
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
