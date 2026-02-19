
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  background-color: #70d0d0;
  border-radius: 4px;
`;

// Approximate relative coordinates for Alola locations on a 400x300 map
// Melemele (Top Left), Akala (Top Right), Ula'ula (Bottom Right), Poni (Bottom Left) - roughly
const cityCoordinates = {
    // Melemele Island (Top Left)
    'Iki Town': { x: 60, y: 60, color: '#f0d060' },
    'Hau\'oli City': { x: 80, y: 80, color: '#f0f0f0' },

    // Akala Island (Top Right)
    'Heahea City': { x: 280, y: 60, color: '#f0f0f0' },
    'Paniola Town': { x: 300, y: 80, color: '#d0a060' },
    'Konikoni City': { x: 280, y: 120, color: '#a0a0a0' },
    'Wela Volcano Park': { x: 320, y: 100, color: '#ff6040' },
    'Lush Jungle': { x: 320, y: 60, color: '#40a040' },

    // Ula'ula Island (Bottom Right)
    'Malie City': { x: 260, y: 200, color: '#f0f0f0' },
    'Mount Hokulani': { x: 220, y: 220, color: '#d0a060' },
    'Po Town': { x: 300, y: 180, color: '#a080a0' },
    'Tapu Village': { x: 280, y: 220, color: '#a0a0a0' },

    // Poni Island (Bottom Left)
    'Seafolk Village': { x: 100, y: 240, color: '#a0a0f0' },
    'Vast Poni Canyon': { x: 140, y: 220, color: '#d0a060' },
    'Exeggutor Island': { x: 60, y: 260, color: '#40a040' },

    'Pokemon League': { x: 180, y: 40, color: '#f0f0f0' }, // Mount Lanakila (Ula'ula north)
    'Aether Paradise': { x: 180, y: 140, color: '#ffffff' }, // Center
};

const CityRect = styled(motion.rect)`
  stroke: black;
  stroke-width: 1px;
  cursor: pointer;
`;

const AlolaMap = ({ highlightedCity }) => {
    return (
        <Svg viewBox="0 0 400 300">
            {/* Melemele Island */}
            <path d="M40,40 L100,40 L120,80 L80,100 L40,80 z" fill="#f0e080" stroke="#c0a040" strokeWidth="2" />

            {/* Akala Island */}
            <path d="M260,40 L340,40 L360,100 L300,140 L260,100 z" fill="#e0a0a0" stroke="#a06060" strokeWidth="2" />

            {/* Ula'ula Island */}
            <path d="M200,160 L320,160 L340,240 L240,260 L200,220 z" fill="#d0d0a0" stroke="#a0a060" strokeWidth="2" />

            {/* Poni Island */}
            <path d="M80,200 L160,200 L180,260 L120,280 L80,240 z" fill="#d0a0d0" stroke="#a060a0" strokeWidth="2" />

            {/* Aether Paradise (Artificial) */}
            <rect x="160" y="130" width="40" height="20" fill="#f0f0f0" stroke="#a0a0a0" strokeWidth="2" />


            {/* Routes (Boat paths mostly) */}

            {/* Melemele -> Akala */}
            <line x1="120" y1="80" x2="260" y2="100" stroke="white" strokeWidth="2" strokeDasharray="5,5" />

            {/* Akala -> Aether */}
            <line x1="260" y1="100" x2="200" y2="140" stroke="white" strokeWidth="2" strokeDasharray="5,5" />

            {/* Aether -> Ula'ula */}
            <line x1="180" y1="150" x2="220" y2="180" stroke="white" strokeWidth="2" strokeDasharray="5,5" />

            {/* Ula'ula -> Poni */}
            <line x1="240" y1="260" x2="160" y2="240" stroke="white" strokeWidth="2" strokeDasharray="5,5" />


            {/* Cities/Locations */}
            {Object.entries(cityCoordinates).map(([name, coords]) => {
                const isHighlighted = highlightedCity === name;
                return (
                    <CityRect
                        key={name}
                        x={coords.x}
                        y={coords.y}
                        width={15}
                        height={15}
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
                    x={cityCoordinates[highlightedCity].x + 7}
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

            <text x="10" y="20" fontFamily="monospace" fontSize="12" fill="black">Alola Region</text>
        </Svg>
    );
};

export default AlolaMap;
