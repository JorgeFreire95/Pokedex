
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  background-color: #70d0d0;
  border-radius: 4px;
`;

// Define city coordinates relative to the 400x300 viewBox
const cityCoordinates = {
    'Pallet Town': { x: 80, y: 220, color: 'white' },
    'Viridian City': { x: 80, y: 160, color: '#80a080' },
    'Pewter City': { x: 80, y: 80, color: '#a0a0a0' },
    'Cerulean City': { x: 200, y: 60, color: '#8080f0' },
    'Vermilion City': { x: 200, y: 180, color: '#f0a040' },
    'Lavender Town': { x: 300, y: 100, color: '#c080f0' },
    'Celadon City': { x: 150, y: 120, color: '#80f080' },
    'Saffron City': { x: 200, y: 120, color: '#f0d060' },
    'Fuchsia City': { x: 180, y: 240, color: '#f080a0' },
    'Cinnabar Island': { x: 80, y: 280, color: '#f06060' },
    'Indigo Plateau': { x: 40, y: 80, color: '#f0f0f0' },
};

const CityRect = styled(motion.rect)`
  stroke: black;
  stroke-width: 1px;
  cursor: pointer;
`;

const KantoMap = ({ highlightedCity }) => {
    return (
        <Svg viewBox="0 0 400 300">
            {/* Landmass */}
            <path d="M50,50 L350,50 L350,250 L250,250 L250,280 L50,280 z" fill="#c8c880" stroke="#808040" strokeWidth="2" />

            {/* Routes (Lines) */}
            <line x1="90" y1="220" x2="90" y2="180" stroke="white" strokeWidth="4" />
            <line x1="90" y1="160" x2="90" y2="100" stroke="white" strokeWidth="4" />
            <line x1="100" y1="90" x2="190" y2="70" stroke="white" strokeWidth="4" />
            <line x1="210" y1="80" x2="210" y2="120" stroke="white" strokeWidth="4" />
            <line x1="210" y1="140" x2="210" y2="180" stroke="white" strokeWidth="4" />
            <line x1="220" y1="70" x2="300" y2="100" stroke="white" strokeWidth="4" />
            <line x1="310" y1="120" x2="310" y2="220" stroke="white" strokeWidth="4" />
            <line x1="300" y1="230" x2="200" y2="250" stroke="white" strokeWidth="4" />

            {/* Cities */}
            {Object.entries(cityCoordinates).map(([name, coords]) => {
                const isHighlighted = highlightedCity === name;
                return (
                    <CityRect
                        key={name}
                        x={coords.x}
                        y={coords.y}
                        width={20}
                        height={20}
                        fill={coords.color}
                        animate={{
                            scale: isHighlighted ? 1.5 : 1,
                            strokeWidth: isHighlighted ? 3 : 1,
                            stroke: isHighlighted ? '#FFFF00' : 'black',
                        }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    />
                );
            })}

            {/* Label for Highlighted City */}
            {highlightedCity && cityCoordinates[highlightedCity] && (
                <text
                    x={cityCoordinates[highlightedCity].x + 10}
                    y={cityCoordinates[highlightedCity].y - 10}
                    textAnchor="middle"
                    fill="black"
                    fontSize="10"
                    fontWeight="bold"
                    stroke="white"
                    strokeWidth="0.5"
                >
                    {highlightedCity}
                </text>
            )}

            <text x="10" y="20" fontFamily="monospace" fontSize="12" fill="black">Kanto Region</text>
        </Svg>
    );
};

export default KantoMap;
