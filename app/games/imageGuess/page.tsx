"use client";
import React, { useState } from "react";
import GameLoading from "@/components/GameLoading";
import ImageGuessGameBoard from "@/components/ImageGuessBoard";

const ImageGuess: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const handleStartGame = () => {
    setIsLoading(false); 
  };
  

  return (
    <div className="app-container">
        <ImageGuessGameBoard />
    </div>
  );
};

export default ImageGuess;
