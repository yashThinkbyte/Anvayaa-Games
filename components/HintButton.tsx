import React from 'react';

interface HintButtonProps {
  onHintUsed: () => void;
}

const HintButton: React.FC<HintButtonProps> = ({ onHintUsed }) => {
  const handleClick = () => {
    alert('Try looking near the top-left corner!');
    onHintUsed();
  };

  return (
    <button className="hint-button" onClick={handleClick}>
      Use Hint
    </button>
  );
};

export default HintButton;
