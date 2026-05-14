// import SpindleLogo from "../components/SpindleLogo.jsx";
// import PerspectiveLines from "../components/PerspectiveLines.jsx";
// import OutputSummary from "../components/OutputSummary.jsx";
// import { PAGE_BG } from "../constants/index.js";

// const formatNumber = (value, decimals = 0) => {
//   const num = Number(value ?? 0);
//   return num.toLocaleString("en-US", {
//     minimumFractionDigits: decimals,
//     maximumFractionDigits: decimals,
//   });
// };

// const formatJSON = (json) => {
//   if (!json) return "";

//   return JSON.stringify(json, null, 2)
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;")
//     .replace(/"(.*?)":/g, '<span style="color:#a78bfa;">"$1"</span>:')
//     .replace(/: "(.*?)"/g, ': <span style="color:#c084fc;">"$1"</span>')
//     .replace(/: (-?\d+(\.\d+)?)/g, ': <span style="color:#f97316;">$1</span>')
//     .replace(/: (true|false)/g, ': <span style="color:#38bdf8;">$1</span>')
//     .replace(/: null/g, ': <span style="color:#6b7280;">null</span>');
// };

// export default function MappingPage({ data = {}, onBack }) {
//   const summary = data?.summary ?? {};
//   const statistic = data?.solution?.statistic ?? {};
//   const times = statistic?.times ?? {};

//   const cost = Number(summary?.fleet_cost ?? statistic?.cost ?? 0);
//   const distance = Number(summary?.total_distance ?? statistic?.distance ?? 0);
//   const duration = Number(summary?.total_duration ?? statistic?.duration ?? 0);

//   const totalFleet = Number(summary?.num_vehicles ?? 0);
//   const vehiclesUsed = Number(summary?.total_tours ?? data?.solution?.tours?.length ?? 0);
//   const numDepots = Number(summary?.num_depots ?? 0);
//   const totalOrders = Number(summary?.num_requests ?? 0);
//   const unservedJobs = Number(summary?.unserved_jobs ?? 0);

//   const drivingTime = Number(times?.driving ?? 0);
//   const servingTime = Number(times?.serving ?? 0);
//   const waitingTime = Number(times?.waiting ?? 0);

//   const preprocessingTime = Number(summary?.preprocessing_time ?? 0);
//   const quantumSolverTime = Number(summary?.quantum_solver_time ?? 0);
//   const postprocessingTime = Number(summary?.postprocessing_time ?? 0);
//   const totalTime = preprocessingTime + quantumSolverTime + postprocessingTime;

//   const mapHtml =
//     data?.map ||
//     "<div style='height:100%;display:flex;align-items:center;justify-content:center;background:#1a1025;color:#fff;font-family:sans-serif;'>No Map Data</div>";

//   const handleCopyJson = async () => {
//     try {
//       await navigator.clipboard.writeText(JSON.stringify(data || {}, null, 2));
//     } catch (err) {
//       console.error("Copy failed", err);
//     }
//   };

//   const handleDownloadJson = () => {
//     const blob = new Blob([JSON.stringify(data || {}, null, 2)], {
//       type: "application/json",
//     });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "output.json";
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         paddingBottom: 32,
//         ...PAGE_BG,
//         fontFamily: "'Exo 2', 'Space Grotesk', sans-serif",
//         color: "#e2d9f3",
//         position: "relative",
//       }}
//     >
//       <link
//         href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
//         rel="stylesheet"
//       />
//       <PerspectiveLines />

//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           padding: "16px 20px",
//           position: "sticky",
//           top: 0,
//           zIndex: 100,
//           background: "rgba(37,13,46,0.7)",
//           backdropFilter: "blur(12px)",
//         }}
//       >
//         <button
//           onClick={onBack}
//           style={{
//             background: "none",
//             border: "none",
//             cursor: "pointer",
//             color: "#c4b5d4",
//             display: "flex",
//             alignItems: "center",
//             gap: 6,
//           }}
//         >
//           <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
//             <path d="M13 4L7 10L13 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//           </svg>
//         </button>
//         <SpindleLogo height={28} />
//       </div>

