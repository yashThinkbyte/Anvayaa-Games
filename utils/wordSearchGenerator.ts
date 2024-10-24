// Define a utility function for generating random integers
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

type Grid = string[][];

function createEmptyGrid(size: number): Grid {
  return Array.from({ length: size }, () => Array(size).fill('-'));
}

function placeWord(board: Grid, word: string, maxRetries: number = 100): boolean {
  const directions = [
    { row: 0, col: 1 }, // Horizontal (left-to-right)
    { row: 1, col: 0 }, // Vertical (top-to-bottom)
    { row: 1, col: 1 }, // Diagonal (top-left to bottom-right)
    { row: -1, col: 1 }, // Diagonal (bottom-left to top-right)
  ];

  const size = board.length;
//   const reverse = randomInt(0, 2) === 0;

//   if (reverse) {
//     word = word.split('').reverse().join('');
//   }

  let attempts = 0;

  while (attempts < maxRetries) {
    const orientation = directions[randomInt(0, directions.length)];
    const rowStart = randomInt(0, size);
    const colStart = randomInt(0, size);

    if (canPlaceWord(board, word, rowStart, colStart, orientation)) {
      for (let i = 0; i < word.length; i++) {
        board[rowStart + i * orientation.row][colStart + i * orientation.col] = word[i];
      }
      return true;
    }

    attempts++;
  }

  return false; // If the word could not be placed after max retries
}

function canPlaceWord(
  board: Grid,
  word: string,
  rowStart: number,
  colStart: number,
  direction: { row: number; col: number }
): boolean {
  for (let i = 0; i < word.length; i++) {
    const newRow = rowStart + i * direction.row;
    const newCol = colStart + i * direction.col;

    if (newRow < 0 || newRow >= board.length || newCol < 0 || newCol >= board[0].length) {
      return false; // Out of bounds
    }

    if (board[newRow][newCol] !== '-' && board[newRow][newCol] !== word[i]) {
      return false; // Space is not empty or does not match the overlapping letter
    }
  }

  return true;
}

function fillEmptyCells(board: Grid): void {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === '-') {
        board[row][col] = letters[randomInt(0, letters.length)];
      }
    }
  }
}




export function createWordSearch(words: string[], gridSize: number): Grid {
  let board = createEmptyGrid(gridSize);

  // Sort words by length in descending order to place longer words first
  words.sort((a, b) => b.length - a.length);

  for (const word of words) {
    const placed = placeWord(board, word, 100); // Retry limit is 100

    // If a word couldn't be placed, increase grid size and regenerate the grid
    if (!placed) {
      console.warn(`Couldn't place word: ${word}. Increasing grid size and retrying...`);
      gridSize++; // Increment grid size to allow more space
      return createWordSearch(words, gridSize); // Recursively call with larger grid size
    }
  }

  fillEmptyCells(board);

  return board;
}

// // Example usage:
// const words = ['HELLO', 'WORLD', 'TYPE', 'SCRIPT', 'PUZZLE'];
// const gridSize = 10;
// const wordSearch = createWordSearch(words, gridSize);

// console.table(wordSearch);
