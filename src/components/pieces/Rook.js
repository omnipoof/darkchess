import Piece from './Piece';
import ChessUtils, { UP, LEFT, RIGHT, DOWN } from '../../ChessUtils';

export default class Rook extends Piece {

  constructor(player) {
    super('rook', player);
  }

  getValidMoves(board, position) {

    const directions = [
      UP,
      LEFT,
      RIGHT,
      DOWN,
    ];
    return ChessUtils.getValidMovesInDirections(board, position, directions, this.player);
  }
}
