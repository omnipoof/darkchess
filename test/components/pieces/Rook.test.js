import { createBoard } from '../../../src/utils/boardCreationUtils';
import Rook from '../../../src/components/pieces/Rook';

describe('Board > Piece > Rook', () => {
  it('Test determining valid move scenarios', () => {
    const board = createBoard(['c8', '...a6']);
    const rook = new Rook('white');
    const validMoves = rook.getValidMoves(board, {
      fileIndex: 2,
      rankIndex: 2,
    });
    expect(validMoves.length).toBe(13);
  });
});