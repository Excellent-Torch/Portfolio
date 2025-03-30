import React, { useState } from 'react';
import './css/Navbar.css';
import menuIcon from './assets/dropdown-menu.png'; // Adjust the path as needed
//import { Link } from 'react-router-dom';
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">|-_-|</a>
        
        {
        /* <p className="navbar-subline">Game/AI Developer</p> 
            <li><Link to="/#Projects" className="navbar-button">Projects</Link></li>
            <li><a href="/about" className="navbar-button">About</a></li>
        */
        }
      </div>
      <div className="navbar-toggle" onClick={toggleMenu}>
        <img src={menuIcon} alt="Menu Icon" />
      </div>
      <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <li><a href="#/home" className="navbar-button">Home</a></li>
        
        <li><a href="#/Projects" className="navbar-button">Projects</a></li>
        <li><a href="#contact" className="navbar-button">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;