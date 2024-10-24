"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Grid from "@/components/Grid";
import { createWordSearch } from "@/utils/wordSearchGenerator"; // Import the grid generator function


interface WordMatchingGameBoardProps {
    gameData: {
      words: string[]; // Array of image URLs
      gridSize: number;
    };
    onGameEnd: () => void;
}


// const wordsToFind = ["WORD", "REACT", "PUZZLE"]; // Sample words
// const gridSize = 6; // Define grid size
type Direction = 'horizontal' | 'vertical' | 'diagonal';


const WordMatchingBoard: React.FC<WordMatchingGameBoardProps> = ({ gameData, onGameEnd }) => {
    const [initialGrid, setInitialGrid] = useState<string[][]>([]); // State to hold the grid data
    const initialGridRef = useRef<string[][]>([]);

    const [selectedIndices, setSelectedIndices] = useState<{ row: number; col: number }[]>([]);
    const [selectedWord, setSelectedWord] = useState<string>("");
    const [foundIndices, setFoundIndices] = useState<{ row: number; col: number }[]>([]);
    const [foundWords, setFoundWords] = useState<string[]>([]);
    const directionRef = useRef<Direction | null>(null); // Track selection direction
    const isSelecting = useRef(false);
    const gridRef = useRef<HTMLDivElement | null>(null);

    // Generate the grid when the component mounts
    useEffect(() => {
        const generatedGrid = createWordSearch(gameData.words, gameData.gridSize);
        setInitialGrid(generatedGrid);
        initialGridRef.current = generatedGrid;
    }, []);

    // Memoized event handlers to prevent unnecessary re-renders
    const startSelection = useCallback((row: number, col: number) => {
        const gridToUse = initialGridRef.current;
        if (!gridToUse || !gridToUse[row] || !gridToUse[row][col]) {
            console.warn("Grid is not initialized or indices are out of bounds.");
            return;
        }

        isSelecting.current = true;
        setSelectedIndices([{ row, col }]);
        setSelectedWord(gridToUse[row][col]);
        directionRef.current = null; // Reset direction at the start
    }, []);

    const continueSelection = useCallback((row: number, col: number) => {
        const gridToUse = initialGridRef.current;
        
        if (!isSelecting.current || foundIndices.some(index => index.row === row && index.col === col || selectedIndices.some(index => index.row === row && index.col === col))) {
            return; // Don't allow selection if not actively selecting or if already found
        }
        const lastIndex = selectedIndices[selectedIndices.length - 1];
        if ((selectedIndices.length > 0) && (lastIndex.row === row && lastIndex.col === col)) {
            return;
        }
        
        // Determine direction only when selecting the second element
        if (selectedIndices.length === 1) {
            const newDirection = determineDirection(lastIndex, { row, col });
            if (newDirection) {
                directionRef.current = newDirection; // Lock direction based on the second selection
            } else {
                return; // Invalid movement
            }
        }
    
        // Check if the current move follows the locked direction
        if (directionRef.current) {
            const newDirection = determineDirection(lastIndex, { row, col });
            if (directionRef.current !== newDirection) {
                return; // Disallow the selection if it does not follow the locked direction
            }
        }
        
        // Update selected indices and word if direction is correct
        setSelectedIndices(prev => [...prev, { row, col }]);
        setSelectedWord(prevWord => prevWord + gridToUse[row][col]);
    }, [selectedIndices, foundIndices]);

    const finishSelection = useCallback(() => {
        if (isSelecting.current) {
            checkWordMatch();
            isSelecting.current = false;
        }
    }, [selectedWord, selectedIndices]);

    const determineDirection = (start: { row: number; col: number }, end: { row: number; col: number }): Direction | null => {
        if (start.row === end.row) return 'horizontal'; // Left or right
        if (start.col === end.col) return 'vertical'; // Up or down
        if (Math.abs(start.row - end.row) === Math.abs(start.col - end.col)) return 'diagonal'; // Diagonal movement
        return null; // Invalid movement
    };

    const checkWordMatch = () => {
        if (gameData.words.includes(selectedWord)) {
            setFoundWords(prev => [...prev, selectedWord]);
            setFoundIndices(prev => [...prev, ...selectedIndices]);
        }
        setSelectedIndices([]); // Clear current selection
        setSelectedWord("");
        directionRef.current = null; // Reset the direction

        // Check if all words are found
        if (foundWords.length + 1 === gameData.words.length) {
            onGameEnd();
        }
    };

    // Add touch event listeners for touch support
    useEffect(() => {
        const element = gridRef.current;
        if (!element) return;

        const handleTouchStart = (e: TouchEvent) => {
            e.preventDefault();
            const target = e.target as HTMLElement;
            const row = target.getAttribute("data-row");
            const col = target.getAttribute("data-col");
            if (row !== null && col !== null) {
                startSelection(parseInt(row), parseInt(col));
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            const target = document.elementFromPoint(
                e.touches[0].clientX,
                e.touches[0].clientY
            ) as HTMLElement;
            if (target) {
                const row = target.getAttribute("data-row");
                const col = target.getAttribute("data-col");
                if (row !== null && col !== null) {
                    continueSelection(parseInt(row), parseInt(col));
                }
            }
        };

        const handleTouchEnd = () => {
            finishSelection();
        };

        element.addEventListener("touchstart", handleTouchStart, { passive: false });
        element.addEventListener("touchmove", handleTouchMove, { passive: false });
        element.addEventListener("touchend", handleTouchEnd);

        return () => {
            element.removeEventListener("touchstart", handleTouchStart);
            element.removeEventListener("touchmove", handleTouchMove);
            element.removeEventListener("touchend", handleTouchEnd);
        };
    }, [startSelection, continueSelection, finishSelection]);

    return (
        <div
            ref={gridRef}
            onMouseUp={finishSelection}
            style={{ userSelect: "none", display: "inline-block"}}
        >
            {initialGrid.length > 0 ? (
                <Grid
                    grid={initialGrid}
                    selectedIndices={[...selectedIndices, ...foundIndices]}
                    handleMouseDown={(row, col) => startSelection(row, col)}
                    handleMouseEnter={(row, col) => continueSelection(row, col)}
                />
            ) : (
                <p>Loading grid...</p>
            )}
            <div className="words-list">
                <h3>Words to Find:</h3>
                <ul>
                    {gameData.words.map((word) => (
                        <div
                            key={word}
                            className={`p-4 rounded-lg shadow-lg ${
                                foundWords.includes(word) ? "bg-green-200" : "bg-gray-100"
                            }`}
                            style={{
                                textDecoration: foundWords.includes(word) ? "line-through" : "none",
                                color: foundWords.includes(word) ? "green" : "black",
                            }}
                        >
                            {word}
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WordMatchingBoard;
