// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RuangMeeting from "./pages/RuangMeeting";
import PesanRuang from "./pages/PesanRuang";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect dari root ke /ruang-meeting */}
        <Route path="/" element={<Navigate to="/ruang-meeting" />} />
        <Route path="/ruang-meeting" element={<RuangMeeting />} />
        <Route path="/pesan-ruang" element={<PesanRuang />} />
      </Routes>
    </Router>
  );
}

export default App;
