import {
  boardSize,
  createEmptyBoard,
  createInitialBoard,
  createBoard,
} from '../../src/utils/boardCreationUtils';

describe('Board Creation Utils', () => {
  describe('Board Creation', () => {
    it('Test creating empty board', () => {

      const board = createEmptyBoard();
      for (let fileIndex = 0; fileIndex < boardSize; fileIndex++) {
        for (let rankIndex = 0; rankIndex < boardSize; rankIndex++) {
          const square = board[fileIndex][rankIndex];
          expect(square.fileIndex).toBe(fileIndex);
          expect(square.rankIndex).toBe(rankIndex);
          expect(square.piece).toBeNull();
        }
      }
    });

    it('Test creating initial board setup', () => {

      const board = createInitialBoard();
      let piece = null;

      piece = board[0][0].piece;
      expect(piece).not.toBeNull();
      expect(piece.type).toBe('rook');
      expect(piece.player).toBe('black');

      piece = board[1][0].piece;
      expect(piece).not.toBeNull();
      expect(piece.type).toBe('knight');
      expect(piece.player).toBe('black');

      piece = board[2][0].piece;
      expect(piece).not.toBeNull();
      expect(piece.type).toBe('bishop');
      expect(piece.player).toBe('black');

      piece = board[3][0].piece;
      expect(piece).not.toBeNull();
      expect(piece.type).toBe('queen');
      expect(piece.player).toBe('black');

      piece = board[4][0].piece;
      expect(piece).not.toBeNull();
      expect(piece.type).toBe('king');
      expect(piece.player).toBe('black');

      piece = board[5][0].piece;
      expect(piece).not.toBeNull();
      expect(piece.type).toBe('bishop');
      expect(piece.player).toBe('black');

      piece = board[6][0].piece;
      expect(piece).not.toBeNull();
      expect(piece.type).toBe('knight');
      expect(piece.player).toBe('black');

      piece = board[7][0].piece;
      expect(piece).not.toBeNull();
      expect(piece.type).toBe('rook');
      expect(piece.player).toBe('black');

      for (let fileIndex = 0; fileIndex < boardSize; fileIndex++) {
        piece = board[fileIndex][1].piece;
        expect(piece).not.toBeNull();
        expect(piece.type).toBe('pawn');
        expect(piece.player).toBe('black');

        piece = board[fileIndex][6].piece;
        expect(piece).not.toBeNull();
        expect(piece.type).toBe('pawn');
        expect(piece.player).toBe('white');
      }

      piece = board[0][7].piece;
      expect(piece).not.toBeNull();
      expect(piece.type).toBe('rook');
      expect(piece.player).toBe('white');

      piece = board[1][7].piece;
      expect(piece).not.toBeNull();
      expect(piece.type).toBe('knight');
      expect(piece.player).toBe('white');

      piece = board[2][7].piece;
      expect(piece).not.toBeNull();
      expect(piece.type).toBe('bishop');
      expect(piece.player).toBe('white');

      piece = board[3][7].piece;
      expect(piece).not.toBeNull();
      expect(piece.type).toBe('queen');
      expect(piece.player).toBe('white');

      piece = board[4][7].piece;
      expect(piece).not.toBeNull();
      expect(piece.type).toBe('king');
      expect(piece.player).toBe('white');

      piece = board[5][7].piece;
      expect(piece).not.toBeNull();
      expect(piece.type).toBe('bishop');
      expect(piece.player).toBe('white');

      piece = board[6][7].piece;
      expect(piece).not.toBeNull();
      expect(piece.type).toBe('knight');
      expect(piece.player).toBe('white');

      piece = board[7][7].piece;
      expect(piece).not.toBeNull();
      expect(piece.type).toBe('rook');
      expect(piece.player).toBe('white');
    });
  });
});
