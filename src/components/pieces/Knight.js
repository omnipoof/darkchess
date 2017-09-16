import Piece from './Piece';
import ChessUtils from '../../ChessUtils';

export default class Knight extends Piece {

  constructor(player) {
    super('knight', player);
  }

  getValidMoves(board, position) {

    const { column, row } = position;
    const newPositions = [
      { column: column + 2, row: row - 1 },
      { column: column + 2, row: row + 1 },
      { column: column - 2, row: row - 1 },
      { column: column - 2, row: row + 1 },
      { column: column + 1, row: row - 2 },
      { column: column + 1, row: row + 2 },
      { column: column - 1, row: row - 2 },
      { column: column - 1, row: row + 2 },
    ];
    const validMoves = [];

    newPositions.forEach((newPosition) => {
      if (ChessUtils.isPositionOnBoard(newPosition) &&
                ChessUtils.isPositionLandable(board, newPosition, this.player)) {
        validMoves.push(newPosition);
      }
    });

    return validMoves;
  }
}
