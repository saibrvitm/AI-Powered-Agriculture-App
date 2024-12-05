import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Router, Route, and Routes
import "./App.css";
import CropSelector from "./components/CropSelector";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import CropSelectorPage from "./pages/CropSelectorPage";
import WaterAdvisor from "./components/WaterAdvisor";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/crop-selector" element={<CropSelectorPage />} />{" "}
          {/* Updated to use element prop */}
          <Route path="/" element={<LandingPage />} />{" "}
          {/* Updated to use element prop */}
          <Route path="/water-advisor" element={<WaterAdvisor />} />{" "}
          {/* Updated to use element prop */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
