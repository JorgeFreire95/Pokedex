
const axios = require('axios');

async function checkItem() {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/item/potion');
        const data = response.data;

        console.log('Name:', data.name);
        console.log('Sprite:', data.sprites.default);

        const spanishEntry = data.names.find(n => n.language.name === 'es');
        console.log('Spanish Name:', spanishEntry ? spanishEntry.name : 'N/A');

        const spanishFlavor = data.flavor_text_entries.find(f => f.language.name === 'es');
        console.log('Spanish Desc:', spanishFlavor ? spanishFlavor.text : 'N/A');

    } catch (error) {
        console.error(error);
    }
}

checkItem();
