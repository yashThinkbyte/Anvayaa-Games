import React from "react";

type ImageGridProps = {
  elements: string[];
  handleClick?: (element: string, index: number) => void;
  placeholder?: boolean;
  gridSize?: string;
};

const ImageGrid: React.FC<ImageGridProps> = ({
  elements,
  handleClick,
  placeholder = false,
  gridSize = "w-16 h-16", 
}) => {
  return (
    <div className="grid grid-cols-3 gap-2 justify-center"> 
      {elements.map((element, index) => (
        <div
          key={index}
          className={`border text-center cursor-pointer flex items-center justify-center ${gridSize} ${
            placeholder && element === "" ? "bg-transparent" : "bg-transparent"
          }`}
          onClick={() => handleClick && handleClick(element, index)}
        >
          {placeholder && element === "" ? " " : <img src={element}></img>}
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
