import Piece from './Piece';
import ChessUtils, { UP, LEFT, RIGHT, DOWN } from '../../ChessUtils';

export default class Bishop extends Piece {

  constructor(player) {
    super('bishop', player);
  }

  getValidMoves(board, position) {

    const directions = [
      UP | LEFT,
      UP | RIGHT,
      DOWN | LEFT,
      DOWN | RIGHT,
    ];
    return ChessUtils.getValidMovesInDirections(board, position, directions, this.player);
  }
}
