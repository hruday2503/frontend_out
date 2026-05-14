export default function PerspectiveLines() {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, height: "55vh",
      pointerEvents: "none", zIndex: 0, overflow: "hidden", background: "none",
    }}>
      <svg
        width="100%" height="100%"
        viewBox="0 0 1600 500"
        preserveAspectRatio="xMidYMin slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        <defs>
          <linearGradient id="fadeMask" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="white" stopOpacity="1"  />
            <stop offset="75%"  stopColor="white" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="white" stopOpacity="0"  />
          </linearGradient>
          <mask id="lineFade">
            <rect x="0" y="0" width="1600" height="500" fill="url(#fadeMask)" />
          </mask>
        </defs>
        <g mask="url(#lineFade)">
          {/* Horizontal converging lines */}
          {Array.from({ length: 20 }).map((_, i) => {
            const vp = { x: 800, y: -40 };
            const y      = 10 + i * (490 / 19);
            const xLeft  = vp.x - (vp.x * (y - vp.y)) / (800 - vp.y);
            const xRight = vp.x + ((1600 - vp.x) * (y - vp.y)) / (800 - vp.y);
            const opacity = 0.06 + i * 0.013;
            return (
              <line key={"h" + i}
                x1={Math.max(-300, xLeft)} y1={y}
                x2={Math.min(1900, xRight)} y2={y}
                stroke={`rgba(170,130,255,${opacity})`} strokeWidth="0.8"
              />
            );
          })}
          {/* Vertical radiating lines */}
          {Array.from({ length: 30 }).map((_, i) => {
            const vp = { x: 800, y: -40 };
            const t       = i / 29;
            const opacity = 0.03 + Math.sin(t * Math.PI) * 0.11;
            return (
              <line key={"v" + i}
                x1={vp.x} y1={vp.y}
                x2={t * 1600} y2={520}
                stroke={`rgba(160,120,240,${opacity})`} strokeWidth="0.7"
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}
