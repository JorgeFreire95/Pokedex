
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getPokemonById } from '../services/api';
import { typeTranslations, statTranslations } from '../utils/translations';

const DetailContainer = styled(motion.div)`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-bottom: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BackButton = styled(Link)`
  background: #222;
  color: white;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 10px;
  font-family: 'Press Start 2P', cursive;
  
  &:hover {
    background: #444;
  }
`;

const Name = styled.h1`
  text-transform: capitalize;
  font-size: 20px;
  text-align: center;
`;

const ImageContainer = styled.div`
  background-color: white;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 110px;
  border: 2px solid #ddd;
`;

const Sprite = styled.img`
  width: 96px;
  height: 96px;
  image-rendering: pixelated;
`;

const DataContainer = styled.div`
  background: rgba(255,255,255,0.1);
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 5px;
`;

const SectionTitle = styled.h4`
    font-size: 10px;
    margin-bottom: 5px;
    color: #ddd;
    text-transform: uppercase;
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 12px;
`;

const StatLabel = styled.span`
  text-transform: uppercase;
  color: #bbb;
`;

const StatValue = styled.span`
  font-weight: bold;
`;

const TypeBadge = styled.span`
  background-color: ${props => props.color};
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 10px;
  text-transform: uppercase;
  margin-right: 5px;
  color: white;
  text-shadow: 1px 1px 0 rgba(0,0,0,0.5);
`;

const AbilityBadge = styled.span`
  background-color: #444;
  padding: 3px 8px;
  border-radius: 5px;
  font-size: 10px;
  text-transform: capitalize;
  margin-right: 5px;
  color: white;
  display: inline-block;
  margin-bottom: 3px;
  border: 1px solid #666;
`;

const MovesList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    max-height: 150px;
    overflow-y: auto;
    
    /* Scrollbar stypling specifically for this list */
    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background: #555; 
        border-radius: 2px;
    }
`;

const MoveBadge = styled.span`
    background-color: #333;
    padding: 3px 6px;
    border-radius: 3px;
    font-size: 9px;
    color: #eee;
    border: 1px solid #555;
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

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    setPokemon(null);
    getPokemonById(id).then(data => setPokemon(data));
  }, [id]);

  if (!pokemon) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Cargando...</div>;

  return (
    <DetailContainer
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    >
      <Header>
        <BackButton to="/pokemons">Volver</BackButton>
        <span>#{pokemon.id.toString().padStart(3, '0')}</span>
      </Header>

      <ImageContainer>
        <Sprite src={pokemon.sprites.front_default} alt={pokemon.name} />
      </ImageContainer>

      <Name>{pokemon.name}</Name>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
        {pokemon.types.map(t => (
          <TypeBadge key={t.type.name} color={typeColors[t.type.name] || '#777'}>
            {typeTranslations[t.type.name] || t.type.name}
          </TypeBadge>
        ))}
      </div>

      <DataContainer>
        <SectionTitle>Estadísticas</SectionTitle>
        {pokemon.stats.map(s => (
          <StatRow key={s.stat.name}>
            <StatLabel>{statTranslations[s.stat.name] || s.stat.name}</StatLabel>
            <StatValue>{s.base_stat}</StatValue>
          </StatRow>
        ))}
      </DataContainer>

      <DataContainer>
        <SectionTitle>Habilidades</SectionTitle>
        {pokemon.abilities.map(a => (
          <AbilityBadge key={a.ability.name}>
            {a.ability.name}
            {a.is_hidden && <span style={{ color: '#ffaaaa', marginLeft: '3px' }}>(O)</span>}
          </AbilityBadge>
        ))}
      </DataContainer>

      {pokemon.moves_localized && (
        <DataContainer>
          <SectionTitle>Movimientos (Gen 1)</SectionTitle>
          <MovesList>
            {pokemon.moves_localized.map((m, index) => (
              <MoveBadge key={`${m.name}-${index}`}>
                {m.name}
              </MoveBadge>
            ))}
          </MovesList>
        </DataContainer>
      )}

      <div style={{ marginTop: '5px', fontSize: '10px', textAlign: 'center', color: '#888' }}>
        Altura: {pokemon.height / 10}m | Peso: {pokemon.weight / 10}kg
      </div>
    </DetailContainer>
  );
};

export default PokemonDetail;
