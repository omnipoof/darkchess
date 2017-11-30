import ObjectID from 'bson-objectid';
import { writeAlgebraicNotation } from '../../utils/algebraicNotation';

class Piece {

  constructor(type, player) {
        
    if (new.target === Piece) {
      throw new TypeError('Piece is an abstract class and cannot be instantiated.');
    }
    this.enforceMethodAbstraction('getValidMoves');

    this.id = ObjectID();
    this.type = type;
    this.player = player;
  }

  enforceMethodAbstraction(methodName) {
    if (this[methodName] === undefined) {
      throw new TypeError(`${ methodName } is an abstract method and must be implemented.`);
    }
  }

  move(board, originSquare, destinationSquare) {
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
    };
    moveInfo.algebraicNotation = writeAlgebraicNotation(moveInfo);
    return moveInfo;
  }
}

export default Piece;