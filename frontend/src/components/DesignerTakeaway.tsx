/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Compass, Sparkles } from "lucide-react";

interface Props {
  summary: string;
  brand: string;
}

export function DesignerTakeaway({ summary, brand }: Props) {
  if (!summary) return null;

  return (
    <div
      style={{
        marginTop: "24px",
        borderRadius: "var(--radius-lg)",
        background: "linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)",
        border: "1px solid #DBEAFE",
        padding: "20px 24px",
        boxShadow: "var(--shadow-card)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "6px",
              background: "#DBEAFE",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Compass style={{ width: 14, height: 14, color: "#1D4ED8" }} />
          </div>
          <span
            style={{
              fontSize: "0.8125rem",
              fontWeight: 700,
              color: "#1E3A8A",
              letterSpacing: "-0.01em",
            }}
          >
            Senior Designer Executive Takeaway
          </span>
        </div>

        <span
          style={{
            fontSize: "0.6875rem",
            fontFamily: "var(--font-mono)",
            fontWeight: 600,
            color: "#3B82F6",
            background: "#FFFFFF",
            border: "1px solid #BFDBFE",
            padding: "2px 8px",
            borderRadius: "9999px",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Sparkles style={{ width: 10, height: 10 }} />
          {brand} Analysis
        </span>
      </div>

      <p
        style={{
          margin: 0,
          fontSize: "0.875rem",
          lineHeight: 1.65,
          color: "#1E293B",
          fontWeight: 450,
        }}
      >
        "{summary}"
      </p>
    </div>
  );
}
