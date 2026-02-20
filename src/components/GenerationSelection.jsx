import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSound } from '../hooks/useSound';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding-top: 20px;
`;

const Title = styled.h1`
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
  color: white;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
  max-width: 400px; /* Limit width on larger screens */
  padding: 0 10px;
`;

const GenButton = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #222;
  color: white;
  text-decoration: none;
  padding: 10px 5px;
  aspect-ratio: 1;
  text-align: center;
  border-radius: 10px;
  border: 2px solid #555;
  font-family: 'Press Start 2P', cursive;
  font-size: 8px;
  text-transform: uppercase;
  transition: transform 0.1s, background 0.1s;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
  line-height: 1.5;

  &:hover {
    transform: translateY(-2px);
    background: #333;
  }
  
  &:active {
    transform: translateY(1px);
  }

  span.gen-num {
    color: #888;
    margin-bottom: 5px;
    font-size: 7px;
  }

  span.region-name {
    color: #fff;
    font-size: 9px;
  }
`;

const GenerationSelection = () => {
  const { playSound } = useSound();
  return (
    <Container>
      <Title>SELECCIONAR GENERACION</Title>

      <Grid>
        <GenButton to="/pokemons/list" state={{ offset: 0, limit: 151, title: 'Kanto' }} onClick={() => playSound('open')}>
          <span className="gen-num">Gen 1</span>
          <span className="region-name">Kanto</span>
        </GenButton>

        <GenButton to="/pokemons/list" state={{ offset: 151, limit: 100, title: 'Johto' }} onClick={() => playSound('open')}>
          <span className="gen-num">Gen 2</span>
          <span className="region-name">Johto</span>
        </GenButton>

        <GenButton to="/pokemons/list" state={{ offset: 251, limit: 135, title: 'Hoenn' }} onClick={() => playSound('open')}>
          <span className="gen-num">Gen 3</span>
          <span className="region-name">Hoenn</span>
        </GenButton>

        <GenButton to="/pokemons/list" state={{ offset: 386, limit: 107, title: 'Sinnoh' }} onClick={() => playSound('open')}>
          <span className="gen-num">Gen 4</span>
          <span className="region-name">Sinnoh</span>
        </GenButton>

        <GenButton to="/pokemons/list" state={{ offset: 493, limit: 156, title: 'Teselia' }} onClick={() => playSound('open')}>
          <span className="gen-num">Gen 5</span>
          <span className="region-name">Teselia</span>
        </GenButton>

        <GenButton to="/pokemons/list" state={{ offset: 649, limit: 72, title: 'Kalos' }} onClick={() => playSound('open')}>
          <span className="gen-num">Gen 6</span>
          <span className="region-name">Kalos</span>
        </GenButton>

        <GenButton to="/pokemons/list" state={{ offset: 721, limit: 88, title: 'Alola' }} onClick={() => playSound('open')}>
          <span className="gen-num">Gen 7</span>
          <span className="region-name">Alola</span>
        </GenButton>

        <GenButton to="/pokemons/list" state={{ offset: 809, limit: 96, title: 'Galar' }} onClick={() => playSound('open')}>
          <span className="gen-num">Gen 8</span>
          <span className="region-name">Galar</span>
        </GenButton>

        <GenButton to="/pokemons/list" state={{ offset: 905, limit: 120, title: 'Paldea' }} onClick={() => playSound('open')}>
          <span className="gen-num">Gen 9</span>
          <span className="region-name">Paldea</span>
        </GenButton>
      </Grid>
    </Container>
  );
};

export default GenerationSelection;
