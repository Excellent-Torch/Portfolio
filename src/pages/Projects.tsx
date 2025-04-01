



import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import '../css/App.css';

import gifRodGameplay from '../assets/rodgameplay.gif';
import gifFNST from '../assets/fnst.gif';
import TypewriterText from '../TypewriterText';
import gifSelfCar from '../assets/selfcar.gif';

const Projects: React.FC = () => {
    const { ref, inView } = useInView({ rootMargin: '1000px' });

    const [animate, setAnimate] = useState(false);
    
    const handleTouchStart = () => {
        // Trigger the animation on touch start
        setAnimate(true);
    };

  return (
    <section className="projects">

        <motion.div className="text-content additional-content"
         ref={ref}
         initial={{ opacity: 0, x: -80 }}
         animate={{ opacity: 1, x: 0 } }
         transition={{ duration: 1 }}
          >

            <h2 style={{ textAlign: 'center', color: 'lightgreen', textShadow: '0.1em 0.1em 0.2em gray' }}><TypewriterText text="Projects" speed={400} showCaret={true} loop={false} /></h2>        
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

          <img
            src={gifFNST}
            loading="lazy"
            style={{ width: '600px', height: '360px', marginTop: '50px', marginBottom: '50px' }}
            alt="GIF 2"
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
          A Convolutional Neural Network (CNN) is employed for end-to-end learning, where the model predicts steering angles based on camera input. The project aims to showcase the potential of AI in autonomous driving by integrating lane detection, object recognition, and collision avoidance.
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
    </section>
 
  );
};

export default Projects;