export function playNotificationSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const playBeep = (time: number, freq: number) => {
      const osc = context.createOscillator();
      const gain = context.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0.15, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);
      osc.connect(gain);
      gain.connect(context.destination);
      osc.start(time);
      osc.stop(time + 0.15);
    };
    const now = context.currentTime;
    playBeep(now, 880);
    playBeep(now + 0.15, 1046.5);
  } catch (err) {
    console.warn("Sound play failed:", err);
  }
}

export const getTimestampFromOrderId = (id: string) => {
  if (id.startsWith("hist_")) {
    const tsString = id.replace("hist_", "");
    const ts = parseInt(tsString);
    if (!isNaN(ts) && ts > 1000000000000) return ts;
  }
  return Date.now();
};
