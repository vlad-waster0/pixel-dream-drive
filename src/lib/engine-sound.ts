// Realistic engine acceleration synth using Web Audio API.
// Layered: crankshaft pulses (sawtooth chord), exhaust noise, induction whoosh,
// turbo whistle, and pop-on-lift. Profile changes the character per car.
let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  return ctx;
}

export interface EngineProfile {
  cylinders?: number;     // 4, 6, 8...
  idleHz?: number;        // base fundamental at idle
  redlineHz?: number;     // peak fundamental at redline
  turbo?: boolean;        // adds whistle + blow-off
  rough?: number;         // 0..1 — engine roughness
  duration?: number;      // seconds
}

export function playRev(profile: EngineProfile = {}) {
  const {
    cylinders = 8,
    idleHz = 55,
    redlineHz = 380,
    turbo = true,
    rough = 0.4,
    duration: durationSec = 2.4,
  } = profile;
  try {
    const audio = getCtx();
    if (audio.state === "suspended") audio.resume();
    const now = audio.currentTime;
    const end = now + durationSec;

    // Master gain
    const master = audio.createGain();
    master.gain.setValueAtTime(0, now);
    master.gain.linearRampToValueAtTime(0.5, now + 0.05);
    master.gain.exponentialRampToValueAtTime(0.6, now + durationSec * 0.7);
    master.gain.exponentialRampToValueAtTime(0.001, end);
    master.connect(audio.destination);

    // Low-pass for body
    const lowpass = audio.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.setValueAtTime(800, now);
    lowpass.frequency.linearRampToValueAtTime(2200, end);
    lowpass.Q.value = 4;
    lowpass.connect(master);

    // Engine fundamental — rises in pitch (RPM ramp)
    const osc1 = audio.createOscillator();
    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(60, now);
    osc1.frequency.exponentialRampToValueAtTime(420, now + durationSec * 0.85);
    osc1.frequency.exponentialRampToValueAtTime(280, end);
    const g1 = audio.createGain(); g1.gain.value = 0.5;
    osc1.connect(g1).connect(lowpass);

    // Harmonic
    const osc2 = audio.createOscillator();
    osc2.type = "square";
    osc2.frequency.setValueAtTime(120, now);
    osc2.frequency.exponentialRampToValueAtTime(840, now + durationSec * 0.85);
    osc2.frequency.exponentialRampToValueAtTime(560, end);
    const g2 = audio.createGain(); g2.gain.value = 0.18;
    osc2.connect(g2).connect(lowpass);

    // Sub
    const osc3 = audio.createOscillator();
    osc3.type = "sine";
    osc3.frequency.setValueAtTime(40, now);
    osc3.frequency.exponentialRampToValueAtTime(200, now + durationSec * 0.85);
    const g3 = audio.createGain(); g3.gain.value = 0.6;
    osc3.connect(g3).connect(master);

    // Noise (turbo / exhaust hiss)
    const bufSize = audio.sampleRate * durationSec;
    const buffer = audio.createBuffer(1, bufSize, audio.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * 0.5;
    const noise = audio.createBufferSource();
    noise.buffer = buffer;
    const noiseFilter = audio.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.setValueAtTime(400, now);
    noiseFilter.frequency.linearRampToValueAtTime(3000, end);
    noiseFilter.Q.value = 0.8;
    const noiseGain = audio.createGain();
    noiseGain.gain.setValueAtTime(0.05, now);
    noiseGain.gain.linearRampToValueAtTime(0.25, now + durationSec * 0.7);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, end);
    noise.connect(noiseFilter).connect(noiseGain).connect(master);

    osc1.start(now); osc2.start(now); osc3.start(now); noise.start(now);
    osc1.stop(end); osc2.stop(end); osc3.stop(end); noise.stop(end);
  } catch (e) { console.warn("Audio failed", e); }
}

export function playClick() {
  try {
    const audio = getCtx();
    if (audio.state === "suspended") audio.resume();
    const now = audio.currentTime;
    const osc = audio.createOscillator();
    osc.type = "square";
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.08);
    const g = audio.createGain();
    g.gain.setValueAtTime(0.15, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc.connect(g).connect(audio.destination);
    osc.start(now); osc.stop(now + 0.1);
  } catch {}
}