//       <div style={{ padding: "20px 20px 12px" }}>
//         <h2
//           style={{
//             fontFamily: "'Space Grotesk', sans-serif",
//             fontSize: 26,
//             fontWeight: 700,
//             color: "#f0e6ff",
//             margin: 0,
//             letterSpacing: "0.06em",
//           }}
//         >
//           Visualization
//         </h2>
//       </div>

//       <div
//         style={{
//           margin: "0 20px",
//           borderRadius: 12,
//           overflow: "hidden",
//           position: "relative",
//           height: 280,
//         }}
//       >
//         <iframe
//           srcDoc={mapHtml}
//           sandbox="allow-scripts allow-same-origin"
//           style={{
//             width: "100%",
//             height: "100%",
//             border: "none",
//           }}
//           title="Logistics Map"
//         />
//       </div>

//       <div style={{ margin: "24px 20px 0" }}>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
//           <h2
//             style={{
//               fontSize: 22,
//               fontWeight: 700,
//               fontFamily: "'Space Grotesk', sans-serif",
//               margin: 0,
//               color: "#f0e6ff",
//             }}
//           >
//             Performance Summary
//           </h2>
//           <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
//             <circle cx="11" cy="11" r="7" stroke="#a78bfa" strokeWidth="1.5" />
//             <path d="M11 7v4l3 3" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" />
//           </svg>
//         </div>

//         <div
//           style={{
//             background: "rgba(20,10,35,0.7)",
//             borderRadius: 12,
//             border: "1px solid rgba(255,255,255,0.07)",
//             overflow: "hidden",
//           }}
//         >
//           {[
//             { label: "Quantum Platform", value: "Nvidia CudaQ" },
//             { label: "Pre-Processing Time", value: `${formatNumber(preprocessingTime, 2)} s` },
//             { label: "Post-Processing Time", value: `${formatNumber(postprocessingTime, 2)} s` },
//             { label: "Quantum Circuit Runtime", value: `${formatNumber(quantumSolverTime, 2)} s` },
//             { label: "Total Time", value: `${formatNumber(totalTime, 2)} s` },
//           ].map((item, i, arr) => (
//             <div
//               key={i}
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 padding: "16px 20px",
//                 borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
//                 background: i % 2 === 0 ? "rgba(55,25,75,0.4)" : "rgba(40,18,58,0.4)",
//               }}
//             >
//               <div
//                 style={{
//                   fontSize: 11,
//                   fontWeight: 700,
//                   color: "#a78bfa",
//                   fontFamily: "'Space Grotesk', sans-serif",
//                   letterSpacing: "0.14em",
//                   textTransform: "uppercase",
//                 }}
//               >
//                 {item.label}
//               </div>
//               <div
//                 style={{
//                   fontSize: 15,
//                   fontWeight: 700,
//                   color: "#f0e6ff",
//                   fontFamily: "'Space Grotesk', sans-serif",
//                   letterSpacing: "0.04em",
//                 }}
//               >
//                 {item.value}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div style={{ margin: "24px 20px 0" }}>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
//           <h2
//             style={{
//               fontSize: 22,
//               fontWeight: 700,
//               fontFamily: "'Space Grotesk', sans-serif",
//               margin: 0,
//               color: "#f0e6ff",
//             }}
//           >
//             Output JSON
//           </h2>

//           <div style={{ display: "flex", gap: 8 }}>
//             <button
//               onClick={handleCopyJson}
//               style={{
//                 width: 34,
//                 height: 34,
//                 borderRadius: 8,
//                 background: "rgba(255,255,255,0.1)",
//                 border: "none",
//                 cursor: "pointer",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//               title="Copy JSON"
//             >
//               <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
//                 <rect x="5" y="5" width="10" height="10" rx="2" stroke="#c4b5d4" strokeWidth="1.5" />
//                 <path d="M3 13V3h10" stroke="#c4b5d4" strokeWidth="1.5" strokeLinecap="round" />
//               </svg>
//             </button>

