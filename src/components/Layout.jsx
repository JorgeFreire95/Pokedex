
import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSound } from '../hooks/useSound';

const PokedexHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 20px;
  padding-bottom: 10px;
  position: relative;
  /* Removed border-bottom for cleaner Rotom look */
`;

const RotomSpike = styled.div`
  position: absolute;
  top: -40px; /* Adjust based on global padding */
  width: 0; 
  height: 0; 
  border-left: 35px solid transparent;
  border-right: 35px solid transparent;
  border-bottom: 50px solid var(--pokedex-red);
  z-index: 10;
  filter: drop-shadow(0 -2px 2px rgba(0,0,0,0.1));
`;

const RotomEye = styled.div`
  width: 80px;
  height: 100px;
  background: ${props => props.$active
    ? 'radial-gradient(ellipse at 60% 30%, #CCFFFF 0%, #33CCFF 40%, #0099FF 100%)'
    : 'radial-gradient(ellipse at 60% 30%, #88CCFF 0%, #44AAFF 40%, #0066CC 100%)'};
  border: 4px solid #1a1a1a;
  border-radius: 50%;
  margin: 0 15px;
  position: relative;
  box-shadow: ${props => props.$active ? '0 0 15px #00FFFF, inset 0 0 10px #FFFFFF' : '0 0 10px rgba(0,0,0,0.3)'};
  overflow: hidden;
  transition: all 0.1s ease;

  &::after {
    content: '';
    position: absolute;
    top: 15px;
    right: 15px;
    width: 25px;
    height: 35px;
    background: white;
    border-radius: 50%;
    transform: rotate(15deg);
    box-shadow: 0 0 5px rgba(255,255,255,0.8);
  }
`;

/* Removed BigBlueLight, SmallLights, Light */

const ScreenContainer = styled.div`
  background-color: #DEDEFF;
  border-radius: 15px 15px 5px 5px;
  padding: 20px;
  border: 15px solid #222;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;

const InnerScreen = styled.div`
  background-color: var(--screen-bg);
  border-radius: 5px;
  flex: 1;
  overflow-y: scroll;
  padding: 10px;
  color: var(--screen-text);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Readable font for content */
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 0 10px;
`;

const DPad = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
`;

const DPadButton = styled.div`
  position: absolute;
  background: #222;
  width: 30px;
  height: 30px;
  cursor: pointer;

  &:hover {
    background: #333;
  }

  &:active {
    background: #111;
  }
  
  &.up { top: 0; left: 35px; border-radius: 5px 5px 0 0; }
  &.down { bottom: 0; left: 35px; border-radius: 0 0 5px 5px; }
  &.left { top: 35px; left: 0; border-radius: 5px 0 0 5px; }
  &.right { top: 35px; right: 0; border-radius: 0 5px 5px 0; }
  &.center { top: 35px; left: 35px; } /* Center block */
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
`;

const RoundButton = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #222;
  border: 2px solid #555;
`;

const HomeButton = styled.div`
  width: 30px;
  height: 30px;
  background-color: #222;
  border-radius: 50%;
  border: 2px solid #444;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
  transition: all 0.1s ease;

  &:active {
    transform: scale(0.9);
    box-shadow: inset 2px 2px 5px rgba(0,0,0,0.5);
  }
`;

import { DPadProvider, useDPad } from '../contexts/DPadContext';

const DPadControls = ({ scrollRef }) => {
  const { onLeft, onRight } = useDPad();
  const navigate = useNavigate();
  const { playSound } = useSound();

  const handleScroll = (direction) => {
    playSound(direction === 'up' ? 'dpad-up' : 'dpad-down');
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        top: direction === 'up' ? -100 : 100,
        behavior: 'smooth'
      });
    }
  };

  const handleLeft = () => {
    playSound('dpad-left');
    if (onLeft) onLeft();
  };

  const handleRight = () => {
    playSound('dpad-right');
    if (onRight) onRight();
  };

  return (
    <Controls>
      <div style={{ display: 'flex', gap: '10px' }}>
        <HomeButton onClick={() => { playSound('home'); navigate('/'); }} title="Menú Principal" />
      </div>
      <DPad>
        <DPadButton className="up" onClick={() => handleScroll('up')} />
        <DPadButton className="center" onClick={() => playSound('dpad-center')} />
        <DPadButton className="right" onClick={handleRight} />
        <DPadButton className="down" onClick={() => handleScroll('down')} />
        <DPadButton className="left" onClick={handleLeft} />
      </DPad>
    </Controls>
  );
};

const LayoutContent = ({ children }) => {
  const scrollRef = React.useRef(null);
  const location = useLocation();
  const [isInteracting, setIsInteracting] = React.useState(false);
  const timeoutRef = React.useRef(null);

  React.useEffect(() => {
    const triggerInteraction = () => {
      setIsInteracting(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsInteracting(false);
      }, 150);
    };

    window.addEventListener('mousedown', triggerInteraction);
    window.addEventListener('keydown', triggerInteraction);
    window.addEventListener('touchstart', triggerInteraction);

    // Also trigger on location change
    triggerInteraction();

    return () => {
      window.removeEventListener('mousedown', triggerInteraction);
      window.removeEventListener('keydown', triggerInteraction);
      window.removeEventListener('touchstart', triggerInteraction);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [location]);

  return (
    <>
      <PokedexHeader>
        <RotomSpike />
        <RotomEye $active={isInteracting} />
        <RotomEye $active={isInteracting} />
      </PokedexHeader>

      <ScreenContainer>
        <InnerScreen ref={scrollRef}>
          {children}
        </InnerScreen>
      </ScreenContainer>

      <DPadControls scrollRef={scrollRef} />
    </>
  );
};

const Layout = ({ children }) => {
  return (
    <DPadProvider>
      <LayoutContent>{children}</LayoutContent>
    </DPadProvider>
  );
};

export default Layout;
