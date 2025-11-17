import React from 'react';

//import { Canvas } from "@react-three/fiber";
//import { ContactShadows, Float, OrbitControls } from "@react-three/drei";
//import { LogoModel } from "./LogoModel";
//import { SleeplessModel } from "../components/Sleepless";
// 3D Stuff End

import IconBar from '../components/IconBar';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import BlurText from "../components/BlurText";




import '../css/App.css';

//import gifRodGameplay from '../assets/rodgameplay.gif';
//import gifFNST from '../assets/fnst.gif';
//import TypewriterText from '../components/TypewriterText';


const Experience: React.FC = () => {
    const { ref: listRef } = useInView();

    const handleAnimationComplete = () => {

        console.log('Animation completed!');

    };

    const experiences = [
      {
        role: 'Lead AI Gameplay Engineer',
        company: 'Sleepless Inc.',
        location: 'Dublin, Ireland',
        period: '2024 - 2025',
        summary:
          'Designing, developing, and optimizing interactive gameplay experiences using Unreal Engine 5. Implemented mechanics, Blueprints and C++ systems, and performance optimisations.',
        points: [
          'Developed and optimised gameplay mechanics and AI behaviours.',
          'Collaborated with designers and engineers to create immersive experiences.',
          'Debugged and improved performance across target platforms.',
          'Adopted latest UE5 features and best practices.'
        ]
      },
      {
        role: 'Artificial Intelligence Engineer',
        company: 'BCAS Campus',
        location: 'Colombo, Sri Lanka',
        period: '2021 - 2023',
        summary:
          'Contributed to research projects involving GANs, autonomous systems and reinforcement learning. Built APIs and documented model workflows.',
        points: [
          'Participated in academic research for generative and RL systems.',
          'Built RESTful APIs with FastAPI/Flask to serve AI components.',
          'Documented training, evaluation and deployment processes.'
        ]
      },
      {
        role: 'Freelance AI/ML Developer',
        company: 'Upwork & Direct Contracts',
        location: 'Colombo, Sri Lanka',
        period: '2019 - Present',
        summary:
          'Delivered ML solutions for clients: deep learning, computer vision, data analytics and model deployment.',
        points: [
          'Delivered AI/ML solutions for production and research clients.',
          'Built and deployed deep learning models and pipelines.',
          'Optimised models for real-time and edge applications.'
        ]
      }
    ];

    const companyLogos = [
      { src: '/src/assets/logos/sleepless.svg', alt: 'Sleepless' },
      { src: '/src/assets/logos/bcas.png', alt: 'BCAS Campus' },
      { src: '/src/assets/logos/upwork.png', alt: 'Upwork' },
      { src: '/src/assets/logos/fiverr.png', alt: 'Fiverr' }
    ];

  return (
    <section className="experience page-center">

      <motion.div className="text-content"
         ref={listRef}
         initial={{ opacity: 0, y: 50 }}
         animate={{ opacity: 1, y: 0 } }
         transition={{ duration: 1 }}
      >
        <h2 style={{ textAlign: 'center', color: '#ffffffff', textShadow: '0.1em 0.1em 0.4em #1b68f8ff' }}>
            <BlurText
              text="Experience"
              delay={150}
              animateBy="letters"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className='page-title'             
            />
        </h2>

        

        <ul style={{ listStyle: 'none', padding: 0, marginTop: 24 }}>
          {experiences.map((exp, idx) => (
            <li key={idx} style={{ marginBottom: 22 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                    <h3 style={{ margin: 0, fontSize: 20 }}>{exp.role}, <span style={{ color: '#72a3f7ff', fontWeight: 600 }}>{exp.company}</span></h3>
                    <div style={{ color: '#72a3f7ff', fontSize: 14 }}>{exp.location} · {exp.period}</div>
                  </div>

                  <p style={{ marginTop: 8, marginBottom: 8, fontSize: 16 }}>{exp.summary}</p>

                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    {exp.points.map((pt, i) => (
                      <li key={i} style={{ marginBottom: 6, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <span style={{ color: '#707070ff', minWidth: 18, lineHeight: '1.2' }}>•</span>
                        <span style={{ fontSize: 16 }}>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
         
      </motion.div>
   <IconBar logos={companyLogos} speed={25} height={68} /> 
    </section>
  );
};

export default Experience;
