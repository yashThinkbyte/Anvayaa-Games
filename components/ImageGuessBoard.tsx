"use client";

import React, { useEffect, useState } from "react";
import { Howl } from "howler";
import ImageGrid from "./ImageGrid";

// Helper function to generate a random character (A-Z)
const getRandomCharacter = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return characters[Math.floor(Math.random() * characters.length)];
};

const ImageGuessGameBoard: React.FC = () => {
  const correctWord = "HELLO"; 
  const wordLength = correctWord.length;

  // Initialize guessedCharacters with empty slots for the length of the word
  const [guessedCharacters, setGuessedCharacters] = useState<string[]>(
    Array(wordLength).fill("")
  );

  const pieces = [
    { id: "1", name: "Piece 1" },
    { id: "2", name: "Piece 2" },
    { id: "3", name: "Piece 3" },
    { id: "4", name: "Piece 4" },
    { id: "5", name: "Piece 5" },
    { id: "6", name: "Piece 6" },
  ];

  // State to hold shuffled pieces, shuffled only on the client
  const [shuffledPieces, setShuffledPieces] = useState(pieces);

  // Sound for character selection and correct word guess
  const clickSound = new Howl({
    src: ["/sounds/fail.mp3"], // Add path to the click sound
  });
  
  const successSound = new Howl({
    src: ["/sounds/success.mp3"], // Add path to the success sound
  });

  // Character grid with correct word and random letters
  const [characterGrid, setCharacterGrid] = useState<string[]>([]);

  useEffect(() => {
    // Shuffle pieces only on the client
    setShuffledPieces([...pieces].sort(() => Math.random() - 0.5));

    // Create the character grid with the correct word and random characters
    const generateCharacterGrid = () => {
      const randomCharacters = [];
      const gridSize = 9; // You can adjust this to fit the size you need
      
      // Add random characters to fill the grid
      for (let i = 0; i < gridSize - wordLength; i++) {
        randomCharacters.push(getRandomCharacter());
      }

      // Combine correct word characters and random characters
      const combinedGrid = [...correctWord.split(""), ...randomCharacters];

      // Shuffle the combined grid to randomize the placement of the correct letters
      return combinedGrid.sort(() => Math.random() - 0.5);
    };

    // Set the generated grid
    setCharacterGrid(generateCharacterGrid());

  }, []); // Empty dependency array ensures it runs only after the initial render

  // Handle character selection
  const handleCharacterClick = (char: string, index: number) => {
    const nextEmptyIndex = guessedCharacters.indexOf(""); // Find the next empty spot in the answer grid
    if (nextEmptyIndex !== -1) {
      const updatedGuessedCharacters = [...guessedCharacters];
      updatedGuessedCharacters[nextEmptyIndex] = char;
      setGuessedCharacters(updatedGuessedCharacters);

      // Play click sound
      clickSound.play(); // Play sound on character click

      // Remove the clicked character from the character grid
      const updatedCharacterGrid = [...characterGrid];
      updatedCharacterGrid[index] = "";
      setCharacterGrid(updatedCharacterGrid);

      // Check if the guessed word is correct
      const guessedWord = updatedGuessedCharacters.join("");
      if (guessedWord === correctWord) {
        setIsWordGuessed(true);
        successSound.play(); // Play success sound when the word is guessed correctly
      }
    }
  };

  // State to track if the word is guessed correctly
  const [isWordGuessed, setIsWordGuessed] = useState(false);

  const reorderedPieces = isWordGuessed ? pieces : shuffledPieces;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-xl mb-4">Image Guess Game</h1>

      {/* Display pieces - larger grid */}
      <div className="my-4">
        <ImageGrid
          elements={reorderedPieces.map((piece) => piece.name)}
          gridSize="w-24 h-24" 
        />
      </div>

      {/* Display guessed letters */}
      <div className="my-4">
        <ImageGrid elements={guessedCharacters} placeholder={true} gridSize="w-16 h-16" />
      </div>

      {/* Character grid for selection - smaller grid */}
      <div className="my-4">
        <ImageGrid
          elements={characterGrid}
          handleClick={handleCharacterClick}
          gridSize="w-12 h-12" 
        />
      </div>
    </div>
  );
};

export default ImageGuessGameBoard;
