const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playTone({ frequency, type = 'sine', duration = 0.1, volume = 0.3, fadeOut = true }) {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
  gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);

  if (fadeOut) {
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  }

  oscillator.start(audioCtx.currentTime);
  oscillator.stop(audioCtx.currentTime + duration);
}

export function playFlap() {
  playTone({ frequency: 520, type: 'sine', duration: 0.08, volume: 0.2 });
}

export function playScore() {
  playTone({ frequency: 880, type: 'sine', duration: 0.15, volume: 0.3 });
  setTimeout(() => playTone({ frequency: 1100, type: 'sine', duration: 0.15, volume: 0.25 }), 100);
}

export function playDead() {
  playTone({ frequency: 300, type: 'sawtooth', duration: 0.15, volume: 0.4 });
  setTimeout(() => playTone({ frequency: 200, type: 'sawtooth', duration: 0.3, volume: 0.35 }), 120);
}