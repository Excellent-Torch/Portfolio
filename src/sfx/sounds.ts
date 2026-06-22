/**
 * Synthesized UI sound effects using the Web Audio API.
 * No external audio files required — all sounds are generated programmatically.
 *
 * Optimization notes:
 *  - Single shared AudioContext, warmed up on first user gesture (no first-sound delay).
 *  - Click-safe envelopes: short linear fade to true zero + stop slightly past ramp end.
 *  - Noise buffer for `select` is cached (no per-click allocation).
 *  - Every node self-disconnects on `ended` to keep the audio graph clean (no leaks).
 */

let audioCtx: AudioContext | null = null;
let noiseBuffer: AudioBuffer | null = null;
let warmed = false;

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/** Warm up the context early so the first sound is instant. Call on first gesture. */
export function warmUpAudio(): void {
  if (warmed) return;
  warmed = true;
  const ctx = getCtx();
  // Pre-bake the click noise buffer once.
  if (!noiseBuffer) {
    const len = Math.floor(ctx.sampleRate * 0.03);
    noiseBuffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < len; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    }
  }
}

/** Master gain so we can mute globally without tearing down nodes. */
let masterGain: GainNode | null = null;
function master(): GainNode {
  if (!masterGain) {
    masterGain = getCtx().createGain();
    masterGain.gain.value = 1;
    masterGain.connect(getCtx().destination);
  }
  return masterGain;
}

/** Track active sources so a rapid second call can cut the previous one cleanly. */
function track(node: AudioScheduledSourceNode, gainNode: GainNode): void {
  node.addEventListener('ended', () => {
    try { node.disconnect(); } catch {}
    try { gainNode.disconnect(); } catch {}
  });
}

/** Smooth fade helper — linear to 0 avoids the click that exponential-to-0.0001 leaves. */
function fadeOut(g: GainNode, start: number, dur: number): void {
  g.gain.setValueAtTime(g.gain.value, start);
  g.gain.linearRampToValueAtTime(0, start + dur);
}

/** Short soft blip — hover enter */
export function playHover(freq = 520, vol = 0.06): void {
  const ctx = getCtx();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  g.gain.value = 0;
  osc.connect(g);
  g.connect(master());

  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, t);
  osc.frequency.exponentialRampToValueAtTime(freq * 1.06, t + 0.04);

  // Fast attack, smooth release to zero (no click)
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vol, t + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.10);
  fadeOut(g, t + 0.10, 0.02); // tail to true zero

  osc.start(t);
  osc.stop(t + 0.13);
  track(osc, g);
}

/** Quick descending blip — hover leave */
export function playUnhover(freq = 440, vol = 0.04): void {
  const ctx = getCtx();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  g.gain.value = 0;
  osc.connect(g);
  g.connect(master());

  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, t);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.7, t + 0.08);

  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vol, t + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
  fadeOut(g, t + 0.08, 0.02);

  osc.start(t);
  osc.stop(t + 0.11);
  track(osc, g);
}

/** Crisp click — select / press */
export function playSelect(vol = 0.08): void {
  const ctx = getCtx();
  if (!noiseBuffer) warmUpAudio();
  const t = ctx.currentTime;

  // Cached noise burst
  if (noiseBuffer) {
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    const ng = ctx.createGain();
    ng.gain.value = vol;
    noise.connect(ng);
    ng.connect(master());
    // Smooth tail so the noise doesn't hard-cut
    ng.gain.setValueAtTime(vol, t);
    ng.gain.linearRampToValueAtTime(0, t + 0.03);
    noise.start(t);
    noise.stop(t + 0.035);
    track(noise, ng);
  }

  // Short tonal ping on top
  const osc = ctx.createOscillator();
  const g2 = ctx.createGain();
  g2.gain.value = 0;
  osc.connect(g2);
  g2.connect(master());
  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, t);
  osc.frequency.exponentialRampToValueAtTime(1200, t + 0.02);
  g2.gain.setValueAtTime(0, t);
  g2.gain.linearRampToValueAtTime(vol * 0.5, t + 0.003);
  g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
  fadeOut(g2, t + 0.04, 0.01);
  osc.start(t);
  osc.stop(t + 0.06);
  track(osc, g2);
}

/** Softer double-tone — closing a modal / panel */
export function playClose(vol = 0.06): void {
  const ctx = getCtx();
  const t0 = ctx.currentTime;

  const playTone = (freq: number, start: number, dur: number, v: number) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    g.gain.value = 0;
    osc.connect(g);
    g.connect(master());
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, start);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, start + dur);
    g.gain.setValueAtTime(0, start);
    g.gain.linearRampToValueAtTime(v, start + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur - 0.01);
    fadeOut(g, start + dur - 0.01, 0.015);
    osc.start(start);
    osc.stop(start + dur + 0.02);
    track(osc, g);
  };

  playTone(500, t0, 0.15, vol);
  playTone(380, t0 + 0.08, 0.18, vol * 0.6);
}

/**
 * Retro mechanical-keyboard typing tick — one per character.
 * Short square-wave blip with a noise transient for that vintage terminal feel.
 * Designed to be called rapidly without building up into a drone.
 */
export function playTypeTick(vol = 0.035): void {
  const ctx = getCtx();
  if (!noiseBuffer) warmUpAudio();
  const t = ctx.currentTime;

  // Square-wave body — the "clack"
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  g.gain.value = 0;
  osc.connect(g);
  g.connect(master());
  osc.type = 'square';
  // Slight pitch jitter so repeated ticks don't sound mechanical-flat
  const base = 1400 + Math.random() * 350;
  osc.frequency.setValueAtTime(base, t);
  osc.frequency.exponentialRampToValueAtTime(base * 0.55, t + 0.018);

  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vol, t + 0.001);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.02);
  fadeOut(g, t + 0.02, 0.008);

  osc.start(t);
  osc.stop(t + 0.035);
  track(osc, g);

  // Tiny noise transient on top — the key-cap "tick"
  if (noiseBuffer) {
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.playbackRate.value = 2.2;
    const ng = ctx.createGain();
    ng.gain.value = vol * 0.7;
    noise.connect(ng);
    ng.connect(master());
    ng.gain.setValueAtTime(vol * 0.7, t);
    ng.gain.linearRampToValueAtTime(0, t + 0.015);
    noise.start(t);
    noise.stop(t + 0.02);
    track(noise, ng);
  }
}

/**
 * Retro "carriage return" / line-complete blip — played when a typewriter line finishes.
 * Slightly longer, lower-pitched square blip.
 */
export function playTypeReturn(vol = 0.05): void {
  const ctx = getCtx();
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  g.gain.value = 0;
  osc.connect(g);
  g.connect(master());
  osc.type = 'square';
  osc.frequency.setValueAtTime(900, t);
  osc.frequency.exponentialRampToValueAtTime(300, t + 0.08);

  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vol, t + 0.003);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
  fadeOut(g, t + 0.09, 0.02);

  osc.start(t);
  osc.stop(t + 0.12);
  track(osc, g);
}
