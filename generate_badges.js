
import fs from 'fs';
import path from 'path';

const badges = {
    'boulder-badge': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="30,10 70,10 90,30 90,70 70,90 30,90 10,70 10,30" fill="#a0a0a0" stroke="#606060" stroke-width="5"/></svg>`,
    'cascade-badge': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50,10 Q90,50 90,70 A40,40 0 1,1 10,70 Q10,50 50,10" fill="#40a0f0" stroke="#0060c0" stroke-width="5"/></svg>`,
    'thunder-badge': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="53,5 68,35 98,35 73,55 83,85 53,65 23,85 33,55 8,35 38,35" fill="#f0c040" stroke="#c08000" stroke-width="5"/></svg>`,
    'rainbow-badge': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="#ff8080" /><circle cx="50" cy="50" r="35" fill="#ffff80" /><circle cx="50" cy="50" r="25" fill="#80ff80" /><circle cx="50" cy="50" r="15" fill="#8080ff" /></svg>`,
    'soul-badge': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50,90 Q10,60 10,35 A20,20 0 0,1 50,35 A20,20 0 0,1 90,35 Q90,60 50,90" fill="#f060a0" stroke="#c00060" stroke-width="5"/></svg>`,
    'marsh-badge': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#f0d060" stroke="#c0a040" stroke-width="5"/><circle cx="50" cy="50" r="20" fill="gold" /></svg>`,
    'volcano-badge': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50,10 Q90,60 70,90 Q50,70 30,90 Q10,60 50,10" fill="#f04040" stroke="#a00000" stroke-width="5"/><path d="M50,30 Q60,60 50,80 Q40,60 50,30" fill="#ff8080" /></svg>`,
    'earth-badge': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50,5 L90,30 L90,80 L50,95 L10,80 L10,30 Z" fill="#40a040" stroke="#006000" stroke-width="5"/><path d="M50,20 L50,80 M20,40 L80,40" stroke="#206020" stroke-width="3"/></svg>`
};

const dir = 'public/badges';

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

Object.entries(badges).forEach(([name, svg]) => {
    fs.writeFileSync(path.join(dir, `${name}.svg`), svg);
    console.log(`Generated ${name}.svg`);
});