//             <button
//               onClick={handleDownloadJson}
//               style={{
//                 width: 34,
//                 height: 34,
//                 borderRadius: 8,
//                 background: "linear-gradient(135deg, #f97316, #ea580c)",
//                 border: "none",
//                 cursor: "pointer",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//               title="Download JSON"
//             >
//               <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
//                 <path d="M9 3v9m0 0L6 9m3 3l3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
//                 <path d="M3 14h12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         <div
//           style={{
//             background: "linear-gradient(135deg, rgba(20,10,35,0.95), rgba(40,18,58,0.9))",
//             borderRadius: 12,
//             padding: "20px",
//             fontFamily: "monospace",
//             fontSize: 13,
//             lineHeight: 1.7,
//             border: "1px solid rgba(167,139,250,0.2)",
//             whiteSpace: "pre-wrap",
//             wordBreak: "break-word",
//             overflowWrap: "anywhere",
//             overflowY: "auto",
//             overflowX: "hidden",
//             height: "320px",
//             scrollBehavior: "smooth",
//             boxShadow: "0 0 25px rgba(167,139,250,0.15)",
//           }}
//           dangerouslySetInnerHTML={{ __html: formatJSON(data) }}
//         />
//       </div>

//       <OutputSummary
//         depots={formatNumber(numDepots, 0)}
//         quantity={formatNumber(totalOrders, 0)}
//         fleet={formatNumber(totalFleet, 0)}
//         vehiclesUsed={formatNumber(vehiclesUsed, 0)}
//         unservedJobs={formatNumber(unservedJobs, 0)}
//         cost={formatNumber(cost, 2)}
//         distance={formatNumber(distance, 2)}
//         duration={formatNumber(duration, 2)}
//         driving={formatNumber(drivingTime, 2)}
//         serving={formatNumber(servingTime, 2)}
//         waiting={formatNumber(waitingTime, 2)}
//       />
//     </div>
//   );
// }

import SpindleLogo from "../components/SpindleLogo.jsx";
import PerspectiveLines from "../components/PerspectiveLines.jsx";
import OutputSummary from "../components/OutputSummary.jsx";
import { PAGE_BG } from "../constants/index.js";

const formatNumber = (value, decimals = 0) => {
  const num = Number(value ?? 0);
  return num.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

const formatJSON = (json) => {
  if (!json) return "";

  return JSON.stringify(json, null, 2)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"(.*?)":/g, '<span style="color:#a78bfa;">"$1"</span>:')
    .replace(/: "(.*?)"/g, ': <span style="color:#c084fc;">"$1"</span>')
    .replace(/: (-?\d+(\.\d+)?)/g, ': <span style="color:#f97316;">$1</span>')
    .replace(/: (true|false)/g, ': <span style="color:#38bdf8;">$1</span>')
    .replace(/: null/g, ': <span style="color:#6b7280;">null</span>');
};

