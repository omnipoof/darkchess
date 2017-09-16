import Piece from './Piece';
import ChessUtils, { UP, LEFT, RIGHT, DOWN } from '../../ChessUtils';

export default class King extends Piece {

  constructor(player) {
    super('king', player);
  }

  getValidMoves(board, position) {

    const directions = [
      UP | LEFT,
      UP,
      UP | RIGHT,
      LEFT,
      RIGHT,
      DOWN | LEFT,
      DOWN,
      DOWN | RIGHT,
    ];
    return ChessUtils.getValidMovesInDirections(board, position, directions, this.player, false);
  }
}
