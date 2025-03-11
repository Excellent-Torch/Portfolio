import React from 'react';
import './css/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">Ishan Madhuranga</a>
        <p className="navbar-subline">Game/AI Developer</p>
      </div>
      <ul className="navbar-links">
        <li><a href="#about" className="navbar-button">About</a></li>
        <li><a href="#projects" className="navbar-button">Projects</a></li>
        <li><a href="#contact" className="navbar-button">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;