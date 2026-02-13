import React, { createContext, useState, useEffect, useRef } from 'react';

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
    const bgmRef = useRef(null);
    const sfxRef = useRef({});

    // Initialize sounds
    useEffect(() => {
        // Background Music
        // We expect a file at /sounds/bgm.wav
        bgmRef.current = new Audio('/sounds/bgm.wav');
        bgmRef.current.loop = true;
        bgmRef.current.volume = volume * 0.3; // BGM usually softer

        // SFX
        const sfxNames = ['click', 'move', 'open', 'back', 'success', 'close'];
        sfxNames.forEach(name => {
            sfxRef.current[name] = new Audio(`/sounds/${name}.wav`);
        });

        return () => {
            if (bgmRef.current) {
                bgmRef.current.pause();
                bgmRef.current = null;
            }
        };
    }, []);

    // Handle BGM Playback
    useEffect(() => {
        if (bgmRef.current) {
            bgmRef.current.volume = isMuted ? 0 : volume * 0.3;
            if (!isMuted) {
                // user interaction is required for this to work automatically
                bgmRef.current.play().catch(e => console.log("Audio play failed (user interaction needed):", e));
            } else {
                bgmRef.current.pause();
            }
        }
    }, [isMuted, volume]);

    const playSound = (name) => {
        if (isMuted) return;

        if (sfxRef.current[name]) {
            // Clone node to allow overlapping sounds
            const sound = sfxRef.current[name].cloneNode();
            sound.volume = volume;
            sound.play().catch(e => console.log(`Failed to play ${name}:`, e));
        } else {
            console.warn(`Sound "${name}" not found`);
        }
    };

    const toggleMute = () => setIsMuted(prev => !prev);

    return (
        <SoundContext.Provider value={{ isMuted, toggleMute, volume, setVolume, playSound }}>
            {children}
        </SoundContext.Provider>
    );
};
