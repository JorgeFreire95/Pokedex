
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const { setOnLeft, setOnRight } = useDPad();
    const { playSound } = useSound();
    const LIMIT = 30;
    const TOTAL_GEN1 = 151;

    const handleNext = () => {
        playSound('move');
        if (offset + LIMIT < TOTAL_GEN1) {
            setOffset(o => o + LIMIT);
        }
    };

    const handlePrev = () => {
        playSound('move');
        if (offset - LIMIT >= 0) {
            setOffset(o => o - LIMIT);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const effectiveLimit = Math.min(LIMIT, TOTAL_GEN1 - offset);

            if (effectiveLimit <= 0) {
                setPokemon([]);
                setLoading(false);
                return;
            }

            const data = await getPokemonList(effectiveLimit, offset);
            setPokemon(data);
            setLoading(false);
        };
        fetchData();
    }, [offset]);

    useEffect(() => {
        setOnLeft(() => handlePrev);
        setOnRight(() => handleNext);

        return () => {
            setOnLeft(null);
            setOnRight(null);
        };
    }, [offset]); // Re-bind on offset change to capture new state in closures

    if (loading) return <LoadingText>Loading...</LoadingText>;

    return (
        <div>
            <ListContainer>
                {pokemon.map(p => (
                    <PokemonCard key={p.name} name={p.name} url={p.url} />
                ))}
            </ListContainer>
            <Controls>
                <Button onClick={handlePrev} disabled={offset === 0}>Prev</Button>
                <Button onClick={handleNext} disabled={offset + LIMIT >= TOTAL_GEN1}>Next</Button>
            </Controls>
        </div>
    );
};

export default PokemonList;
