import { createInitialBoard } from '../../src/utils/boardCreationUtils';
import { parseAlgebraicNotation } from '../../src/utils/algebraicNotation';
import { performMoves, getBoardAsString } from '../../src/utils/testUtils';

describe('Test Utils', () => {
  it('Perform moves for en passant capture, castling, pawn promotion, and ambiguous movement', () => {
    let board = createInitialBoard();
    const moveResults = performMoves(board, [
      'g4',
      '...g6',
      'g5',
      '...f5',
      'gxf6e.p.',
      '...h6',
      'Bh3',
      '...exf6',
      'Nf3',
      '...d6',
      '0-0',
      '...c6',
      'Nh4',
      '...b6',
      'f4',
      '...a6',
      'a4',
      '...a5',
      'Ra3',
      '...g5',
      'Rff3',
      '...Bg7',
      'fxg5',
      '...b5',
      'gxh6',
      '...c5',
      'hxg7',
      '...d5',
      'gxh8R',
      '...f5',
      'Bxf5',
      '...bxa4',
      'Rh6',
      '...Ra7',
      'Re6+',
      '...Kf8',
      'Re6e3',
      '...Na6',
      'Rf1',
      '...Nc7',
      'Ref3',
      '...Bb7',
      'R3f2',
    ]);
    const boardString = getBoardAsString(moveResults.board);
    expect(boardString).toBe(' ABCDEFGH\n8---Q-KN-\n7RBN-----\n6--------\n5P-PP-b--\n4P------n\n3r-------\n2-ppppr-p\n1-nbq-rk-');
  });

  it('Perform pawn promotion into a checkmate state', () => {
    const board = createInitialBoard();
    const moveResults = performMoves(board, [
      'h4',
      '...g5',
      'hxg5',
      '...h5',
      'gxh6e.p.',
      '...Bg7',
      'hxg7',
      '...Nf6',
      'g3',
      '...Nd5',
      'gxh8Q++',
    ]);
    const lastMove = parseAlgebraicNotation(moveResults.history.pop().move);
    expect(lastMove.isCheckmate).toBeTruthy();
  });

  it('Get board as string', () => {
    const board = createInitialBoard();
    const boardString = getBoardAsString(board);
    expect(boardString).toBe(' ABCDEFGH\n8RNBQKBNR\n7PPPPPPPP\n6--------\n5--------\n4--------\n3--------\n2pppppppp\n1rnbqkbnr');
  });
});