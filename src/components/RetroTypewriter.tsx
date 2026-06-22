import React, { useEffect, useRef, useState } from 'react';
import { playTypeTick, playTypeReturn } from '../sfx/sounds';
import '../css/RetroTypewriter.css';

interface RetroTypewriterProps {
  text: string;
  /** Milliseconds per character. ~28ms gives a snappy retro terminal feel. */
  speed?: number;
  /** Called when the full text has been revealed. */
  onComplete?: () => void;
  /** Extra class name for the wrapper. */
  className?: string;
}

/**
 * Retro terminal-style typewriter.
 * Reveals `text` one character at a time with a blinking block cursor and
 * plays a synthesized mechanical-keyboard tick on each character.
 */
const RetroTypewriter: React.FC<RetroTypewriterProps> = ({
  text,
  speed = 28,
  onComplete,
  className = '',
}) => {
  const [shown, setShown] = useState('');
  const idxRef = useRef(0);
  const doneRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Reset whenever the source text changes.
  useEffect(() => {
    setShown('');
    idxRef.current = 0;
    doneRef.current = false;
  }, [text]);

  useEffect(() => {
    if (!text) return;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      const i = idxRef.current;
      if (i >= text.length) {
        if (!doneRef.current) {
          doneRef.current = true;
          playTypeReturn();
          onCompleteRef.current?.();
        }
        return;
      }
      const ch = text[i];
      idxRef.current = i + 1;
      setShown(text.slice(0, idxRef.current));

      // Skip sound for whitespace (feels more natural) — but still advance.
      if (ch.trim().length > 0) {
        playTypeTick();
      }
      // Slight humanized jitter so it doesn't sound like a metronome.
      const jitter = (Math.random() - 0.5) * 12;
      window.setTimeout(tick, speed + jitter);
    };

    // Tiny lead-in delay so the bubble's pop animation isn't drowned by ticks.
    const lead = window.setTimeout(tick, 180);

    return () => {
      cancelled = true;
      window.clearTimeout(lead);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed]);

  return (
    <span className={`retro-typewriter ${className}`}>
      <span className="retro-typewriter-text">{shown}</span>
      <span className="retro-typewriter-cursor" aria-hidden="true">▋</span>
    </span>
  );
};

export default RetroTypewriter;
