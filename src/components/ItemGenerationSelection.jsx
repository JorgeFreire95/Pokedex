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

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  width: 100%;
  padding-bottom: 20px;
  justify-items: center;
  overflow-y: auto;
`;

const ItemGenerationSelection = () => {
  const { playSound } = useSound();
  return (
    <Container>
      <Title>SELECCIONAR GENERACION</Title>

      <GridContainer>
        <GenButton to="/items/list" state={{ offset: 0, limit: 160, title: 'Kanto' }} onClick={() => playSound('open')}>
          Gen 1 (Kanto)
        </GenButton>
        <GenButton to="/items/list" state={{ offset: 160, limit: 100, title: 'Johto' }} onClick={() => playSound('open')}>
          Gen 2 (Johto)
        </GenButton>
        <GenButton to="/items/list" state={{ offset: 260, limit: 100, title: 'Hoenn' }} onClick={() => playSound('open')}>
          Gen 3 (Hoenn)
        </GenButton>
        <GenButton to="/items/list" state={{ offset: 360, limit: 100, title: 'Sinnoh' }} onClick={() => playSound('open')}>
          Gen 4 (Sinnoh)
        </GenButton>
        <GenButton to="/items/list" state={{ offset: 460, limit: 100, title: 'Teselia' }} onClick={() => playSound('open')}>
          Gen 5 (Teselia)
        </GenButton>
        <GenButton to="/items/list" state={{ offset: 560, limit: 100, title: 'Kalos' }} onClick={() => playSound('open')}>
          Gen 6 (Kalos)
        </GenButton>
        <GenButton to="/items/list" state={{ offset: 660, limit: 100, title: 'Alola' }} onClick={() => playSound('open')}>
          Gen 7 (Alola)
        </GenButton>
        <GenButton to="/items/list" state={{ offset: 760, limit: 100, title: 'Galar' }} onClick={() => playSound('open')}>
          Gen 8 (Galar)
        </GenButton>
        <GenButton to="/items/list" state={{ offset: 860, limit: 140, title: 'Paldea' }} onClick={() => playSound('open')}>
          Gen 9 (Paldea)
        </GenButton>
      </GridContainer>
    </Container>
  );
};

export default ItemGenerationSelection;
