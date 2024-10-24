"use client";

import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import Droppable from "./Droppable";



interface MatchItem {
  image_link?: string;
  id?: number;
  name?: string;
}

interface MatchItemsBoardProps {
  gameData: {
    leftTitle: string;
    rightTitle: string;
    leftItems: MatchItem[];
    rightItems: MatchItem[];
  };
  onGameEnd: () => void;
}


const MatchItemsBoard: React.FC<MatchItemsBoardProps> = ({ gameData, onGameEnd }) => {
  const [rightDropBox, setRightDropBox] = useState(gameData.rightItems);

  // Handle drag-and-drop logic
  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const updatedRightBox = Array.from(rightDropBox);
    const [movedItem] = updatedRightBox.splice(source.index, 1);
    updatedRightBox.splice(destination.index, 0, movedItem);

    setRightDropBox(updatedRightBox);
  };

  const isMatched = (index: number) =>
    gameData.leftItems[index] && rightDropBox[index] && gameData.leftItems[index].id === rightDropBox[index].id;

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="flex h-screen p-8 space-x-8">
        <div className="w-1/2">
          <h2 className="text-center mb-4">{gameData.leftTitle}</h2>
          {gameData.leftItems.map((leftItem, index) => (
            <div key={`${leftItem.id}`} className="flex items-center mb-4">
              <span>{leftItem.name}</span>
              <div
                className={`ml-2 h-6 w-6 rounded-full ${
                  isMatched(index) ? "bg-green-500" : "bg-gray-500"
                }`}
              />
            </div>
          ))}
        </div>

        <div className="w-1/2">
          <h2 className="text-center mb-4">{gameData.rightTitle}</h2>
          {rightDropBox.map((item, index) => (
            <Droppable key={`droppable-${index}`} droppableId={`droppable-${index}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`w-full h-16 mb-2 border rounded flex items-center justify-center transition-all ${
                    snapshot.isDraggingOver ? "shadow-lg" : ""
                  }`}
                >
                  {item.id !== 0 ? (
                    <DraggableCard
                      key={`draggable-${item.id}`}
                      id={String(item.id)}
                      name={item.name}
                      index={index}
                    />
                  ) : (
                    <span>Empty</span>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default MatchItemsBoard;
