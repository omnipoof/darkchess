import Piece from './Piece';
import {
  UP,
  LEFT,
  RIGHT,
  DOWN,
  getValidMovesInDirections,
  getValidMovesForAllPlayersPieces,
} from '../../utils/boardUtils';
import { parseAlgebraicNotation } from '../../utils/algebraicNotation';

export default class King extends Piece {
  constructor(player) {
    super('king', player);
  }

  canCastle(withQueenSideRook, board, history) {
    // Castling Requirements: https://en.wikipedia.org/wiki/Castling#Requirements

    if (this.hasMoved) {
      return false; // Cannot castle if king has already moved (1, 2)
    }

    if (history.length > 1) {
      const lastMove = history.slice().pop();
      const moveInfo = parseAlgebraicNotation(lastMove.move);
      if (moveInfo.isCheck) {
        return false; // Cannot castle when king is in check (4)
      }
    }

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

    const opponentsValidMoves = getValidMovesForAllPlayersPieces(board, history, this.player === 'white' ? 'black' : 'white');
    return !opponentsValidMoves.some(({ destinationSquare }) => (
      // Cannot castle if the king moves through or lands on a square that's in check (5, 6)
      destinationSquare.rankIndex === kingRankIndex && (
        destinationSquare.fileIndex === kingFileIndex + (withQueenSideRook ? -1 : 1) ||
        destinationSquare.fileIndex === kingFileIndex + (withQueenSideRook ? -2 : 2)
      )
    ));
  }

  getOptimisticValidMoves(board, position, history) {

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
    if (this.canCastle(true, board, history)) {
      validMoves.push({
        fileIndex: 2,
        rankIndex: position.rankIndex,
      });
    }

    if (this.canCastle(false, board, history)) {
      validMoves.push({
        fileIndex: 6,
        rankIndex: position.rankIndex,
      });
    }

    return validMoves;
  }
}
