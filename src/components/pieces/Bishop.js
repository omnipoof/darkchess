import Piece from './Piece';
import {
  UP,
  LEFT,
  RIGHT,
  DOWN,
  getValidMovesInDirections,
} from '../../utils/boardUtils';

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
    return getValidMovesInDirections(board, position, directions, this.player);
  }
}
