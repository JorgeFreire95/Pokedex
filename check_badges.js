
import https from 'https';

const badges = [
    'boulder-badge',
    'cascade-badge',
    'thunder-badge',
    'rainbow-badge',
    'soul-badge',
    'marsh-badge',
    'volcano-badge',
    'earth-badge'
];

badges.forEach(id => {
    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${id}.png`;
    https.get(url, (res) => {
        console.log(`${id}: ${res.statusCode}`);
    }).on('error', (e) => {
        console.error(`${id}: Error ${e.message}`);
    });
});
