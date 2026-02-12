
import axios from 'axios';

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

async function check() {
    for (const id of badges) {
        try {
            const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${id}.png`;
            const res = await axios.head(url);
            console.log(`${id}: ${res.status}`);
        } catch (e) {
            console.error(`${id}: ${e.message}`);
        }
    }
}

check();
