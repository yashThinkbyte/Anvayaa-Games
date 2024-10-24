import React from 'react';
import {
  Droppable as RBDDroppable,
  DroppableProvided,
  DroppableStateSnapshot,
  DroppableProps,
} from 'react-beautiful-dnd';

const Droppable: React.FC<Omit<DroppableProps, 'children'> & {
  children: (provided: DroppableProvided, snapshot: DroppableStateSnapshot) => React.ReactNode;
}> = ({
  droppableId = 'default-id',
  direction = 'vertical',
  isDropDisabled = false,
  children,
  ...rest
}) => {
  return (
    <RBDDroppable
      droppableId={droppableId}
      direction={direction}
      isDropDisabled={isDropDisabled}
      {...rest}
    >
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {children(provided, snapshot)} {/* Passing both provided and snapshot */}
          {provided.placeholder}
        </div>
      )}
    </RBDDroppable>
  );
};

export default Droppable;
