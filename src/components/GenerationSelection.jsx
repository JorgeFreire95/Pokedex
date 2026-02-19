import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSound } from '../hooks/useSound';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 20px;
  padding-top: 40px;
`;

const Title = styled.h1`
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
  color: #222;
  text-shadow: 1px 1px 0 rgba(255,255,255,0.5);
`;

const GenButton = styled(Link)`
  background: #222;
  color: white;
  text-decoration: none;
  padding: 15px 20px;
  width: 90%;
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

const GenerationSelection = () => {
  const { playSound } = useSound();
  return (
    <Container>
      <Title>SELECCIONAR GENERACION</Title>

      <GenButton to="/pokemons/list" state={{ offset: 0, limit: 151, title: 'Kanto' }} onClick={() => playSound('open')}>
        Primera Generación (Kanto)
      </GenButton>

      <GenButton to="/pokemons/list" state={{ offset: 151, limit: 100, title: 'Johto' }} onClick={() => playSound('open')}>
        Segunda Generación (Johto)
      </GenButton>

      <GenButton to="/pokemons/list" state={{ offset: 251, limit: 135, title: 'Hoenn' }} onClick={() => playSound('open')}>
        Tercera Generación (Hoenn)
      </GenButton>

      <GenButton to="/pokemons/list" state={{ offset: 386, limit: 107, title: 'Sinnoh' }} onClick={() => playSound('open')}>
        Cuarta Generación (Sinnoh)
      </GenButton>

      <GenButton to="/pokemons/list" state={{ offset: 493, limit: 156, title: 'Teselia' }} onClick={() => playSound('open')}>
        Quinta Generación (Teselia)
      </GenButton>

      <GenButton to="/pokemons/list" state={{ offset: 649, limit: 72, title: 'Kalos' }} onClick={() => playSound('open')}>
        Sexta Generación (Kalos)
      </GenButton>

      <GenButton to="/pokemons/list" state={{ offset: 721, limit: 88, title: 'Alola' }} onClick={() => playSound('open')}>
        Septima Generación (Alola)
      </GenButton>

      <GenButton to="/pokemons/list" state={{ offset: 809, limit: 96, title: 'Galar' }} onClick={() => playSound('open')}>
        Octava Generación (Galar)
      </GenButton>

      <GenButton to="/pokemons/list" state={{ offset: 905, limit: 120, title: 'Paldea' }} onClick={() => playSound('open')}>
        Novena Generación (Paldea)
      </GenButton>
    </Container>
  );
};

export default GenerationSelection;
