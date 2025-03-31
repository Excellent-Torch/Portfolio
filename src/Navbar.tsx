import React, { useState } from 'react';
import './css/Navbar.css';
import menuIcon from './assets/dropdown-menu.png'; // Adjust the path as needed
//import { Link } from 'react-router-dom';
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className='navbar glass'>
      <div className="navbar-logo">
        <a href="/">|-_-|</a>
      </div>
      <div className="navbar-toggle" onClick={toggleMenu}>
        <img src={menuIcon} alt="Menu Icon" />
      </div>
      <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <li><a href="/" className="navbar-button" onClick={closeMenu}>About</a></li>
        <li><a href="#/Experience" className="navbar-button" onClick={closeMenu}>Experience</a></li>
        <li><a href="#/Projects" className="navbar-button" onClick={closeMenu}>Projects</a></li>
        <li><a href="#/contact" className="navbar-button" onClick={closeMenu}>Contact</a></li>
      </ul>
      </div>
    </nav>
  );
};

export default Navbar;