// Sound effects for alerts and notifications using Web Audio API
class SoundManager {
  constructor() {
    this.audioContext = null;
    this.enabled = true;
  }

  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  toggle(enabled) {
    this.enabled = enabled;
  }

  playBeep(frequency = 800, duration = 200, volume = 0.3) {
    if (!this.enabled) return;

    this.init();
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration / 1000);
  }

  // Critical alert - urgent attention needed
  playAlert() {
    if (!this.enabled) return;

    this.init();
    const now = this.audioContext.currentTime;

    // Create a two-tone alert sound
    const playTone = (freq, startTime, duration = 0.15) => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'square';

      gainNode.gain.setValueAtTime(0.2, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };

    // Play alert pattern: HIGH-LOW-HIGH-LOW
    playTone(1000, now, 0.15);
    playTone(600, now + 0.2, 0.15);
    playTone(1000, now + 0.4, 0.15);
    playTone(600, now + 0.6, 0.15);
  }

  // Success notification - positive feedback
  playSuccess() {
    if (!this.enabled) return;

    this.init();
    const now = this.audioContext.currentTime;

    const playTone = (freq, startTime, duration = 0.1) => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.15, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };

    // Play ascending tones
    playTone(523, now, 0.08);      // C
    playTone(659, now + 0.1, 0.08); // E
    playTone(784, now + 0.2, 0.15); // G
  }

  // Notification sound - gentle attention
  playNotification() {
    if (!this.enabled) return;
    this.playBeep(600, 150, 0.2);
  }

  // Warning sound - caution needed
  playWarning() {
    if (!this.enabled) return;

    this.init();
    const now = this.audioContext.currentTime;

    const playTone = (freq, startTime, duration = 0.2) => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'triangle';

      gainNode.gain.setValueAtTime(0.15, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };

    // Play warning pattern: descending tones
    playTone(800, now, 0.2);
    playTone(700, now + 0.25, 0.2);
  }

  // Message received sound
  playMessageReceived() {
    if (!this.enabled) return;
    this.playBeep(440, 100, 0.15);
  }

  // Typing indicator sound (subtle)
  playTyping() {
    if (!this.enabled) return;
    this.playBeep(300, 50, 0.08);
  }
}

// Export singleton instance
export const soundManager = new SoundManager();

// Convenience functions
export const sounds = {
  alert: () => soundManager.playAlert(),
  success: () => soundManager.playSuccess(),
  warning: () => soundManager.playWarning(),
  notification: () => soundManager.playNotification(),
  message: () => soundManager.playMessageReceived(),
  typing: () => soundManager.playTyping(),
  toggle: (enabled) => soundManager.toggle(enabled)
};
