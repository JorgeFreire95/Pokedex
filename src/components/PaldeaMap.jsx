
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  background-color: #70d0d0;
  border-radius: 4px;
`;

// Approximate relative coordinates for Paldea locations
const cityCoordinates = {
    'Mesagoza': { x: 200, y: 220, color: '#f0f0f0' }, // Central South
    'Cortondo': { x: 140, y: 240, color: '#a0c040' }, // Bug
    'Artazon': { x: 260, y: 240, color: '#40c040' }, // Grass
    'Levincia': { x: 340, y: 180, color: '#f0f040' }, // Electric
    'Cascarrafa': { x: 100, y: 160, color: '#4080f0' }, // Water
    'Medali': { x: 160, y: 140, color: '#a0a0a0' }, // Normal
    'Montenevera': { x: 200, y: 60, color: '#8080a0' }, // Ghost
    'Alfornada': { x: 60, y: 280, color: '#d080c0' }, // Psychic
    'Glaseado Mountain': { x: 200, y: 80, color: '#a0f0f0' }, // Ice
    'Area Zero': { x: 200, y: 180, color: '#f0f0f0' }, // The Great Crater
};

const CityRect = styled(motion.rect)`
  stroke: black;
  stroke-width: 1px;
  cursor: pointer;
`;

const PaldeaMap = ({ highlightedCity }) => {
    return (
        <Svg viewBox="0 0 400 300">
            {/* Landmass (Roughly circular/oval with peninsulas) */}
            <path d="M40,280 L20,160 L60,80 L140,40 L260,40 L340,80 L380,160 L360,280 L200,300 L40,280 z" fill="#d0d080" stroke="#a0a060" strokeWidth="2" />

            {/* The Great Crater of Paldea */}
            <circle cx="200" cy="180" r="40" fill="#a0a0a0" stroke="#606060" strokeWidth="2" />
            <circle cx="200" cy="180" r="30" fill="#e0e0e0" opacity="0.5" />

            {/* Glaseado Mountain Area */}
            <path d="M160,80 L200,40 L240,80 L200,120 z" fill="#e0f0f0" stroke="none" />


            {/* Routes/Paths (Simplified) */}

            {/* Mesagoza -> Cortondo */}
            <line x1="200" y1="220" x2="140" y2="240" stroke="white" strokeWidth="3" strokeDasharray="5,5" />

            {/* Mesagoza -> Artazon */}
            <line x1="200" y1="220" x2="260" y2="240" stroke="white" strokeWidth="3" strokeDasharray="5,5" />

            {/* Artazon -> Levincia */}
            <line x1="260" y1="240" x2="340" y2="180" stroke="white" strokeWidth="3" strokeDasharray="5,5" />

            {/* Levincia -> Montenevera (North path) */}
            <line x1="340" y1="180" x2="200" y2="60" stroke="white" strokeWidth="3" strokeDasharray="5,5" />

            {/* Cortondo -> Cascarrafa */}
            <line x1="140" y1="240" x2="100" y2="160" stroke="white" strokeWidth="3" strokeDasharray="5,5" />

            {/* Cascarrafa -> Medali */}
            <line x1="100" y1="160" x2="160" y2="140" stroke="white" strokeWidth="3" strokeDasharray="5,5" />

            {/* Medali -> Montenevera */}
            <line x1="160" y1="140" x2="200" y2="60" stroke="white" strokeWidth="3" strokeDasharray="5,5" />

            {/* Cortondo -> Alfornada (Cave path) */}
            <line x1="140" y1="240" x2="60" y2="280" stroke="#804040" strokeWidth="3" />


            {/* Cities/Locations */}
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

            <text x="10" y="20" fontFamily="monospace" fontSize="12" fill="black">Paldea Region</text>
        </Svg>
    );
};

export default PaldeaMap;
