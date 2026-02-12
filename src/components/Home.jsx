
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-top: 40px;
`;

const MenuButton = styled(Link)`
  background: #222;
  color: white;
  text-decoration: none;
  padding: 15px 20px;
  width: 100%;
  text-align: center;
  border-radius: 10px;
  border: 2px solid #555;
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  text-transform: uppercase;
  transition: transform 0.1s, background 0.1s;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);

  &:hover {
    transform: translateY(-2px);
    background: #333;
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const Title = styled.h1`
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
  color: #222;
  text-shadow: 1px 1px 0 rgba(255,255,255,0.5);
`;

const Home = () => {
    return (
        <HomeContainer>
            <Title>POKEDEX OS v1.0</Title>

            <MenuButton to="/pokemons">
                Ver Pokemones
            </MenuButton>

            <MenuButton to="/items">
                Ver Objetos
            </MenuButton>

            <MenuButton to="/locations">
                Ver Rutas
            </MenuButton>
        </HomeContainer>
    );
};

export default Home;
