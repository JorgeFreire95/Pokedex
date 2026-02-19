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
  color: #222;
  text-shadow: 1px 1px 0 rgba(255,255,255,0.5);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
  max-width: 400px;
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

const ItemGenerationSelection = () => {
  const { playSound } = useSound();
  return (
    <Container>
      <Title>SELECCIONAR GENERACION</Title>

      <Grid>
        <GenButton to="/items/list" state={{ offset: 0, limit: 160, title: 'Kanto' }} onClick={() => playSound('open')}>
          <span className="gen-num">Gen 1</span>
          <span className="region-name">Kanto</span>
        </GenButton>
        <GenButton to="/items/list" state={{ offset: 160, limit: 100, title: 'Johto' }} onClick={() => playSound('open')}>
          <span className="gen-num">Gen 2</span>
          <span className="region-name">Johto</span>
        </GenButton>
        <GenButton to="/items/list" state={{ offset: 260, limit: 100, title: 'Hoenn' }} onClick={() => playSound('open')}>
          <span className="gen-num">Gen 3</span>
          <span className="region-name">Hoenn</span>
        </GenButton>
        <GenButton to="/items/list" state={{ offset: 360, limit: 100, title: 'Sinnoh' }} onClick={() => playSound('open')}>
          <span className="gen-num">Gen 4</span>
          <span className="region-name">Sinnoh</span>
        </GenButton>
        <GenButton to="/items/list" state={{ offset: 460, limit: 100, title: 'Teselia' }} onClick={() => playSound('open')}>
          <span className="gen-num">Gen 5</span>
          <span className="region-name">Teselia</span>
        </GenButton>
        <GenButton to="/items/list" state={{ offset: 560, limit: 100, title: 'Kalos' }} onClick={() => playSound('open')}>
          <span className="gen-num">Gen 6</span>
          <span className="region-name">Kalos</span>
        </GenButton>
        <GenButton to="/items/list" state={{ offset: 660, limit: 100, title: 'Alola' }} onClick={() => playSound('open')}>
          <span className="gen-num">Gen 7</span>
          <span className="region-name">Alola</span>
        </GenButton>
        <GenButton to="/items/list" state={{ offset: 760, limit: 100, title: 'Galar' }} onClick={() => playSound('open')}>
          <span className="gen-num">Gen 8</span>
          <span className="region-name">Galar</span>
        </GenButton>
        <GenButton to="/items/list" state={{ offset: 860, limit: 140, title: 'Paldea' }} onClick={() => playSound('open')}>
          <span className="gen-num">Gen 9</span>
          <span className="region-name">Paldea</span>
        </GenButton>
      </Grid>
    </Container>
  );
};

export default ItemGenerationSelection;
