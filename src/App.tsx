import { Canvas } from "@react-three/fiber";
import React, { useEffect, useRef } from 'react';
import { ContactShadows, Float, OrbitControls } from "@react-three/drei";
import Navbar from "./Navbar";
import './css/App.css';
import { LogoModel } from "./LogoModel";
import background from "./assets/dandan.mp4"; 
import TypewriterText from './TypewriterText';
import aboutImage from './assets/aboutImage.jpg'; 
import gifDoom from './assets/doom.gif';
import gifUnreal from './assets/unreal.gif';
import gifDeveloper from './assets/developer.gif';

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
    <>
      <Navbar />

      <div className="content">
      <video className="video-canvas" loop autoPlay muted>
          <source src={background} type="video/mp4" />
        </video>
        <section id="home" className="section section-home" ref={(el) => { sectionsRef.current[0] = el as HTMLDivElement; }}>        
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
          
        </section>

        <section id="about" className="section section-about" ref={(el) => { sectionsRef.current[1] = el as HTMLDivElement; }}> 
          <div className="text-content">
            <h1>My Name is Ishan Madhuranga,</h1>
            <p>
              Specialized in <strong>Game Development and AI</strong>, I am passionate about creating immersive and engaging experiences that push the boundaries of technology.
              With hands-on experience designing <strong>Multiplayer</strong> games using <strong>Unreal Engine 5</strong> <img src={gifUnreal} alt="GIF 1" style={{ width: '25px', height: '25px', marginLeft: '1px', backgroundColor: 'black' }} />, I enjoy pushing the boundaries of interactive and AI-powered experiences.
            </p>
            <p>
            I am currently working as a <strong>Game Developer</strong><img src={gifDeveloper} alt="GIF 1" style={{ width: '25px', height: '25px', marginLeft: '4px' }} /> in a part-time internship, contributing to the remake of a classic game in collaboration with its original creator by incorporating a fresh perspective and modern technologies. Additionally, I am developing my own <strong>Third-Person Multiplayer Shooter</strong> game as a Solo Dev, featuring optimized <strong>Net Code</strong> and unique <strong>Gameplay Mechanics.</strong>
            <img src={gifDoom} alt="GIF 1" style={{ width: '25px', height: '25px', marginLeft: '1px' }} />
            </p>
            <h2>Contact Me! (InProgress)</h2> 
          </div>
          <div className="image-content">
            <img src={aboutImage} alt="About" />
          </div>
          
        </section>
        
        <section id="about" className="section section-about-skills" ref={(el) => { sectionsRef.current[2] = el as HTMLDivElement; }}> 
        <div className="text-content">
        <h2>
            <div className="typewriter-container-headline">
              <TypewriterText text="Skills" speed={600} showCaret={false} loop={true}/>
            </div>
            <p>C++, Python, Unreal Engine 5, C# (InProgress)</p>
        </h2>
        </div>
          
        </section>


        <section id="projects" className="section section-projects" ref={(el) => { sectionsRef.current[3] = el as HTMLDivElement; }}> 
          <h2>Projects</h2>
          <p>This is the projects section.</p>
        </section>
        <section id="contact" className="section section-contact" ref={(el) => { sectionsRef.current[4] = el as HTMLDivElement; }}> 
          <h2>Contact</h2>
          <p>This is the contact section.</p>
        </section>
      </div>

      <Canvas className="three-canvas" gl={{ alpha: true }} camera={{ position: [0, 5, 10], fov: 75 }}>
          <OrbitControls enableZoom enablePan enableRotate />
          <directionalLight position={[5, 5, 5]} intensity={2} color={"white"} />
          <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
            <LogoModel />
          </Float>
          <ContactShadows rotation-x={Math.PI / 2} position={[0, -1, 0]} opacity={0.5} blur={2} scale={30} far={20} />  
      </Canvas>
    </>
  );
};

export default App;