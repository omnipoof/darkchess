import {
  UP,
  LEFT,
  RIGHT,
  DOWN,
  boardSize,
  isPositionLandable,
  getAdjacentPosition,
  getValidMovesInDirection,
  getValidMovesInDirections,
  getValidMovesForAllPlayersPieces,
  getSquaresForPlayersOtherSimilarPieces,
  getValidMovesForPlayersOtherPiecesOfSameType,
  determineFileRankAmbiguity,
} from '../../src/utils/boardUtils';
import {
  createEmptyBoard,
  createInitialBoard,
  createBoard,
} from '../../src/utils/boardCreationUtils';

describe('Board Utils', () => {
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

    it('Test determining valid moves for player\'s other pieces of the same type', () => {
      const board = createBoard(['Ra8', 'Rh8', 'Ba1', 'Bh1']);
      const validMoves = getValidMovesForPlayersOtherPiecesOfSameType(board, [], board[0][0].piece);
      expect(validMoves.length).toBe(12);
    });

    it('Test determining valid moves for all of a player\'s pieces', () => {
      const board = createBoard(['Ra8', 'Rh8']);
      const validMoves = getValidMovesForAllPlayersPieces(board, [], 'white');
      expect(validMoves.length).toBe(26);
    });
  });

  describe('Miscellaneous', () => {
    it('Test determining squares of player\'s other similar pieces', () => {
      const board = createBoard(['Ra8', 'Rh8', 'Ra1', 'Rh1']);
      let squares = getSquaresForPlayersOtherSimilarPieces(board, board[0][0].piece);
      expect(squares.length).toBe(3);
      squares.forEach((square) => {
        square.piece.type === board[0][0].piece.type;
      });
    });

    it('Test determining file and rank ambiguity', () => {
      let board = createBoard(['Ba8', 'Bd8']);
      let originSquare = board[0][0];
      let destinationSquare = board[1][1];
      let ambiguity = determineFileRankAmbiguity(board, [], originSquare, destinationSquare);
      expect(ambiguity.isFileAmbiguous).toBeFalsy();
      expect(ambiguity.isRankAmbiguous).toBeFalsy();

      board = createBoard(['Ba8', 'Bc8']);
      originSquare = board[0][0];
      destinationSquare = board[1][1];
      ambiguity = determineFileRankAmbiguity(board, [], originSquare, destinationSquare);
      expect(ambiguity.isFileAmbiguous).toBeTruthy();
      expect(ambiguity.isRankAmbiguous).toBeFalsy();

      board = createBoard(['Ba8', 'Ba6']);
      originSquare = board[0][0];
      destinationSquare = board[1][1];
      ambiguity = determineFileRankAmbiguity(board, [], originSquare, destinationSquare);
      expect(ambiguity.isFileAmbiguous).toBeFalsy();
      expect(ambiguity.isRankAmbiguous).toBeTruthy();

      board = createBoard(['Ba8', 'Ba6', 'Bc8']);
      originSquare = board[0][0];
      destinationSquare = board[1][1];
      ambiguity = determineFileRankAmbiguity(board, [], originSquare, destinationSquare);
      expect(ambiguity.isFileAmbiguous).toBeTruthy();
      expect(ambiguity.isRankAmbiguous).toBeTruthy();

      board = createBoard(['Ra8', 'Ra6']);
      originSquare = board[0][0];
      destinationSquare = board[0][1];
      ambiguity = determineFileRankAmbiguity(board, [], originSquare, destinationSquare);
      expect(ambiguity.isFileAmbiguous).toBeFalsy();
      expect(ambiguity.isRankAmbiguous).toBeTruthy();

      board = createBoard(['Ra8', 'Rc8']);
      originSquare = board[0][0];
      destinationSquare = board[1][0];
      ambiguity = determineFileRankAmbiguity(board, [], originSquare, destinationSquare);
      expect(ambiguity.isFileAmbiguous).toBeTruthy();
      expect(ambiguity.isRankAmbiguous).toBeFalsy();

      board = createBoard(['Ra8', 'Rc6']);
      originSquare = board[0][0];
      destinationSquare = board[0][2];
      ambiguity = determineFileRankAmbiguity(board, [], originSquare, destinationSquare);
      expect(ambiguity.isFileAmbiguous).toBeTruthy();
      expect(ambiguity.isRankAmbiguous).toBeFalsy();

      board = createBoard(['Ra8', 'Ra4', 'Rc6']);
      originSquare = board[0][0];
      destinationSquare = board[0][2];
      ambiguity = determineFileRankAmbiguity(board, [], originSquare, destinationSquare);
      expect(ambiguity.isFileAmbiguous).toBeTruthy();
      expect(ambiguity.isRankAmbiguous).toBeTruthy();
    });
  });
});