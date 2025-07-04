

import React, { Suspense,useEffect, useRef, useState } from 'react';
import { HashRouter, Routes, Route} from 'react-router-dom';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import Navbar from "./Navbar";
import './css/App.css';

import background from "./assets/dandan.mp4"; 
import TypewriterText from './TypewriterText';

// Lazy load pages
const Projects = React.lazy(() => import('./pages/Projects'));
const Experience = React.lazy(() => import('./pages/Experience'));
const Contact = React.lazy(() => import('./pages/Contact'));
const RunesOfDemons = React.lazy(() => import('./pages/RunesOfDemons'));
const OnnxInference = React.lazy(() => import('./pages/OnnxInference'));


import aboutImage from './assets/aboutImage.jpg'; 
import gifDoom from './assets/doom.gif';
import gifUnreal from './assets/unreal.gif';
import gifDeveloper from './assets/developer.gif';
import gifAI from './assets/artin.gif';
import gifWork from './assets/work.gif';
import gifDance from './assets/dancing.gif';


const App: React.FC = () => {
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const { ref, inView } = useInView({ rootMargin: '500px' });
  const [animate, setAnimate] = useState(false);

  const handleTouchStart = () => {
    // Trigger the animation on touch start
    setAnimate(true);
  };

  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleDownload = () => {
      setIsLoading(true);
      // Download Logic

      const url = 'https://ia600906.us.archive.org/29/items/ishan-madhuranga-cv/Ishan_Madhuranga_CV.pdf';
      const filename = 'Ishan_Maduranga_CV.pdf';

      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();

      setTimeout(() => {
        setIsLoading(false);
      }, 2000); // Simulate a 2-second download
  };
    

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
    <HashRouter>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route 
          path="/" 
          element={ 
            
          <div className="content">

            <video className={`video-canvas ${inView ? 'fixed' : ''}`} loop autoPlay muted>
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
              <motion.div className="text-content"
                      ref={ref}
                      initial={{ opacity: 0, y: 60 }}
                      animate={inView || animate ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                      transition={{ duration: 0.5 }}
                      onTouchStart={handleTouchStart}
              >
                <motion.div
                      ref={ref}
                      initial={{ opacity: 0, y: -30 }}
                      animate={inView || animate ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
                      transition={{ duration: 2 }}
                      onTouchStart={handleTouchStart}
                >
                <h1>Greetings!</h1>
                <h1> 
                  My Name is Ishan Madhuranga,</h1>

                  </motion.div>
                <p>
                  Specialized in <strong> AI</strong><img src={gifAI} alt="GIF 1" style={{ width: '25px', height: '25px', marginLeft: '4px' }} /> and <strong>Game Development</strong> , I am passionate about creating immersive and engaging experiences that push the boundaries of technology.
                  With hands-on experience designing <strong>Multiplayer</strong> games using <strong>Unreal Engine 5</strong> <img src={gifUnreal} alt="GIF 1" style={{ width: '25px', height: '25px', marginLeft: '1px', backgroundColor: 'black' }} />, I enjoy pushing the boundaries of interactive and AI-powered experiences.
                </p>
                <p>
                As an AI enthusiast with a master’s degree in Artificial Intelligence., I am currently working as a <strong>Game Developer</strong><img src={gifDeveloper} alt="GIF 1" style={{ width: '25px', height: '25px', marginLeft: '4px' }} /> in a part-time internship, contributing to the remake of a classic game in collaboration with its original creator by incorporating a fresh perspective and modern technologies. Additionally, I am developing my own <strong>Third-Person Multiplayer Shooter</strong> game as a Solo Dev, featuring optimized <strong>Net Code</strong> and unique <strong>Gameplay Mechanics.</strong>
                <img src={gifDoom} loading="lazy" alt="GIF 1" style={{ width: '25px', height: '25px', marginLeft: '1px' }} />
                </p>
                  
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', color: 'black', top: '0', left: '0' , marginBottom: '10px', textShadow: '0.1em 0.1em 0.2em gray' }}>
                 <span>-| Open to&nbsp;</span>
                  <TypewriterText text="Work! " speed={600} showCaret={false} loop={false}/>
                  <img src={gifWork} loading="lazy" alt="GIF 1" style={{ width: '30px', height: '30px', marginLeft: '4px' }} />
                  <p>|- </p>
                  
                  <br></br>
                    
                </div> 
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <button
                        className={`download-button ${isLoading ? 'loading' : ''}`}
                        onClick={handleDownload}
                        style={{ marginTop: '5px',marginBottom: '5px'}}
                      >
                        {isLoading ? (
                          <div className="loading-spinner">
                            <div className="spinner" />
                          </div>
                        ) : (
                          <span>Download CV</span>
                        )}
                    </button>
                    <span> </span>
                    {animate ? (
                      <br >
                      </br>
                    ) : (
                      null
                    )}
                    <p><span>Or&nbsp;</span></p>
                    <a href="#/contact" className='contact-me-link'> Contact Me <span className="blink-slow">:)</span> </a>
               
                </div>
                 
              </motion.div> 

              <motion.div className="image-content"
                      ref={ref}
                      initial={{ opacity: 0, x: 80 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
                      transition={{ duration: 2 }}
              >
                
                  <img style={{ width: '100%', height: 'auto', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }} src={aboutImage} loading="lazy" alt="About" />
               
              </motion.div>

            </section>

          <section id="education" className="section section-education" ref={(el) => { sectionsRef.current[4] = el as HTMLDivElement; }}>
          <motion.div className="text-content"
                      ref={ref}
                      initial={{ opacity: 0, y: -50 }}
                      animate={inView || animate ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
                      transition={{ duration: 0.5 }}
                      onTouchStart={handleTouchStart}
              >

              <h2>
                  <div className="typewriter-container-headline" style={{ paddingLeft: '500px', color: 'orange' }}>
                    <TypewriterText text="Education" speed={400} showCaret={true} loop={false}/>
                  </div> 
              </h2> 
              <div style={{textAlign: 'left', fontSize: '20px' }}>
                  <ul style={{ listStyleType: 'square', lineHeight: '150%'}}>
                    <li><strong>2023 - 2025 <br /> </strong>MSc In Artificial Intelligence,<br /> 
                    Dublin Business School,<br />
                     Ireland</li>
                    <li><strong>2021 - 2022 <br /></strong>BSc (Hons) Cyber Security Management,<br /> Solent University Southampton,<br /> England </li>          
                  </ul>
              </div> 
            
          </motion.div>
          </section>
            
          <section id="about" className="section section-about-skills" ref={(el) => { sectionsRef.current[2] = el as HTMLDivElement; }}>
              <motion.div className="image-content"
                      ref={ref}
                      initial={{ opacity: 0, x: -150 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -150 }}
                      transition={{ duration: 2 }}
              >
            
              <img src={gifDance} loading="lazy" alt="GIF 1"/>
             
              </motion.div>
            <div className="text-content" ref={(el) => { sectionsRef.current[3] = el as HTMLDivElement; }}>
              <h2>
                  <div className="typewriter-container-headline" style={{color: 'black' }}>
                    <TypewriterText text="Relevant Skills" speed={100} showCaret={false} loop={true}/>
                  </div> 
              </h2>
              <div style={{textAlign: 'left', fontSize: '20px' }}>
                  <ul>
                    <li>C++ (ONNX Runtime, OpenCV, Unreal Engine)</li>
                    <li>Python (PyTorch, NumPy, Tensorflow, OpenCV, Flask)</li>
                    <li>HTML/CSS/TypeScript (React, React Three Fiber)</li>
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
        <Route path="/Experience" element={<Experience />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/RunesOfDemons" element={<RunesOfDemons />} />
        <Route path="/OnnxInference" element={<OnnxInference />} />
      </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default App;