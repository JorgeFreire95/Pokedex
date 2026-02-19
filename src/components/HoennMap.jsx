
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  background-color: #70d0d0;
  border-radius: 4px;
`;

// Approximate relative coordinates for Hoenn cities
const cityCoordinates = {
    'Rustboro City': { x: 80, y: 120, color: '#a0a0a0' },
    'Dewford Town': { x: 80, y: 240, color: '#f0d060' },
    'Mauville City': { x: 180, y: 160, color: '#f0f040' },
    'Lavaridge Town': { x: 140, y: 80, color: '#f08040' },
    'Petalburg City': { x: 80, y: 180, color: '#a0a0a0' }, // Norman is 5th but earlier geographically
    'Fortree City': { x: 260, y: 80, color: '#80f080' },
    'Mossdeep City': { x: 340, y: 120, color: '#c080f0' },
    'Sootopolis City': { x: 300, y: 180, color: '#f0f0f0' },
    'Ever Grande City': { x: 360, y: 220, color: '#f0f0f0' }, // League
    'Slateport City': { x: 180, y: 220, color: '#60a0f0' }, // Optional
    'Lilycove City': { x: 300, y: 120, color: '#f080a0' }, // Optional
};

const CityRect = styled(motion.rect)`
  stroke: black;
  stroke-width: 1px;
  cursor: pointer;
`;

const HoennMap = ({ highlightedCity }) => {
    return (
        <Svg viewBox="0 0 400 300">
            {/* Landmass (Simple Representation - Hoenn is complex with water) */}
            {/* Main Continent */}
            <path d="M40,100 L160,60 L280,60 L280,140 L160,200 L40,200 z" fill="#c8c880" stroke="#808040" strokeWidth="2" />

            {/* Eastern Islands / Area */}
            <path d="M280,60 L380,80 L380,240 L240,240 L240,140 z" fill="#70d0d0" stroke="none" /> {/* Water background override? No, islands needed */}
            <path d="M290,100 L350,100 L350,140 L290,140 z" fill="#c8c880" stroke="#808040" strokeWidth="2" /> {/* Mossdeep/Lilycove area */}
            <path d="M280,160 L320,160 L320,200 L280,200 z" fill="#f0f0f0" stroke="#808040" strokeWidth="2" /> {/* Sootopolis crater ish */}

            {/* Routes (Lines) */}

            {/* Petalburg -> Rustboro */}
            <line x1="80" y1="180" x2="80" y2="120" stroke="white" strokeWidth="4" />

            {/* Rustboro -> Dewford (Sea) */}
            <line x1="80" y1="120" x2="40" y2="240" stroke="#60a0f0" strokeWidth="4" strokeDasharray="5,5" />
            <line x1="40" y1="240" x2="80" y2="240" stroke="#60a0f0" strokeWidth="4" strokeDasharray="5,5" />

            {/* Dewford -> Slateport (Sea) */}
            <line x1="80" y1="240" x2="180" y2="220" stroke="#60a0f0" strokeWidth="4" strokeDasharray="5,5" />

            {/* Slateport -> Mauville */}
            <line x1="180" y1="220" x2="180" y2="160" stroke="white" strokeWidth="4" />

            {/* Mauville -> Lavaridge */}
            <line x1="180" y1="160" x2="140" y2="120" stroke="white" strokeWidth="4" />
            <line x1="140" y1="120" x2="140" y2="80" stroke="white" strokeWidth="4" />

            {/* Mauville -> Fortree */}
            <line x1="180" y1="160" x2="220" y2="120" stroke="#60a0f0" strokeWidth="4" strokeDasharray="5,5" /> {/* Water crossing mostly */}
            <line x1="220" y1="120" x2="260" y2="80" stroke="white" strokeWidth="4" />

            {/* Fortree -> Lilycove */}
            <line x1="260" y1="80" x2="300" y2="120" stroke="white" strokeWidth="4" />

            {/* Lilycove -> Mossdeep (Sea) */}
            <line x1="300" y1="120" x2="340" y2="120" stroke="#60a0f0" strokeWidth="4" strokeDasharray="5,5" />

            {/* Mossdeep -> Sootopolis (Sea) */}
            <line x1="340" y1="120" x2="300" y2="180" stroke="#60a0f0" strokeWidth="4" strokeDasharray="5,5" />

            {/* Sootopolis -> Ever Grande (Sea) */}
            <line x1="300" y1="180" x2="360" y2="220" stroke="#60a0f0" strokeWidth="4" strokeDasharray="5,5" />


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

            <text x="10" y="20" fontFamily="monospace" fontSize="12" fill="black">Hoenn Region</text>
        </Svg>
    );
};

export default HoennMap;
