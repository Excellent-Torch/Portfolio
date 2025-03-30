import React from 'react';
import '../css/App.css';

import gifRodGameplay from '../assets/rodgameplay.gif';
import gifFNST from '../assets/fnst.gif';
import TypewriterText from '../TypewriterText';

const Projects: React.FC = () => {
  return (
    
    <section className="projects">
      <div className="text-content">
      
        <h2 style={{ textAlign: 'center', color: 'green' }}><TypewriterText text="Projects" speed={500} showCaret={true} loop={false} /></h2>
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
            <li><strong>Libs:</strong> Advance Steam Online Subsystem</li>
          </ul>
        </div>
      </div>
      <div className="image-content">
        <img
          src={gifRodGameplay}
          loading="lazy"
          style={{ width: '600px', height: '360px', marginTop: '50px', marginBottom: '50px' }}
          alt="GIF 1"
        />
      </div>
      <div className="text-content additional-content">
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
      </div>
      <div className="image-content">
        <img
          src={gifFNST}
          loading="lazy"
          style={{ width: '600px', height: '360px', marginTop: '50px', marginBottom: '50px' }}
          alt="GIF 2"
        />
      </div>
    </section>
 
  );
};

export default Projects;