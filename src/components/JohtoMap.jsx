
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  background-color: #70d0d0;
  border-radius: 4px;
`;

// Approximate relative coordinates for Johto cities
const cityCoordinates = {
    'New Bark Town': { x: 340, y: 220, color: '#f0a0a0' },
    'Cherrygrove City': { x: 260, y: 220, color: '#f080a0' },
    'Violet City': { x: 260, y: 140, color: '#a080f0' },
    'Azalea Town': { x: 220, y: 260, color: '#80f080' },
    'Goldenrod City': { x: 180, y: 200, color: '#f0d060' },
    'Ecruteak City': { x: 220, y: 100, color: '#c080f0' },
    'Olivine City': { x: 100, y: 140, color: '#a0a0a0' },
    'Cianwood City': { x: 40, y: 200, color: '#f08040' },
    'Mahogany Town': { x: 300, y: 100, color: '#80d0d0' },
    'Blackthorn City': { x: 340, y: 140, color: '#8080f0' },
    'Lake of Rage': { x: 300, y: 60, color: '#60a0f0' }, // Optional, but iconic
};

const CityRect = styled(motion.rect)`
  stroke: black;
  stroke-width: 1px;
  cursor: pointer;
`;

const JohtoMap = ({ highlightedCity }) => {
    return (
        <Svg viewBox="0 0 400 300">
            {/* Landmass (Simple Representation) */}
            <path d="M20,80 L140,80 L140,50 L380,50 L380,250 L200,280 L20,280 z" fill="#c8c880" stroke="#808040" strokeWidth="2" />

            {/* Routes (Lines) */}

            {/* New Bark -> Cherrygrove */}
            <line x1="340" y1="220" x2="260" y2="220" stroke="white" strokeWidth="4" />

            {/* Cherrygrove -> Violet */}
            <line x1="260" y1="220" x2="260" y2="140" stroke="white" strokeWidth="4" />

            {/* Violet -> Azalea (via Union Cave/Ruins roughly) */}
            <line x1="260" y1="140" x2="260" y2="260" stroke="white" strokeWidth="4" />
            <line x1="260" y1="260" x2="220" y2="260" stroke="white" strokeWidth="4" />

            {/* Azalea -> Goldenrod (Ilex Forest) */}
            <line x1="220" y1="260" x2="180" y2="260" stroke="white" strokeWidth="4" />
            <line x1="180" y1="260" x2="180" y2="200" stroke="white" strokeWidth="4" />

            {/* Goldenrod -> Ecruteak */}
            <line x1="180" y1="200" x2="180" y2="140" stroke="white" strokeWidth="4" />
            <line x1="180" y1="140" x2="220" y2="100" stroke="white" strokeWidth="4" />
            <line x1="220" y1="140" x2="220" y2="100" stroke="white" strokeWidth="4" /> {/* Connecting from Violet side too */}
            <line x1="260" y1="140" x2="220" y2="140" stroke="white" strokeWidth="4" />

            {/* Ecruteak -> Olivine */}
            <line x1="220" y1="100" x2="100" y2="100" stroke="white" strokeWidth="4" />
            <line x1="100" y1="100" x2="100" y2="140" stroke="white" strokeWidth="4" />

            {/* Olivine -> Cianwood (Sea) */}
            <line x1="100" y1="140" x2="40" y2="200" stroke="#60a0f0" strokeWidth="4" strokeDasharray="5,5" />

            {/* Ecruteak -> Mahogany */}
            <line x1="220" y1="100" x2="300" y2="100" stroke="white" strokeWidth="4" />

            {/* Mahogany -> Lake of Rage */}
            <line x1="300" y1="100" x2="300" y2="60" stroke="white" strokeWidth="4" />

            {/* Mahogany -> Blackthorn (Ice Path) */}
            <line x1="300" y1="100" x2="340" y2="100" stroke="white" strokeWidth="4" />
            <line x1="340" y1="100" x2="340" y2="140" stroke="white" strokeWidth="4" />

            {/* Blackthorn -> New Bark (South) */}
            <line x1="340" y1="140" x2="340" y2="220" stroke="white" strokeWidth="4" />


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

            <text x="10" y="20" fontFamily="monospace" fontSize="12" fill="black">Johto Region</text>
        </Svg>
    );
};

export default JohtoMap;
