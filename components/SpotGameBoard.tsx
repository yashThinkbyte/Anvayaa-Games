"use client";

import React, { useState, useEffect, useRef } from "react";
import ImagePanel from "./ImagePanel";
import HintButton from "./HintButton";

interface Difference {
  id: number;
  x: number;
  y: number;
  radius: number;
}

interface MatchingGameBoardProps {
  gameData: {
    original_image: string;
    duplicate_image: string;
    differences: Difference[];
  };
  onGameEnd: () => void;
}

interface ImageDimensions {
  width: number;
  height: number;
}

const SpotGame: React.FC<MatchingGameBoardProps> = ({ gameData, onGameEnd }) => {
  const [foundDifferences, setFoundDifferences] = useState<number[]>([]);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions>({
    width: 0,
    height: 0,
  });
  const [originalDimensions, setOriginalDimensions] = useState<ImageDimensions>({
    width: 0,
    height: 0,
  });
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (foundDifferences.length === gameData.differences.length) {
      onGameEnd();
    }
  }, [foundDifferences, gameData.differences.length, onGameEnd]);

  useEffect(() => {
    const loadImage = (url: string) => {
      return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = (error) => reject(error);
      });
    };

    const updateDimensions = async () => {
      try {
        const loadedImage = await loadImage(gameData.original_image);
        setOriginalDimensions({
          width: loadedImage.width,
          height: loadedImage.height,
        });

        if (imageRef.current) {
          setImageDimensions({
            width: imageRef.current.offsetWidth,
            height: imageRef.current.offsetHeight,
          });
        }
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, [gameData.original_image]);

  const handleClick = (x: number, y: number) => {
    if (imageDimensions.width === 0 || imageDimensions.height === 0) return;

    // Calculate scaling factors
    const scaleX = originalDimensions.width / imageDimensions.width;
    const scaleY = originalDimensions.height / imageDimensions.height;

    // Map the click coordinates to the original image dimensions
    const originalX = x * scaleX;
    const originalY = y * scaleY;

    console.log("Scaled Click:", x, y);
    console.log("Original Mapped Click:", originalX, originalY);

    const found = gameData.differences.find((diff) => {
      const distance = Math.sqrt(
        (diff.x - (originalX / originalDimensions.width) * 100) ** 2 +
        (diff.y - (originalY / originalDimensions.height) * 100) ** 2
      );
      return distance <= diff.radius && !foundDifferences.includes(diff.id);
    });

    if (found) {
      setFoundDifferences((prev) => [...prev, found.id]);
    }
  };

  return (
    <div className="game-board">
      <div className="images-container">
        <ImagePanel image={gameData.original_image} ref={imageRef} />
        <ImagePanel
          image={gameData.duplicate_image}
          onImageClick={handleClick}
          foundDifferences={foundDifferences}
          differences={gameData.differences}
          imageDimensions={imageDimensions}
        />
      </div>
      <div className="controls">
        <p>
          Found Differences: {foundDifferences.length} / {gameData.differences.length}
        </p>
        <HintButton onHintUsed={() => setHintsUsed(hintsUsed + 1)} />
      </div>
    </div>
  );
};

export default SpotGame;
