import Piece from './Piece';
import {
  UP,
  LEFT,
  RIGHT,
  DOWN,
  getAdjacentPosition,
} from '../../utils/boardUtils';
import {
  parseAlgebraicNotation,
  writeAlgebraicNotation,
} from '../../utils/algebraicNotation';

export default class Pawn extends Piece {

  constructor(player) {
    super('pawn', player);
    this.state = {
      hasMoved: false,
    };
  }

  getValidMoves(board, position, history) {

    const getPiece = (position) => {
      const { fileIndex, rankIndex } = position;
      return board[fileIndex][rankIndex].piece;
    }

    const isPositionOccupied = (position) => {
      return getPiece(position) !== null;
    };

    const isPositionOccupiedByOpponent = (position) => {
      const piece = getPiece(position);
      return piece && piece.player !== this.player;
    };

    const didOpponentMovePawnTwoSquares = (opponentPawn) => {
      const clonedHistory = history.slice();
      const { move: lastOpponentMove, board: lastOpponentBoardState } = clonedHistory.pop();
      const parsedLastMove = parseAlgebraicNotation(lastOpponentMove);
      // Check if the opponent potentially moved a pawn from its initial position during their last turn
      if (
        !parsedLastMove.isCapture
        && parsedLastMove.pieceType === 'pawn'
        && parsedLastMove.rankIndex === (this.player === 'white' ? 3 : 4)
      ) {
        clonedHistory.pop(); // Ignore the current player's last move
        
        const { board: secondLastOpponentBoardState } = clonedHistory.pop();
        // Check if the opponent's pawn was in its initial position during their second to last turn
        const square = secondLastOpponentBoardState[parsedLastMove.fileIndex][this.player === 'white' ? 1 : 6];
        const lastMovedPawn = lastOpponentBoardState[parsedLastMove.fileIndex][parsedLastMove.rankIndex].piece;
        const pieceInPawnInitialPosition = square.piece;
        if (pieceInPawnInitialPosition) {
          // True if the opponent has a piece in the initial location
          return lastMovedPawn.id === pieceInPawnInitialPosition.id && lastMovedPawn.id === opponentPawn.id;
        }
      }
    }
        
    const { hasMoved } = this.state;
    const verticalDirection = this.player === 'black' ? DOWN : UP;
    const validMoves = [];

    // Check if moving one square is possible
    let nextPosition = getAdjacentPosition(position, verticalDirection);
    if (nextPosition && !isPositionOccupied(nextPosition)) {
      validMoves.push(nextPosition);
      // Check if a two square initial move is possible
      nextPosition = getAdjacentPosition(nextPosition, verticalDirection);
      if (!hasMoved && !isPositionOccupied(nextPosition)) {
        validMoves.push(nextPosition);
      }
    }

    // Check if the pawn can capture diagonally
    nextPosition = getAdjacentPosition(position, LEFT | verticalDirection);
    if (nextPosition && isPositionOccupiedByOpponent(nextPosition)) {
      validMoves.push(nextPosition);
    }

    nextPosition = getAdjacentPosition(position, RIGHT | verticalDirection);
    if (nextPosition && isPositionOccupiedByOpponent(nextPosition)) {
      validMoves.push(nextPosition);
    }

    // Check if the pawn can capture en passant
    nextPosition = getAdjacentPosition(position, LEFT);
    if (
      nextPosition
        && isPositionOccupiedByOpponent(nextPosition)
        && getPiece(nextPosition).type === 'pawn'
        && didOpponentMovePawnTwoSquares(getPiece(nextPosition))
    ) {
      validMoves.push(getAdjacentPosition(position, LEFT | verticalDirection))
    }

    nextPosition = getAdjacentPosition(position, RIGHT);
    if (
      nextPosition
        && isPositionOccupiedByOpponent(nextPosition)
        && getPiece(nextPosition).type === 'pawn'
        && didOpponentMovePawnTwoSquares(getPiece(nextPosition))
    ) {
      validMoves.push(getAdjacentPosition(position, RIGHT | verticalDirection))
    }

    return validMoves;
  }

  move(board, originSquare, destinationSquare, history) {
    const moveInfo = super.move(board, originSquare, destinationSquare, history);
    if (!moveInfo.isCapture && originSquare.fileIndex !== destinationSquare.fileIndex) {
      // An en passant capture occurred because the pawn moved diagonally but did not capture a piece normally
      moveInfo.isCapture = moveInfo.isEnPassantCapture = true;
      moveInfo.originFileIndex = originSquare.fileIndex;
      moveInfo.capturedPiece = board[destinationSquare.fileIndex][originSquare.rankIndex].piece;
      board[destinationSquare.fileIndex][originSquare.rankIndex].piece = null;
      moveInfo.board = board;
      moveInfo.algebraicNotation = writeAlgebraicNotation(moveInfo);
    } else if (moveInfo.isCapture) {
      moveInfo.originFileIndex = originSquare.fileIndex;
      moveInfo.algebraicNotation = writeAlgebraicNotation(moveInfo);
    }

    this.state = {
      hasMoved: true,
    }

    return moveInfo;
  }
}
