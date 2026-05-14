import { useState } from "react";

import HomePage   from "./src/pages/HomePage.jsx";
import LoaderPage from "./src/pages/LoaderPage.jsx";
import TerminalPage from "./src/pages/TerminalPage.jsx";
import MappingPage  from "./src/pages/MappingPage.jsx";
import ToolsPage    from "./src/pages/ToolsPage.jsx";

import demoData from "./src/data/demo_input_2.json";

export default function SpindleVRO() {
  const [page, setPage] = useState("home");
  const [result, setResult] = useState(null);

  const text = JSON.stringify(demoData, null, 2);
  const jsonLines = text.split("\n");

  const handleReview = () => {
    setPage("terminal");
  };


  const API_URL = import.meta.env.VITE_API_URL;
  const handleSubmit = async () => {
    setPage("loader-submit");


    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(demoData),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      console.log("API response:", data);

      setResult(data);
      setPage("mapping");
    } catch (err) {
      console.error("API error:", err);

      setResult({
        status: "error",
        message: err.message || "Request failed",
        solution: {
          statistic: {
            cost: 0,
            distance: 0,
            duration: 0,
            times: {
              driving: 0,
              serving: 0,
              waiting: 0,
              break: 0,
              commuting: 0,
              parking: 0,
            },
          },
          tours: [],
          unassigned: [],
        },
        summary: {
          run_id: "—",
          num_vehicles: 0,
          num_requests: 0,
          num_depots: 0,
          unserved_jobs: 0,
          total_distance: 0,
          total_duration: 0,
          fleet_cost: 0,
          total_tours: 0,
          preprocessing_time: 0,
          quantum_solver_time: 0,
          postprocessing_time: 0,
        },
        map: "<div style='height:100%;display:flex;align-items:center;justify-content:center;background:#1a1025;color:#fff;font-family:sans-serif;'>Map unavailable</div>",
      });

      setPage("mapping");
    }
  };

  if (page === "loader-submit") {
    return (
      <LoaderPage
        message="Optimising Routes"
        subMessage="QUANTUM PROCESSING · PLEASE WAIT"
      />
    );
  }

  if (page === "terminal") {
    return (
      <TerminalPage
        jsonLines={jsonLines}
        onBack={() => setPage("home")}
        onNext={handleSubmit}
      />
    );
  }

  if (page === "mapping") {
    return (
      <MappingPage
        data={result}
        onBack={() => setPage("terminal")}
      />
    );
  }

  if (page === "tools") {
    return <ToolsPage onBack={() => setPage("home")} />;
  }

  return <HomePage onReview={handleReview} onTools={() => setPage("tools")} />;
}