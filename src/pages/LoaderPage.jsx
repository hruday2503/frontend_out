import { useState, useEffect } from "react";
import PerspectiveLines from "../components/PerspectiveLines.jsx";
import { PAGE_BG } from "../constants/index.js";

export default function LoaderPage({ message = "Processing...", subMessage = "" }) {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setDots(d => (d + 1) % 4), 420);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      ...PAGE_BG,
      fontFamily: "'Space Grotesk', sans-serif",
      color: "#e2d9f3",
      position: "relative", overflow: "hidden",
    }}>
      <PerspectiveLines />

      <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 32px" }}>

        {/* Animated rings */}
        <div style={{ position: "relative", width: 110, height: 110, margin: "0 auto 36px" }}>
          <svg width="110" height="110" viewBox="0 0 110 110"
            style={{ position: "absolute", inset: 0, animation: "spinRing 1.4s linear infinite" }}>
            <circle cx="55" cy="55" r="48" fill="none" stroke="rgba(167,139,250,0.15)" strokeWidth="4"/>
            <circle cx="55" cy="55" r="48" fill="none" stroke="url(#ringGrad)" strokeWidth="4"
              strokeDasharray="80 222" strokeLinecap="round"/>
            <defs>
              <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%"   stopColor="#f97316"/>
                <stop offset="100%" stopColor="#a78bfa"/>
              </linearGradient>
            </defs>
          </svg>

          <svg width="110" height="110" viewBox="0 0 110 110"
            style={{ position: "absolute", inset: 0, animation: "spinRingRev 2.2s linear infinite" }}>
            <circle cx="55" cy="55" r="34" fill="none" stroke="rgba(249,115,22,0.12)" strokeWidth="2.5"/>
            <circle cx="55" cy="55" r="34" fill="none" stroke="#f97316" strokeWidth="2.5"
              strokeDasharray="40 174" strokeLinecap="round" opacity="0.7"/>
          </svg>

          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: 16, height: 16, borderRadius: "50%",
            background: "radial-gradient(circle, #f97316, #c2410c)",
            boxShadow: "0 0 18px rgba(249,115,22,0.8)",
            animation: "pulseDot 1.4s ease-in-out infinite",
          }}/>
        </div>

        <div style={{
          fontSize: 22, fontWeight: 700, color: "#f0e6ff",
          letterSpacing: "0.06em", marginBottom: 10,
        }}>
          {message}{".".repeat(dots)}
        </div>

        {subMessage && (
          <div style={{ fontSize: 13, color: "#a78bfa", letterSpacing: "0.1em", fontWeight: 500 }}>
            {subMessage}
          </div>
        )}

        <div style={{
          width: 220, height: 2, background: "rgba(167,139,250,0.15)",
          borderRadius: 2, margin: "28px auto 0", overflow: "hidden",
        }}>
          <div style={{
            height: "100%",
            background: "linear-gradient(90deg, #f97316, #a78bfa)",
            borderRadius: 2,
            animation: "progressBar 1.4s ease-in-out infinite",
          }}/>
        </div>
      </div>

      <style>{`
        @keyframes spinRing    { from{transform:rotate(0deg)}    to{transform:rotate(360deg)}   }
        @keyframes spinRingRev { from{transform:rotate(0deg)}    to{transform:rotate(-360deg)}  }
        @keyframes pulseDot    {
          0%,100% { transform:translate(-50%,-50%) scale(1);   opacity:1;   }
          50%     { transform:translate(-50%,-50%) scale(1.4); opacity:0.7; }
        }
        @keyframes progressBar {
          0%   { width:0%;    margin-left:0;    }
          60%  { width:100%;  margin-left:0;    }
          100% { width:0%;    margin-left:100%; }
        }
      `}</style>
    </div>
  );
}
