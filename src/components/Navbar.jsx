import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/" className="nav-link">🏠 Strona Główna</Link>
        <Link to="/favorites" className="nav-link">⭐ Ulubione</Link>
      </div>
    </nav>
  );
};

export default Navbar;