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

    // ===== Master =====
    const master = audio.createGain();
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.7, now + 0.04);
    master.gain.exponentialRampToValueAtTime(0.85, now + durationSec * 0.65);
    master.gain.exponentialRampToValueAtTime(0.001, end);
    // light compression / tone shaping via waveshaper
    const shaper = audio.createWaveShaper();
    const curve = new Float32Array(1024);
    for (let i = 0; i < 1024; i++) {
      const x = (i / 512) - 1;
      curve[i] = Math.tanh(x * 2.2);
    }
    shaper.curve = curve;
    master.connect(shaper).connect(audio.destination);

    // body resonance (engine bay)
    const body = audio.createBiquadFilter();
    body.type = "lowpass";
    body.frequency.setValueAtTime(900, now);
    body.frequency.linearRampToValueAtTime(3200, now + durationSec * 0.8);
    body.Q.value = 3 + rough * 4;
    body.connect(master);

    // ===== RPM ramp curve (idle -> redline -> small decay) =====
    const peakAt = now + durationSec * 0.78;
    const decayHz = idleHz + (redlineHz - idleHz) * 0.55;
    const setRpm = (param: AudioParam, mult: number) => {
      param.setValueAtTime(idleHz * mult, now);
      // small dip then surge (throttle bite)
      param.exponentialRampToValueAtTime(idleHz * mult * 1.15, now + 0.08);
      param.exponentialRampToValueAtTime(redlineHz * mult, peakAt);
      param.exponentialRampToValueAtTime(decayHz * mult, end);
    };

    // ===== Cylinder firings — chord of detuned saws (fundamental + 2x + 3x) =====
    const oscs: OscillatorNode[] = [];
    const fundamentals = [1, 2, 3, 4]; // harmonics
    const gains = [0.55, 0.32, 0.18, 0.1];
    fundamentals.forEach((mult, i) => {
      const o = audio.createOscillator();
      o.type = i === 0 ? "sawtooth" : i === 1 ? "square" : "sawtooth";
      // detune slightly per-cylinder for grit
      o.detune.value = (Math.random() - 0.5) * 30 * (1 + rough);
      setRpm(o.frequency, mult);
      const g = audio.createGain();
      g.gain.value = gains[i] * (1 - rough * 0.2);
      o.connect(g).connect(body);
      oscs.push(o);
    });

    // sub thump
    const sub = audio.createOscillator();
    sub.type = "sine";
    setRpm(sub.frequency, 0.5);
    const subG = audio.createGain(); subG.gain.value = 0.7;
    sub.connect(subG).connect(master);
    oscs.push(sub);

    // amplitude modulation matching cylinder firing rate (cylinders/2 fires per rev for 4-stroke)
    const lfo = audio.createOscillator();
    lfo.type = "sawtooth";
    setRpm(lfo.frequency, cylinders / 2);
    const lfoGain = audio.createGain();
    lfoGain.gain.value = 0.35 + rough * 0.3;
    const amTarget = audio.createGain();
    amTarget.gain.value = 1;
    lfo.connect(lfoGain).connect(amTarget.gain);
    body.disconnect(); body.connect(amTarget).connect(master);
    oscs.push(lfo);

    // ===== Exhaust noise =====
    const bufSize = Math.floor(audio.sampleRate * durationSec);
    const buffer = audio.createBuffer(1, bufSize, audio.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1);
    const noise = audio.createBufferSource();
    noise.buffer = buffer;
    const nFilt = audio.createBiquadFilter();
    nFilt.type = "bandpass";
    nFilt.frequency.setValueAtTime(500, now);
    nFilt.frequency.exponentialRampToValueAtTime(3500, peakAt);
    nFilt.frequency.exponentialRampToValueAtTime(2000, end);
    nFilt.Q.value = 0.9;
    const nGain = audio.createGain();
    nGain.gain.setValueAtTime(0.05, now);
    nGain.gain.linearRampToValueAtTime(0.32, peakAt);
    nGain.gain.exponentialRampToValueAtTime(0.001, end);
    noise.connect(nFilt).connect(nGain).connect(master);
    noise.start(now); noise.stop(end);

    // ===== Turbo whistle =====
    if (turbo) {
      const whistle = audio.createOscillator();
      whistle.type = "sine";
      whistle.frequency.setValueAtTime(1800, now);
      whistle.frequency.exponentialRampToValueAtTime(7200, peakAt);
      whistle.frequency.exponentialRampToValueAtTime(3000, end);
      const wg = audio.createGain();
      wg.gain.setValueAtTime(0.0001, now);
      wg.gain.exponentialRampToValueAtTime(0.06, peakAt);
      wg.gain.exponentialRampToValueAtTime(0.0001, end);
      whistle.connect(wg).connect(master);
      whistle.start(now); whistle.stop(end);
      oscs.push(whistle);

      // blow-off pop on lift
      const popTime = peakAt + 0.05;
      const pop = audio.createBufferSource();
      pop.buffer = buffer;
      const pf = audio.createBiquadFilter();
      pf.type = "bandpass"; pf.frequency.value = 1200; pf.Q.value = 0.6;
      const pg = audio.createGain();
      pg.gain.setValueAtTime(0.0001, popTime);
      pg.gain.exponentialRampToValueAtTime(0.5, popTime + 0.02);
      pg.gain.exponentialRampToValueAtTime(0.0001, popTime + 0.25);
      pop.connect(pf).connect(pg).connect(master);
      pop.start(popTime); pop.stop(popTime + 0.3);
    }

    oscs.forEach((o) => { o.start(now); o.stop(end); });
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
