
"use client";
import React, { useState } from "react";
// import SequenceGameBoard from "@/components/SequenceGameBoard";

const GamePage = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const LandingContent = () => (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Daily Routine Sequence Game
        </h2>
        <div className="space-y-4 text-gray-600 mb-8">
          <p className="text-lg">
            Test your understanding of daily routines by arranging activities in
            the correct order!
          </p>
          <div className="text-left space-y-3">
            <h3 className="font-semibold text-xl text-gray-700">
              How to Play:
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Drag and drop the cards to arrange them in the correct sequence
              </li>
              <li>Use the arrow buttons to move cards up or down</li>
              <li>Put the daily activities in their natural order</li>
              <li>Complete the sequence correctly to win!</li>
            </ul>
          </div>
        </div>
        <button
          onClick={() => setGameStarted(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-full 
                   transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 
                   focus:ring-blue-400 focus:ring-opacity-50 text-lg"
        >
          Start Game
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 flex flex-col items-center bg-gray-100">
      {!gameStarted ? (
        <div className="flex-1 flex justify-center p-4">
          <LandingContent />
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mt-2 mb-3">Arrange them in order</h1>
          <div className="flex-1 flex justify-center">
            {/* <SequenceGameBoard /> */}
          </div>
        </>
      )}
    </div>
  );
};

export default GamePage;
