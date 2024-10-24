import React, { useState, useEffect } from "react";
import DraggableCard from "./DraggableCard";
import { Droppable } from "react-beautiful-dnd";

interface PileProps {
  pile: Array<{ id: string; name: string }>;
}

const Pile: React.FC<PileProps> = ({ pile }) => {
  const [shuffledPile, setShuffledPile] = useState<Array<{ id: string; name: string }>>([]);

  // Fisher-Yates shuffle algorithm to randomize the pile
  const shuffleArray = (array: Array<{ id: string; name: string }>) => {
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
    <Droppable droppableId="pile">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="pile-container border p-2 grid grid-cols-3 gap-2 min-h-20 min-w-60"
        >
          {shuffledPile.map((item, index) => (
            <DraggableCard key={item.id} id={item.id} name={item.name} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Pile;
