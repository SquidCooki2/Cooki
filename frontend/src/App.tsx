// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProviderDashboard from "./pages/ProviderDashboard";
import UserDashboard from "./pages/UserDashboard";
import Wallet from "./pages/Wallet";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import "./App.css";

function App() {
  return (
    <Router>
      <div style={{ display: "flex", height: "100vh" }}>
        <Navbar />
        <div style={{ flex: 1, position: "relative" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/provider-dashboard" element={<ProviderDashboard />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
