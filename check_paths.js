
import axios from 'axios';

const paths = [
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/boulder-badge.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/badges/boulder-badge.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/boulder-badge.png', // Already failed, but strictly checking
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/kanto/boulder-badge.png'
];

async function checkPaths() {
    for (const url of paths) {
        try {
            await axios.head(url);
            console.log(`FOUND: ${url}`);
        } catch (e) {
            console.log(`Failed: ${url} (${e.message})`);
        }
    }
}

checkPaths();
