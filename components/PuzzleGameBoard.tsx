"use client";

import React, { useState, useCallback, useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import PuzzleGrid from "./PuzzleGrid";
import Pile from "./Pile";
import { Howl } from "howler";

interface PuzzlePiece {
  image_link: string;
  id: number;
}

interface PuzzleGameBoardProps {
  gameData: {
    pieces: PuzzlePiece[];
    gridSize: number;
  };
  onGameEnd: () => void;
}

const dropSound = new Howl({ src: ["/sounds/success.mp3"] });

const PuzzleGameBoard: React.FC<PuzzleGameBoardProps> = ({ gameData, onGameEnd }) => {
  // Initialize the grid with null values
  const initialGrid = Array.from({ length: gameData.gridSize }, () =>
    Array(gameData.gridSize).fill(null)
  );
  const [grid, setGrid] = useState<Array<Array<{ id: number; image_link: string } | null>>>(
    initialGrid
  );

  const initialPuzzleItems = [...gameData.pieces];

  // Initial pile of puzzle pieces
  const [pile, setPile] = useState(initialPuzzleItems);

  // Message to show whether the puzzle is correct or incorrect
  const [message, setMessage] = useState<string>("");

  // Check if all grid cells are filled
  const isGridFilled = () => {
    return grid.every((row) => row.every((cell) => cell !== null));
  };

  // Check if the grid arrangement is correct
  const checkPuzzleCorrectness = () => {
    const flatGrid = grid.flat();
    for (let i = 0; i < gameData.pieces.length; i++) {
      if (!flatGrid[i] || flatGrid[i]?.id !== gameData.pieces[i].id) {
        return false;
      }
    }
    return true;
  };

  // Handle dragging end logic
  const handleOnDragEnd = useCallback(
    (result: DropResult) => {
      console.log("here");
      const { source, destination } = result;

      // If no destination, exit
      if (!destination) return;

      // Handle dragging between grid cells
      if (source.droppableId.startsWith("grid") && destination.droppableId.startsWith("grid")) {
        const [sourceRow, sourceCol] = source.droppableId.split("-").slice(1).map(Number);
        const [destRow, destCol] = destination.droppableId.split("-").slice(1).map(Number);

        setGrid((prevGrid) => {
          const updatedGrid = prevGrid.map((row) => [...row]);
          const movedPiece = updatedGrid[sourceRow][sourceCol];

          // If there is a piece in the destination cell, move it back to the pile
          const pieceInDestCell = updatedGrid[destRow][destCol];
          if (pieceInDestCell) {
            setPile((prevPile) => [...prevPile, pieceInDestCell]);
          }

          // Move the piece to the destination and clear the source
          updatedGrid[sourceRow][sourceCol] = null;
          updatedGrid[destRow][destCol] = movedPiece;

          dropSound.play();

          return updatedGrid;
        });
        return;
      }

      // If dragging from grid back to pile
      if (destination.droppableId === "pile" && source.droppableId.startsWith("grid")) {
        const [sourceRow, sourceCol] = source.droppableId.split("-").slice(1).map(Number);
        const pieceToReturn = grid[sourceRow][sourceCol];

        if (pieceToReturn) {
          dropSound.play();
          setGrid((prevGrid) => {
            const updatedGrid = prevGrid.map((row) => [...row]);
            updatedGrid[sourceRow][sourceCol] = null;
            return updatedGrid;
          });

          // Add the piece back to the pile
          setPile((prevPile) => [...prevPile, pieceToReturn]);
        }
        return;
      }

      // If dragging from pile to grid
      if (destination.droppableId.startsWith("grid") && source.droppableId === "pile") {
        const [destRow, destCol] = destination.droppableId.split("-").slice(1).map(Number);
        const movedPiece = pile.find((item) => item.id.toString() === result.draggableId);

        if (!movedPiece) return;

        setGrid((prevGrid) => {
          const updatedGrid = prevGrid.map((row) => [...row]);
          const currentPieceInGrid = prevGrid[destRow][destCol];

          // If there is already a piece in the grid cell, return it to the pile
          if (currentPieceInGrid) {
            setPile((prevPile) => [...prevPile, currentPieceInGrid]);
          }

          // Place the new piece in the grid cell
          updatedGrid[destRow][destCol] = movedPiece;
          return updatedGrid;
        });
        dropSound.play();
        // Remove the new piece from the pile
        setPile((prevPile) => prevPile.filter((item) => item.id.toString() !== result.draggableId));
      }
    },
    [pile, grid]
  );

  // Use effect to check if puzzle is correct when grid is filled
  useEffect(() => {
    if (isGridFilled()) {
      if (checkPuzzleCorrectness()) {
        setMessage("Correct Puzzle");
        onGameEnd();
      } else {
        setMessage("Incorrect Puzzle");
      }
    } else {
      setMessage(""); // Reset message if grid is not filled
    }
  }, [grid, onGameEnd]);

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="flex flex-col items-center">
        <PuzzleGrid grid={grid} />
        <div className="flex flex-col mt-3">
          <Pile pile={pile} />
        </div>
        {message && (
          <div className="mt-4 p-4 bg-blue-500 text-white font-bold rounded">
            {message}
          </div>
        )}
      </div>
    </DragDropContext>
  );
};

export default PuzzleGameBoard;
