/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Key, X, Check, ExternalLink, AlertCircle, Loader2, Trash2 } from "lucide-react";
import { getStoredGeminiKey, setStoredGeminiKey, testGeminiApiKey } from "../lib/geminiAnalyzer";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onKeySaved: (key: string) => void;
}

export function ApiKeyModal({ isOpen, onClose, onKeySaved }: Props) {
  const [keyInput, setKeyInput] = useState(getStoredGeminiKey());
  const [testing, setTesting] = useState(false);
  const [testStatus, setTestStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    setStoredGeminiKey(keyInput);
    onKeySaved(keyInput);
    onClose();
  };

  const handleTestKey = async () => {
    if (!keyInput.trim()) {
      setTestStatus("error");
      setErrorMessage("Please enter an API key first.");
      return;
    }
    setTesting(true);
    setTestStatus("idle");
    setErrorMessage("");

    try {
      await testGeminiApiKey(keyInput);
      setTestStatus("success");
    } catch (err: any) {
      setTestStatus("error");
      setErrorMessage(err.message || "Failed to validate key. Check if it is active.");
    } finally {
      setTesting(false);
    }
  };

  const handleClear = () => {
    setKeyInput("");
    setStoredGeminiKey("");
    onKeySaved("");
    setTestStatus("idle");
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: "16px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: "var(--bg-card)",
          borderRadius: "16px",
          border: "1px solid var(--border-card)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)",
          width: "100%",
          maxWidth: "520px",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "var(--accent-blue-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Key style={{ width: 18, height: 18, color: "var(--accent-blue)" }} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                AI Engine Settings
              </h3>
              <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                FREE_TIER_GEMINI_KEY · ZERO_GCP_CREDITS_REQUIRED
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "6px",
              borderRadius: "6px",
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X style={{ width: 18, height: 18 }} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px" }}>
          <div
            style={{
              padding: "14px 16px",
              borderRadius: "10px",
              background: "rgba(52, 199, 89, 0.08)",
              border: "1px solid rgba(52, 199, 89, 0.2)",
              marginBottom: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <Check style={{ width: 16, height: 16, color: "var(--status-green)" }} />
              <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--status-green)" }}>
                100% Free Tier Supported
              </span>
            </div>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              You do <strong>not</strong> need Google Cloud credits or Vertex AI billing. Google AI Studio provides free Gemini 2.5 Flash API keys with high rate limits.
            </p>
          </div>

          <label
            style={{
              display: "block",
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              marginBottom: "8px",
            }}
          >
            Google AI Studio API Key (Gemini)
          </label>

          <div style={{ position: "relative", marginBottom: "12px" }}>
            <input
              type="password"
              value={keyInput}
              onChange={(e) => {
                setKeyInput(e.target.value);
                setTestStatus("idle");
              }}
              placeholder="AIzaSy..."
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "8px",
                border: "1.5px solid var(--border-card)",
                background: "var(--bg-primary)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.875rem",
                color: "var(--text-primary)",
                outline: "none",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--accent-blue)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border-card)")}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "var(--accent-blue)",
                textDecoration: "none",
              }}
            >
              Get a free API key at Google AI Studio <ExternalLink style={{ width: 12, height: 12 }} />
            </a>

            <button
              onClick={handleTestKey}
              disabled={testing || !keyInput.trim()}
              style={{
                background: "transparent",
                border: "1px solid var(--border-card)",
                padding: "6px 12px",
                borderRadius: "6px",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                cursor: testing ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              {testing ? (
                <>
                  <Loader2 style={{ width: 12, height: 12, animation: "spin 1s linear infinite" }} />
                  Testing...
                </>
              ) : (
                "Test Key"
              )}
            </button>
          </div>

          {/* Test Status Banner */}
          {testStatus === "success" && (
            <div
              style={{
                padding: "10px 14px",
                borderRadius: "8px",
                background: "rgba(52, 199, 89, 0.1)",
                border: "1px solid rgba(52, 199, 89, 0.25)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.75rem",
                color: "var(--status-green)",
                marginBottom: "16px",
              }}
            >
              <Check style={{ width: 14, height: 14 }} />
              API Key is active and verified! Ready for live analysis.
            </div>
          )}

          {testStatus === "error" && (
            <div
              style={{
                padding: "10px 14px",
                borderRadius: "8px",
                background: "rgba(255, 59, 48, 0.1)",
                border: "1px solid rgba(255, 59, 48, 0.25)",
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                fontSize: "0.75rem",
                color: "var(--status-red)",
                marginBottom: "16px",
              }}
            >
              <AlertCircle style={{ width: 14, height: 14, marginTop: 2, flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          <p style={{ fontSize: "0.6875rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.4 }}>
            🔒 <strong>Privacy Note:</strong> Your key is stored strictly inside your local browser storage (<code style={{ fontFamily: "var(--font-mono)" }}>localStorage</code>) and is sent directly to the official Google Gemini endpoint. It is never logged or stored on any intermediate server.
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid var(--border-subtle)",
            background: "var(--bg-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {getStoredGeminiKey() ? (
            <button
              onClick={handleClear}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--status-red)",
                fontSize: "0.75rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Trash2 style={{ width: 14, height: 14 }} /> Remove Key
            </button>
          ) : (
            <span />
          )}

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={onClose}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                border: "1px solid var(--border-card)",
                background: "var(--bg-card)",
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "var(--text-secondary)",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="btn-primary"
              style={{
                padding: "8px 20px",
                borderRadius: "8px",
                fontSize: "0.8125rem",
              }}
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
