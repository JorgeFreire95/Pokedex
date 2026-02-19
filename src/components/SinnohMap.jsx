
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  background-color: #70d0d0;
  border-radius: 4px;
`;

// Approximate relative coordinates for Sinnoh cities
const cityCoordinates = {
    'Twinleaf Town': { x: 60, y: 260, color: '#a0a0a0' },
    'Sandgem Town': { x: 100, y: 260, color: '#f0d060' },
    'Jubilife City': { x: 80, y: 200, color: '#a0a0a0' },
    'Oreburgh City': { x: 140, y: 200, color: '#a0a0a0' },
    'Floaroma Town': { x: 80, y: 140, color: '#f080f0' },
    'Eterna City': { x: 120, y: 120, color: '#80d080' },
    'Hearthome City': { x: 200, y: 180, color: '#f080a0' },
    'Solaceon Town': { x: 240, y: 140, color: '#d0a060' },
    'Veilstone City': { x: 300, y: 120, color: '#a08080' },
    'Pastoria City': { x: 260, y: 240, color: '#60a0f0' },
    'Celestic Town': { x: 180, y: 120, color: '#a0a0a0' },
    'Canalave City': { x: 40, y: 180, color: '#a0a0a0' },
    'Snowpoint City': { x: 180, y: 40, color: '#f0f0f0' },
    'Sunyshore City': { x: 360, y: 200, color: '#f0f040' },
    'Pokemon League': { x: 360, y: 120, color: '#f0f0f0' },
};

const CityRect = styled(motion.rect)`
  stroke: black;
  stroke-width: 1px;
  cursor: pointer;
`;

const SinnohMap = ({ highlightedCity }) => {
    return (
        <Svg viewBox="0 0 400 300">
            {/* Landmass (Divided by Mt. Coronet roughly) */}
            {/* Western Sinnoh */}
            <path d="M20,120 L140,100 L160,280 L40,280 L20,200 z" fill="#c8c880" stroke="#808040" strokeWidth="2" />

            {/* Eastern Sinnoh */}
            <path d="M180,100 L320,80 L380,180 L380,260 L240,260 L180,220 z" fill="#c8c880" stroke="#808040" strokeWidth="2" />

            {/* Northern Sinnoh (Snow) */}
            <path d="M140,20 L220,20 L220,80 L140,80 z" fill="#f0f0f0" stroke="#8080f0" strokeWidth="2" />

            {/* Mt. Coronet Range (Central) */}
            <path d="M160,100 L200,100 L200,220 L160,220 z" fill="#b0b0b0" stroke="#606060" strokeWidth="2" />


            {/* Routes (Lines) */}

            {/* Twinleaf -> Sandgem */}
            <line x1="60" y1="260" x2="100" y2="260" stroke="white" strokeWidth="4" />

            {/* Sandgem -> Jubilife */}
            <line x1="100" y1="260" x2="80" y2="200" stroke="white" strokeWidth="4" />

            {/* Jubilife -> Oreburgh */}
            <line x1="80" y1="200" x2="140" y2="200" stroke="white" strokeWidth="4" />

            {/* Jubilife -> Canalave */}
            <line x1="80" y1="200" x2="40" y2="180" stroke="white" strokeWidth="4" />

            {/* Jubilife -> Floaroma */}
            <line x1="80" y1="200" x2="80" y2="140" stroke="white" strokeWidth="4" />

            {/* Floaroma -> Eterna */}
            <line x1="80" y1="140" x2="120" y2="120" stroke="white" strokeWidth="4" />

            {/* Eterna -> Mt. Coronet -> Hearthome */}
            <line x1="120" y1="120" x2="200" y2="180" stroke="white" strokeWidth="4" />

            {/* Hearthome -> Solaceon */}
            <line x1="200" y1="180" x2="240" y2="140" stroke="white" strokeWidth="4" />

            {/* Solaceon -> Veilstone */}
            <line x1="240" y1="140" x2="300" y2="120" stroke="white" strokeWidth="4" />

            {/* Veilstone -> Pastoria */}
            <line x1="300" y1="120" x2="260" y2="240" stroke="white" strokeWidth="4" />

            {/* Pastoria -> Hearthome */}
            <line x1="260" y1="240" x2="200" y2="180" stroke="white" strokeWidth="4" />

            {/* Mt. Coronet -> Snowpoint */}
            <line x1="180" y1="100" x2="180" y2="40" stroke="white" strokeWidth="4" />

            {/* Sunyshore -> League (Sea) */}
            <line x1="260" y1="240" x2="360" y2="200" stroke="white" strokeWidth="4" />
            <line x1="360" y1="200" x2="360" y2="120" stroke="#60a0f0" strokeWidth="4" strokeDasharray="5,5" />


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

            <text x="10" y="20" fontFamily="monospace" fontSize="12" fill="black">Sinnoh Region</text>
        </Svg>
    );
};

export default SinnohMap;
