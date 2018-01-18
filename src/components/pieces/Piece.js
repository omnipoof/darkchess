import ObjectID from 'bson-objectid';
import { writeAlgebraicNotation } from '../../utils/algebraicNotation';
import {
  cloneBoard,
  getPlayersKingSquare,
  getValidMovesForAllPlayersPieces,
  isPlayersKingInCheck,
} from '../../utils/boardUtils';

class Piece {

  constructor(type, player) {
        
    if (new.target === Piece) {
      throw new TypeError('Piece is an abstract class and cannot be instantiated.');
    }
    this.enforceMethodAbstraction('getOptimisticValidMoves');

    this.id = ObjectID();
    this.type = type;
    this.player = player;
  }

  enforceMethodAbstraction(methodName) {
    if (this[methodName] === undefined) {
      throw new TypeError(`${ methodName } is an abstract method and must be implemented.`);
    }
  }

  getValidMoves(board, originSquare, history, filterCheckMoves) {
    let validMoves = this.getOptimisticValidMoves(board, originSquare, history);
    if (filterCheckMoves) {
      validMoves = validMoves.filter((validMove) => {
        const clonedBoard = cloneBoard(board);
        const clonedOriginSquare = clonedBoard[originSquare.fileIndex][originSquare.rankIndex];
        const clonedValidMove = clonedBoard[validMove.fileIndex][validMove.rankIndex];
        const clonedHistory = history.slice();
        const moveInfo = this.move(clonedBoard, clonedOriginSquare, clonedValidMove, clonedHistory);
        const isCheck = isPlayersKingInCheck(moveInfo.board, history, this.player);
        return !isCheck;
      });
    }
    return validMoves;
  }

  move(board, originSquare, destinationSquare, history) {
    const capturedPiece = destinationSquare.piece;
    destinationSquare.piece = originSquare.piece;
    originSquare.piece = null;
    const moveInfo = {
      board,
      player: this.player,
      piece: this,
      pieceType: this.type,
      fileIndex: destinationSquare.fileIndex,
      rankIndex: destinationSquare.rankIndex,
      capturedPiece,
      isCapture: capturedPiece,
      isCheck: isPlayersKingInCheck(board, history, this.player === 'white' ? 'black' : 'white'),
    };
    
    moveInfo.algebraicNotation = writeAlgebraicNotation(moveInfo);
    return moveInfo;
  }
}

export default Piece;