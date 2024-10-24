import React from "react";
import Droppable from "./Droppable";

interface SequenceItem {
  image_link?: string;
  title?: string;
  subtitle?: string;
  order: number;
}

interface DropZoneProps {
  id: string;
  items: SequenceItem[];
  children: React.ReactNode;
}

const DropZone: React.FC<DropZoneProps> = ({ id, items, children }) => {
  return (
    <div className="w-full">
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="w-full bg-gray-50 p-6 rounded-xl border-2 border-dashed border-gray-200"
          >
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DropZone;
