import React, { useState, useEffect } from "react";
import { fetchGameData } from "@/services/gameAPI"; // Import the structured API function

interface GameLoadingProps {
  gameID: number;
  backgroundColor: string;
  gameNameStyle: React.CSSProperties;
  onDataLoaded: (data: any) => void; // New prop for passing game data back to the parent
}

const GameLoading: React.FC<GameLoadingProps> = ({
  gameID,
  backgroundColor,
  gameNameStyle,
  onDataLoaded,
}) => {
  const [progress, setProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);
  
  useEffect(() => {
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const loadGameData = async () => {
      try {
        // Step 1: Start loading
        
        setProgress(20);
        
        const data = await fetchGameData(gameID);

        
        setProgress(70);
        await delay(1000);
        
        setProgress(100);
        await delay(1000);
        setLoadingComplete(true);
        // Pass the fetched data to the parent component
        onDataLoaded(data);
      } catch (error) {
        setLoadingComplete(true);
        console.error("Error fetching game data:", error);
      }
    };

    loadGameData();
  }, [gameID]);

  return (
    <div
      className="flex flex-col justify-center items-center h-screen"
      style={{ backgroundColor }}
    >
      <h1 style={gameNameStyle} className="mt-4 text-2xl font-bold">
        {gameID}
      </h1>

      {progress <= 100 && !loadingComplete && (
        <>
          <div className="w-[60vw] max-w-lg h-2 mt-8 bg-gray-300 rounded-full m-4">
            <div
              className="h-full bg-sky-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="mt-2 text-lg font-semibold">{progress}%</p>
        </>
      )}

      {progress < 100 && loadingComplete && (
        <button
          className="mt-8 px-6 py-2 rounded-full bg-sky-600 text-white font-bold hover:bg-sky-700"
        >
          Failed to load Game
        </button>
      )}
    </div>
  );
};

export default GameLoading;
