'use client';

// pages/games/[gameId].tsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import GameLoading from '@/components/GameLoading';
import GameCompletion from '@/components/GameCompletion';
import AllGameTypesBoard from "@/components/endGame/AllGameTypes";

// Import specific game components
import WordMatchingBoard from '@/components/WordMatchingBoard';
import SequenceGameBoard from '@/components/SequenceGameBoard';
import SpotGame from '@/components/SpotGameBoard';
import MatchItemsBoard from '@/components/MatchItemsBoard';
import MatchingGameBoard from '@/components/MatchingGameBoard';
import ImageGuessGameBoard from '@/components/ImageGuessBoard';
import PuzzleGameBoard from '@/components/PuzzleGameBoard';

import { useRouter } from 'next/navigation';

// Mapping of game IDs to game components
const gameComponents: { [key: string]: React.FC<any> } = {
    1: SequenceGameBoard,
    2: SpotGame,
    3: WordMatchingBoard,
    4: MatchingGameBoard,
    5: MatchItemsBoard,
    6: PuzzleGameBoard,
    7: ImageGuessGameBoard,
    // Add other game components here, mapping the game ID to the component
};

const GamePage: React.FC = () => {
    const searchParams = useSearchParams();
    const gameId = searchParams.get('gameId');
    const [gameState, setGameState] = useState<'loading' | 'playing' | 'end' | 'newgame'>('loading');
    const [gameData, setGameData] = useState<Record<string, any> | null>(null); // Use Record<string, any> for the type
    const router = useRouter();

    // Get the corresponding game component from the mapping
    const GameComponent = gameId ? gameComponents[gameId] : null;

    const handleDataLoaded = (data: any) => {
        if (data.length > 0) {
            setGameData(data[0]['game_data']); // Update the game data when loaded
            setGameState('playing');
        }
    };

    const handleGameEnd = () => {
        setGameState('end');
    };

    const handleNewGame = () => {
        setGameState('newgame');
    };

    const continueGame = () => {
        setGameState('loading');
        router.refresh();
    };

    const newGame = (newGameID: number) => {
        router.push(`/games?gameId=${newGameID}`);
    };

    useEffect(() => {
        if (gameId) {
            setTimeout(() => {
                setGameData(null);
                setGameState('loading');
            }, 0);
        }
    }, [gameId]);

    if (!GameComponent) {
        return <div>Game not found</div>;
    }

    return (
        <div className="game-page">
            {gameState === 'loading' && (
                <GameLoading
                    gameID={Number(gameId)}
                    backgroundColor="#282c34"
                    gameNameStyle={{ color: "#ffffff", fontSize: "2rem", fontWeight: "bold" }}
                    onDataLoaded={handleDataLoaded}
                />
            )}
            
            {gameState === 'playing' && gameData && (
                <GameComponent
                    gameData={gameData} // Pass the game data to the relevant component
                    onGameEnd={handleGameEnd}
                />
            )}

            {gameState === 'end' && (
                <GameCompletion
                    timeTaken='12'
                    gameName='Some Game'
                    result='Success'
                    gameID={Number(gameId)}
                    onContinue={continueGame}
                    onNewGame={handleNewGame}
                />
            )}

            {gameState === 'newgame' && (
                <AllGameTypesBoard
                    loadNewGame={newGame}
                />
            )}
        </div>
    );
};

export default GamePage;
