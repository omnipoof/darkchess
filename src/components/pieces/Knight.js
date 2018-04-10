import Piece from './Piece';
import {
  isPositionLandable,
} from '../../utils/boardUtils';

export default class Knight extends Piece {

  constructor(player) {
    super('knight', player);
  }

  getOptimisticValidMoves(board, position) {

    const { fileIndex, rankIndex } = position;
    const newPositions = [
      { fileIndex: fileIndex + 2, rankIndex: rankIndex - 1 },
      { fileIndex: fileIndex + 2, rankIndex: rankIndex + 1 },
      { fileIndex: fileIndex - 2, rankIndex: rankIndex - 1 },
      { fileIndex: fileIndex - 2, rankIndex: rankIndex + 1 },
      { fileIndex: fileIndex + 1, rankIndex: rankIndex - 2 },
      { fileIndex: fileIndex + 1, rankIndex: rankIndex + 2 },
      { fileIndex: fileIndex - 1, rankIndex: rankIndex - 2 },
      { fileIndex: fileIndex - 1, rankIndex: rankIndex + 2 },
    ];
    const validMoves = [];

    newPositions.forEach((newPosition) => {
      if (isPositionLandable(board, newPosition, this.player)) {
        validMoves.push({
          originFileIndex: position.fileIndex,
          originRankIndex: position.rankIndex,
          destinationFileIndex: newPosition.fileIndex,
          destinationRankIndex: newPosition.rankIndex,
        });
      }
    });

    return validMoves;
  }
}
