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
    };

    // Find opponent's king
    let opponentsKingSquare = null;
    const playerPieceSquares = [];
    let fileIndex, rankIndex;
    for (fileIndex = 0; fileIndex < 8; fileIndex++) {
      for (rankIndex = 0; rankIndex < 8; rankIndex++) {
        const square = board[fileIndex][rankIndex];
        const piece = square.piece;
        if (piece) {
          if (piece.type === 'king' && piece.player !== this.player) {
            opponentsKingSquare = square;
          } else if (piece.player === this.player) {
            playerPieceSquares.push(square);
          }
        }
      }
    }

    // Find if opponent's king's square is a valid move for any of the current player's pieces
    if (opponentsKingSquare) { // King may not be present during testing
      const isCheck = playerPieceSquares.some((square) => {
        const piece = square.piece;
        const validMoves = piece.getValidMoves(board, square, history);
        return validMoves.some((validMove) => {
          const x = validMove.fileIndex === opponentsKingSquare.fileIndex &&
          validMove.rankIndex === opponentsKingSquare.rankIndex
          return x;
        });
      });
  
      moveInfo.isCheck = isCheck;
    }
    
    moveInfo.algebraicNotation = writeAlgebraicNotation(moveInfo);
    return moveInfo;
  }
}

export default Piece;