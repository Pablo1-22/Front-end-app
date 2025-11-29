// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Details from './pages/Details';
import UnitSwitcher from './components/UnitSwitcher';
import './App.css'; // Import styli

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      
      {/* Główny kontener */}
      <div className="weather-app-container">
        
        {/* Warstwa 1: Obrazek tła */}
        <div className="weather-bg-image"></div>
        
        {/* Warstwa 2: Efekt szkła/przyciemnienia */}
        <div className="weather-overlay"></div>
        
        {/* Warstwa 3: Właściwa treść aplikacji */}
        <div className="content">
          
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
      </div>
    </Router>
  );
}

export default App;