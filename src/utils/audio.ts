export const playAlarmSound = () => {
  try {
    const AudioContextConstructor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextConstructor) return;

    const ctx = new AudioContextConstructor();
    
    // Simple function to play a note
    const playNote = (freq: number, startTime: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(startTime);
      
      // Envelope
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      
      osc.stop(startTime + duration);
    };

    const now = ctx.currentTime;
    // Dreamy arpeggio
    playNote(523.25, now, 1.5);       // C5
    playNote(659.25, now + 0.2, 1.5); // E5
    playNote(783.99, now + 0.4, 1.5); // G5
    playNote(1046.50, now + 0.6, 2.0); // C6
    
  } catch (e) {
    console.error("Failed to play alarm sound", e);
  }
};
