
import axios from 'axios';

async function searchSpecific() {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/item?limit=2000');
        const items = response.data.results;

        const boulder = items.filter(i => i.name.includes('boulder'));
        const badge = items.filter(i => i.name.includes('badge'));

        console.log('Boulder matches:', JSON.stringify(boulder.map(b => b.name), null, 2));
        console.log('Badge matches count:', badge.length);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

searchSpecific();
