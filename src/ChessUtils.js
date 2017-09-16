export const UP = 1;
export const LEFT = 2;
export const RIGHT = 4;
export const DOWN = 8;

export default class ChessUtils {

  static createBoard() {

    const board = Array(8);
    for (let column = 0; column < 8; column++) {
      board[column] = Array(8);
      for (let row = 0; row < 8; row++) {
        board[column][row] = {
          piece: null,
          column,
          row,
        };
      }
    }

    return board;
  }

  static isPositionOnBoard(position) {
    const { column, row } = position;
    return column >= 0 && column < 8 && row >= 0 && row < 8;
  }

  static isPositionLandable(board, position, currentPlayer) {
    const square = board[position.column][position.row];
    return square.piece === null || square.piece.player !== currentPlayer;
  }

  static getAdjacentPosition(position, direction) {

    const { column, row } = position;
    const newPosition = {
      column: column + (direction & LEFT ? -1 : (direction & RIGHT ? 1 : 0)),
      row: row + (direction & UP ? -1 : (direction & DOWN ? 1 : 0)),
    };

    if (ChessUtils.isPositionOnBoard(newPosition)) {
      return newPosition;
    }

    // Return null if the resulting position is off the board
    return null;
  }

  static getValidMovesInDirections(board, position, directions, currentPlayer, recurse = true) {

    const getValidMovesInDirection = (currentPosition, direction, validMoves) => {
            
      const nextPosition = ChessUtils.getAdjacentPosition(currentPosition, direction);
      if (nextPosition !== null) {
        const square = board[nextPosition.column][nextPosition.row];
        if (ChessUtils.isPositionLandable(board, nextPosition, currentPlayer)) {
          validMoves.push(nextPosition);
          if (recurse && square.piece === null) {
            return getValidMovesInDirection(nextPosition, direction, validMoves);
          }
        }
      }
    
      return validMoves;
    };

    const validMoves = [];
    directions.forEach((direction) => {
      getValidMovesInDirection(position, direction, validMoves);
    });

    return validMoves;
  }
}