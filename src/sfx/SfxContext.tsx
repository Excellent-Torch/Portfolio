import React, { createContext, useContext, useCallback, useRef, useEffect, type ReactNode } from 'react';
import { playHover, playUnhover, playSelect, playClose, warmUpAudio } from './sounds';

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */
type SfxName = 'hover' | 'unhover' | 'select' | 'close';

interface SfxContextValue {
  /** Manually trigger any sound */
  play: (name: SfxName) => void;
  /** Enable / disable all sounds (default: true) */
  setEnabled: (v: boolean) => void;
}

const SfxContext = createContext<SfxContextValue | null>(null);

/* ------------------------------------------------------------------ */
/*  Tuning constants                                                  */
/* ------------------------------------------------------------------ */
const INTERACTIVE_SELECTOR =
  'a,button,[role="button"],[tabindex]:not([tabindex="-1"]),input,select,textarea';

// Minimum spacing between consecutive hover sounds (ms).
// Lower = snappier but can stutter on fast sweeps across adjacent buttons.
// 35ms is below human perception of "lag" yet prevents machine-gun bursts.
const HOVER_MIN_INTERVAL = 35;

// When the cursor moves from one interactive element directly to another,
// skip the unhover sound if the move happens within this window (ms).
// This is the main fix for the "static cut" when buttons are side-by-side.
const UNHOVER_SUPPRESS_WINDOW = 90;

/* ------------------------------------------------------------------ */
/*  Provider — wraps app, adds global document-level listeners         */
/* ------------------------------------------------------------------ */
export const SfxProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const enabledRef = useRef(true);

  // Single timestamp of the last hover sound played (for throttling).
  const lastHoverAt = useRef(0);
  // The element the cursor is currently "on" (for hover/leave pairing).
  const currentElRef = useRef<Element | null>(null);
  // Timestamp of the last leave; used to suppress leave if a hover follows quickly.
  const lastLeaveAt = useRef(0);
  // Pending leave timer — lets us cancel an unhover if a hover arrives in time.
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const play = useCallback((name: SfxName) => {
    if (!enabledRef.current) return;
    switch (name) {
      case 'hover':   playHover();   break;
      case 'unhover': playUnhover(); break;
      case 'select':  playSelect();  break;
      case 'close':   playClose();   break;
    }
  }, []);

  const setEnabled = useCallback((v: boolean) => {
    enabledRef.current = v;
  }, []);

  /* Global event delegation — single listener per event type */
  useEffect(() => {
    const matchesInteractive = (el: Element | null): boolean => {
      if (!el) return false;
      return el.matches?.(INTERACTIVE_SELECTOR) ?? false;
    };

    // Resolve the interactive ancestor of any element (handles nested children).
    const resolveInteractive = (el: Element | null): Element | null => {
      let cur: Element | null = el;
      while (cur && cur !== document.body) {
        if (matchesInteractive(cur)) return cur;
        cur = cur.parentElement;
      }
      return null;
    };

    /* ── Enter (mouseover) ── */
    const onEnter = (e: MouseEvent): void => {
      if (!enabledRef.current) return;
      const target = resolveInteractive(e.target as Element | null);
      if (!target) return;

      // Same element — nothing to do.
      if (currentElRef.current === target) return;

      // If a leave was pending for the previous element, cancel it: the user
      // moved directly from one interactive element to another. This is what
      // eliminates the overlapping hover+unhover "static cut".
      if (leaveTimer.current) {
        clearTimeout(leaveTimer.current);
        leaveTimer.current = null;
      }

      // Throttle: prevent machine-gun hover sounds on rapid sweeps, but keep
      // it tight enough that it never feels laggy.
      const now = performance.now();
      if (now - lastHoverAt.current < HOVER_MIN_INTERVAL) {
        // Still update the current element so leave logic stays correct.
        currentElRef.current = target;
        return;
      }
      lastHoverAt.current = now;

      currentElRef.current = target;
      playHover();
    };

    /* ── Leave (mouseout) ── */
    const onLeave = (e: MouseEvent): void => {
      if (!enabledRef.current) return;
      const target = resolveInteractive(e.target as Element | null);
      if (!target) return;

      const related = e.relatedTarget as Element | null;
      const relatedInteractive = resolveInteractive(related);

      // If we're moving to another interactive element, onEnter will handle it
      // (and cancel any pending leave). So defer the unhover slightly.
      // If we're moving to nothing/non-interactive, fire unhover after a short
      // delay so it can be cancelled by an immediate re-enter.
      if (leaveTimer.current) {
        clearTimeout(leaveTimer.current);
        leaveTimer.current = null;
      }

      lastLeaveAt.current = performance.now();
      leaveTimer.current = setTimeout(() => {
        leaveTimer.current = null;
        // Only fire if we actually left an interactive element to non-interactive space.
        if (currentElRef.current === target) {
          currentElRef.current = null;
        }
        // Skip if a hover happened within the suppress window (handled by onEnter cancel).
        if (performance.now() - lastLeaveAt.current < UNHOVER_SUPPRESS_WINDOW - 5) {
          // Hover already cancelled us; do nothing.
          return;
        }
        playUnhover();
      }, UNHOVER_SUPPRESS_WINDOW);
    };

    /* ── Click (select) ── */
    const onClick = (e: MouseEvent): void => {
      if (!enabledRef.current) return;
      const target = resolveInteractive(e.target as Element | null);
      if (!target) return;
      playSelect();
    };

    /* ── Warm up audio on the very first user gesture ── */
    const onFirstGesture = (): void => {
      warmUpAudio();
      window.removeEventListener('pointerdown', onFirstGesture);
      window.removeEventListener('keydown', onFirstGesture);
      window.removeEventListener('pointermove', onFirstGesture);
    };
    window.addEventListener('pointerdown', onFirstGesture, { once: true, passive: true });
    window.addEventListener('keydown', onFirstGesture, { once: true, passive: true });
    window.addEventListener('pointermove', onFirstGesture, { once: true, passive: true });

    document.addEventListener('mouseover', onEnter, { passive: true });
    document.addEventListener('mouseout', onLeave, { passive: true });
    document.addEventListener('click', onClick, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', onFirstGesture);
      window.removeEventListener('keydown', onFirstGesture);
      window.removeEventListener('pointermove', onFirstGesture);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      document.removeEventListener('click', onClick);
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
    };
  }, []);

  return (
    <SfxContext.Provider value={{ play, setEnabled }}>
      {children}
    </SfxContext.Provider>
  );
};

/* ------------------------------------------------------------------ */
/*  Hook                                                              */
/* ------------------------------------------------------------------ */
export const useSfx = (): SfxContextValue => {
  const ctx = useContext(SfxContext);
  if (!ctx) throw new Error('useSfx must be used within <SfxProvider>');
  return ctx;
};
