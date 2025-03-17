import { Canvas } from "@react-three/fiber";
import React, { useEffect, useRef } from 'react';
import { ContactShadows, Float, OrbitControls } from "@react-three/drei";
import Navbar from "./Navbar";
import './css/App.css';
import { LogoModel } from "./LogoModel";
import background from "./assets/dandan.mp4"; 
import TypewriterText from './TypewriterText';
import aboutImage from './assets/aboutImage.jpg'; 

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
              <TypewriterText text="Excellent Torch" speed={100} showCaret={false} loop={false} />
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
            <h2>AI/Game Developer</h2>
            <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </p>
          </div>
          <div className="image-content">
            <img src={aboutImage} alt="About" />
          </div>
        </section>
         
        <section id="projects" className="section section-projects" ref={(el) => { sectionsRef.current[2] = el as HTMLDivElement; }}> 
          <h2>Projects</h2>
          <p>This is the projects section.</p>
        </section>
        <section id="contact" className="section section-contact" ref={(el) => { sectionsRef.current[3] = el as HTMLDivElement; }}> 
          <h2>Contact</h2>
          <p>This is the contact section.</p>
        </section>
      </div>

      <Canvas className="three-canvas" gl={{ alpha: true }} camera={{ position: [0, 0, 5], fov: 50 }}>
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