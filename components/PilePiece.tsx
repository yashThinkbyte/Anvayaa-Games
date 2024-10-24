import React from "react";
import { Draggable } from "react-beautiful-dnd";

interface PilePieceProps {
  piece: { id: string; name: string };
  index: number;
}

const PilePiece: React.FC<PilePieceProps> = ({ piece, index }) => (
  <Draggable draggableId={piece.id} index={index}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="w-24 h-24 border rounded flex items-center justify-center"
      >
        {piece.name}
      </div>
    )}
  </Draggable>
);

export default PilePiece;
