import React from "react";
import DraggableCard from "./DraggableCard"; // Import your DraggableCard component
import { Droppable } from "react-beautiful-dnd"; // Only import Droppable

interface PuzzleGridProps {
  grid: Array<Array<{ id: string; name: string } | null>>;
}

const PuzzleGrid: React.FC<PuzzleGridProps> = ({ grid }) => (
  <div className="grid grid-cols-3 gap-2">
    {grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Droppable key={`grid-${rowIndex}-${colIndex}`} droppableId={`grid-${rowIndex}-${colIndex}`}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="w-20 h-20 border rounded shadow flex items-center justify-center"
            >
              {cell ? (
                <DraggableCard id={cell.id} name={cell.name} index={colIndex} />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-black">
                  ?
                </div> 
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))
    )}
  </div>
);

export default PuzzleGrid;
