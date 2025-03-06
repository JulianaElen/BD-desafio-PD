import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import CreatePartner from './pages/CreatePartner';
import NearPartner from './pages/NearPartner';
import SeePartner from './pages/SeePartner';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePartner />} />
        <Route path="/near" element={<NearPartner />} />
        <Route path="/see" element={<SeePartner />} />
      </Routes>
    </Router>
  )
}