export default function MappingPage({ data = {}, onBack }) {
  const summary = data?.summary ?? {};
  const solution = data?.solution ?? {};
  const statistic = solution?.statistic ?? {};
  const times = statistic?.times ?? {};

  const cost = Number(summary?.fleet_cost ?? statistic?.cost ?? 0);
  const distance = Number(summary?.total_distance ?? statistic?.distance ?? 0);
  const duration = Number(summary?.total_duration ?? statistic?.duration ?? 0);

  const totalFleet = Number(summary?.num_vehicles ?? 0);
  const vehiclesUsed = Number(summary?.total_tours ?? solution?.tours?.length ?? 0);
  const numDepots = Number(summary?.num_depots ?? 0);
  const totalOrders = Number(summary?.num_requests ?? 0);
  const unservedJobs = Number(summary?.unserved_jobs ?? 0);

  const drivingTime = Number(times?.driving ?? 0);
  const servingTime = Number(times?.serving ?? 0);
  const waitingTime = Number(times?.waiting ?? 0);

  const preprocessingTime = Number(summary?.preprocessing_time ?? 0);
  const quantumSolverTime = Number(summary?.quantum_solver_time ?? 0);
  const postprocessingTime = Number(summary?.postprocessing_time ?? 0);
  const totalTime = preprocessingTime + quantumSolverTime + postprocessingTime;

  const mapHtml =
    data?.map ||
    "<div style='height:100%;display:flex;align-items:center;justify-content:center;background:#1a1025;color:#fff;font-family:sans-serif;'>No Map Data</div>";

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(solution || {}, null, 2));
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const handleDownloadJson = () => {
    const blob = new Blob([JSON.stringify(solution || {}, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "solution.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingBottom: 32,
        ...PAGE_BG,
        fontFamily: "'Exo 2', 'Space Grotesk', sans-serif",
        color: "#e2d9f3",
        position: "relative",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <PerspectiveLines />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(37,13,46,0.7)",
          backdropFilter: "blur(12px)",
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#c4b5d4",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M13 4L7 10L13 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <SpindleLogo height={28} />
      </div>



      {/* Output JSON FIRST */}
      <div style={{ margin: "0 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 700,
              fontFamily: "'Space Grotesk', sans-serif",
              margin: 0,
              color: "#f0e6ff",
            }}
          >
            Output JSON
          </h2>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={handleCopyJson}
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: "rgba(255,255,255,0.1)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              title="Copy JSON"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="5" y="5" width="10" height="10" rx="2" stroke="#c4b5d4" strokeWidth="1.5" />
                <path d="M3 13V3h10" stroke="#c4b5d4" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <button
              onClick={handleDownloadJson}
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: "linear-gradient(135deg, #f97316, #ea580c)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              title="Download JSON"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 3v9m0 0L6 9m3 3l3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M3 14h12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, rgba(20,10,35,0.95), rgba(40,18,58,0.9))",
            borderRadius: 12,
            padding: "20px",
            fontFamily: "monospace",
            fontSize: 13,
            lineHeight: 1.7,
            border: "1px solid rgba(167,139,250,0.2)",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            overflowWrap: "anywhere",
            overflowY: "auto",
            overflowX: "hidden",
            height: "320px",
            scrollBehavior: "smooth",
            boxShadow: "0 0 25px rgba(167,139,250,0.15)",
          }}
          dangerouslySetInnerHTML={{ __html: formatJSON(solution) }}
        />
      </div>

      {/* Performance Summary SECOND */}
      <div style={{ margin: "24px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 700,
              fontFamily: "'Space Grotesk', sans-serif",
              margin: 0,
              color: "#f0e6ff",
            }}
          >
            Performance Summary
          </h2>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="7" stroke="#a78bfa" strokeWidth="1.5" />
            <path d="M11 7v4l3 3" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        <div
          style={{
            background: "rgba(20,10,35,0.7)",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.07)",
            overflow: "hidden",
          }}
        >
          {[
            { label: "Quantum Platform", value: "Quantum Simulator" },
            { label: "Pre-Processing Time", value: `${formatNumber(preprocessingTime, 2)} s` },
            { label: "Post-Processing Time", value: `${formatNumber(postprocessingTime, 2)} s` },
            { label: "Quantum Circuit Runtime", value: `${formatNumber(quantumSolverTime, 2)} s` },
            { label: "Total Time", value: `${formatNumber(totalTime, 2)} s` },
          ].map((item, i, arr) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 20px",
                borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                background: i % 2 === 0 ? "rgba(55,25,75,0.4)" : "rgba(40,18,58,0.4)",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#a78bfa",
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#f0e6ff",
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: "0.04em",
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Output Summary THIRD */}
      <OutputSummary
        depots={formatNumber(numDepots, 0)}
        quantity={formatNumber(totalOrders, 0)}
        fleet={formatNumber(totalFleet, 0)}
        vehiclesUsed={formatNumber(vehiclesUsed, 0)}
        unservedJobs={formatNumber(unservedJobs, 0)}
        cost={formatNumber(cost, 2)}
        distance={formatNumber(distance, 2)}
        duration={formatNumber(duration, 2)}
        driving={formatNumber(drivingTime, 2)}
        serving={formatNumber(servingTime, 2)}
        waiting={formatNumber(waitingTime, 2)}
      />

      {/* MAP LAST */}
      <div style={{ margin: "24px 20px 0" }}>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            fontFamily: "'Space Grotesk', sans-serif",
            marginBottom: 12,
            color: "#f0e6ff",
          }}
        >
          Route Map
        </h2>

        <div
          style={{
            borderRadius: 12,
            overflow: "hidden",
            position: "relative",
            height: 300,
            border: "1px solid rgba(167,139,250,0.2)",
            boxShadow: "0 0 25px rgba(167,139,250,0.15)",
          }}
        >
          <iframe
            srcDoc={mapHtml}
            sandbox="allow-scripts allow-same-origin"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
            }}
            title="Logistics Map"
          />
        </div>
      </div>
    </div>
  );
}