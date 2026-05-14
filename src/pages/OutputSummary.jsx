export default function OutputSummary({
  depots = "0",
  quantity = "0",
  fleet = "0",
  vehiclesUsed = "0",
  unservedJobs = "0",
  cost = "0.00",
  distance = "0.00",
  duration = "0.00",
  driving = "0.00",
  serving = "0.00",
  waiting = "0.00",
}) {
  const metrics = [
    { label: "Total Depots", value: depots },
    { label: "Total Orders", value: quantity },
    { label: "Total Fleet", value: fleet },
    { label: "Vehicles Used", value: vehiclesUsed },
    { label: "Unserved Jobs", value: unservedJobs },
    { label: "Total Cost", value: cost },
    { label: "Total Distance Travelled", value: distance },
    { label: "Total Duration", value: duration },
    { label: "Driving Time", value: driving },
    { label: "Serving Time", value: serving },
    { label: "Waiting Time", value: waiting },
  ];

  return (
    <div
      style={{
        margin: "24px 20px 32px",
        padding: "24px",
        background: "rgba(20,10,35,0.7)",
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <h3
        style={{
          fontSize: 18,
          fontWeight: 700,
          fontFamily: "'Space Grotesk', sans-serif",
          color: "#f0e6ff",
          margin: "0 0 20px",
        }}
      >
        Route Summary
      </h3>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {metrics.map((item, i) => (
          <div
            key={i}
            style={{
              background: "rgba(40,18,58,0.5)",
              padding: "12px 16px",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#a78bfa",
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "#f0e6ff",
                fontFamily: "'Exo 2', sans-serif",
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