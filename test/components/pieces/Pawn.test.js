import { createEmptyBoard, createInitialBoard, createBoard, cloneBoard } from '../../../src/utils/boardUtils';
import { performMoves } from '../../../src/utils/testUtils';
import Pawn from '../../../src/components/pieces/Pawn';

describe('Board > Piece > Pawn', () => {
  describe('Movement', () => {
    it('Test moving pawn', () => {
      const board = createEmptyBoard();
      const pawn = new Pawn('white');
      board[2][4].piece = pawn;
      pawn.move(board, board[2][4], board[2][5]);
      expect(board[2][5].piece).toBe(pawn);
      expect(board[2][4].piece).toBe(null);
    });

    it('Test en passant capture', () => {
      const board = createEmptyBoard();
      const pawn = new Pawn('white');
      const capturedPawn = new Pawn('black');
      board[0][1].piece = capturedPawn;
      board[1][3].piece = pawn;
      capturedPawn.move(board, board[0][1], board[0][3]);
      const moveInfo = pawn.move(board, board[1][3], board[0][2]);
      expect(board[0][2].piece).toBe(pawn);
      expect(board[0][3].piece).toBe(null);
      expect(moveInfo.isEnPassantCapture).toBeTruthy();
      expect(moveInfo.capturedPiece).toBe(capturedPawn);
      expect(moveInfo.algebraicNotation).toBe('bxa6e.p.');
    });

    it('Test determining initial valid move scenarios', () => {
      const board = createEmptyBoard();
      const pawn = new Pawn('white');
      const validMoves = pawn.getValidMoves(board, {
        fileIndex: 2,
        rankIndex: 6,
      });
      expect(validMoves.length).toBe(2);
    });
  
    it('Test determining non-initial valid move scenarios', () => {
      const board = createEmptyBoard();
      const pawn = new Pawn('white');
      board[2][4].piece = pawn;
      pawn.move(board, board[2][4], board[2][5]);
      const validMoves = pawn.getValidMoves(board, board[2][5]);
      expect(validMoves.length).toBe(1);
    });
  
    it('Test determining blocked initial movement valid move scenarios', () => {
      const position = {
        fileIndex: 2,
        rankIndex: 6,
      };

      // Blocked by piece owned by player
      let board = createBoard(['c3']);
      let pawn = new Pawn('white');
      let validMoves = pawn.getValidMoves(board, position);
      expect(validMoves.length).toBe(0);

      board = createBoard(['c4']);
      validMoves = pawn.getValidMoves(board, position);
      expect(validMoves.length).toBe(1);

      // Blocked by piece owned by opponent
      board = createBoard(['...c3']);
      validMoves = pawn.getValidMoves(board, position);
      expect(validMoves.length).toBe(0);

      board = createBoard(['...c4']);
      validMoves = pawn.getValidMoves(board, position);
      expect(validMoves.length).toBe(1);
    });

    it('Test determining off-board valid move scenarios', () => {
      const board = createEmptyBoard();
      const pawn = new Pawn('white');
      board[0][1].piece = pawn;
      pawn.move(board, board[0][1], board[0][0]);
      const validMoves = pawn.getValidMoves(board, board[0][0]);
      expect(validMoves.length).toBe(0);
    });

    it('Test determining black valid move scenarios', () => {
      const board = createEmptyBoard();
      const pawn = new Pawn('black');
      const validMoves = pawn.getValidMoves(board, {
        fileIndex: 0,
        rankIndex: 0,
      });
      expect(validMoves.length).toBe(2);
    });

    it('Test determining left en passant valid move scenario', () => {
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

    it('Test determining right en passant valid move scenario', () => {
      let board = createInitialBoard();
      const moveResults = performMoves(board, [
        'b2b4',
        '...b7b6',
        'b4b5',
        '...c7c5',
      ]);
      board = moveResults.board;
      const history = moveResults.history;
      const validMoves = board[1][3].piece.getValidMoves(board, board[1][3], history);
      expect(validMoves.length).toBe(1);
    });

    it('Test determining left en passant valid move scenario with black pawn', () => {
      let board = createInitialBoard();
      const moveResults = performMoves(board, [
        'h2h3',
        '...b7b5',
        'b2b3',
        '...b5b4',
        'a2a4',
      ]);
      board = moveResults.board;
      const history = moveResults.history;
      const validMoves = board[1][4].piece.getValidMoves(board, board[1][4], history);
      expect(validMoves.length).toBe(1);
    });

    it('Test determining right en passant valid move scenario with black pawn', () => {
      let board = createInitialBoard();
      const moveResults = performMoves(board, [
        'h2h3',
        '...b7b5',
        'b2b3',
        '...b5b4',
        'c2c4',
      ]);
      board = moveResults.board;
      const history = moveResults.history;
      const validMoves = board[1][4].piece.getValidMoves(board, board[1][4], history);
      expect(validMoves.length).toBe(1);
    });

    it('Test determining non-en passant valid move scenario (pawn did not move two squares last turn)', () => {
      let board = createInitialBoard();
      const moveResults = performMoves(board, [
        'b2b3',
        '...a7a6',
        'b3b4',
        '...a6a5',
        'b4b5',
        '...b7b6',
      ]);
      board = moveResults.board;
      const history = moveResults.history;
      const validMoves = board[1][3].piece.getValidMoves(board, board[1][3], history);
      expect(validMoves.length).toBe(0);
    });

    it('Test determining non-en passant valid move scenario (other piece was in pawn initial position)', () => {
      let board = createInitialBoard();
      const moveResults = performMoves(board, [
        'c2c3',
        '...b7b6',
        'c3c4',
        '...c7c6',
        'c4c5',
        '...c8a6',
        'h2h3',
        '...b6b5',
      ]);
      board = moveResults.board;
      const history = moveResults.history;
      const validMoves = board[2][3].piece.getValidMoves(board, board[2][3], history);
      expect(validMoves.length).toBe(0);
    });

    it('Test determining non-en passant valid move scenario (a pawn did not move last turn)', () => {
      let board = createInitialBoard();
      const moveResults = performMoves(board, [
        'b2b3',
        '...a7a6',
        'b3b4',
        '...a6a5',
        'b4b5',
        '...b8c6',
      ]);
      board = moveResults.board;
      const history = moveResults.history;
      const validMoves = board[1][3].piece.getValidMoves(board, board[1][3], history);
      expect(validMoves.length).toBe(2); // Forward and knight capture, but not en passant
    });

    it('Test determining non-en passant valid move scenario (last move was a capture)', () => {
      let board = createInitialBoard();
      const moveResults = performMoves(board, [
        'b2b3',
        '...a7a6',
        'b3b4',
        '...a6a5',
        'b4b5',
        '...b7b6',
        'c2c4',
        '...d7d5',
        'd2d4',
        '...d5c4',
      ]);
      board = moveResults.board;
      const history = moveResults.history;
      const validMoves = board[1][3].piece.getValidMoves(board, board[1][3], history);
      expect(validMoves.length).toBe(0);
    });
  });

  describe('Capturing', () => {
    it('Test determining capture valid move scenarios', () => {
      const board = createBoard(['...a8', '...c8']);
      const pawn = new Pawn('white');
      board[1][2].piece = pawn;
      pawn.move(board, board[1][2], board[1][1]);
      const validMoves = pawn.getValidMoves(board, board[1][1]);
      expect(validMoves.length).toBe(3);
    });
  });
});