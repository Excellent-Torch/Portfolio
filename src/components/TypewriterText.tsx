import React, { useRef, useEffect } from 'react';
import Typewriter from './Animations';

interface TypewriterTextProps {
  text: string;
  speed: number;
  showCaret?: boolean;
  loop?: boolean;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, speed, showCaret = true, loop = false }) => {
  const textElement = useRef<HTMLDivElement>(null);
  const caretElement = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (textElement.current) {
      const typewriter = new Typewriter({
        text,
        speed,
        element: textElement.current,
        caretElement: showCaret ? caretElement.current : undefined,
        loop,
      });

      typewriter.start();

      return () => {
        typewriter.stop();
      };
    }
  }, [text, speed, showCaret, loop]);

  return (
    <div className="typewriter-container">
      <div ref={textElement}></div>
      {showCaret && <span ref={caretElement} className="caret">|</span>}
    </div>
  );
};

export default TypewriterText;