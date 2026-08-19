/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UXScores } from "../lib/liveDemos";
import { Sparkles, ShieldCheck, Zap, Gauge } from "lucide-react";

interface Props {
  scores?: UXScores;
  brand: string;
}

export function ScorecardWidget({ scores, brand }: Props) {
  if (!scores) return null;

  const average = Math.round(
    (scores.valuePropClarity +
      scores.conversionVelocity +
      scores.trustDensity +
      scores.frictionResistance) /
      4
  );

  const getScoreBadge = (avg: number) => {
    if (avg >= 92) return { label: "ELITE UX STANDARD", color: "var(--status-green)", bg: "rgba(52, 199, 89, 0.1)" };
    if (avg >= 85) return { label: "HIGH SIGNAL BENCHMARK", color: "var(--accent-blue)", bg: "rgba(0, 122, 255, 0.1)" };
    return { label: "STANDARD BENCHMARK", color: "var(--accent-amber)", bg: "rgba(245, 166, 35, 0.1)" };
  };

  const badge = getScoreBadge(average);

  const metrics = [
    {
      label: "Value Prop Clarity",
      value: scores.valuePropClarity,
      icon: <Sparkles style={{ width: 14, height: 14, color: "var(--accent-blue)" }} />,
      desc: "How quickly visitors grasp what is built and why it matters.",
    },
    {
      label: "Conversion Velocity",
      value: scores.conversionVelocity,
      icon: <Zap style={{ width: 14, height: 14, color: "#F5A623" }} />,
      desc: "Frictionless path to initial signup or primary CTA.",
    },
    {
      label: "Trust & Proof Density",
      value: scores.trustDensity,
      icon: <ShieldCheck style={{ width: 14, height: 14, color: "#34C759" }} />,
      desc: "Volume and credibility of social proof, metrics, and compliance.",
    },
    {
      label: "Friction Resistance",
      value: scores.frictionResistance,
      icon: <Gauge style={{ width: 14, height: 14, color: "#AF52DE" }} />,
      desc: "Resistance against cognitive overload and ambiguous copy.",
    },
  ];

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-card)",
        borderRadius: "var(--radius-card)",
        padding: "20px 24px",
        boxShadow: "var(--shadow-card)",
        marginBottom: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "20px",
          borderBottom: "1px solid var(--border-subtle)",
          paddingBottom: "14px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              color: "var(--text-muted)",
              textTransform: "uppercase",
            }}
          >
            [UX_SIGNAL_SCORECARD]
          </div>
          <span style={{ color: "var(--border-subtle)" }}>•</span>
          <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-primary)" }}>
            {brand} Landing Page Efficiency
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              padding: "4px 10px",
              borderRadius: "6px",
              background: badge.bg,
              color: badge.color,
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              border: `1px solid ${badge.color}33`,
            }}
          >
            {badge.label}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1.25rem",
              fontWeight: 800,
              color: "var(--text-primary)",
              display: "flex",
              alignItems: "baseline",
              gap: "2px",
            }}
          >
            <span>{average}</span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>/100</span>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "18px",
        }}
      >
        {metrics.map((m) => (
          <div key={m.label}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "6px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                {m.icon}
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--text-secondary)",
                  }}
                >
                  {m.label}
                </span>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                }}
              >
                {m.value}%
              </span>
            </div>

            {/* Progress Track */}
            <div
              style={{
                width: "100%",
                height: "6px",
                borderRadius: "3px",
                background: "var(--border-subtle)",
                overflow: "hidden",
                marginBottom: "4px",
              }}
            >
              <div
                style={{
                  width: `${m.value}%`,
                  height: "100%",
                  background:
                    m.value >= 90
                      ? "linear-gradient(90deg, #007AFF, #34C759)"
                      : m.value >= 80
                      ? "linear-gradient(90deg, #007AFF, #5856D6)"
                      : "linear-gradient(90deg, #F5A623, #FF9500)",
                  borderRadius: "3px",
                  transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            </div>
            <div
              style={{
                fontSize: "0.6875rem",
                color: "var(--text-muted)",
                lineHeight: 1.3,
              }}
            >
              {m.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
