
import React from 'react';
import { SoundProvider } from './contexts/SoundContext';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import Layout from './components/Layout';
import Home from './components/Home';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import ItemsList from './components/ItemsList';
import LocationsList from './components/LocationsList';
import GenerationSelection from './components/GenerationSelection';
import ItemGenerationSelection from './components/ItemGenerationSelection';
import LocationGenerationSelection from './components/LocationGenerationSelection';
import { AnimatePresence } from 'framer-motion';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/pokemons" element={<GenerationSelection />} />
        <Route path="/pokemons/list" element={<PokemonList />} />
        <Route path="/items" element={<ItemGenerationSelection />} />
        <Route path="/items/list" element={<ItemsList />} />
        <Route path="/locations" element={<LocationGenerationSelection />} />
        <Route path="/locations/list" element={<LocationsList />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <GlobalStyles />
      <SoundProvider>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </SoundProvider>
    </Router>
  );
}

export default App;
