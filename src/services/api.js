
import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemonList = async (limit = 151, offset = 0) => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching pokemon list:", error);
    return [];
  }
};

export const getPokemonDetails = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching pokemon details:", error);
    return null;
  }
};

export const getPokemonById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${id}`);
    const data = response.data;

    // Fetch Spanish ability names
    const abilityPromises = data.abilities.map(async (abilityItem) => {
      try {
        const abilityResponse = await axios.get(abilityItem.ability.url);
        const spanishEntry = abilityResponse.data.names.find(
          (entry) => entry.language.name === 'es'
        );
        return {
          ...abilityItem,
          ability: {
            ...abilityItem.ability,
            name: spanishEntry ? spanishEntry.name : abilityItem.ability.name
          }
        };
      } catch (err) {
        console.error("Error fetching ability details", err);
        return abilityItem;
      }
    });

    // Filter moves for Gen 1 to Gen 9
    // We want to show moves available in these generations
    const relevantVersions = [
      'red-blue', 'yellow',
      'gold-silver', 'crystal',
      'ruby-sapphire', 'emerald', 'firered-leafgreen',
      'diamond-pearl', 'platinum', 'heartgold-soulsilver',
      'black-white', 'black-2-white-2',
      'x-y', 'omega-ruby-alpha-sapphire',
      'sun-moon', 'ultra-sun-ultra-moon', 'lets-go-pikachu-lets-go-eevee',
      'sword-shield', 'brilliant-diamond-shining-pearl', 'legends-arceus',
      'scarlet-violet'
    ];

    const relevantMoves = data.moves.filter(moveItem =>
      moveItem.version_group_details.some(detail => relevantVersions.includes(detail.version_group.name))
    );

    const movePromises = relevantMoves.map(async (moveItem) => {
      try {
        const moveResponse = await axios.get(moveItem.move.url);
        const spanishEntry = moveResponse.data.names.find(
          (entry) => entry.language.name === 'es'
        );

        // Find the earliest relevant version detail to display level
        const versionDetail = moveItem.version_group_details.find(d => relevantVersions.includes(d.version_group.name));

        return {
          name: spanishEntry ? spanishEntry.name : moveItem.move.name,
          learn_method: versionDetail ? versionDetail.move_learn_method.name : 'unknown',
          level: versionDetail ? versionDetail.level_learned_at : 0
        };
      } catch (err) {
        return {
          name: moveItem.move.name,
          learn_method: 'unknown',
          level: 0
        };
      }
    });

    const localizedAbilities = await Promise.all(abilityPromises);
    const localizedMoves = await Promise.all(movePromises);

    localizedMoves.sort((a, b) => a.level - b.level);

    data.abilities = localizedAbilities;
    data.moves_localized = localizedMoves;

    return data;
  } catch (error) {
    console.error("Error fetching pokemon by ID:", error);
    return null;
  }
}

export const getItemsList = async (limit = 50, offset = 0) => {
  try {
    const response = await axios.get(`${BASE_URL}/item?limit=${limit}&offset=${offset}`);

    // Fetch details for each item to get image and description
    const itemPromises = response.data.results.map(async (item) => {
      try {
        const detailsResponse = await axios.get(item.url);
        const details = detailsResponse.data;

        const spanishName = details.names.find(n => n.language.name === 'es');

        // Try to find Spanish flavor text, fallback to English
        const spanishFlavor = details.flavor_text_entries.find(f => f.language.name === 'es');
        const englishFlavor = details.flavor_text_entries.find(f => f.language.name === 'en');

        return {
          name: spanishName ? spanishName.name : item.name,
          originalName: item.name,
          sprite: details.sprites.default,
          description: spanishFlavor ? spanishFlavor.text : (englishFlavor ? englishFlavor.text : 'Sin descripción')
        };
      } catch (err) {
        return {
          name: item.name,
          originalName: item.name,
          sprite: null,
          description: 'Error cargando detalles'
        };
      }
    });

    return await Promise.all(itemPromises);
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
};

export const getLocationList = async (limit = 20, offset = 0) => {
  try {
    const response = await axios.get(`${BASE_URL}/location?limit=${limit}&offset=${offset}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
};
