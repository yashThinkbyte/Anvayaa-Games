// ImagePanel.tsx
import React, { forwardRef } from "react";
import DifferenceMarker from "./DifferenceMarker";

interface ImageDimensions {
  width: number;
  height: number;
}

interface ImagePanelProps {
  image: string;
  onImageClick?: (x: number, y: number) => void;
  foundDifferences?: number[];
  differences?: { id: number; x: number; y: number; radius: number }[];
  imageDimensions?: ImageDimensions;
}

const ImagePanel = forwardRef<HTMLImageElement, ImagePanelProps>(
  (
    {
      image,
      onImageClick,
      foundDifferences = [],
      differences = [],
      imageDimensions,
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent) => {
      const rect = (e.target as HTMLImageElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (onImageClick) {
        onImageClick(x, y);
      }
    };

    return (
      <div className="image-panel relative">
        <img
          ref={ref}
          src={image}
          alt="Spot the Difference"
          className="game-image w-full h-auto"
          onClick={handleClick}
        />
        {foundDifferences.map((id) => {
          const diff = differences.find((d) => d.id === id);
          return diff ? (
            <DifferenceMarker
              key={id}
              x={diff.x}
              y={diff.y}
              radius={diff.radius}
              containerWidth={imageDimensions?.width || 0}
              containerHeight={imageDimensions?.height || 0}
            />
          ) : null;
        })}
      </div>
    );
  }
);

ImagePanel.displayName = "ImagePanel";

export default ImagePanel;
