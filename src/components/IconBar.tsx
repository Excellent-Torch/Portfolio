import React from 'react';

type Logo = {
  src?: string;                 // image path (png/jpg/svg)
  content?: React.ReactNode;    // inline SVG element or any React node
  alt?: string;
  href?: string;
};

interface Props {
  logos: Logo[];
  speed?: number; // seconds for one loop
  height?: number; // bar height in px
}

const IconBar: React.FC<Props> = ({ logos, speed = 20, height = 68 }) => {
  const loopLogos = [...logos, ...logos];

  return (
    <div className="company-icon-bar" style={{ height }} aria-hidden="true">
      {/* viewport centers the animated track */}
      <div className="company-icon-viewport">
        <div
          className="company-icon-marquee"
          style={{ 
            animationDuration: `${speed}s`,
            display: 'flex',
            gap: '256px' // Add gap between logos
          }}
        >
          {loopLogos.map((l, i) => {
            let imgNode: React.ReactNode = null;
            if (l.content) {
              imgNode = (
                <span className="company-logo company-logo--inline" aria-hidden>
                  {l.content}
                </span>
              );
            } else if (l.src) {
              imgNode = (
                <img
                  className="company-logo"
                  src={l.src}
                  alt={l.alt || `logo-${i}`}
                  draggable={false}
                />
              );
            }
            if (!imgNode) return null;

            return l.href ? (
              <a key={i} href={l.href} target="_blank" rel="noopener noreferrer" className="company-icon-link">
                {imgNode}
              </a>
            ) : (
              <div key={i} className="company-icon-item">
                {imgNode}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IconBar;