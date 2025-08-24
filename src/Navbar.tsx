import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './css/Navbar.css';
import menuIcon from './assets/dropdown-menu.png'; // Adjust the path as needed
import logoIcon from './assets/torch.gif'
//import { Link } from 'react-router-dom';
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const isRunesPage = /runesofdemons/i.test(location.pathname + location.hash) || /onnxinference/i.test(location.pathname + location.hash);

  if (isRunesPage) return null;


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
        <a href="/"><img src={logoIcon} style={{ width: '60px', height: '60px'}} alt="Menu Icon" /></a>
      </div>
      <div className="navbar-toggle" onClick={toggleMenu}>
        <img src={menuIcon} alt="Menu Icon" />
      </div>
      <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <li><a href="/" className="navbar-button" onClick={closeMenu}>About</a></li>
        <li><a href="#/Experience" className="navbar-button" onClick={closeMenu}>Experience</a></li>
        <li><a href="#/Projects" className="navbar-button" onClick={closeMenu}>Projects</a></li>
        <li><a href="#/contact" className="navbar-button" onClick={closeMenu}>Contact</a></li>
       {/* <li><a href="#/RunesOfDemons" className="navbar-button" onClick={closeMenu}>Runes of Demons</a></li>*/}
        <li><a href="#/OnnxInference" className="navbar-button" onClick={closeMenu}>ONNX React Inference</a></li>
      </ul>
      </div>
    </nav>
  );
};

export default Navbar;