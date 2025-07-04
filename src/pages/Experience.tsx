

import React from 'react';

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, OrbitControls } from "@react-three/drei";
//import { LogoModel } from "./LogoModel";
import { SleeplessModel } from "../Sleepless";
// 3D Stuff End

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import '../css/App.css';

//import gifRodGameplay from '../assets/rodgameplay.gif';
//import gifFNST from '../assets/fnst.gif';
import TypewriterText from '../TypewriterText';

const Experience: React.FC = () => {
    const { ref: ref1 } = useInView();
    const { ref: ref2 } = useInView();

    //const [animate, setAnimate] = useState(false);
    
    //const handleTouchStart = () => {
    //    // Trigger the animation on touch start
    //    setAnimate(true);
    //};

  return (
    <section className="experience">

        <motion.div className="text-content"
         ref={ref1}
         initial={{ opacity: 0, y: 50 }}
         animate={{ opacity: 1, y: 0 } }
         transition={{ duration: 2 }}
          >

            <h2 style={{ textAlign: 'center', color: 'lightblue', textShadow: '0.1em 0.1em 0.2em gray' }}><TypewriterText text="Experience" speed={400} showCaret={true} loop={false} /></h2>        
            <h3 style={{ textAlign: 'left', fontSize: '25px', marginTop: '20px' }}>
              Game Developer Intern, Sleepless Inc. 
              <div style={{ textAlign: 'left', fontSize: '16px', marginTop: '10px' }}>Dublin, Ireland. 2024 - 2025</div>
              
            </h3>
            <h3 style={{ textAlign: 'left', fontSize: '25px', marginTop: '20px' }}>
              
            </h3>
            <p style={{ textAlign: 'left', fontSize: '20px' }}>
            Responsible for designing, developing, and optimizing interactive game play experiences using the latest Unreal Engine 5. My role involves implementing game mechanics, scripting functionalities using Blueprints and C++, and ensuring smooth performance across platforms.
            </p>
            <div style={{ textAlign: 'left', fontSize: '20px' }}>
              <ul>
                <li>Developing and optimizing game-play mechanics, AI behaviors, and interactive elements.</li>
                <li>Collaborating with designers and other developers to create immersive experiences.</li>
                <li>Debugging and optimizing game performance for efficiency and stability.</li>
                <li>Staying up to date with the latest Unreal Engine advancements and best practices.</li>
              </ul>
            </div>

            
        </motion.div>

        <Canvas className="three-canvas" gl={{ alpha: true }} camera={{ position: [1, 1, 1], fov: 90 }}>

            <OrbitControls  />
            <directionalLight position={[5, 5, 5]} intensity={2} color={"white"} />
            <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
              <SleeplessModel />
            </Float>
            <ContactShadows rotation-x={Math.PI / 2} position={[0, -1, 0]} opacity={0.5} blur={2} scale={50} far={20} />  

        </Canvas>
        

        <motion.div className="text-content"
         ref={ref2}
         initial={{ opacity: 0, y: 50 }}
         animate={{ opacity: 1, y: 0 } }
         transition={{ duration: 2 }}
          >

            <h3 style={{ textAlign: 'left', fontSize: '25px', marginTop: '20px' }}>
            Freelance AI & Machine Learning Specialist, Fiverr & Direct Contracts
              <div style={{ textAlign: 'left', fontSize: '16px', marginTop: '10px' }}>Colombo, Sri Lanka. 2019 - 2025</div>
              
            </h3>
            <h3 style={{ textAlign: 'left', fontSize: '25px', marginTop: '20px' }}>
              
            </h3>
            <p style={{ textAlign: 'left', fontSize: '20px' }}>

            </p>
            <div style={{ textAlign: 'left', fontSize: '20px' }}>
              <ul>
                <li>Delivered AI and ML solutions to clients via Fiverr and direct contracts.</li>
                <li>Built and deployed models for deep learning, computer vision, and data analytics
tasks.</li>
                <li>Deep Learning, Computer Vision, Data Preprocessing and Model
Deployment using Amazon ECS/ Azure Kubernetes</li>
                <li>Conducted model optimization and integration for real-time applications and
IOT/Client based devices.</li>
              </ul>
            </div>
        
        </motion.div>

         <motion.div className="text-content"
         ref={ref2}
         initial={{ opacity: 0, y: 50 }}
         animate={{ opacity: 1, y: 0 } }
         transition={{ duration: 2 }}
          >

            <h3 style={{ textAlign: 'left', fontSize: '25px', marginTop: '20px' }}>
            Artificial Intelligence Engineer Intern, BCAS Campus
              <div style={{ textAlign: 'left', fontSize: '16px', marginTop: '10px' }}>Colombo, Sri Lanka. 2021 - 2022</div>
              
            </h3>
            <h3 style={{ textAlign: 'left', fontSize: '25px', marginTop: '20px' }}>
              
            </h3>
            <p style={{ textAlign: 'left', fontSize: '20px' }}>

            </p>
            <div style={{ textAlign: 'left', fontSize: '20px' }}>
              <ul>
                <li>Participated in academic research initiatives, contributing to projects involving generative adversarial networks (GANs), autonomous systems, and reinforcement learning.</li>
                <li>Collaborated on building RESTful APIs using FastAPI and Flask to serve AI functionalities to front-end clients.</li>
                <li>Documented all development processes, including model training, evaluation, and deployment strategies, in line with academic and industry standards.</li>
              </ul>
            </div>
        
        </motion.div>


       
    </section>
 
  );
};

export default Experience;