
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  background-color: #70d0d0;
  border-radius: 4px;
`;

// Approximate relative coordinates for Kalos cities
const cityCoordinates = {
    'Vaniville Town': { x: 140, y: 260, color: '#f08080' }, // Start
    'Santalune City': { x: 180, y: 240, color: '#a0f080' }, // 1st Gym
    'Lumiose City': { x: 200, y: 150, color: '#f0f0f0' }, // 5th Gym center
    'Camphrier Town': { x: 140, y: 180, color: '#a0a0a0' },
    'Cyllage City': { x: 80, y: 160, color: '#c0a060' }, // 2nd Gym
    'Geosenge Town': { x: 40, y: 120, color: '#a0a0a0' },
    'Shalour City': { x: 60, y: 80, color: '#d08040' }, // 3rd Gym
    'Coumarine City': { x: 120, y: 60, color: '#80d060' }, // 4th Gym
    'Laverre City': { x: 200, y: 60, color: '#e0a0f0' }, // 6th Gym
    'Dendemille Town': { x: 260, y: 100, color: '#a0a0a0' },
    'Anistar City': { x: 320, y: 120, color: '#a080c0' }, // 7th Gym
    'Couriway Town': { x: 300, y: 200, color: '#a0a0a0' },
    'Snowbelle City': { x: 260, y: 240, color: '#c0f0f0' }, // 8th Gym
    'Pokemon League': { x: 100, y: 200, color: '#f0f0f0' },
    'Kiloude City': { x: 300, y: 280, color: '#f0d060' }, // Post-game
};

const CityRect = styled(motion.rect)`
  stroke: black;
  stroke-width: 1px;
  cursor: pointer;
`;

const KalosMap = ({ highlightedCity }) => {
    return (
        <Svg viewBox="0 0 400 300">
            {/* Landmass (Star shape basically) */}
            <path d="M40,120 L60,80 L200,40 L340,120 L320,280 L140,280 L80,160 z" fill="#c8c880" stroke="#808040" strokeWidth="2" />

            {/* Central Kalos */}
            <circle cx="200" cy="150" r="40" fill="#e0e0a0" stroke="none" />


            {/* Routes (Lines) */}

            {/* Vaniville -> Santalune */}
            <line x1="140" y1="260" x2="180" y2="240" stroke="white" strokeWidth="4" />

            {/* Santalune -> Lumiose */}
            <line x1="180" y1="240" x2="200" y2="150" stroke="white" strokeWidth="4" />

            {/* Lumiose -> Camphrier */}
            <line x1="200" y1="150" x2="140" y2="180" stroke="white" strokeWidth="4" />

            {/* Camphrier -> Cyllage */}
            <line x1="140" y1="180" x2="80" y2="160" stroke="#60a0f0" strokeWidth="4" strokeDasharray="5,5" />

            {/* Cyllage -> Geosenge */}
            <line x1="80" y1="160" x2="40" y2="120" stroke="white" strokeWidth="4" />

            {/* Geosenge -> Shalour */}
            <line x1="40" y1="120" x2="60" y2="80" stroke="#60a0f0" strokeWidth="4" strokeDasharray="5,5" />

            {/* Shalour -> Coumarine */}
            <line x1="60" y1="80" x2="120" y2="60" stroke="#60a0f0" strokeWidth="4" strokeDasharray="5,5" />

            {/* Coumarine -> Lumiose (Badlands) */}
            <line x1="120" y1="60" x2="200" y2="150" stroke="#d0a060" strokeWidth="4" />

            {/* Lumiose -> Laverre */}
            <line x1="200" y1="150" x2="200" y2="60" stroke="white" strokeWidth="4" />

            {/* Laverre -> Dendemille */}
            <line x1="200" y1="60" x2="260" y2="100" stroke="white" strokeWidth="4" />

            {/* Dendemille -> Anistar */}
            <line x1="260" y1="100" x2="320" y2="120" stroke="white" strokeWidth="4" />

            {/* Anistar -> Couriway */}
            <line x1="320" y1="120" x2="300" y2="200" stroke="white" strokeWidth="4" />

            {/* Couriway -> Snowbelle */}
            <line x1="300" y1="200" x2="260" y2="240" stroke="white" strokeWidth="4" />

            {/* Snowbelle -> Lumiose */}
            <line x1="260" y1="240" x2="200" y2="150" stroke="white" strokeWidth="4" />


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

            <text x="10" y="20" fontFamily="monospace" fontSize="12" fill="black">Kalos Region</text>
        </Svg>
    );
};

export default KalosMap;
