import React, { createContext, useState, useEffect, useRef } from 'react';
import { soundSynthesizer } from '../utils/soundSynthesizer';

// Import sound files (assuming they will be placed in assets/sounds)
// If files don't exist yet, we'll handle it gracefully or use placeholders
// For now, we will construct paths relative to the public folder or import them if keeping in src
// Using imports is safer for bundlers like Vite
// START IMPORTS - You (User) need to add these files or the app might log errors
/*
import bgmUrl from '../assets/sounds/background.mp3';
import clickUrl from '../assets/sounds/click.mp3';
import hoverUrl from '../assets/sounds/hover.mp3';
import backUrl from '../assets/sounds/back.mp3';
*/

// CONSTANTS (Using relative paths for public folder if assets not imported)
// NOTE: For Vite, it's often better to put static assets in 'public/sounds' if we don't import them.
// However, since we made src/assets/sounds, let's try to dynamic import or just use refs.
// For this implementation, I will assume files are in 'public/sounds' for simplicity in dynamic loading, 
// OR I will trust the user to move them.
// Let's stick to the 'src/assets' pattern but since we can't import missing files,
// I'll create a dummy 'sound map' and instructions.

export const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.5);

    // Audio references
    // Removed file loading logic as we are using procedural synthesis

    // Initialize sounds
    useEffect(() => {
        // Initialize synthesizer on mount (or first interaction)
        soundSynthesizer.init();
    }, []);

    // Handle BGM Playback
    // Note: BGM is currently disabled/placeholder as we focus on SFX synthesis
    // To add BGM later, we can use a similar synthesis loop or load a file if provided.

    const playSound = (name) => {
        if (isMuted) return;
        soundSynthesizer.play(name);
    };

    const toggleMute = () => setIsMuted(prev => !prev);

    return (
        <SoundContext.Provider value={{ isMuted, toggleMute, volume, setVolume, playSound }}>
            {children}
        </SoundContext.Provider>
    );
};
