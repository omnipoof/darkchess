import { createInitialBoard } from '../../src/utils/boardCreationUtils';
import { performMoves, getBoardAsString } from '../../src/utils/testUtils';

describe('Test Utils', () => {
  it('Perform moves to set up en passant capture', () => {
    let board = createInitialBoard();
    const moveResults = performMoves(board, [
      'b2b4',
      '...b7b6',
      'b4b5',
      '...a7a5',
    ]);
    board = moveResults.board;
    const history = moveResults.history;
    const validMoves = board[1][3].piece.getValidMoves(board, board[1][3], history);
    expect(validMoves.length).toBe(1);
  });

  it('Get board as string', () => {
    const board = createInitialBoard();
    const boardString = getBoardAsString(board);
    expect(boardString).toBe(' ABCDEFGH\n8RNBQKBNR\n7PPPPPPPP\n6--------\n5--------\n4--------\n3--------\n2pppppppp\n1rnbqkbnr');
  });
});