// components/AllGameTypesBoard.tsx
import React, { useEffect, useState } from 'react';
import GameCard from '@/components/endGame/GameCard';
import { fetchGameTypes } from "@/services/gameAPI";

interface Game {
  id: number;
  name: string;
}

interface AllGameTypesProps {
    loadNewGame: (gameID: number) => void;
}

const AllGameTypesBoard: React.FC <AllGameTypesProps> = ({loadNewGame}) => {
  const [games, setGames] = useState<Game[]>([]);

  const openNewGame = async () => {
    try {
      // Start loading or any other state changes
      console.log("Starting a new game...");

      // Fetch game types or perform other asynchronous actions
      const data = await fetchGameTypes();
      console.log(data);
      setGames(data); // Set the fetched game types

      // For now, just log the data
      console.log("Fetched game types:", data);
    } catch (error) {
      console.error("Error fetching game data:", error);
    }
  };

  // Call openNewGame on component load using useEffect
  useEffect(() => {
    openNewGame();
  }, []); // The empty dependency array ensures it runs only once when the component mounts

  const handleCardClick = (gameId: number) => {
    // Navigate to the game page with the selected game ID
    loadNewGame(gameId);
  };

  return (
    <div className="flex flex-wrap gap-4 p-8">
      {games.length > 0 ? (
        games.map((game) => (
          <GameCard
            key={game.id}
            name={game.name}
            onClick={() => handleCardClick(game.id)}
          />
        ))
      ) : (
        <p>Loading games...</p>
      )}
    </div>
  );
};

export default AllGameTypesBoard;
