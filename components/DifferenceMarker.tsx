// DifferenceMarker.tsx
import React from "react";

interface DifferenceMarkerProps {
  x: number;
  y: number;
  radius: number;
  containerWidth: number;
  containerHeight: number;
}

const DifferenceMarker: React.FC<DifferenceMarkerProps> = ({
  x,
  y,
  radius,
  containerWidth,
  containerHeight,
}) => {
  // Convert percentage to actual pixels
  const pixelX = (x / 100) * containerWidth;
  const pixelY = (y / 100) * containerHeight;
  const pixelRadius =
    (radius / 100) * Math.min(containerWidth, containerHeight);

  return (
    <div
      className="difference-marker absolute border-2 border-red-500 rounded-full pointer-events-none"
      style={{
        left: `${pixelX}px`,
        top: `${pixelY}px`,
        width: `${pixelRadius * 2}px`,
        height: `${pixelRadius * 2}px`,
        transform: "translate(-50%, -50%)",
        zIndex: 10,
      }}
    />
  );
};

export default DifferenceMarker;
