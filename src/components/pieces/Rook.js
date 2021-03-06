import Piece from './Piece';
import {
  UP,
  LEFT,
  RIGHT,
  DOWN,
  getValidMovesInDirections,
} from '../../utils/boardUtils';

export default class Rook extends Piece {

  constructor(player) {
    super('rook', player);
  }

  getOptimisticValidMoves(board, position) {

    const directions = [
      UP,
      LEFT,
      RIGHT,
      DOWN,
    ];
    return getValidMovesInDirections(board, position, directions, this.player);
  }
}
