import { useState, useEffect } from "react";
import SpindleLogo from "../components/SpindleLogo.jsx";
import QuantumOrb from "../components/QuantumOrb.jsx";
import PerspectiveLines from "../components/PerspectiveLines.jsx";
import { NAV_LINKS, FOOTER_LINKS, PAGE_BG } from "../constants/index.js";

export default function HomePage({ onReview, onTools }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <div style={{
      minHeight: "100vh",
      ...PAGE_BG,
      fontFamily: "'Space Grotesk', 'Exo 2', sans-serif",
      color: "#e2d9f3", overflowX: "hidden", position: "relative",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Exo+2:wght@300;400;600;700&display=swap" rel="stylesheet"/>

      <PerspectiveLines />

      {/* Scanline */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{
          position: "absolute", left: 0, right: 0, height: "60px",
          background: "linear-gradient(180deg, transparent, rgba(160,100,255,0.03), transparent)",
          animation: "scanline 8s linear infinite",
        }}/>
      </div>

      {/* Navbar */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        borderBottom: "1px solid rgba(99,60,180,0.4)",
        background: "rgba(37,13,46,0.85)", backdropFilter: "blur(12px)",
        padding: "0 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 60,
        animation: mounted ? "fadeIn 0.6s ease forwards" : "none",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <SpindleLogo height={32} />
          <div style={{ width: 1, height: 24, background: "rgba(249,115,22,0.35)", margin: "0 2px" }}/>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: "#c4b5d4" }}>
            Vehicle Routing Optimizer
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {NAV_LINKS.map(l => (
            <a key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#c4b5d4", fontSize: 13, letterSpacing: "0.05em", textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#f0e6ff"}
              onMouseLeave={e => e.target.style.color = "#c4b5d4"}
            >{l.label}</a>
          ))}
          <button onClick={onTools} style={{
            background: "rgba(167,139,250,0.12)",
            border: "1px solid rgba(167,139,250,0.3)", borderRadius: 6, padding: "8px 16px",
            color: "#c4b5d4", fontWeight: 700, fontSize: 13, letterSpacing: "0.06em",
            cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(167,139,250,0.2)"; e.currentTarget.style.color = "#f0e6ff"; e.currentTarget.style.borderColor = "rgba(167,139,250,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(167,139,250,0.12)"; e.currentTarget.style.color = "#c4b5d4"; e.currentTarget.style.borderColor = "rgba(167,139,250,0.3)"; }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M9 17H7A5 5 0 017 7h2M15 7h2a5 5 0 010 10h-2M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            Tools
          </button>
          <button onClick={() => window.open("https://spindlequantum.com/contact-us", "_blank", "noopener,noreferrer")} style={{
            background: "linear-gradient(135deg, #f97316, #ea580c)",
            border: "none", borderRadius: 6, padding: "8px 18px",
            color: "white", fontWeight: 700, fontSize: 13, letterSpacing: "0.06em",
            cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
            boxShadow: "0 0 16px rgba(249,115,22,0.35)",
            transition: "transform 0.15s, box-shadow 0.15s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 0 24px rgba(249,115,22,0.55)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)";    e.currentTarget.style.boxShadow = "0 0 16px rgba(249,115,22,0.35)"; }}
          >
            Contact Us <span>→</span>
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        maxWidth: 1100, margin: "0 auto", padding: "64px 32px 0",
        position: "relative", zIndex: 1,
        animation: mounted ? "fadeUp 0.8s ease forwards" : "none",
      }}>
        <div style={{ display: "flex", gap: 40, alignItems: "center", borderRadius: 12, padding: "32px 36px" }}>
          <div style={{ borderRadius: 10, padding: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <QuantumOrb />
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, lineHeight: 1.25,
              color: "#f0e6ff", marginBottom: 20, letterSpacing: "0.01em",
              borderLeft: "3px solid #f97316", paddingLeft: 16,
            }}>
              Quantum computing offers a viable approach to optimizing Vehicle Routing Problem
            </h1>
            <p style={{ fontSize: 14.5, lineHeight: 1.75, color: "#c4b5d4", fontFamily: "'Exo 2', sans-serif", fontWeight: 300, marginBottom: 20 }}>
              The Vehicle Routing Problem (VRP) is an NP‑hard optimization challenge, meaning that finding the best possible solution becomes computationally infeasible as the problem size grows. While it is relatively easy to verify whether a given route plan is valid, identifying the optimal solution becomes exponentially more complex with an increasing number of customers, vehicles, and operational constraints.
Quantum‑enhanced hybrid optimization techniques are well suited to address these challenges. By combining quantum algorithms with classical methods, these approaches improve solution quality, speed, and cost efficiency. Through more accurate order assignment and vehicle routing, businesses can significantly reduce transportation costs and improve overall distribution efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* ── Capability & Strategic Advantage ── */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 32px 0", position: "relative", zIndex: 1 }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16, background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: 20, padding: "5px 16px" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#f97316", animation: "featPulse 2s ease-in-out infinite" }}/>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#fb923c", letterSpacing: "0.14em" }}>ALL INTEGRATED ADVANCED VRP CAPABILITIES</span>
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(26px,3.5vw,38px)", fontWeight: 700, color: "#f0e6ff", margin: "0 0 12px", lineHeight: 1.15 }}>
            Capability &amp; Strategic <span style={{ color: "#f97316" }}>Advantage</span>
          </h2>
          <p style={{ fontSize: 15, color: "#8070a0", fontFamily: "'Exo 2', sans-serif", fontWeight: 300, margin: 0 }}>
            Purpose-built for hard VRP and constraint-heavy logistics optimization
          </p>
        </div>

        {/* Feature cards grid — row 1 */}
        {[
          [
            { icon: "⊙", label: "Heterogeneous Fleet",    desc: "Mixed vehicle types, capacities and capabilities in a single solve." },
            { icon: "⊙", label: "Multi Depot",            desc: "Route from multiple origin depots simultaneously with optimal assignment." },
            { icon: "⊙", label: "Time Window(s)",         desc: "Hard and soft time-window constraints per stop or delivery." },
            { icon: "⊙", label: "Pickup–Delivery Order",  desc: "Paired pickup-and-delivery tasks with precedence enforcement." },
          ],
          [
            { icon: "⊙", label: "Skill Matching",         desc: "Match driver skills and vehicle certifications to job requirements." },
            { icon: "⊙", label: "Order Compatibility",    desc: "Constraint-aware order grouping and load compatibility rules." },
            { icon: "⊙", label: "Multi-trip",             desc: "Vehicles make multiple trips from depot within a single shift." },
            { icon: "⊙", label: "Open VRP",               desc: "Routes that don't require vehicles to return to the depot." },
          ],
        ].map((row, ri) => (
          <div key={ri} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 16 }}>
            {row.map((card, ci) => (
              <div key={ci} style={{
                background: "rgba(30,12,50,0.7)",
                border: "1px solid rgba(167,139,250,0.13)",
                borderRadius: 14, padding: "24px 20px",
                backdropFilter: "blur(10px)",
                position: "relative", overflow: "hidden",
                cursor: "default",
                transition: "border-color 0.25s, transform 0.25s, box-shadow 0.25s",
                animation: `fadeUp 0.6s ease ${0.05 * (ri * 4 + ci)}s both`,
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(249,115,22,0.45)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(249,115,22,0.15)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(167,139,250,0.13)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Background texture lines */}
                <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(135deg, rgba(167,139,250,0.03) 0px, rgba(167,139,250,0.03) 1px, transparent 1px, transparent 12px)", borderRadius: 14, pointerEvents: "none" }}/>
                {/* Check icon */}
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(167,139,250,0.12)", border: "1px solid rgba(167,139,250,0.25)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3.5 3.5L13 4" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#f0e6ff", fontFamily: "'Space Grotesk', sans-serif", marginBottom: 8, letterSpacing: "0.02em" }}>{card.label}</div>
                <div style={{ fontSize: 12, color: "#7060a0", fontFamily: "'Exo 2', sans-serif", lineHeight: 1.6, fontWeight: 300 }}>{card.desc}</div>
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* ── Review CTA ── */}
      <section style={{
        maxWidth: 1100, margin: "0 auto", padding: "72px 32px 80px",
        position: "relative", zIndex: 1,
        animation: mounted ? "fadeUp 1s ease 0.2s both forwards" : "none",
        opacity: mounted ? undefined : 0,
      }}>
        {/* CTA card */}
        <div style={{ background: "rgba(40,18,60,0.6)", borderRadius: 20, padding: "52px 40px", border: "1px solid rgba(167,139,250,0.15)", textAlign: "center", backdropFilter: "blur(12px)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.08) 0%, transparent 60%)", pointerEvents: "none" }}/>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: "#f97316", textTransform: "uppercase", marginBottom: 16 }}>QUANTUM VRP DEMO</div>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 700, color: "#f0e6ff", margin: "0 0 12px" }}>
            Ready to run your logistics scenario?
          </h3>
          <p style={{ fontSize: 14, color: "#8070a0", fontFamily: "'Exo 2', sans-serif", margin: "0 0 32px" }}>
            Load your input, review the parameters, and watch the quantum solver optimise your routes.
          </p>
          <button onClick={onReview} style={{
            background: "linear-gradient(135deg, #f97316, #ea580c)",
            border: "none", borderRadius: 10, padding: "14px 52px",
            color: "white", fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700, fontSize: 16, letterSpacing: "0.1em",
            cursor: "pointer", boxShadow: "0 0 28px rgba(249,115,22,0.5), 0 4px 20px rgba(0,0,0,0.3)", transition: "all 0.3s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.06) translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 48px rgba(249,115,22,0.7), 0 8px 32px rgba(0,0,0,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) translateY(0)";       e.currentTarget.style.boxShadow = "0 0 28px rgba(249,115,22,0.5), 0 4px 20px rgba(0,0,0,0.3)"; }}
          >
            Review Inputs →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid rgba(99,60,180,0.35)",
        background: "rgba(37,13,46,0.7)", backdropFilter: "blur(8px)",
        padding: "48px 32px 32px", position: "relative", zIndex: 1,
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 40, alignItems: "start" }}>
          <div>
            <div style={{ marginBottom: 12 }}><SpindleLogo height={26} /></div>
            <p style={{ fontSize: 12, color: "#8b7aa0", lineHeight: 1.6, fontFamily: "'Exo 2', sans-serif" }}>
              Quantum-woven AI solutions that transform enterprise possibilities into reality.
              Weaving the future of intelligent business automation.
            </p>
          </div>
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7c6a90", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, marginBottom: 14 }}>
                {section}
              </h4>
              {links.map(l => (
                <div key={l.label} style={{ marginBottom: 10 }}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#c4b5d4", textDecoration: "none", fontFamily: "'Exo 2', sans-serif", transition: "color 0.2s" }}
                    onMouseEnter={e => e.target.style.color = "#f0e6ff"}
                    onMouseLeave={e => e.target.style.color = "#c4b5d4"}
                  >{l.label}</a>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ maxWidth: 1100, margin: "32px auto 0", borderTop: "1px solid rgba(99,60,180,0.2)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "#5a4870", fontFamily: "'Exo 2', sans-serif" }}>
            Copyright @ 2026 Spindle™ Quantum Pvt. Ltd All rights reserved.
          </span>
          <span style={{ fontSize: 11, color: "#5a4870", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.1em" }}>
            Terms of Use & Privacy Policy
          </span>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn    { from{opacity:0}                            to{opacity:1}                          }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scanline  { 0%{top:-60px} 100%{top:100%} }
        @keyframes featPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.7)} }
      `}</style>
    </div>
  );
}
