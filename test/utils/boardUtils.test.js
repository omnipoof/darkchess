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
  getSquaresForPlayersPieces,
  getSquaresForPlayersOtherSimilarPieces,
  getValidMovesForPlayersOtherPiecesOfSameType,
  determineFileRankAmbiguity,
  isPlayersKingInCheck,
  isPlayersKingInCheckAfterMove,
  isPlayersKingCheckmated,
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

  describe('Determine Check and Checkmate Scenarios', () => {
    it('Test determining if player\'s king is in check', () => {
      let board = createBoard(['a8', '...Kh8']);
      let history = [{
        move: 'Start',
        board: createBoard(['a7', '...Kh8']),
      }, {
        move: 'a8',
        board,
      }];
      expect(isPlayersKingInCheck(board, history, 'black')).toBeFalsy();

      board = createBoard(['Ra8', '...Kh8']);
      history = [{
        move: 'Start',
        board: createBoard(['Ra7', '...Kh8']),
      }, {
        move: 'Ra8',
        board,
      }];
      expect(isPlayersKingInCheck(board, history, 'black')).toBeTruthy();
    });

    it('Ensure \'false\' is returned for check if player does not have a king on the board', () => {
      let board = createBoard(['a8']);
      let history = [{
        move: 'Start',
        board: createBoard(['a7']),
      }, {
        move: 'a8',
        board,
      }];
      expect(isPlayersKingInCheck(board, history, 'black')).toBeFalsy();
    });
    
    it('Test determining if player\'s king is in check after move', () => {
      let board = createBoard(['a7', '...Kh8']);
      let history = [{
        move: 'Start',
        board,
      }];
      let originSquare = board[0][1];
      let destinationSquare = board[0][0];
      expect(isPlayersKingInCheckAfterMove(
        originSquare,
        destinationSquare,
        board,
        history,
        'black'
      )).toBeFalsy();
      
      board = createBoard(['Ra7', '...Kh8']);
      history = [{
        move: 'Start',
        board,
      }];
      originSquare = board[0][1];
      destinationSquare = board[0][0];
      expect(isPlayersKingInCheckAfterMove(
        originSquare,
        destinationSquare,
        board,
        history,
        'black'
      )).toBeTruthy();
    });

    it('Test determining if player\'s king is checkmated', () => {
      let board = createBoard(['a8', 'Rb7', '...Kh8']);
      let history = [{
        move: 'Start',
        board: createBoard(['a7', 'Rb7', '...Kh8']),
      }, {
        move: 'a8',
        board,
      }];
      expect(isPlayersKingCheckmated(board, history, 'black')).toBeFalsy();

      board = createBoard(['Ra8', 'Rb7', '...Kh8']);
      history = [{
        move: 'Start',
        board: createBoard(['Ra7', 'Rb7', '...Kh8']),
      }, {
        move: 'Ra8',
        board,
      }];
      expect(isPlayersKingCheckmated(board, history, 'black')).toBeTruthy();
    });

    it('Ensure \'false\' is returned for checkmate if player does not have a king on the board', () => {
      let board = createBoard(['Ra8', 'Rb7']);
      let history = [{
        move: 'Start',
        board: createBoard(['Ra7', 'Rb7']),
      }, {
        move: 'Ra8',
        board,
      }];
      expect(isPlayersKingCheckmated(board, history, 'black')).toBeFalsy();
    });

    it('Ensure \'false\' is returned for checkmate if king is on board but there are no valid moves', () => {
      let board = createBoard(['Kf7', 'Qg6', '...Kh8']);
      let history = [{
        move: 'Start',
        board,
      }];
      expect(isPlayersKingCheckmated(board, history, 'black')).toBeFalsy();
    });
  });

  describe('Miscellaneous', () => {
    it('Test determining squares for player\'s pieces of a given type', () => {
      const board = createInitialBoard();
      const squares = getSquaresForPlayersPieces(board, 'white', 'pawn');
      expect(squares.length).toBe(8);
      squares.forEach((square) => {
        expect(square.piece.type).toBe('pawn');
      });
    });

    it('Test determining squares of player\'s other similar pieces', () => {
      const board = createBoard(['Ra8', 'Rh8', 'Ra1', 'Rh1']);
      const basePiece = board[0][0].piece;
      const squares = getSquaresForPlayersOtherSimilarPieces(board, basePiece);
      expect(squares.length).toBe(3);
      squares.forEach((square) => {
        expect(square.piece.type).toBe(basePiece.type);
        expect(square.piece.id).not.toBe(basePiece.id);
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