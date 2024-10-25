import React, { useState, useEffect } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

interface PileProps {
  pile: Array<{ id: number; image_link: string }>;
}

const Pile: React.FC<PileProps> = ({ pile }) => {
  const [shuffledPile, setShuffledPile] = useState<Array<{ id: number; image_link: string }>>([]);

  // Fisher-Yates shuffle algorithm to randomize the pile
  const shuffleArray = (array: Array<{ id: number; image_link: string }>) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Shuffle the pile once when the component mounts
  useEffect(() => {
    setShuffledPile(shuffleArray(pile));
  }, [pile]);

  return (
    <Droppable droppableId="pile" direction="horizontal">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="pile-container border p-2 grid grid-cols-3 gap-2 min-h-20 min-w-60"
        >
          {shuffledPile.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`w-20 h-20 flex items-center justify-center ${
                    snapshot.isDragging ? "bg-blue-100" : "bg-white"
                  }`}
                >
                  <img
                    src={item.image_link}
                    alt={`Puzzle piece ${item.id}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Pile;
