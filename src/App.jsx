
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import Layout from './components/Layout';
import Home from './components/Home';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import ItemsList from './components/ItemsList';
import LocationsList from './components/LocationsList';
import { AnimatePresence } from 'framer-motion';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/pokemons" element={<PokemonList />} />
        <Route path="/items" element={<ItemsList />} />
        <Route path="/locations" element={<LocationsList />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </Router>
  );
}

export default App;
