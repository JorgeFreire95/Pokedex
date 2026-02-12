
import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

const PokedexHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 4px solid var(--pokedex-dark-red);
`;

const BigBlueLight = styled.div`
  width: 60px;
  height: 60px;
  background: radial-gradient(circle at 30% 30%, #44AAFF, #0055AA);
  border: 4px solid white;
  border-radius: 50%;
  margin-right: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
`;

const SmallLights = styled.div`
  display: flex;
  gap: 10px;
`;

const Light = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid white;
  background-color: ${props => props.color};
  box-shadow: inset 2px 2px 2px rgba(255,255,255,0.5);
`;

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

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        top: direction === 'up' ? -100 : 100,
        behavior: 'smooth'
      });
    }
  };

  const handleLeft = () => {
    if (onLeft) onLeft();
  };

  const handleRight = () => {
    if (onRight) onRight();
  };

  return (
    <Controls>
      <div style={{ display: 'flex', gap: '10px' }}>
        <HomeButton onClick={() => navigate('/')} title="Menú Principal" />
      </div>
      <DPad>
        <DPadButton className="up" onClick={() => handleScroll('up')} />
        <DPadButton className="center" />
        <DPadButton className="right" onClick={handleRight} />
        <DPadButton className="down" onClick={() => handleScroll('down')} />
        <DPadButton className="left" onClick={handleLeft} />
      </DPad>
    </Controls>
  );
};

const LayoutContent = ({ children }) => {
  const scrollRef = React.useRef(null);

  return (
    <>
      <PokedexHeader>
        <BigBlueLight />
        <SmallLights>
          <Light color="#FF0000" />
          <Light color="#FFFF00" />
          <Light color="#00FF00" />
        </SmallLights>
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
