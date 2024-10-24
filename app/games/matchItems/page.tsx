// app/game/page.tsx
import React from 'react';
import MatchItemsBoard from '@/components/MatchItemsBoard';

const GamePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Arrange them in order</h1>
      <MatchItemsBoard />
    </div>
  );
};

export default GamePage;
