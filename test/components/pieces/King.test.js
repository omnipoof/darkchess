import { createBoard } from '../../../src/utils/boardCreationUtils';
import King from '../../../src/components/pieces/King';

describe('Board > Piece > King', () => {
  it('Test determining valid move scenarios', () => {
    const board = createBoard(['a8', '...b8']);
    const king = new King('white');
    const validMoves = king.getValidMoves(board, {
      fileIndex: 0,
      rankIndex: 1,
    });
    expect(validMoves.length).toBe(4);
  });
});