
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { getItemsList } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../hooks/useSound';

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding-bottom: 20px;
`;

const ItemCard = styled.div`
  background: white;
  border-radius: 5px;
  border: 2px solid #ddd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 5px;
  aspect-ratio: 1;
  transition: transform 0.1s;

  &:active {
    transform: scale(0.95);
  }
`;

const ItemImage = styled.img`
  width: 30px;
  height: 30px;
  image-rendering: pixelated;
`;

const ItemName = styled.span`
  font-size: 8px;
  text-align: center;
  margin-top: 5px;
  color: black;
  text-transform: capitalize;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const BackButton = styled(Link)`
  background: #222;
  color: white;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 10px;
  font-family: 'Press Start 2P', cursive;
  margin-right: 15px;
  
  &:hover {
    background: #444;
  }
`;

const Title = styled.h2`
  font-size: 12px;
`;

const LoadingText = styled.div`
  text-align: center;
  margin-top: 20px;
  font-family: 'Press Start 2P', cursive;
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 300px;
  border: 4px solid #222;
  color: black;
  text-align: center;
`;

const ModalTitle = styled.h3`
  font-size: 14px;
  margin-bottom: 10px;
  text-transform: capitalize;
  font-family: 'Press Start 2P', cursive;
`;

const ModalImage = styled.img`
  width: 64px;
  height: 64px;
  image-rendering: pixelated;
  margin-bottom: 10px;
`;

const ModalDescription = styled.p`
  font-size: 12px;
  line-height: 1.5;
  color: #333;
`;

const CloseButton = styled.button`
  background: #DC0A2D;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 15px;
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  cursor: pointer;
  box-shadow: 0 4px 0 #8B0000;

  &:active {
    box-shadow: 0 2px 0 #8B0000;
    transform: translateY(2px);
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Button = styled.button`
  background-color: #222;
  color: white;
  border: 2px solid #555;
  padding: 5px 10px;
  font-family: 'Press Start 2P', cursive;
  font-size: 8px;
  cursor: pointer;
  border-radius: 5px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #444;
  }
`;

const ItemsList = () => {
  const location = useLocation();
  const { offset: startOffset = 0, limit: totalLimit = 160, title = 'Items' } = location.state || {};

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [offset, setOffset] = useState(startOffset);
  const { playSound } = useSound();
  const PAGE_SIZE = 20; // 4 columns * 5 rows

  useEffect(() => {
    setLoading(true);
    // Ensure we don't fetch past the generation limit
    const genEndOffset = startOffset + totalLimit;
    const remainingInGen = genEndOffset - offset;
    const fetchLimit = Math.min(PAGE_SIZE, remainingInGen);

    if (fetchLimit <= 0) {
      setItems([]);
      setLoading(false);
      return;
    }

    getItemsList(fetchLimit, offset).then(data => {
      setItems(data);
      setLoading(false);
    });
  }, [offset, startOffset, totalLimit]);

  const handleNext = () => {
    playSound('move');
    if (offset + PAGE_SIZE < startOffset + totalLimit) {
      setOffset(prev => prev + PAGE_SIZE);
    }
  };

  const handlePrev = () => {
    playSound('move');
    if (offset - PAGE_SIZE >= startOffset) {
      setOffset(prev => prev - PAGE_SIZE);
    }
  };

  return (
    <div>
      <Header>
        <BackButton to="/items" onClick={() => playSound('back')}>Atrás</BackButton>
        <Title>{title}</Title>
      </Header>

      {loading ? (
        <LoadingText>Cargando...</LoadingText>
      ) : (
        <>
          <ListContainer>
            {items.map(item => (
              <ItemCard key={item.originalName} onClick={() => { playSound('open'); setSelectedItem(item); }}>
                {item.sprite && <ItemImage src={item.sprite} alt={item.name} />}
                <ItemName>{item.name}</ItemName>
              </ItemCard>
            ))}
          </ListContainer>
          <Controls>
            <Button onClick={handlePrev} disabled={offset === 0}>Prev</Button>
            <Button onClick={handleNext} disabled={items.length < PAGE_SIZE}>Next</Button>
          </Controls>
        </>
      )}

      <AnimatePresence>
        {selectedItem && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { playSound('close'); setSelectedItem(null); }}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <ModalTitle>{selectedItem.name}</ModalTitle>
              {selectedItem.sprite && <ModalImage src={selectedItem.sprite} alt={selectedItem.name} />}
              <ModalDescription>
                {selectedItem.description}
              </ModalDescription>
              <CloseButton onClick={() => { playSound('close'); setSelectedItem(null); }}>
                Cerrar
              </CloseButton>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ItemsList;
