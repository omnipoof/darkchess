import { createBoard, createInitialBoard } from '../../src/utils/boardCreationUtils';
import { performMoves, getBoardAsString } from '../../src/utils/testUtils';

describe('Bugs', () => {
  describe('DC#38: Max Call Stack Size Exceeded in King.canCastle()', () => {
    // This issue is occurring because one player's king is able to castle and
    // the other player has selected a piece that has a valid move such that
    // their king would be able to castle, and the evaluation of valid moves
    // is causing one king to determine if they can castle which subsequently
    // causes the other king to determine if they can castle, and so on until
    // the maximum call stack size is exceeded
    it('Original reproduction steps', () => {
      let board = createInitialBoard();
      const moveResults = performMoves(board, [
        'Nc3',
        '...Nc6',
        'Ne4',
        '...Nb4',
        'Nc5',
        '...Nd3+',
        'Nxd3',
        '...d5',
        'Ne5',
        '...d4',
        'Nef3',
        '...f5',
        'Nxd4',
        '...c5',
        'Nxf5',
        '...h6',
        'Nxh6',
        '...gxh6',
        'h4',
        '...h5',
        'g4',
        '...hxg4',
        'f4',
        '...g3',
        'Bg2',
        '...c4',
        'Nf3',
        '...Qd4',
        'Nxd4',
      ]);
      
      board = moveResults.board;
      let originSquare = board[2][0];

      // Expect valid moves call to succeed without exceeding max call stack size
      originSquare.piece.getValidMoves(board, originSquare, moveResults.history, true);
    });
    
    it('Simplified reproduction steps', () => {
      let board = createInitialBoard();
      const moveResults = performMoves(board, [
        'g4',
        '...g5',
        'Bh3',
        '...Bh6',
        'Nf3',
      ]);
      
      board = moveResults.board;
      let originSquare = board[6][0];

      // Expect valid moves call to succeed without exceeding max call stack size
      originSquare.piece.getValidMoves(board, originSquare, moveResults.history, true);
    });
  });
});