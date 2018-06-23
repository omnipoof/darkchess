import Piece from './Piece';
import {
  UP,
  LEFT,
  RIGHT,
  DOWN,
  getValidMovesInDirections,
} from '../../utils/boardUtils';
import { writeAlgebraicNotation } from '../../utils/algebraicNotation';

export default class King extends Piece {
  constructor(player) {
    super('king', player);
  }

  canCastle(withQueenSideRook, board) {
    // Castling Requirements: https://en.wikipedia.org/wiki/Castling#Requirements

    if (this.hasMoved) {
      return false; // Cannot castle if king has already moved (1, 2)
    }

    // Allow castling when king is in check (/4)

    const kingFileIndex = 4;
    const kingRankIndex = this.player === 'white' ? 7 : 0;
    const rookFileIndex = withQueenSideRook ? 0 : 7;
    const rook = board[rookFileIndex][kingRankIndex].piece;
    if (!rook || rook.type !== 'rook' || rook.hasMoved) {
      return false; // Cannot castle if rook has already moved (1, 2)
    }

    const minIndex = Math.min(kingFileIndex, rookFileIndex);
    const maxIndex = Math.max(kingFileIndex, rookFileIndex);
    for (let fileIndex = minIndex + 1; fileIndex < maxIndex; fileIndex++) {
      if (board[fileIndex][kingRankIndex].piece) {
        return false; // Cannot castle through pieces (3)
      }
    }

    // Allow castling if the king moves through or lands on a square that's in check (/5, /6)
    return true;
  }

  getOptimisticValidMoves(board, position, history, isOfficialRequest) {

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
    const validMoves = getValidMovesInDirections(board, position, directions, this.player, false);

    // Check for castling valid moves
    if (isOfficialRequest && this.canCastle(true, board, history)) {
      validMoves.push({
        originFileIndex: position.fileIndex,
        originRankIndex: position.rankIndex,
        destinationFileIndex: 2,
        destinationRankIndex: position.rankIndex,
      });
    }

    if (isOfficialRequest && this.canCastle(false, board, history)) {
      validMoves.push({
        originFileIndex: position.fileIndex,
        originRankIndex: position.rankIndex,
        destinationFileIndex: 6,
        destinationRankIndex: position.rankIndex,
      });
    }

    return validMoves;
  }

  move(board, originSquare, destinationSquare, history, isOfficialMove) {
    const moveInfo = super.move(board, originSquare, destinationSquare, history, isOfficialMove);
    const { fileIndex: originFileIndex } = originSquare;
    const { fileIndex: destinationFileIndex, rankIndex: destinationRankIndex } = destinationSquare;
    if (Math.abs(originFileIndex - destinationFileIndex) === 2) {
      // A castling move occurred because the king moved two spaces
      const rookOriginFileIndex = originFileIndex < destinationFileIndex ? 7 : 0;
      const rookDestinationFileIndex = destinationFileIndex + (originFileIndex < destinationFileIndex ? -1 : 1);
      const rookOriginRankIndex = destinationRankIndex;
      const rookDestinationRankIndex = destinationRankIndex;

      // Move the rook
      const rook = board[rookOriginFileIndex][rookOriginRankIndex].piece;
      board[rookDestinationFileIndex][rookDestinationRankIndex].piece = rook;
      board[rookOriginFileIndex][rookOriginRankIndex].piece = null;

      // Update the move information
      moveInfo.board = board;
      moveInfo.hasCastled = true;
      moveInfo.algebraicNotation = writeAlgebraicNotation(moveInfo);
    }

    return moveInfo;
  }
}
