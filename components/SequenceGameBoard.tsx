import React, { useState, useEffect, useCallback } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Howl } from "howler";
import DraggableCard from "./DraggableCard";
import DropZone from "./DropZone";
import { shuffleArray } from "@/utils/shuffleCards";

interface SequenceItem {
  image_link?: string;
  title?: string;
  subtitle?: string;
  order: number;
}

interface SequenceGameBoardProps {
  gameData: {
    sequences: SequenceItem[];
  };
  onGameEnd: () => void;
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const SequenceGameBoard: React.FC<SequenceGameBoardProps> = ({ gameData, onGameEnd }) => {
  const dragSound = new Howl({ src: ["/sounds/flip.mp3"] });
  const successSound = new Howl({ src: ["/sounds/success.mp3"] });

  const [cards, setCards] = useState<SequenceItem[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    setCards(shuffleArray(gameData.sequences));
    const timer = setInterval(() => {
      if (!isGameOver) {
        setTimeElapsed((prev) => prev + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [gameData.sequences, isGameOver]);

  useEffect(() => {
    const isCorrect = cards.every((card, index) => {
      const correctCard = gameData.sequences.find((item) => item.order === index + 1);
      return card.order === correctCard?.order;
    });
    if (isCorrect) {
      successSound.play();
      setIsGameOver(true);
      onGameEnd();
    }
  }, [cards, gameData.sequences, successSound, onGameEnd]);

  const handleOnDragEnd = useCallback((result: DropResult) => {
    const { source, destination } = result;
    if (!destination || source.index === destination.index) return;
    const updatedCards = Array.from(cards);
    const [movedCard] = updatedCards.splice(source.index, 1);
    updatedCards.splice(destination.index, 0, movedCard);
    setCards(updatedCards);
    setMoveCount((prev) => prev + 1);
    dragSound.play();
  }, [cards, dragSound]);

  const resetGame = () => {
    setCards(shuffleArray([...gameData.sequences]));
    setIsGameOver(false);
    setMoveCount(0);
    setTimeElapsed(0);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="flex flex-col max-w-xl w-full mx-auto px-4">
        <div className="w-full mb-1 flex justify-between">
          <div className="stat bg-blue-50 rounded-lg p-2">
            <span className="text-sm text-blue-700 font-medium">Time: </span>
            <span className="text-blue-900 font-bold">
              {formatTime(timeElapsed)}
            </span>
          </div>
          <div className="stat bg-green-50 rounded-lg p-2">
            <span className="text-sm text-green-700 font-medium">Moves: </span>
            <span className="text-green-900 font-bold">{moveCount}</span>
          </div>
        </div>
        <div className="w-full">
          <DropZone id="vertical-droppable" items={cards}>
            {cards.map((card, index) => (
              <DraggableCard
                key={card.order}
                id={card.order.toString()}
                item={card}
                index={index}
              />
            ))}
          </DropZone>
        </div>
      </div>
    </DragDropContext>
  );
};

export default SequenceGameBoard;
