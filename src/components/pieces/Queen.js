import Piece from './Piece';
import {
  UP,
  LEFT,
  RIGHT,
  DOWN,
  getValidMovesInDirections,
} from '../../utils/boardUtils';

export default class Queen extends Piece {

  constructor(player) {
    super('queen', player);
  }

  getOptimisticValidMoves(board, position) {

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
    return getValidMovesInDirections(board, position, directions, this.player);
  }
}
