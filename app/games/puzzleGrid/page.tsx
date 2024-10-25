"use client";
import React, { useState} from "react";
import PuzzleGameBoard from "@/components/PuzzleGameBoard";

const PuzzleGrid: React.FC = () => {

  return (
    <div className="app-container">
          <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden">
            <h1 className="text-center mb-4">Puzzle Grid Game</h1>
            <div className="flex-1 flex items-center justify-center w-full max-h-full overflow-hidden">
              <PuzzleGameBoard />
            </div>
          </div>
    </div>
  );
};

export default PuzzleGrid;
