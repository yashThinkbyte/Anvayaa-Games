"use client";

import React, { useEffect, useState } from "react";
import { Howl } from "howler";
import ImageGrid from "./ImageGrid";



interface ImagePiece {
  id: number;
  image_link: string;
}


interface ImageGuessBoardProps {
  gameData: {
    correct_word: string;
    image_pieces: ImagePiece[];
    puzzle_length: number;
  };
  onGameEnd: () => void;
}

// Helper function to generate a random character (A-Z)
const getRandomCharacter = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return characters[Math.floor(Math.random() * characters.length)];
};

const ImageGuessGameBoard: React.FC<ImageGuessBoardProps> = ({ gameData, onGameEnd }) => {
  const wordLength = gameData.correct_word.length;

  // Initialize guessedCharacters with empty slots for the length of the word
  const [guessedCharacters, setGuessedCharacters] = useState<string[]>(
    Array(wordLength).fill("")
  );


  // State to hold shuffled pieces, shuffled only on the client
  const [shuffledPieces, setShuffledPieces] = useState(gameData.image_pieces);

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
    setShuffledPieces([...gameData.image_pieces].sort(() => Math.random() - 0.5));

    // Create the character grid with the correct word and random characters
    const generateCharacterGrid = () => {
      const randomCharacters = [];
      const gridSize = gameData.puzzle_length; // You can adjust this to fit the size you need
      
      // Add random characters to fill the grid
      for (let i = 0; i < gridSize - wordLength; i++) {
        randomCharacters.push(getRandomCharacter());
      }

      // Combine correct word characters and random characters
      const combinedGrid = [...gameData.correct_word.split(""), ...randomCharacters];

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
      if (guessedWord === gameData.correct_word) {
        setIsWordGuessed(true);
        successSound.play(); // Play success sound when the word is guessed correctly
        onGameEnd();
      }
    }
  };

  // State to track if the word is guessed correctly
  const [isWordGuessed, setIsWordGuessed] = useState(false);

  const reorderedPieces = isWordGuessed ? gameData.image_pieces : shuffledPieces;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-xl mb-4">Image Guess Game</h1>

      {/* Display pieces - larger grid */}
      <div className="my-4">
        <ImageGrid
          elements={reorderedPieces.map((piece) => piece.image_link)}
          gridSize="w-24 h-24" 
        />
      </div>

      <div className="my-4">
          <div className="grid grid-cols-4 gap-2">
          {guessedCharacters.map((char, index) => (
            <div
              key={index}
              className={`flex items-center justify-center border rounded cursor-pointer w-12 h-12`}
            >
              {char}
            </div>
          ))}
        </div>
      </div>

      {/* Character grid for selection - smaller grid */}
      <div className="my-4">
          <div className="grid grid-cols-4 gap-2">
          {characterGrid.map((char, index) => (
            <div
              key={index}
              className={`flex items-center justify-center border rounded cursor-pointer w-12 h-12`}
              onClick={() => handleCharacterClick(char, index)}
            >
              {char}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGuessGameBoard;
