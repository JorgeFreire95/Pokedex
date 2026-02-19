
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { getPokemonList } from '../services/api';
import PokemonCard from './PokemonCard';

import { useDPad } from '../contexts/DPadContext';
import { useSound } from '../hooks/useSound';

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5px;
  padding-bottom: 20px;
  min-height: 200px;
`;

const LoadingText = styled.div`
  text-align: center;
  margin-top: 20px;
  font-family: 'Press Start 2P', cursive;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: #222;
  color: white;
  border: 2px solid #555;
  padding: 10px 20px;
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  cursor: pointer;
  border-radius: 5px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #444;
  }
`;

const PokemonList = () => {
    const location = useLocation();
    // Default to Gen 1 if no state provided
    const { offset: startOffset = 0, limit: totalLimit = 151, title = 'Kanto' } = location.state || {};

    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(startOffset);
    const { setOnLeft, setOnRight } = useDPad();
    const { playSound } = useSound();
    const PAGE_SIZE = 30;

    const handleNext = () => {
        playSound('move');
        // Check if next page would exceed the generation's total limit
        // Current offset + PAGE_SIZE must be less than startOffset + totalLimit
        if (offset + PAGE_SIZE < startOffset + totalLimit) {
            setOffset(o => o + PAGE_SIZE);
        }
    };

    const handlePrev = () => {
        playSound('move');
        // Check if prev page would go below startOffset
        if (offset - PAGE_SIZE >= startOffset) {
            setOffset(o => o - PAGE_SIZE);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            // Calculate how many items to fetch for this page
            // We want PAGE_SIZE items, but shouldn't exceed the generation's specific end point
            const genEndOffset = startOffset + totalLimit;
            const remainingInGen = genEndOffset - offset;
            const fetchLimit = Math.min(PAGE_SIZE, remainingInGen);

            if (fetchLimit <= 0) {
                setPokemon([]);
                setLoading(false);
                return;
            }

            const data = await getPokemonList(fetchLimit, offset);
            setPokemon(data);
            setLoading(false);
        };
        fetchData();
    }, [offset, startOffset, totalLimit]);

    useEffect(() => {
        setOnLeft(() => handlePrev);
        setOnRight(() => handleNext);

        return () => {
            setOnLeft(null);
            setOnRight(null);
        };
    }, [offset, startOffset, totalLimit]);

    if (loading) return <LoadingText>Cargando {title}...</LoadingText>;

    return (
        <div>
            <ListContainer>
                {pokemon.map(p => (
                    <PokemonCard key={p.name} name={p.name} url={p.url} />
                ))}
            </ListContainer>
            <Controls>
                <Button onClick={handlePrev} disabled={offset <= startOffset}>Prev</Button>
                <Button onClick={handleNext} disabled={offset + PAGE_SIZE >= startOffset + totalLimit}>Next</Button>
            </Controls>
        </div>
    );
};

export default PokemonList;
