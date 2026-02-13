const fs = require('fs');
const path = require('path');

const outputDir = path.join(process.cwd(), 'public/sounds');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

function writeWav(filename, samples) {
    const buffer = Buffer.alloc(44 + samples.length * 2);
    buffer.write('RIFF', 0);
    buffer.writeUInt32LE(36 + samples.length * 2, 4);
    buffer.write('WAVE', 8);
    buffer.write('fmt ', 12);
    buffer.writeUInt32LE(16, 16);
    buffer.writeUInt16LE(1, 20);
    buffer.writeUInt16LE(1, 22);
    buffer.writeUInt32LE(44100, 24);
    buffer.writeUInt32LE(88200, 28);
    buffer.writeUInt16LE(2, 32);
    buffer.writeUInt16LE(16, 34);
    buffer.write('data', 36);
    buffer.writeUInt32LE(samples.length * 2, 40);

    for (let i = 0; i < samples.length; i++) {
        let s = Math.max(-1, Math.min(1, samples[i]));
        s = s < 0 ? s * 0x8000 : s * 0x7FFF;
        buffer.writeInt16LE(Math.floor(s), 44 + i * 2);
    }

    fs.writeFileSync(path.join(outputDir, filename), buffer);
    console.log('Written ' + filename);
}

const sr = 44100;

function genTone(freq, dur, type = 'sin') {
    const n = Math.floor(sr * dur);
    const d = new Float32Array(n);
    for (let i = 0; i < n; i++) {
        const t = i / sr;
        let v = 0;
        if (type === 'sq') v = Math.sin(2 * Math.PI * freq * t) > 0 ? 0.3 : -0.3;
        else if (type === 'noi') v = (Math.random() * 2 - 1) * 0.3;
        else v = Math.sin(2 * Math.PI * freq * t) * 0.5;

        // envelope
        let amp = 1;
        if (i < n * 0.1) amp = i / (n * 0.1);
        else amp = 1 - (i - n * 0.1) / (n * 0.9);
        d[i] = v * amp;
    }
    return d;
}

try {
    writeWav('click.wav', genTone(880, 0.1, 'sq'));
    writeWav('move.wav', genTone(440, 0.05, 'sq'));
    writeWav('open.wav', genTone(660, 0.15, 'sin'));
    writeWav('back.wav', genTone(330, 0.15, 'sin'));
    writeWav('close.wav', genTone(0, 0.1, 'noi'));
    writeWav('success.wav', genTone(523, 0.2, 'sin'));

    // Simple BGM
    const bgmLen = sr * 4;
    const bgm = new Float32Array(bgmLen);
    for (let i = 0; i < bgmLen; i++) {
        const t = i / sr;
        // Simple C major arpeggio
        const note = [261, 329, 392, 523][Math.floor(t * 4) % 4];
        bgm[i] = Math.sin(2 * Math.PI * note * t) * 0.1;
    }
    writeWav('bgm.wav', bgm);

    console.log('Done');
} catch (e) {
    console.error(e);
}
