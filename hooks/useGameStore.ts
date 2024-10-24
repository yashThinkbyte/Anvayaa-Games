// hooks/useGameStore.ts
import { create } from 'zustand';
import { shuffleCards } from '@/utils/shuffleCards';
import { GameState } from '@/types/types'; // Import the types


export const useGameStore = create<GameState>((set, get) => ({
  cards: [],
  flippedCards: [],
  matchedCards: [],
  currentFlippedCard: -1,

  initializeGame: (images: string[]) => {
    const cards = shuffleCards(images);
    set({
      cards: cards,
      flippedCards: [],
      matchedCards: [],
    });
  },

  flipCard: (id: number) => {
    const { cards, flippedCards, matchedCards } = get();
    const newFlippedCard = cards.find((card) => card.id === id);
    if (newFlippedCard && !matchedCards.includes(id)) {
      set({
        cards: cards.map((card) =>
          card.id === newFlippedCard.id
            ? { ...card, flipped: true }
            : card
        ),
      });

      const newFlippedCards = [...flippedCards, newFlippedCard];

      if (newFlippedCards.length === 2) {
        const [firstCard, secondCard] = newFlippedCards;
        if (firstCard.image === secondCard.image) {
          set({
            matchedCards: [...matchedCards, firstCard.id, secondCard.id],
          });
        } else {
          setTimeout(() => {
            const { cards } = get();
            set({
              cards: cards.map((card) =>
                card.id === firstCard.id || card.id === secondCard.id
                  ? { ...card, flipped: false }
                  : card
              ),
            });
          }, 1000);
        }
        set({ flippedCards: [] });
      } else {
        set({
          flippedCards: newFlippedCards,
        });
      }
    }
  },

  resetGame: () => {
    const { cards } = get();
    set({ cards: shuffleCards(cards.map((card) => card.image)), flippedCards: [], matchedCards: [] });
  },
}));
