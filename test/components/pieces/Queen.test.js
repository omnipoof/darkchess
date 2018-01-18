import { createBoard } from '../../../src/utils/boardCreationUtils';
import Queen from '../../../src/components/pieces/Queen';

describe('Board > Piece > Queen', () => {
  it('Test determining valid move scenarios', () => {
    const board = createBoard(['a8', 'a6', '...a4', '...c8']);
    const queen = new Queen('white');
    const validMoves = queen.getValidMoves(board, {
      fileIndex: 2,
      rankIndex: 2,
    });
    expect(validMoves.length).toBe(23);
  });
});