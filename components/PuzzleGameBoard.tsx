"use client";

import React, { useState, useCallback, useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import PuzzleGrid from "./PuzzleGrid";
import Pile from "./Pile";
import {Howl} from 'howler'

// Correct order of puzzle pieces for validation
const correctOrder = [
  { id: "1", name: "Piece 1" },
  { id: "2", name: "Piece 2" },
  { id: "3", name: "Piece 3" },
  { id: "4", name: "Piece 4" },
  { id: "5", name: "Piece 5" },
  { id: "6", name: "Piece 6" },
  { id: "7", name: "Piece 7" },
  { id: "8", name: "Piece 8" },
  { id: "9", name: "Piece 9" },
];
const dropSound = new Howl({ src: ['/sounds/success.mp3'] });
const initialPuzzleItems = [...correctOrder];

const PuzzleGameBoard: React.FC = () => {
  // Grid state
  const [grid, setGrid] = useState<Array<Array<{ id: string; name: string } | null>>>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

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
    for (let i = 0; i < correctOrder.length; i++) {
      if (!flatGrid[i] || flatGrid[i]?.id !== correctOrder[i].id) {
        return false;
      }
    }
    return true;
  };

  // Handle dragging end logic
  const handleOnDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination } = result;

      // If no destination, exit
      if (!destination) return;

      // Handle dragging between grid cells
      if (source.droppableId.startsWith("grid") && destination.droppableId.startsWith("grid")) {
        const [sourceRow, sourceCol] = source.droppableId.split("-").slice(1).map(Number);
        const [destRow, destCol] = destination.droppableId.split("-").slice(1).map(Number);

        setGrid((prevGrid) => {
          const updatedGrid = [...prevGrid];
          const movedPiece = updatedGrid[sourceRow][sourceCol];

          // If there is a piece in the destination cell, move it back to the pile
          const pieceInDestCell = updatedGrid[destRow][destCol];
          if (pieceInDestCell) {
            setPile((prevPile) => [...prevPile, pieceInDestCell]);
          }

          // Move the piece to the destination and clear the source
          updatedGrid[sourceRow][sourceCol] = null;
          updatedGrid[destRow][destCol] = movedPiece;

          dropSound.play()

          return updatedGrid;
        });
        return;
      }

      // If dragging from grid back to pile
      if (destination.droppableId === "pile" && source.droppableId.startsWith("grid")) {
        const [sourceRow, sourceCol] = source.droppableId.split("-").slice(1).map(Number);
        const pieceToReturn = grid[sourceRow][sourceCol];

        if (pieceToReturn) {
          // Remove the piece from the grid and return it to the pile
          dropSound.play()
          setGrid((prevGrid) => {
            const updatedGrid = [...prevGrid];
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
        const movedPiece = pile.find((item) => item.id === result.draggableId);

        if (!movedPiece) return;

        setGrid((prevGrid) => {
          const updatedGrid = [...prevGrid];
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
        setPile((prevPile) => prevPile.filter((item) => item.id !== result.draggableId));
      }
    },
    [pile, grid]
  );

  // Use effect to check if puzzle is correct when grid is filled
  useEffect(() => {
    if (isGridFilled()) {
      if (checkPuzzleCorrectness()) {
        setMessage("Correct Puzzle");
      } else {
        setMessage("Incorrect Puzzle");
      }
    } else {
      setMessage(""); // Reset message if grid is not filled
    }
  }, [grid]);

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
