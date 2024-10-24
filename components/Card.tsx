// components/Card.tsx
import { motion } from 'framer-motion';
import { Howl } from 'howler';
import React from 'react';
import { useGameStore } from '@/hooks/useGameStore';
import { Card as CardType } from '@/types/types'; // Import the shared Card interface

interface CardProps {
  card: CardType; // Use the shared Card interface
  baseImage: string;
}

const flipSound = new Howl({ src: ['/sounds/flip.mp3'] });

const Card: React.FC<CardProps> = ({ card, baseImage}) => {
  const { flipCard } = useGameStore();

  const handleClick = () => {
    // if (!card.matched) {
      if (!card.flipped ) {
        flipSound.play();
        flipCard(card.id);
      } 
  };

  return (
    <motion.div
      className="w-24 h-32 cursor-pointer"
      onClick={handleClick}
      animate={{ rotateY: card.flipped ? 180 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`card ${card.flipped ? 'card-front' : 'card-back'}`}>
        {card.flipped ? (
          <img src={card.image} alt="Card" />
        ) : (
          <img src={baseImage} alt="Card" />
        )}
      </div>
    </motion.div>
  );
};

export default Card;
