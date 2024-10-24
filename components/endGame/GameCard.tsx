// components/GameCard.tsx
import React from 'react';

interface GameCardProps {
  name: string;
  onClick: () => void; // Action when the card is clicked
}

const GameCard: React.FC<GameCardProps> = ({ name, onClick }) => {
  return (
    <div
      className="p-6 bg-white shadow-lg rounded-lg cursor-pointer hover:bg-blue-100 transition duration-300"
      onClick={onClick}
    >
      <h3 className="text-xl font-bold text-center">{name}</h3>
    </div>
  );
};

export default GameCard;
