
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getPokemonDetails } from '../services/api';
import { useSound } from '../hooks/useSound';

const Card = styled(motion(Link))`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  padding: 5px;
  text-decoration: none;
  color: black;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
  transition: transform 0.2s;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background-color: ${props => props.typecolor || '#ccc'};
  }
`;

const Sprite = styled.img`
  width: 100%;
  height: auto;
  image-rendering: pixelated;
`;

const Name = styled.h3`
  text-transform: capitalize;
  font-size: 8px;
  margin-top: 5px;
  text-align: center;
`;

const Id = styled.span`
  font-size: 8px;
  color: #666;
  position: absolute;
  top: 4px;
  right: 4px;
`;

const LoadingPlaceholder = styled.div`
  width: 100%;
  height: 100px;
  background: #f0f0f0;
  border-radius: 10px;
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

const PokemonCard = ({ name, url }) => {
  const [details, setDetails] = useState(null);
  const { playSound } = useSound();

  useEffect(() => {
    getPokemonDetails(url).then(data => setDetails(data));
  }, [url]);

  if (!details) return <LoadingPlaceholder />;

  const mainType = details.types[0].type.name;
  const color = typeColors[mainType] || '#ccc';

  return (
    <Card
      to={`/pokemon/${details.id}`}
      onClick={() => playSound('open')}
      typecolor={color}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Id>#{details.id.toString().padStart(3, '0')}</Id>
      <Sprite src={details.sprites.front_default} alt={name} />
      <Name>{name}</Name>
    </Card>
  );
};

export default PokemonCard;
