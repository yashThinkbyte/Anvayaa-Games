"use client";

import React, { useState, useEffect } from "react";
import { DragDropContext, DropResult, Droppable, Draggable } from "react-beautiful-dnd";

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
  const [rightDropBox, setRightDropBox] = useState<MatchItem[]>([]);

  // Shuffle array using Fisher-Yates algorithm
  const shuffleArray = (array: MatchItem[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Set initial shuffled state for rightDropBox
  useEffect(() => {
    setRightDropBox(shuffleArray(gameData.rightItems));
  }, [gameData.rightItems]);

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
        {/* Left Column */}
        <div className="w-1/2">
          <h2 className="text-center mb-4 text-xl font-bold">{gameData.leftTitle}</h2>
          <div className="space-y-4">
            {gameData.leftItems.map((leftItem, index) => (
              <div
                key={leftItem.id}
                className={`w-full h-16 border rounded flex items-center justify-between p-4 ${
                  isMatched(index) ? "bg-green-100" : "bg-white"
                }`}
              >
                <span className="text-lg">{leftItem.name}</span>
                <div
                  className={`h-6 w-6 rounded-full ${
                    isMatched(index) ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="w-1/2">
          <h2 className="text-center mb-4 text-xl font-bold">{gameData.rightTitle}</h2>
          <Droppable droppableId="rightColumn" direction="vertical">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-4"
              >
                {rightDropBox.map((item, index) => (
                  <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`w-full h-16 border rounded flex items-center justify-center ${
                          snapshot.isDragging ? "bg-blue-100 shadow-lg" : "bg-white"
                        }`}
                      >
                        <span className="text-lg">{item.name}</span>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};

export default MatchItemsBoard;
