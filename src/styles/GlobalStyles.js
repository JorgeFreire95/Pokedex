
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --pokedex-red: #F15F3E; /* Rotom Orange */
    --pokedex-dark-red: #AB2810; /* Darker Orange for shadows/accents */
    --screen-bg: #232323;
    --screen-text: #FFFFFF;
    --type-grass: #78C850;
    --type-fire: #F08030;
    --type-water: #6890F0;
    --type-bug: #A8B820;
    --type-normal: #A8A878;
    --type-poison: #A040A0;
    --type-electric: #F8D030;
    --type-ground: #E0C068;
    --type-fairy: #EE99AC;
    --type-fighting: #C03028;
    --type-psychic: #F85888;
    --type-rock: #B8A038;
    --type-ghost: #705898;
    --type-ice: #98D8D8;
    --type-dragon: #7038F8;
    --safe-area-top: env(safe-area-inset-top);
    --safe-area-bottom: env(safe-area-inset-bottom);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Press Start 2P', cursive, sans-serif; /* Pixel font if available, or fallback */
    background-color: var(--pokedex-dark-red);
    color: white;
    overflow-x: hidden;
    /* Prevent pull-to-refresh on mobile */
    overscroll-behavior-y: none;
  }

  #root {
    height: 100vh; /* Fallback */
    height: 100dvh; /* Dynamic viewport height for mobile */
    overflow: hidden;
    display: flex;
    flex-direction: column;
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
    background-color: var(--pokedex-red);
    position: relative;
    
    /* Mobile optimization: remove radius and shadow on full screen, handle safe areas */
    border-radius: 0;
    box-shadow: none;
    padding: 20px;
    padding-top: max(20px, var(--safe-area-top));
    padding-bottom: max(20px, var(--safe-area-bottom));

    /* Add border radius only on larger screens */
    @media (min-width: 600px) {
        border-radius: 20px;
        box-shadow: 0 0 20px rgba(0,0,0,0.5);
        height: 95vh; /* Slightly smaller on desktop to look like a device */
        margin-top: 2.5vh;
        padding-top: 20px;
        padding-bottom: 20px;
    }
  }

  /* Scrollbar for webkit */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: var(--pokedex-dark-red); 
  }
  ::-webkit-scrollbar-thumb {
    background: #FFFFFF; 
    border-radius: 4px;
  }
`;
