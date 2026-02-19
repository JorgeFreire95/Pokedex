export const soundSynthesizer = {
    ctx: null,

    init: () => {
        if (!soundSynthesizer.ctx) {
            soundSynthesizer.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
    },

    playTone: (freq, type, duration, vol = 0.1) => {
        const ctx = soundSynthesizer.ctx;
        if (!ctx) return;

        // Resume context if suspended (browser autoplay policy)
        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(vol, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
    },

    play: (soundType) => {
        if (!soundSynthesizer.ctx) soundSynthesizer.init();
        const ctx = soundSynthesizer.ctx;

        switch (soundType) {
            case 'dpad-up':
                // High pitch short beep
                soundSynthesizer.playTone(880, 'square', 0.1);
                break;

            case 'dpad-down':
                // Low pitch short beep
                soundSynthesizer.playTone(220, 'square', 0.1);
                break;

            case 'dpad-left':
                // Sliding down tone
                {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.frequency.setValueAtTime(600, ctx.currentTime);
                    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.15);
                    gain.gain.setValueAtTime(0.1, ctx.currentTime);
                    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start();
                    osc.stop(ctx.currentTime + 0.15);
                }
                break;

            case 'dpad-right':
                // Sliding up tone
                {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.frequency.setValueAtTime(300, ctx.currentTime);
                    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.15);
                    gain.gain.setValueAtTime(0.1, ctx.currentTime);
                    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start();
                    osc.stop(ctx.currentTime + 0.15);
                }
                break;

            case 'dpad-center':
                // "Select" double beep
                soundSynthesizer.playTone(1200, 'sine', 0.08);
                setTimeout(() => soundSynthesizer.playTone(1200, 'sine', 0.08), 100);
                break;

            case 'home':
                // "Menu" open chime (Major triad arpeggio)
                soundSynthesizer.playTone(523.25, 'sine', 0.1); // C5
                setTimeout(() => soundSynthesizer.playTone(659.25, 'sine', 0.1), 100); // E5
                setTimeout(() => soundSynthesizer.playTone(783.99, 'sine', 0.2), 200); // G5
                break;

            case 'back':
                // "Cancel" buzz
                soundSynthesizer.playTone(150, 'sawtooth', 0.15);
                break;

            default:
                // Generic click
                soundSynthesizer.playTone(440, 'sine', 0.05);
        }
    },

    speak: (text) => {
        if (!('speechSynthesis' in window)) return;

        // Cancel any current speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        // Try to select a Spanish voice
        const voices = window.speechSynthesis.getVoices();

        // Gen 1 Pokedex (Dexter) had a somewhat robotic male voice.
        // We try to find a 'Google' voice (usually higher quality) or a male voice if possible.
        // Priority: Spanish Google -> Spanish Generic
        let selectedVoice = voices.find(voice => voice.lang.includes('es') && voice.name.includes('Google'));

        if (!selectedVoice) {
            selectedVoice = voices.find(voice => voice.lang.includes('es'));
        }

        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }

        // Gen 1 Style: Slower, slightly deeper/flatter to sound robotic
        utterance.pitch = 0.8; // Lower pitch for that "Dexter" feel
        utterance.rate = 0.9;  // Slightly deliberate/slow
        utterance.volume = 1.0;

        window.speechSynthesis.speak(utterance);
    },

    cancelSpeech: () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    }
};
