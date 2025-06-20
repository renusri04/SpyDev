
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Dashboard from "./Components/Dashboard/Dashboard";
import Home from "./Components/Home/Home";

import "./App.css";
import "./index.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/inventory" element={<Inventory />} /> */}
        {/* You can add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
