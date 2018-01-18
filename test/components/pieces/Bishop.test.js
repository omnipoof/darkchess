import { createBoard } from '../../../src/utils/boardCreationUtils';
import Bishop from '../../../src/components/pieces/Bishop';

describe('Board > Piece > Bishop', () => {
  it('Test determining valid move scenarios', () => {
    const board = createBoard(['a8', '...a4']);
    const bishop = new Bishop('white');
    const validMoves = bishop.getValidMoves(board, {
      fileIndex: 2,
      rankIndex: 2,
    });
    expect(validMoves.length).toBe(10);
  });
});