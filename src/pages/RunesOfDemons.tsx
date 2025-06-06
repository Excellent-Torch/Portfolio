import React, { useEffect } from 'react';
import background from '../assets/rod.mp4'; // Change to your video file if needed
import '../css/App.css';

// Example icon imports (replace with your actual icon paths)
import unrealIcon from '../assets/unreal.png';
import steamIcon from '../assets/steam.png';


const RunesOfDemons: React.FC = () => {
     useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Runes Of Demons | Coming Soon';
    return () => {
      document.title = previousTitle;
    };
  }, []);
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          minWidth: '100vw',
          minHeight: '100vh',
          width: 'auto',
          height: 'auto',
          objectFit: 'cover',
          zIndex: -1,
        }}
      >
        <source src={background} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '4rem',
          textShadow: '0 2px 8px #000',
          paddingTop: '25vh',
        }}
      >
        <h1>Coming Soon!</h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '2rem',
            marginTop: '1.5rem',
            marginBottom: '1.5rem',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src={unrealIcon} alt="Unreal Engine" style={{ width: 58, height: 70, textShadow: '0 3px 8px #000' }} />
          <img src={steamIcon} alt="Steam" style={{ width: 58, height: 58, textShadow: '0 3px 8px #000' }} />
        
        </div>
      </div>
        <div
            style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            fontSize: '1.25rem',
            textAlign: 'center',
            maxWidth: '800px',
            paddingTop: '20vh', // Adjust padding to center vertically
            textShadow: '0 2px 4px #000',
            }}
        >
            <p>An Upcomong anime-style Multiplayer Third Person Shooter game set in the brutal demon realm of Varkath. </p>
        </div>   
      
      </div>
  );
};

export default RunesOfDemons;