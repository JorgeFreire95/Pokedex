
import axios from 'axios';

async function searchBadges() {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/item?limit=2000');
        const items = response.data.results;
        const badges = items.filter(i => i.name.includes('badge'));
        console.log(JSON.stringify(badges.map(b => b.name), null, 2));
    } catch (error) {
        console.error('Error:', error.message);
    }
}

searchBadges();
