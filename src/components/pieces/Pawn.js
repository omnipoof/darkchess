import Piece from './Piece';
import {
  UP,
  LEFT,
  RIGHT,
  DOWN,
  getAdjacentPosition,
} from '../../utils/boardUtils';

export default class Pawn extends Piece {

  constructor(player) {
    super('pawn', player);
    this.state = {
      hasMoved: false,
    };
  }

  setHasMoved() {
    this.state = {
      hasMoved: true,
    }
  }

  getValidMoves(board, position) {

    const getPiece = (position) => {
      const { fileIndex, rankIndex } = position;
      return board[fileIndex][rankIndex].piece;
    }

    const isPositionOccupied = (position) => {
      return getPiece(position) !== null;
    };

    const isPositionOccupiedByOpponent = (position) => {
      const piece = getPiece(position);
      return piece && piece.player !== this.player;
    };
        
    const { hasMoved } = this.state;
    const verticalDirection = this.player === 'black' ? DOWN : UP;
    const validMoves = [];

    // Check if moving one square is possible
    let nextPosition = getAdjacentPosition(position, verticalDirection);
    if (nextPosition && !isPositionOccupied(nextPosition)) {
      validMoves.push(nextPosition);
      // Check if a two square initial move is possible
      nextPosition = getAdjacentPosition(nextPosition, verticalDirection);
      if (!hasMoved && !isPositionOccupied(nextPosition)) {
        validMoves.push(nextPosition);
      }
    }

    // Check if the pawn can capture diagonally
    nextPosition = getAdjacentPosition(position, LEFT | verticalDirection);
    if (nextPosition && isPositionOccupiedByOpponent(nextPosition)) {
      validMoves.push(nextPosition);
    }

    nextPosition = getAdjacentPosition(position, RIGHT | verticalDirection);
    if (nextPosition && isPositionOccupiedByOpponent(nextPosition)) {
      validMoves.push(nextPosition);
    }

    return validMoves;
  }
}
