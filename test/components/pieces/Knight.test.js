import { createEmptyBoard, createBoard } from '../../../src/utils/boardUtils';
import Knight from '../../../src/components/pieces/Knight';

describe('Board > Piece > Knight', () => {
  it('Test determining valid move scenarios', () => {
    const board = createBoard(['a8', '...a6']);
    const knight = new Knight('white');
    const validMoves = knight.getValidMoves(board, {
      fileIndex: 1,
      rankIndex: 2,
    });
    expect(validMoves.length).toBe(5);
  });

  it('Test determining unimpeded valid moves', () => {
    const board = createEmptyBoard();
    const knight = new Knight('white');
    const validMoves = knight.getValidMoves(board, {
      fileIndex: 2,
      rankIndex: 2,
    });
    expect(validMoves.length).toBe(8);
  });
});