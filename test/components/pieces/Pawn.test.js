import { createEmptyBoard, createBoard } from '../../../src/utils/boardUtils';
import Pawn from '../../../src/components/pieces/Pawn';

describe('Board > Piece > Pawn', () => {
  describe('Movement', () => {
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
      pawn.setHasMoved();
      const validMoves = pawn.getValidMoves(board, {
        fileIndex: 2,
        rankIndex: 5,
      });
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
      pawn.setHasMoved();
      const validMoves = pawn.getValidMoves(board, {
        fileIndex: 0,
        rankIndex: 0,
      });
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
  });

  describe('Capturing', () => {
    it('Test determining capture valid move scenarios', () => {
      const board = createBoard(['...a8', '...c8']);
      const pawn = new Pawn('white');
      pawn.setHasMoved();
      const validMoves = pawn.getValidMoves(board, {
        fileIndex: 1,
        rankIndex: 1,
      });
      expect(validMoves.length).toBe(3);
    });
  });
});