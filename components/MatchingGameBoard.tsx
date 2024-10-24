// components/MatchingGameBoard.tsx
"use client";

import React, { useEffect } from "react";
import { useGameStore } from "@/hooks/useGameStore";
import Card from "./Card";

interface MatchingGameBoardProps {
  gameData: {
    images: string[]; // Array of image URLs
    base_image: string;
  };
  onGameEnd: () => void;
}
const MatchingGameBoard: React.FC<MatchingGameBoardProps> = ({ gameData, onGameEnd }) => {
  const { cards, initializeGame, matchedCards } = useGameStore(); // Get state and actions from the store

  // Initialize the game when the component mounts
  useEffect(() => {
    initializeGame(gameData.images); // Set up the game with images from gameData
  }, [gameData, initializeGame]);

  // Check if all cards are matched
  useEffect(() => {
    if (matchedCards.length === 2*gameData.images.length) {
      onGameEnd(); // Trigger the end of the game
    }
  }, [matchedCards, gameData.images.length, onGameEnd]);

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.id} card={card} baseImage={gameData.base_image}/>
      ))}
    </div>
  );
};

export default MatchingGameBoard;