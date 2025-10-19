// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import UserDashboard from './pages/UserDashboard';
import Wallet from './pages/Wallet';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProviderDashboard from './pages/ProviderDashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/provider-dashboard" element={<ProviderDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;