



import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import '../css/App.css';

import TypewriterText from '../components/TypewriterText';
import gifContact from '../assets/contact.gif';


const Contact: React.FC = () => {
    const { ref } = useInView();

  return (
    <section className="contact">

        <motion.div className="text-content"
         ref={ref}
         initial={{ opacity: 0, x: -50 }}
         animate={{ opacity: 1, x: 0 } }
         transition={{ duration: 1 }}
          >
            <h2 style={{ textAlign: 'center', color: 'white',  fontSize: '40px', textShadow: '0.1em 0.1em 0.2em gray' }}><TypewriterText text="Contact Me" speed={200} showCaret={true} loop={false} /></h2>        
            <h3 style={{ textAlign: 'center', fontSize: '25px', marginTop: '20px' }}>
            Feel free to send me a message here:
            <span> </span>
            <a>contact@excellenttorch.com</a>
            <br></br>
            Or Any Social Media Thing Over Here &#128512;<span className="blink-fast">👇</span>
            <br></br>
            <br></br>
            <span> </span>
            <div style={{ textAlign: 'center', fontSize: '20px' }}>
            <a href="https://github.com/Excellent-Torch" target="_blank" rel="noopener noreferrer" className="contact-me-link" style={{ color: 'gray' }}>GitHub</a>
            <span> </span>
            <a href="https://www.linkedin.com/in/excellent-torch/" target="_blank" rel="noopener noreferrer" className="contact-me-link" style={{ color: 'lightblue' }}>LinkedIn</a>
            <span> </span>
            <a href="https://www.youtube.com/@ExcellentTorch" target="_blank" rel="noopener noreferrer" className="contact-me-link" style={{ color: 'red' }}>YouTube</a>
            <span> </span>
            <a href="https://www.instagram.com/excellent_torch/" target="_blank" rel="noopener noreferrer" className="contact-me-link" style={{ color: '#E1306C' }}>Instagram</a>
            </div>      
            </h3>
        
        </motion.div>

        <motion.div className="image-content"
        ref={ref}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 } }
        transition={{ duration: 1 }}
        >

          <img
            src={gifContact}
            loading="lazy"
            style={{ width: '600px', height: '360px', marginTop: '25px', marginBottom: '25px', alignItems: 'center', alignSelf: 'center' }}
            alt="GIF 2"
          />
        
        </motion.div>


    </section>
 
  );
};

export default Contact;