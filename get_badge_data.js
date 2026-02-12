
import axios from 'axios';

async function getBadgeData() {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/item/boulder-badge');
        console.log('Sprite URL:', response.data.sprites.default);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

getBadgeData();
