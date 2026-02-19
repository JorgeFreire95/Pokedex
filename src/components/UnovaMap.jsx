
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  background-color: #70d0d0;
  border-radius: 4px;
`;

// Approximate relative coordinates for Unova cities
const cityCoordinates = {
    'Nuvema Town': { x: 300, y: 240, color: '#f0d060' }, // Starting town
    'Accumula Town': { x: 260, y: 220, color: '#a0a0a0' },
    'Striaton City': { x: 300, y: 180, color: '#f0f040' }, // 1st Gym
    'Nacrene City': { x: 260, y: 260, color: '#a0a0a0' }, // 2nd Gym
    'Castelia City': { x: 200, y: 260, color: '#f0d060' }, // 3rd Gym
    'Nimbasa City': { x: 200, y: 180, color: '#f0f040' }, // 4th Gym
    'Driftveil City': { x: 120, y: 180, color: '#a0a0a0' }, // 5th Gym
    'Mistralton City': { x: 80, y: 140, color: '#60a0f0' }, // 6th Gym
    'Icirrus City': { x: 140, y: 100, color: '#c0f0f0' }, // 7th Gym
    'Opelucid City': { x: 220, y: 100, color: '#a080f0' }, // 8th Gym
    'Pokemon League': { x: 220, y: 40, color: '#f0f0f0' },
    'Black City / White Forest': { x: 340, y: 180, color: '#404040' }, // Optional
    'Undella Town': { x: 340, y: 140, color: '#60a0f0' }, // Optional
    'Lacunosa Town': { x: 340, y: 100, color: '#a0a0a0' }, // Optional
};

const CityRect = styled(motion.rect)`
  stroke: black;
  stroke-width: 1px;
  cursor: pointer;
`;

const UnovaMap = ({ highlightedCity }) => {
    return (
        <Svg viewBox="0 0 400 300">
            {/* Landmass (Unova is roughly circular/hexagonal) */}
            {/* Main Loop Landmass */}
            <path d="M100,100 L220,60 L340,100 L340,220 L220,280 L100,240 z" fill="#c8c880" stroke="#808040" strokeWidth="2" />

            {/* Inner Desert Area */}
            <path d="M180,180 L220,180 L220,220 L180,220 z" fill="#e0c060" stroke="#a08040" strokeWidth="1" />


            {/* Routes (Lines) */}

            {/* Nuvema -> Accumula */}
            <line x1="300" y1="240" x2="260" y2="220" stroke="white" strokeWidth="4" />

            {/* Accumula -> Striaton */}
            <line x1="260" y1="220" x2="300" y2="180" stroke="white" strokeWidth="4" />

            {/* Striaton -> Nacrene */}
            <line x1="300" y1="180" x2="260" y2="260" stroke="white" strokeWidth="4" />

            {/* Nacrene -> Castelia (Wait, this goes through pinwheel forest) */}
            <line x1="260" y1="260" x2="200" y2="260" stroke="white" strokeWidth="4" />

            {/* Castelia -> Nimbasa */}
            <line x1="200" y1="260" x2="200" y2="180" stroke="white" strokeWidth="4" />

            {/* Nimbasa -> Driftveil (Drawbridge) */}
            <line x1="200" y1="180" x2="120" y2="180" stroke="#ff8080" strokeWidth="4" />

            {/* Driftveil -> Mistralton (Cave) */}
            <line x1="120" y1="180" x2="80" y2="140" stroke="white" strokeWidth="4" />

            {/* Mistralton -> Icirrus */}
            <line x1="80" y1="140" x2="140" y2="100" stroke="white" strokeWidth="4" />

            {/* Icirrus -> Opelucid */}
            <line x1="140" y1="100" x2="220" y2="100" stroke="white" strokeWidth="4" />

            {/* Opelucid -> League */}
            <line x1="220" y1="100" x2="220" y2="40" stroke="white" strokeWidth="4" />

            {/* Opelucid -> Lacunosa -> Undella -> Black City -> Route 15 (Bridge) -> Nimbasa */}
            <line x1="220" y1="100" x2="340" y2="100" stroke="white" strokeWidth="4" />
            <line x1="340" y1="100" x2="340" y2="140" stroke="white" strokeWidth="4" />
            <line x1="340" y1="140" x2="340" y2="180" stroke="white" strokeWidth="4" />
            <line x1="340" y1="180" x2="200" y2="180" stroke="#ff8080" strokeWidth="4" strokeDasharray="5,5" />


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

            <text x="10" y="20" fontFamily="monospace" fontSize="12" fill="black">Unova Region</text>
        </Svg>
    );
};

export default UnovaMap;
