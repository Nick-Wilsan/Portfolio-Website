import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TravelWiseCase from "./pages/TravelWiseCase";
import RoundUpCase from "./pages/RoundUpCase";
import HomeV2 from "./v2/HomeV2";
import ProjectPage from "./v2/ProjectPage";

// ─── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeV2 />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="/case/travelwise" element={<TravelWiseCase />} />
        <Route path="/case/roundup-savings" element={<RoundUpCase />} />
        {/* The old editorial site held outdated data; its URLs now land home */}
        <Route path="/classic" element={<Navigate to="/" replace />} />
        <Route path="/classic/case/travelwise" element={<Navigate to="/" replace />} />
        <Route path="/classic/case/roundup-savings" element={<Navigate to="/" replace />} />
        {/* Unknown paths (including the old /v2 preview URLs) land on the homepage */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
