// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Details from './pages/Details';
import UnitSwitcher from './components/UnitSwitcher';
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1 className="app-title">Aplikacja Pogodowa 🌤️</h1>
        
        <div className="controls-section">
           <UnitSwitcher />
        </div>
        
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/details/:city" element={<Details />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;