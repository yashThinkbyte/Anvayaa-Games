import React from "react";
import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";

interface GridCellProps {
  id: string;
  piece: { id: string; name: string } | null;
  index: number;
}

interface SequenceItem {
  image_link?: string;
  title?: string;
  subtitle?: string;
  order: number;
}

const GridCell: React.FC<GridCellProps> = ({ id, piece, index }) => (
  <Droppable droppableId={id}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className="w-24 h-24 border flex items-center justify-center"
      >
        {piece ? <DraggableCard id={piece.id} name={piece.name} index={index}/> : <span>Empty</span>}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

export default GridCell;
