import { Canvas } from "@react-three/fiber";
import React, { useRef, useEffect } from 'react';
import { ContactShadows, Float, OrbitControls } from "@react-three/drei";
import Navbar from "./Navbar.tsx";
import './css/App.css';
import { LogoModel } from "./LogoModel.tsx";
import background from "./assets/yourname.mp4"; // mine is stored in src/assets
import TypewriterText from './TypewriterText.tsx';
const App: React.FC = () => {
  return (
    <>
      <Navbar />
      

      <div className="section">
        
        <section id="home" className="section-home">
        
          <h1>
            <div className="typewriter-container">
              <TypewriterText text="Excellent Torch" speed={100} showCaret={false} loop={false} />
            </div>
          </h1>
          
          <h2>
            <div className="typewriter-container-subline">
              <TypewriterText text="AI/Game" speed={600} showCaret={true} loop={true}/>
            </div>
              <TypewriterText text="Developer" speed={100} showCaret={false} loop={false}/>
          </h2>
          
        <video className="video-canvas" loop autoPlay muted>
          <source src={background} type="video/mp4" />
        </video>

        </section>

        <Canvas className="three-canvas">
          <OrbitControls enableZoom enablePan enableRotate />
          
          <directionalLight position={[5, 5, 5]} intensity={2} color={"white"} />
          <color attach="background" args={["gray"]} />
          
          <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
            <LogoModel />
          </Float>
          <ContactShadows rotation-x={Math.PI / 2} position={[0, -1, 0]} opacity={0.5} blur={2} scale={30} far={
            20
          } />  
        </Canvas>

        <section id="about" className="section-about">
          <h2>About</h2>
          <p>This is the about section.</p>
        </section>
        <section id="projects" className="section-projects">
          <h2>Projects</h2>
          <p>This is the projects section.</p>
        </section>
        <section id="contact" className="section-contact">
          <h2>Contact</h2>
          <p>This is the contact section.</p>
        </section>
      </div>
    </>
    );
};

export default App;