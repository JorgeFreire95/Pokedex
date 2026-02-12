
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { kantoGyms } from '../data/gyms';

import KantoMap from './KantoMap';

const Container = styled.div`
  padding-bottom: 20px;
`;

const MapContainer = styled.div`
  background: #333;
  border: 2px solid #555;
  border-radius: 5px;
  height: 200px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

const GymList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const GymCard = styled.div`
  background: white;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 5px solid ${props => props.color || '#ccc'};
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  color: #222;
  cursor: pointer;
  transition: transform 0.1s, background-color 0.2s;

  &:active {
    transform: scale(0.98);
  }

  ${props => props.$isSelected && `
    background-color: #f0f8ff;
    border-right: 5px solid ${props.color || '#ccc'};
  `}
`;

const GymInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CityName = styled.span`
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
  color: #555;
`;

const LeaderName = styled.span`
  font-size: 12px;
  font-weight: bold;
  margin-top: 2px;
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
`;

const BadgeImage = styled.img`
  width: 30px;
  height: 30px;
  image-rendering: pixelated;
`;

const BadgeName = styled.span`
  font-size: 8px;
  text-align: center;
  color: #666;
  margin-top: 2px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const BackButton = styled(Link)`
  background: #222;
  color: white;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 10px;
  font-family: 'Press Start 2P', cursive;
  margin-right: 15px;
  
  &:hover {
    background: #444;
  }
`;

const Title = styled.h2`
  font-size: 12px;
`;

const typeColors = {
  grass: 'var(--type-grass)',
  fire: 'var(--type-fire)',
  water: 'var(--type-water)',
  bug: 'var(--type-bug)',
  normal: 'var(--type-normal)',
  poison: 'var(--type-poison)',
  electric: 'var(--type-electric)',
  ground: 'var(--type-ground)',
  fairy: 'var(--type-fairy)',
  fighting: 'var(--type-fighting)',
  psychic: 'var(--type-psychic)',
  rock: 'var(--type-rock)',
  ghost: 'var(--type-ghost)',
  ice: 'var(--type-ice)',
  dragon: 'var(--type-dragon)',
};

const LocationsList = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <Container>
      <Header>
        <BackButton to="/locations">Atrás</BackButton>
        <Title>Mapa y Gimnasios</Title>
      </Header>

      <MapContainer>
        <KantoMap highlightedCity={selectedCity} />
      </MapContainer>

      <GymList>
        {kantoGyms.map(gym => (
          <GymCard
            key={gym.city}
            color={typeColors[gym.type]}
            onClick={() => setSelectedCity(gym.city)}
            $isSelected={selectedCity === gym.city}
          >
            <GymInfo>
              <CityName>{gym.city_es}</CityName>
              <LeaderName>Líder: {gym.leader}</LeaderName>
            </GymInfo>
            <BadgeContainer>
              <BadgeImage
                src={`/badges/${gym.badge_id}.svg`}
                alt={gym.badge_es}
              />
              <BadgeName>{gym.badge_es}</BadgeName>
            </BadgeContainer>
          </GymCard>
        ))}
      </GymList>
    </Container>
  );
};

export default LocationsList;
