import {
  UP,
  LEFT,
  RIGHT,
  DOWN,
  boardSize,
  createEmptyBoard,
  createInitialBoard,
  createBoard,
  isPositionLandable,
  getAdjacentPosition,
  getValidMovesInDirection,
  getValidMovesInDirections,
} from '../../src/utils/boardUtils';

describe('Board Utils', () => {

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

  describe('Determining Potential Positions', () => {
    
    it('Test out-of-bounds positions', () => {

      let position = {
        fileIndex: -1,
        rankIndex: 0,
      };
      expect(isPositionLandable(null, position, null)).toBeFalsy();

      position = {
        fileIndex: 0,
        rankIndex: -1,
      };
      expect(isPositionLandable(null, position, null)).toBeFalsy();

      position = {
        fileIndex: 8,
        rankIndex: 0,
      };
      expect(isPositionLandable(null, position, null)).toBeFalsy();

      position = {
        fileIndex: 0,
        rankIndex: 8,
      };
      expect(isPositionLandable(null, position, null)).toBeFalsy();
    });

    it('Test in-bounds position containing no piece', () => {
      const board = createEmptyBoard();
      const position = {
        fileIndex: 0,
        rankIndex: 0,
      };
      expect(isPositionLandable(board, position, 'white')).toBeTruthy();
    });

    it('Test in-bounds position containing opponent\'s piece', () => {
      const board = createBoard(['...a8']);
      const position = {
        fileIndex: 0,
        rankIndex: 0,
      };
      expect(isPositionLandable(board, position, 'white')).toBeTruthy();
    });

    it('Test in-bounds position containing opponent\'s piece', () => {
      const board = createBoard(['a8']);
      const position = {
        fileIndex: 0,
        rankIndex: 0,
      };
      expect(isPositionLandable(board, position, 'white')).toBeFalsy();
    });
  });

  describe('Determining Adjacent Positions', () => {

    it('Test getting top-left position', () => {
      const position = {
        fileIndex: 1,
        rankIndex: 1,
      };
      const adjacentPosition = getAdjacentPosition(position, UP | LEFT);
      expect(adjacentPosition.fileIndex).toBe(0);
      expect(adjacentPosition.rankIndex).toBe(0);
    });

    it('Test getting top position', () => {
      const position = {
        fileIndex: 1,
        rankIndex: 1,
      };
      const adjacentPosition = getAdjacentPosition(position, UP);
      expect(adjacentPosition.fileIndex).toBe(1);
      expect(adjacentPosition.rankIndex).toBe(0);
    });

    it('Test getting upper-right position', () => {
      const position = {
        fileIndex: 1,
        rankIndex: 1,
      };
      const adjacentPosition = getAdjacentPosition(position, UP | RIGHT);
      expect(adjacentPosition.fileIndex).toBe(2);
      expect(adjacentPosition.rankIndex).toBe(0);
    });

    it('Test getting left position', () => {
      const position = {
        fileIndex: 1,
        rankIndex: 1,
      };
      const adjacentPosition = getAdjacentPosition(position, LEFT);
      expect(adjacentPosition.fileIndex).toBe(0);
      expect(adjacentPosition.rankIndex).toBe(1);
    });

    it('Test getting right position', () => {
      const position = {
        fileIndex: 1,
        rankIndex: 1,
      };
      const adjacentPosition = getAdjacentPosition(position, RIGHT);
      expect(adjacentPosition.fileIndex).toBe(2);
      expect(adjacentPosition.rankIndex).toBe(1);
    });

    it('Test getting bottom-left position', () => {
      const position = {
        fileIndex: 1,
        rankIndex: 1,
      };
      const adjacentPosition = getAdjacentPosition(position, DOWN | LEFT);
      expect(adjacentPosition.fileIndex).toBe(0);
      expect(adjacentPosition.rankIndex).toBe(2);
    });

    it('Test getting bottom position', () => {
      const position = {
        fileIndex: 1,
        rankIndex: 1,
      };
      const adjacentPosition = getAdjacentPosition(position, DOWN);
      expect(adjacentPosition.fileIndex).toBe(1);
      expect(adjacentPosition.rankIndex).toBe(2);
    });

    it('Test getting bottom-right position', () => {
      const position = {
        fileIndex: 1,
        rankIndex: 1,
      };
      const adjacentPosition = getAdjacentPosition(position, DOWN | RIGHT);
      expect(adjacentPosition.fileIndex).toBe(2);
      expect(adjacentPosition.rankIndex).toBe(2);
    });

    it('Test getting out-of-bounds position', () => {
      const position = {
        fileIndex: 0,
        rankIndex: 0,
      };
      const adjacentPosition = getAdjacentPosition(position, LEFT);
      expect(adjacentPosition).toBeNull();
    });
  });

  describe('Determining Valid Moves', () => {

    it('Test determining valid move without recursion', () => {
      const board = createEmptyBoard();
      const validMoves = [];
      getValidMovesInDirection(
        board,
        { fileIndex: 0, rankIndex: 0 },
        DOWN | RIGHT,
        'white',
        false,
        validMoves,
      );
      expect(validMoves.length).toBe(1);
      const validMove = validMoves[0];
      expect(validMove.fileIndex).toBe(1);
      expect(validMove.rankIndex).toBe(1);
    });

    it('Test determining valid moves with recursion', () => {
      const board = createEmptyBoard();
      const validMoves = [];
      getValidMovesInDirection(
        board,
        { fileIndex: 0, rankIndex: 0 },
        DOWN | RIGHT,
        'white',
        true,
        validMoves,
      );
      expect(validMoves.length).toBe(7);
      validMoves.forEach((validMove, index) => {
        expect(validMove.fileIndex).toBe(1 + index);
        expect(validMove.rankIndex).toBe(1 + index);
      });
    });

    it('Test encountering opponent\'s piece ends recursion inclusively', () => {
      const board = createBoard(['...c6']);
      const validMoves = [];
      getValidMovesInDirection(
        board,
        { fileIndex: 0, rankIndex: 0 },
        DOWN | RIGHT,
        'white',
        true,
        validMoves,
      );
      expect(validMoves.length).toBe(2);
    });

    it('Test encountering player\'s piece ends recursion exclusively', () => {
      const board = createBoard(['c6']);
      const validMoves = [];
      getValidMovesInDirection(
        board,
        { fileIndex: 0, rankIndex: 0 },
        DOWN | RIGHT,
        'white',
        true,
        validMoves,
      );
      expect(validMoves.length).toBe(1);
    });

    it('Test determining valid moves in multiple directions at once', () => {
      const board = createBoard(['a8', '...a4']);
      const validMoves = getValidMovesInDirections(
        board,
        { fileIndex: 2, rankIndex: 2 },
        [
          UP | LEFT,
          UP | RIGHT,
          DOWN | LEFT,
          DOWN | RIGHT,
        ],
        'white',
      );
      expect(validMoves.length).toBe(10);
    });
  });
});