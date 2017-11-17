import { createEmptyBoard, createBoard, cloneBoard } from '../../../src/utils/boardUtils';
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
      const board = createBoard(['...a7', '...b7', 'b2']);
      const history = [];
      let moveInfo = board[1][6].piece.move(board, board[1][6], board[1][4]);
      history.push({ move: moveInfo.algebraicNotation, board: cloneBoard(board) });
      moveInfo = board[1][1].piece.move(board, board[1][1], board[1][2]);
      history.push({ move: moveInfo.algebraicNotation, board: cloneBoard(board) });
      moveInfo = board[1][4].piece.move(board, board[1][4], board[1][3]);
      history.push({ move: moveInfo.algebraicNotation, board: cloneBoard(board) });
      moveInfo = board[0][1].piece.move(board, board[0][1], board[0][3]);
      history.push({ move: moveInfo.algebraicNotation, board: cloneBoard(board) });
      const validMoves = board[1][3].piece.getValidMoves(board, board[1][3], history);
      expect(validMoves.length).toBe(1);
    });

    it('Test determining right en passant valid move scenario', () => {
      const board = createBoard(['...c7', '...b7', 'b2']);
      const history = [];
      let moveInfo = board[1][6].piece.move(board, board[1][6], board[1][4]);
      history.push({ move: moveInfo.algebraicNotation, board: cloneBoard(board) });
      moveInfo = board[1][1].piece.move(board, board[1][1], board[1][2]);
      history.push({ move: moveInfo.algebraicNotation, board: cloneBoard(board) });
      moveInfo = board[1][4].piece.move(board, board[1][4], board[1][3]);
      history.push({ move: moveInfo.algebraicNotation, board: cloneBoard(board) });
      moveInfo = board[2][1].piece.move(board, board[2][1], board[2][3]);
      history.push({ move: moveInfo.algebraicNotation, board: cloneBoard(board) });
      const validMoves = board[1][3].piece.getValidMoves(board, board[1][3], history);
      expect(validMoves.length).toBe(1);
    });

    it('Test determining non-en passant valid move scenario', () => {
      const board = createBoard(['...a7', '...b7', 'b2']);
      const history = [];
      let moveInfo = board[1][6].piece.move(board, board[1][6], board[1][5]);
      history.push({ move: moveInfo.algebraicNotation, board: cloneBoard(board) });
      moveInfo = board[0][1].piece.move(board, board[0][1], board[0][2]);
      history.push({ move: moveInfo.algebraicNotation, board: cloneBoard(board) });
      moveInfo = board[1][5].piece.move(board, board[1][5], board[1][4]);
      history.push({ move: moveInfo.algebraicNotation, board: cloneBoard(board) });
      moveInfo = board[0][2].piece.move(board, board[0][2], board[0][3]);
      history.push({ move: moveInfo.algebraicNotation, board: cloneBoard(board) });
      moveInfo = board[1][4].piece.move(board, board[1][4], board[1][3]);
      history.push({ move: moveInfo.algebraicNotation, board: cloneBoard(board) });
      moveInfo = board[1][1].piece.move(board, board[1][1], board[1][2]);
      history.push({ move: moveInfo.algebraicNotation, board: cloneBoard(board) });
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