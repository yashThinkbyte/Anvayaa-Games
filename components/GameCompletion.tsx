import React from "react";

interface GameCompletionProps {
  timeTaken: string;
  result: string;
  onNewGame: () => void;
  onContinue: () => void;
}

const GameCompletion: React.FC<GameCompletionProps> = ({
  timeTaken,
  result,
  onNewGame,
  onContinue,
}) => {
  const handleContinue = () => {
    onContinue();
  };

  const openNewGame = async () => {
    onNewGame();
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-100 shadow-lg rounded-lg">
      <div className="text-center space-y-6 bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-green-600 animate-bounce">
          🎉 Congratulations! 🎉
        </h1>
        <div className="space-y-4">
          <div className="stats flex justify-center gap-8">
            <div className="stat p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-700">Time</h3>
              <p className="text-2xl font-bold text-blue-900">
                {timeTaken || "0"}
              </p>
            </div>
            <div className="stat p-4 bg-green-50 rounded-lg">
              <h3 className="text-lg font-semibold text-green-700">Moves</h3>
              <p className="text-2xl font-bold text-green-900">
                {result || "0"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex m-2">
        <button
          onClick={handleContinue}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300 m-1"
        >
          Continue
        </button>
        <button
          onClick={openNewGame}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300 m-1"
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default GameCompletion;
