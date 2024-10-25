import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

interface PuzzleGridProps {
  grid: Array<Array<{ id: number; image_link: string } | null>>;
}

const PuzzleGrid: React.FC<PuzzleGridProps> = ({ grid }) => (
  <div
    className={`grid gap-2`}
    style={{
      gridTemplateColumns: `repeat(${grid.length}, minmax(0, 1fr))`, // Set columns based on grid size
    }}
  >
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
                <Draggable
                  key={cell.id.toString()}
                  draggableId={cell.id.toString()}
                  index={rowIndex * grid.length + colIndex}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`w-full h-full flex items-center justify-center ${
                        snapshot.isDragging ? "bg-blue-100" : "bg-white"
                      }`}
                    >
                      <img
                        src={cell.image_link}
                        alt="Puzzle piece"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </Draggable>
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
