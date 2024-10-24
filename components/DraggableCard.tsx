import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { ChevronUp, ChevronDown } from "lucide-react";

interface SequenceItem {
  image_link?: string;
  title?: string;
  subtitle?: string;
  order: number;
}

interface DraggableCardProps {
  id: string;
  item?: SequenceItem | null;
  name?: string | null;
  index: number;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  showButtons?: boolean;
}

const DraggableCard: React.FC<DraggableCardProps> = ({
  id,
  item,
  index,
  name,
  onMoveUp,
  onMoveDown,
  showButtons = false,
}) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            p-4 mb-3 
            bg-white border-2 border-blue-100
            rounded-lg shadow-sm
            hover:shadow-md hover:border-blue-200
            ${snapshot.isDragging ? "rotate-1 shadow-lg !border-blue-300" : ""}
            flex items-center justify-between
          `}
        >
          <div className="flex items-center gap-4 flex-1">
              {item && item.image_link && (
                <img
                  src={item.image_link}
                  alt={item.title || item.subtitle || "Sequence item"}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              )}
              <div className="flex flex-col">
                {item && item.title && (
                  <span className="text-gray-900 font-medium">{item.title}</span>
                )}
                {item && item.subtitle && (
                  <span className="text-gray-600 text-sm">{item.subtitle}</span>
                )}
                {item && !item.title && !item.subtitle && (
                  <span className="text-gray-500">{item.order}</span>
                )}
                {name && (
                  <span className="text-gray-500">{name}</span>
                )}
            </div>
          </div>
          {showButtons && (
            <div className="flex gap-1 ml-2">
              <button
                onClick={onMoveUp}
                className="p-1 rounded-full text-gray-800 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <ChevronUp size={20} />
              </button>
              <button
                onClick={onMoveDown}
                className="p-1 rounded-full text-gray-800 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <ChevronDown size={20} />
              </button>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableCard;