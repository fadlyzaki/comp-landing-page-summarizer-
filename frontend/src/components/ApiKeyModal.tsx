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
      setErrorMessage(err.message || "Failed to validate key. Please verify that the key is active.");
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
        backgroundColor: "rgba(15, 23, 42, 0.4)",
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
          background: "var(--bg-surface)",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--border-subtle)",
          boxShadow: "var(--shadow-modal)",
          width: "100%",
          maxWidth: "480px",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "18px 24px",
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
                borderRadius: "var(--radius-md)",
                background: "var(--bg-subtle)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Key style={{ width: 16, height: 16, color: "var(--text-secondary)" }} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-primary)" }}>
                API Key Configuration
              </h3>
              <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)" }}>
                For live URL analysis using Google Gemini
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
              borderRadius: "var(--radius-sm)",
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
        <div style={{ padding: "20px 24px" }}>
          <div
            style={{
              padding: "12px 16px",
              borderRadius: "var(--radius-md)",
              background: "var(--bg-subtle)",
              border: "1px solid var(--border-subtle)",
              marginBottom: "18px",
            }}
          >
            <p style={{ margin: 0, fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              You can use a free-tier Gemini key from Google AI Studio. No credit card or Google Cloud billing is required.
            </p>
          </div>

          <label
            style={{
              display: "block",
              fontSize: "0.8125rem",
              fontWeight: 500,
              color: "var(--text-primary)",
              marginBottom: "6px",
            }}
          >
            Gemini API Key
          </label>

          <div style={{ position: "relative", marginBottom: "10px" }}>
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
                padding: "10px 12px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-card)",
                background: "var(--bg-surface)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.8125rem",
                color: "var(--text-primary)",
                outline: "none",
                transition: "border-color 0.15s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--border-focus)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border-card)")}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
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
                color: "var(--accent-blue)",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Get a free API key at Google AI Studio <ExternalLink style={{ width: 11, height: 11 }} />
            </a>

            <button
              onClick={handleTestKey}
              disabled={testing || !keyInput.trim()}
              className="btn-secondary"
              style={{ padding: "4px 10px", fontSize: "0.75rem" }}
            >
              {testing ? (
                <>
                  <Loader2 style={{ width: 12, height: 12, animation: "spin 1s linear infinite" }} />
                  Verifying...
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
                padding: "8px 12px",
                borderRadius: "var(--radius-md)",
                background: "var(--status-green-bg)",
                border: "1px solid var(--status-green-border)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.75rem",
                color: "var(--status-green)",
                marginBottom: "14px",
              }}
            >
              <Check style={{ width: 14, height: 14 }} />
              API key verified successfully.
            </div>
          )}

          {testStatus === "error" && (
            <div
              style={{
                padding: "8px 12px",
                borderRadius: "var(--radius-md)",
                background: "var(--status-red-bg)",
                border: "1px solid var(--status-red-border)",
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                fontSize: "0.75rem",
                color: "var(--status-red)",
                marginBottom: "14px",
              }}
            >
              <AlertCircle style={{ width: 14, height: 14, marginTop: 2, flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          <p style={{ fontSize: "0.6875rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.4 }}>
            Stored locally in your browser (<code style={{ fontFamily: "var(--font-mono)" }}>localStorage</code>).
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "14px 24px",
            borderTop: "1px solid var(--border-subtle)",
            background: "var(--bg-subtle)",
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
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Trash2 style={{ width: 13, height: 13 }} /> Remove Key
            </button>
          ) : (
            <span />
          )}

          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={onClose} className="btn-secondary" style={{ padding: "6px 14px" }}>
              Cancel
            </button>
            <button onClick={handleSave} className="btn-primary" style={{ padding: "6px 16px" }}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
