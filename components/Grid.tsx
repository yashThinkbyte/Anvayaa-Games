import React, { useCallback } from "react";
import GridCell from "@/components/GridCell";

interface GridProps {
    grid: string[][];
    selectedIndices: { row: number; col: number }[];
    handleMouseDown?: (row: number, col: number) => void;
    handleMouseEnter?: (row: number, col: number) => void;
    handleMouseUp?: () => void;
}

const Grid: React.FC<GridProps> = ({
    grid,
    selectedIndices,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
}) => {
    const gridSize = grid.length;

    // Function to check if a cell is selected
    const isSelected = useCallback(
        (row: number, col: number) =>
            selectedIndices.some((index) => index.row === row && index.col === col),
        [selectedIndices]
    );

    return (
        <div
            className="grid gap-1 max-w-screen-sm"
            style={{
                gridTemplateColumns: `repeat(${gridSize}, minmax(35px, 50px))`,
                userSelect: "none", // Prevent text selection
            }}
            onMouseUp={handleMouseUp} // Handle mouse up events at the grid level
        >
            {grid.map((row, rowIndex) =>
                row.map((letter, colIndex) => (
                    <GridCell
                        key={`${rowIndex}-${colIndex}`}
                        letter={letter}
                        rowIndex={rowIndex}
                        colIndex={colIndex}
                        selected={isSelected(rowIndex, colIndex)}
                        handleMouseDown={handleMouseDown}
                        handleMouseEnter={handleMouseEnter}
                    />
                ))
            )}
        </div>
    );
};

// Use React.memo to avoid unnecessary re-renders
export default React.memo(Grid);
