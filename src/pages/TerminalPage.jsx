




import SpindleLogo from "../components/SpindleLogo.jsx";
import PerspectiveLines from "../components/PerspectiveLines.jsx";
import { PAGE_BG, INPUT_SUMMARY_ROWS } from "../constants/index.js";
import data from "../data/demo_input_2.json"; // ✅ sync import

export default function TerminalPage({ onBack, onNext }) {
  // process JSON instantly (no state, no effect)
  let jsonLines = [];
  let rawJson = "";

  try {
    rawJson = JSON.stringify(data, null, 2);
    jsonLines = rawJson.split("\n");
  } catch {
    jsonLines = ['"Error: could not load demo_input_2.json"'];
  }

  return (
    <div style={{
      minHeight: "100vh",
      paddingBottom: 32,
      ...PAGE_BG,
      fontFamily: "'Exo 2', 'Space Grotesk', sans-serif",
      color: "#e2d9f3",
      position: "relative",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Exo+2:wght@300;400;600;700&display=swap" rel="stylesheet"/>
      <PerspectiveLines />

      {/* Top bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 20px",
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(37,13,46,0.7)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={onBack}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#c4b5d4",
              display: "flex",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13 4L7 10L13 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 17,
            color: "#f97316",
            letterSpacing: "0.04em",
          }}>
            Go Back
          </span>
        </div>
        <SpindleLogo height={22} />
      </div>

      {/* Content */}
      <div style={{
        margin: "24px 16px 0",
        background: "rgba(40,18,60,0.7)",
        borderRadius: 16,
        padding: "28px 20px",
        border: "1px solid rgba(255,255,255,0.06)",
      }}>
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 28,
          fontWeight: 700,
          color: "#f0e6ff",
          margin: "0 0 20px",
          letterSpacing: "0.06em",
        }}>
          Input Summary
        </h1>

        {/* Summary rows */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20 }}>
          {INPUT_SUMMARY_ROWS.map((item, i) => (
            <div key={i} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: "14px 0",
              borderBottom: i < INPUT_SUMMARY_ROWS.length - 1
                ? "1px solid rgba(255,255,255,0.06)"
                : "none",
            }}>
              <div style={{
                fontSize: 17.5,
                fontWeight: 700,
                color: "#a78bfa",
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                width: "38%",
              }}>
                {item.label}
              </div>
              <div style={{
                fontSize: 17.5,
                color: "#f0e6ff",
                fontFamily: "'Exo 2', sans-serif",
                textAlign: "right",
                lineHeight: 1.5,
              }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* JSON Viewer */}
        <div style={{
          marginTop: 28,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: 20,
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 14,
          }}>
            <span style={{
              fontSize: 15,
              fontWeight: 600,
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#d4c5e8",
            }}>
              Input JSON
            </span>

            <button
              onClick={() => navigator.clipboard.writeText(rawJson)}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 8,
                padding: "6px 14px",
                cursor: "pointer",
                color: "#c4b5d4",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              Copy
            </button>
          </div>

          <div style={{
            background: "rgba(15,7,28,0.85)",
            borderRadius: 10,
            padding: "16px",
            fontFamily: "monospace",
            fontSize: 12.5,
            lineHeight: 1.9,
            maxHeight: 340,
            overflowY: "auto",
          }}>
            {jsonLines.map((l, i) => {
              let color = "#d4c5e8";
              if (/^\s*"[^"]+":/.test(l)) color = "#c084fc";
              if (/:\s*"[^"]*"/.test(l)) color = "#86efac";
              if (/:\s*-?[\d.]+/.test(l)) color = "#f97316";
              return (
                <div key={i} style={{ color, whiteSpace: "pre" }}>
                  {l}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Submit */}
      <div style={{ textAlign: "center", margin: "15px 10px 0" }}>
        <button
          onClick={onNext}
          style={{
            background: "linear-gradient(135deg, #f97316, #ea580c)",
            border: "none",
            borderRadius: 8,
            padding: "12px 44px",
            color: "white",
            fontWeight: 700,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          SUBMIT →
        </button>
      </div>
    </div>
  );
}