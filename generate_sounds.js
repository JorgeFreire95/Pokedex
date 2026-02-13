const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../public/sounds');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Helper to write WAV file (16-bit PCM, Mono, 44.1kHz)
function writeWav(filename, samples) {
    const buffer = Buffer.alloc(44 + samples.length * 2);

    // RIFF chunk descriptor
    buffer.write('RIFF', 0);
    buffer.writeUInt32LE(36 + samples.length * 2, 4);
    buffer.write('WAVE', 8);

    // fmt sub-chunk
    buffer.write('fmt ', 12);
    buffer.writeUInt32LE(16, 16); // Subchunk1Size
    buffer.writeUInt16LE(1, 20); // AudioFormat (1 = PCM)
    buffer.writeUInt16LE(1, 22); // NumChannels (Mono)
    buffer.writeUInt32LE(44100, 24); // SampleRate
    buffer.writeUInt32LE(44100 * 2, 28); // ByteRate
    buffer.writeUInt16LE(2, 32); // BlockAlign
    buffer.writeUInt16LE(16, 34); // BitsPerSample

    // data sub-chunk
    buffer.write('data', 36);
    buffer.writeUInt32LE(samples.length * 2, 40);

    // Write samples
    for (let i = 0; i < samples.length; i++) {
        // Clamp to 16-bit signed integer range
        let s = Math.max(-1, Math.min(1, samples[i]));
        s = s < 0 ? s * 0x8000 : s * 0x7FFF;
        buffer.writeInt16LE(Math.floor(s), 44 + i * 2);
    }

    fs.writeFileSync(path.join(outputDir, filename), buffer);
    console.log(`Generated ${filename}`);
}

// Snythesis functions
const sampleRate = 44100;

function generateSine(freq, duration, envelope = true) {
    const numSamples = Math.floor(sampleRate * duration);
    const samples = new Float32Array(numSamples);
    for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        let amp = 1;
        if (envelope) {
            // Simple ADSR-like envelope
            if (i < numSamples * 0.1) amp = i / (numSamples * 0.1);
            else amp = 1 - (i - numSamples * 0.1) / (numSamples * 0.9);
        }
        samples[i] = Math.sin(2 * Math.PI * freq * t) * amp * 0.5;
    }
    return samples;
}

function generateSquare(freq, duration) {
    const numSamples = Math.floor(sampleRate * duration);
    const samples = new Float32Array(numSamples);
    for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        const val = Math.sin(2 * Math.PI * freq * t) > 0 ? 0.3 : -0.3;
        // Linear decay
        const amp = 1 - i / numSamples;
        samples[i] = val * amp;
    }
    return samples;
}

function generateNoise(duration) {
    const numSamples = Math.floor(sampleRate * duration);
    const samples = new Float32Array(numSamples);
    for (let i = 0; i < numSamples; i++) {
        samples[i] = (Math.random() * 2 - 1) * 0.3 * (1 - i / numSamples);
    }
    return samples;
}

function generateSlide(startFreq, endFreq, duration) {
    const numSamples = Math.floor(sampleRate * duration);
    const samples = new Float32Array(numSamples);
    for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        const p = i / numSamples; // 0 to 1
        const freq = startFreq + (endFreq - startFreq) * p;
        samples[i] = Math.sin(2 * Math.PI * freq * t) * 0.5 * (1 - p);
    }
    return samples;
}

// BGM: Simple chiptune-ish arpeggio loop
function generateBgm(duration) {
    const numSamples = Math.floor(sampleRate * duration);
    const samples = new Float32Array(numSamples);
    const bpm = 120;
    const beatDuration = 60 / bpm;
    const notes = [261.63, 329.63, 392.00, 523.25]; // C Major arpeggio: C4, E4, G4, C5

    for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        const beatIndex = Math.floor(t / (beatDuration / 4)); // 16th notes
        const note = notes[beatIndex % notes.length];

        // Add a bassline
        const bassNote = notes[0] / 2; // C3

        const melody = Math.sin(2 * Math.PI * note * t) > 0 ? 0.1 : -0.1;
        const bass = Math.sin(2 * Math.PI * bassNote * t) * 0.1;

        samples[i] = (melody + bass) * 0.5;
    }
    return samples;
}


// --- Main Generation ---

// 1. Click (Standard Select) - High blip
writeWav('click.wav', generateSquare(880, 0.1));

// 2. Move (Navigation) - Softer, lower blip
writeWav('move.wav', generateSquare(440, 0.05));

// 3. Open (Modal/Detail) - Ascending slide 'Euip'
writeWav('open.wav', generateSlide(440, 880, 0.15));

// 4. Close (Close Modal/Back) - Descending slide 'Pyu'
writeWav('back.wav', generateSlide(880, 440, 0.15));
// Also map close to back for now, or make a separate one?
// Let's make a clear 'cancel' noise
writeWav('close.wav', generateNoise(0.1));

// 5. Success (Catch? Upgrade?) - Major chord
// Keeping it simple for now, maybe just a happy ding
writeWav('success.wav', generateSlide(523.25, 1046.50, 0.2));

// 6. Background Music - 8 second loop
writeWav('bgm.wav', generateBgm(8.0));

console.log('All sounds generated in public/sounds/');
