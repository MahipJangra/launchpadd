import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Analyze from "./pages/Analyze";
import Roadmap from "./pages/Roadmap";
import Saved from "./pages/Saved";
import { RoadmapProvider } from "./context/RoadmapContext";

export default function App() {
  return (
    <RoadmapProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1a1a2e",
              color: "#e8e0d0",
              border: "1px solid rgba(255,77,0,0.3)",
              fontFamily: "'DM Mono', monospace",
              fontSize: "13px",
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/saved" element={<Saved />} />
        </Routes>
      </BrowserRouter>
    </RoadmapProvider>
  );
}