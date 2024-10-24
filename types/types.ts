// src/types/types.ts

export interface Card {
    id: number;
    image: string;
    flipped: boolean;
    matched: boolean;
  }
  
  export interface GameState {
    cards: Card[];
    flippedCards: Card[];
    matchedCards: number[];
    flipCard: (id: number) => void;
    resetGame: () => void;
    initializeGame: (images: string[]) => void;
  }
  