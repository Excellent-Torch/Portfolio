import { Canvas } from "@react-three/fiber";
import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ContactShadows, Float, OrbitControls } from "@react-three/drei";
import Navbar from "./Navbar";
import './css/App.css';
import { LogoModel } from "./LogoModel";
import background from "./assets/dandan.mp4"; 
import TypewriterText from './TypewriterText';
import Projects from './pages/Projects';

import aboutImage from './assets/aboutImage.jpg'; 
import gifDoom from './assets/doom.gif';
import gifUnreal from './assets/unreal.gif';
import gifDeveloper from './assets/developer.gif';
import gifAI from './assets/artin.gif';
import gifWork from './assets/work.gif';
import gifDance from './assets/dancing.gif';

const App: React.FC = () => {
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route 
          path="/" 
          element={ 
          <div className="content">
          <video className="video-canvas" loop autoPlay muted>
              <source src={background} type="video/mp4" />
            </video>
            <section id="home" className="section section-home" ref={(el) => { sectionsRef.current[0] = el as HTMLDivElement; }}>
              <div className="text-content">       
              <h1>
                <div className="typewriter-container-headline">
                  <TypewriterText text="Excellent Torch" speed={150} showCaret={false} loop={false} />
                </div>
              </h1>
              
              <h2>
                <div className="typewriter-container-subline">
                  <TypewriterText text="AI/Game" speed={600} showCaret={true} loop={true}/>
                </div>
                  <TypewriterText text="Developer" speed={100} showCaret={false} loop={false}/>
              </h2>
              </div> 
            </section>

            <section id="about" className="section section-about" ref={(el) => { sectionsRef.current[1] = el as HTMLDivElement; }}> 
              <div className="text-content">
                <h1>Greetings!</h1>
                <h1> 
                  My Name is Ishan Madhuranga,</h1>
                <p>
                  Specialized in <strong>Game Development and AI</strong><img src={gifAI} alt="GIF 1" style={{ width: '25px', height: '25px', marginLeft: '1px', backgroundColor: 'black' }} />, I am passionate about creating immersive and engaging experiences that push the boundaries of technology.
                  With hands-on experience designing <strong>Multiplayer</strong> games using <strong>Unreal Engine 5</strong> <img src={gifUnreal} alt="GIF 1" style={{ width: '25px', height: '25px', marginLeft: '1px', backgroundColor: 'black' }} />, I enjoy pushing the boundaries of interactive and AI-powered experiences.
                </p>
                <p>
                As a Fresh Graduate, I am currently working as a <strong>Game Developer</strong><img src={gifDeveloper} alt="GIF 1" style={{ width: '25px', height: '25px', marginLeft: '4px' }} /> in a part-time internship, contributing to the remake of a classic game in collaboration with its original creator by incorporating a fresh perspective and modern technologies. Additionally, I am developing my own <strong>Third-Person Multiplayer Shooter</strong> game as a Solo Dev, featuring optimized <strong>Net Code</strong> and unique <strong>Gameplay Mechanics.</strong>
                <img src={gifDoom} loading="lazy" alt="GIF 1" style={{ width: '25px', height: '25px', marginLeft: '1px' }} />
                </p>
                  
                <div className="typewriter-container-headline" style={{ color: 'black'}}>
                    <p style={{alignItems: 'center', fontSize: '25px' }}>-| Open to <span></span>
                      
                      <img src={gifWork} loading="lazy" alt="GIF 1" style={{ width: '30px', height: '30px', marginLeft: '1px' }} />
                    |-
                    </p>
                </div> 
                 
              
              </div>
              <div className="image-content">
                <img src={aboutImage} loading="lazy" alt="About" />
              </div>
              
            </section>
            
          <section id="about" className="section section-about-skills" ref={(el) => { sectionsRef.current[2] = el as HTMLDivElement; }}>
            <div className="image-content">
              <img src={gifDance} loading="lazy" alt="GIF 1"/>
            </div> 
            <div className="text-content" ref={(el) => { sectionsRef.current[3] = el as HTMLDivElement; }}>
              <h2>
                  <div className="typewriter-container-headline">
                    <TypewriterText text="Relevant Skills" speed={100} showCaret={false} loop={true}/>
                  </div> 
              </h2>
              <div style={{textAlign: 'left', fontSize: '20px' }}>
                  <ul>
                    <li>C++ (ONNX Runtime, OpenCV, Unreal Engine)</li>
                    <li>Python (PyTorch, NumPy, Tensorflow, OpenCV, Flask)</li>
                    <li>C# (UI, Standalone Apps)</li>
                    <li>CCNA/MCSA (Routing, Switching, Security)</li>            
                  </ul>
              </div>
            </div>
          </section>
          </div>
          }
        />

        <Route path="/Projects" element={<Projects />} />
      </Routes>
    </Router>
  );
};

export default App;