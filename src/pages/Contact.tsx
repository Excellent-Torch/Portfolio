import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import '../css/App.css';
import TypewriterText from '../components/TypewriterText';

const Contact: React.FC = () => {
  const { ref } = useInView();

  // Detect mobile
  const isMobile = window.innerWidth <= 600;

  return (
    <section
      className="contact"
      style={{
        flexDirection: isMobile ? 'column' : undefined,
        alignItems: isMobile ? 'center' : undefined,
        paddingTop: isMobile ? '2rem' : undefined,
        width: isMobile ? '100vw' : undefined,
        minHeight: isMobile ? '60vh' : undefined,
        boxSizing: isMobile ? 'border-box' : undefined,
      }}
    >
      <motion.div
        className="text-content"
        ref={ref}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        style={{
          width: isMobile ? '90vw' : undefined,
          paddingLeft: isMobile ? 0 : undefined,
          paddingRight: isMobile ? 0 : undefined,
          textAlign: 'center',
          fontSize: isMobile ? '1.1rem' : undefined,
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: isMobile ? '2rem' : '40px',
            textShadow: '0.1em 0.1em 0.2em gray',
            marginLeft: 0,
            marginRight: 0,
          }}
        >
          <TypewriterText text="Contact Me" speed={200} showCaret={true} loop={false} />
        </h2>
        <h3
          style={{
            textAlign: 'center',
            fontSize: isMobile ? '1.2rem' : '25px',
            marginTop: isMobile ? '1rem' : '20px',
            marginLeft: 0,
            marginRight: 0,
          }}
        >
          Feel free to send me a message here:
          <span> </span>
          <a style={{ wordBreak: 'break-all', fontSize: isMobile ? '1rem' : undefined }}>contact@excellenttorch.com</a>
          <br />
          Or Any Social Media Thing Over Here &#128512;<span className="blink-fast">👇</span>
          <br />
          <br />
          <span> </span>
          <div
            style={{
              textAlign: 'center',
              fontSize: isMobile ? '1rem' : '20px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: isMobile ? '10px' : '20px',
              marginTop: isMobile ? '10px' : undefined,
            }}
          >
            <a
              href="https://github.com/Excellent-Torch"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-me-link"
              style={{
                color: 'white',
                backgroundColor: 'gray',
                padding: isMobile ? '8px 12px' : '8px 16px',
                borderRadius: '8px',
                fontSize: isMobile ? '1rem' : undefined,
                margin: 0,
                minWidth: isMobile ? '90px' : undefined,
                textAlign: 'center',
              }}
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/excellent-torch/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-me-link"
              style={{
                color: 'darkblue',
                backgroundColor: '#e6e6fa',
                padding: isMobile ? '8px 12px' : '8px 16px',
                borderRadius: '8px',
                fontSize: isMobile ? '1rem' : undefined,
                margin: 0,
                minWidth: isMobile ? '90px' : undefined,
                textAlign: 'center',
              }}
            >
              LinkedIn
            </a>
            <a
              href="https://www.youtube.com/@ExcellentTorch"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-me-link"
              style={{
                color: 'red',
                backgroundColor: '#fff0f0',
                padding: isMobile ? '8px 12px' : '8px 16px',
                borderRadius: '8px',
                fontSize: isMobile ? '1rem' : undefined,
                margin: 0,
                minWidth: isMobile ? '90px' : undefined,
                textAlign: 'center',
              }}
            >
              YouTube
            </a>
            <a
              href="https://www.instagram.com/excellent_torch/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-me-link"
              style={{
                color: '#E1306C',
                backgroundColor: '#fff0fa',
                padding: isMobile ? '8px 12px' : '8px 16px',
                borderRadius: '8px',
                fontSize: isMobile ? '1rem' : undefined,
                margin: 0,
                minWidth: isMobile ? '90px' : undefined,
                textAlign: 'center',
              }}
            >
              Instagram
            </a>
          </div>
        </h3>
      </motion.div>
    </section>
  );
};

export default Contact;