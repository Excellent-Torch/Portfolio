import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import '../css/App.css';

import gifRodGameplay from '../assets/rodgameplay.gif';
import BlurText from "../components/BlurText";
import gifSelfCar from '../assets/selfcar.gif';
import Particles from '../components/Particles';

//import TypewriterText from '../components/TypewriterText';


const Projects: React.FC = () => {
    const { ref, inView } = useInView({ rootMargin: '1000px' });

    const [animate, setAnimate] = useState(false);

    const handleAnimationComplete = () => {

        console.log('Animation completed!');

    };
    
    const handleTouchStart = () => {
        // Trigger the animation on touch start
        setAnimate(true);
    };

  return (
    <section className="projects">
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'all' }}>
        <Particles
          particleColors={["#33d17a"]}
          particleCount={400}
          particleSpread={30}
          speed={0.1}
          particleBaseSize={200}
          moveParticlesOnHover
          alphaParticles
          disableRotation
          pixelRatio={1}
        />
      </div>

        <motion.div className="text-content additional-content"
         ref={ref}
         initial={{ opacity: 0, x: -80 }}
         animate={{ opacity: 1, x: 0 } }
         transition={{ duration: 1 }}
          >

            <h2 style={{ textAlign: 'center', color: '#ffffffff', textShadow: '0.1em 0.1em 0.4em #059418ff' }}>
              <BlurText
                text="Projects"
                delay={150}
                animateBy="letters"
                direction="bottom"
                onAnimationComplete={handleAnimationComplete}
                className='page-title'             
              />
            </h2>        
            <h3 style={{ textAlign: 'left', fontSize: '25px', marginTop: '20px' }}>
              Real-Time Fast Neural Style Transfer in a 3D Environment
            </h3>
            <p style={{ textAlign: 'left', fontSize: '20px' }}>
              Developed a custom transformer model for real-time neural style transfer system for 3D environments, integrating deep learning techniques to apply artistic styles dynamically to 3D scenes in Unreal Engine. Focused on optimizing performance to achieve seamless rendering while maintaining visual quality.
            </p>
            <div style={{ textAlign: 'left', fontSize: '20px' }}>
              <ul>
                <li><strong>Languages:</strong> Python, C++ & Blueprints</li>
                <li><strong>Libs:</strong> PyTorch, Tensorflow, OnnxRuntime, Numpy, Pillow</li>
                <li><strong>Notebooks:</strong> Google Colab, Jupyter Notebook</li>
              </ul>
            </div>
        
        </motion.div>

        <motion.div className="image-content"
        ref={ref}
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 } }
        transition={{ duration: 1 }}
        >

          <div style={{ width: '800px', height: '420px', marginTop: '10px', marginBottom: '50px' }}>
            <iframe
              width="600"
              height="360"
              src="https://www.youtube.com/embed/zCLsP2nrR_c?autoplay=1&mute=1&controls=1&rel=0"
              title="Fast Neural Style Transfer Demo"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ borderRadius: '12px', width: '100%', height: '100%' }}
            />
          </div>
        
        </motion.div>

        <motion.div className="text-content"
        ref={ref}
        initial={{ opacity: 0, x: -50 }}
        animate={inView || animate ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 1 }}
        onTouchStart={handleTouchStart}
        >
               
          <h3 style={{ textAlign: 'left', fontSize: '25px' }}>
          CNN Based Autonomous Self Driving Car Prototype Using NVIDIA Jetson Nano
          </h3>
          <p style={{ textAlign: 'left', fontSize: '20px' }}>
          This project was focused on developing an autonomous self-driving car system using deep learning and computer vision, deployed on the NVIDIA Jetson Nano for real-time processing. The system is designed to navigate independently by recognizing lanes, detecting obstacles, and making driving decisions.
          </p>
          <p style={{ textAlign: 'left', fontSize: '20px' }}>
          A Convolutional Neural Network (CNN) is employed for end-to-end learning, where the model predicts steering angles based on camera input. The project was made to showcase the potential of AI in autonomous driving by integrating lane detection, object recognition, and collision avoidance.
          </p>
          <div style={{ textAlign: 'left', fontSize: '20px' }}>
            <ul>
              <li><strong>Hardware:</strong> Nvidia Jetson Nano, L298N Motor Driver Module, Adafruit Servo Driver, Buck Converter (LM2596), DC-DC Step Down Converter (12V to 5V) 3A</li>
              <li><strong>Operating System:</strong> Ubuntu 18.04</li>
              <li><strong>Languages:</strong> Python</li>
              <li><strong>Libs:</strong> TensorFlow, Dlib, Tkinter, GPIO, Imutils</li>
            </ul>
          </div>
      
        </motion.div>

        <motion.div className="image-content"
        ref={ref}
        initial={{ opacity: 0, x: -50 }}
        animate={inView || animate ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 1 }}
        onTouchStart={handleTouchStart}
        >

        <img
            src={gifSelfCar}
            loading="lazy"
            style={{ width: '600px', height: '360px', marginTop: '50px', marginBottom: '50px' }}
            alt="GIF 1"
          />
        
        </motion.div>

         <motion.div className="text-content"
        ref={ref}
        initial={{ opacity: 0, x: 50 }}
        animate={inView || animate ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
        transition={{ duration: 1 }}
        onTouchStart={handleTouchStart}
        >
               
          <h3 style={{ textAlign: 'left', fontSize: '25px' }}>
            Runes Of Demons (Under Development)
          </h3>
          <p style={{ textAlign: 'left', fontSize: '20px' }}>
            Creator of the game Runes of Demons, Sri Lanka's First Ever Third Person Multiplayer
            game made as a Solo Dev. All the core mechanics were done using C++
            with proper lag compensation.
          </p>
          <div style={{ textAlign: 'left', fontSize: '20px' }}>
            <ul>
              <li><strong>Engine:</strong> Unreal Engine 5.5+</li>
              <li><strong>Languages:</strong> C++ & Blueprints</li>
              <li><strong>Libs:</strong> Advance Steam Online Subsystem, VRM4U, FSR 3.1+</li>
            </ul>
          </div>
      
        </motion.div>

        <motion.div className="image-content"
        ref={ref}
        initial={{ opacity: 0, x: 50 }}
        animate={inView || animate ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
        transition={{ duration: 1 }}
        onTouchStart={handleTouchStart}
        >

        <img
            src={gifRodGameplay}
            loading="lazy"
            style={{ width: '600px', height: '360px', marginTop: '50px', marginBottom: '50px' }}
            alt="GIF 1"
          />
        
        </motion.div>
    </section>
 
  );
};

export default Projects;