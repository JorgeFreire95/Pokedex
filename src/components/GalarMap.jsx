
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  background-color: #70d0d0;
  border-radius: 4px;
`;

// Approximate relative coordinates for Galar locations (Vertical layout primarily)
const cityCoordinates = {
    'Postwick': { x: 200, y: 280, color: '#a0a0a0' }, // Start
    'Wedgehurst': { x: 200, y: 260, color: '#a0a0a0' },
    'Motostoke': { x: 200, y: 180, color: '#f04040' }, // 3rd Gym (Fire)
    'Turffield': { x: 140, y: 200, color: '#40c040' }, // 1st Gym (Grass)
    'Hulbury': { x: 260, y: 200, color: '#4080f0' }, // 2nd Gym (Water)
    'Hammerlocke': { x: 200, y: 120, color: '#8040d0' }, // 8th Gym (Dragon)
    'Stow-on-Side': { x: 140, y: 120, color: '#d08040' }, // 4th Gym (Fight/Ghost)
    'Ballonlea': { x: 100, y: 100, color: '#f080f0' }, // 5th Gym (Fairy)
    'Circhester': { x: 260, y: 80, color: '#a0c0e0' }, // 6th Gym (Rock/Ice)
    'Spikemuth': { x: 300, y: 120, color: '#404040' }, // 7th Gym (Dark)
    'Wyndon': { x: 200, y: 40, color: '#f0f0f0' }, // League
};

const CityRect = styled(motion.rect)`
  stroke: black;
  stroke-width: 1px;
  cursor: pointer;
`;

const GalarMap = ({ highlightedCity }) => {
    return (
        <Svg viewBox="0 0 400 300">
            {/* Landmass (Long strip / Great Britain shape simplified) */}
            <path d="M160,20 L240,20 L280,80 L280,140 L340,160 L280,240 L220,290 L180,290 L120,240 L60,160 L120,140 L120,80 z" fill="#c8c880" stroke="#808040" strokeWidth="2" />

            {/* Wild Area (Central) */}
            <path d="M160,180 L240,180 L240,240 L160,240 z" fill="#a0a060" stroke="none" />


            {/* Routes (Lines) */}

            {/* Postwick -> Wedgehurst */}
            <line x1="200" y1="280" x2="200" y2="260" stroke="white" strokeWidth="4" />

            {/* Wedgehurst -> Wild Area -> Motostoke */}
            <line x1="200" y1="260" x2="200" y2="180" stroke="white" strokeWidth="4" />

            {/* Motostoke -> Turffield */}
            <line x1="200" y1="180" x2="140" y2="200" stroke="white" strokeWidth="4" />

            {/* Motostoke -> Hulbury */}
            <line x1="200" y1="180" x2="260" y2="200" stroke="white" strokeWidth="4" />

            {/* Turffield/Hulbury -> Motostoke -> Hammerlocke (Wild Area North) */}
            <line x1="200" y1="180" x2="200" y2="120" stroke="white" strokeWidth="4" />

            {/* Hammerlocke -> Stow-on-Side */}
            <line x1="200" y1="120" x2="140" y2="120" stroke="white" strokeWidth="4" />

            {/* Stow-on-Side -> Ballonlea */}
            <line x1="140" y1="120" x2="100" y2="100" stroke="white" strokeWidth="4" />

            {/* Hammerlocke -> Circhester (Route 7/8/9) */}
            <line x1="200" y1="120" x2="260" y2="80" stroke="white" strokeWidth="4" />

            {/* Circhester -> Spikemuth */}
            <line x1="260" y1="80" x2="300" y2="120" stroke="white" strokeWidth="4" />

            {/* Hammerlocke -> Wyndon (Train/Route 10) */}
            <line x1="200" y1="120" x2="200" y2="40" stroke="white" strokeWidth="4" style={{ strokeDasharray: "5,5" }} />


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

            <text x="10" y="20" fontFamily="monospace" fontSize="12" fill="black">Galar Region</text>
        </Svg>
    );
};

export default GalarMap;
