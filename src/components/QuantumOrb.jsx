export default function QuantumOrb() {
  return (
    <div style={{ position: "relative", width: 280, height: 280, flexShrink: 0 }}>
      <img
        src="/sphere_image.png"
        alt="Quantum Sphere"
        onError={(e) => console.error("Image not found at:", e.target.src)}
        style={{
          width: 280, height: 280,
          objectFit: "contain", display: "block",
          animation: "sphereSpin 12s linear infinite",
          filter: "brightness(1.1) saturate(1.2)",
        }}
      />
      <style>{`
        @keyframes sphereSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
