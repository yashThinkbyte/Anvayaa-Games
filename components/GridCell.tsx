import React from "react";

interface GridCellProps {
    letter: string;
    rowIndex: number;
    colIndex: number;
    selected: boolean;
    handleMouseDown?: (row: number, col: number) => void;
    handleMouseEnter?: (row: number, col: number) => void;
}

const GridCell: React.FC<GridCellProps> = ({
    letter,
    rowIndex,
    colIndex,
    selected,
    handleMouseDown,
    handleMouseEnter,
}) => {
    return (
        <div
            data-row={rowIndex}
            data-col={colIndex}
            onMouseDown={() => handleMouseDown?.(rowIndex, colIndex)}
            onMouseEnter={() => handleMouseEnter?.(rowIndex, colIndex)}
            className={`h-10 w-10 flex items-center justify-center border rounded cursor-pointer
                ${selected ? "bg-sky-700 text-white" : "bg-gray-200 text-black"}`}
        >
            {letter}
        </div>
    );
};

// Use React.memo to prevent re-renders if props are unchanged
export default React.memo(GridCell);
