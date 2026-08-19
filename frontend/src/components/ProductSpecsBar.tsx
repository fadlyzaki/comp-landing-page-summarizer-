/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProductSpecs } from "../lib/liveDemos";
import { Users, DollarSign, ArrowUpRight, Palette } from "lucide-react";

interface Props {
  specs?: ProductSpecs;
  brand: string;
}

export function ProductSpecsBar({ specs, brand }: Props) {
  if (!specs) return null;

  const items = [
    {
      label: "Target Segment",
      value: specs.primary_segment,
      icon: <Users style={{ width: 14, height: 14, color: "#4B5563" }} />,
    },
    {
      label: "Monetization",
      value: specs.monetization_model,
      icon: <DollarSign style={{ width: 14, height: 14, color: "#4B5563" }} />,
    },
    {
      label: "Conversion Model",
      value: specs.conversion_path,
      icon: <ArrowUpRight style={{ width: 14, height: 14, color: "#4B5563" }} />,
    },
    {
      label: "Design Signature",
      value: specs.design_signature,
      icon: <Palette style={{ width: 14, height: 14, color: "#4B5563" }} />,
    },
  ];

  return (
    <div
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        padding: "16px 20px",
        boxShadow: "var(--shadow-card)",
        marginBottom: "20px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        {items.map((item) => (
          <div key={item.label}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.6875rem",
                fontWeight: 600,
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                fontFamily: "var(--font-mono)",
                marginBottom: "4px",
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
            <div
              style={{
                fontSize: "0.8125rem",
                fontWeight: 500,
                color: "var(--text-primary)",
                lineHeight: 1.4,
              }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
