import Rook from '../components/pieces/Rook';
import Knight from '../components/pieces/Knight';
import Bishop from '../components/pieces/Bishop';
import Queen from '../components/pieces/Queen';
import {
  isPlayersKingInCheck,
  isPlayersKingCheckmated,
} from './boardUtils';
import {
  parseAlgebraicNotation,
  writeAlgebraicNotation,
} from './algebraicNotation';

export const promotePawn = (board, history, pawnSquare, pieceType) => {
  const { fileIndex, rankIndex } = pawnSquare;
  const pawn = board[fileIndex][rankIndex].piece;
  const { player } = pawn;

  // Create the new piece and replace the pawn with it
  let newPiece;
  switch (pieceType) {
    case 'rook':
      newPiece = new Rook(player);
      break;
    case 'knight':
      newPiece = new Knight(player);
      break;
    case 'bishop':
      newPiece = new Bishop(player);
      break;
    case 'queen':
      newPiece = new Queen(player);
      break;
    default:
      newPiece = pawn;
  }
  board[fileIndex][rankIndex].piece = newPiece;

  // Update the history to reflect the promotion
  const lastMoveNotation = history.pop().move;
  const lastMove = parseAlgebraicNotation(lastMoveNotation);
  lastMove.promotedPieceType = newPiece.type !== 'pawn' && pieceType;
  history.push({
    move: writeAlgebraicNotation(lastMove),
    board,
  });

  // Use the history to determine check and checkmate state and update the history with it
  const otherPlayer = player === 'white' ? 'black' : 'white';
  lastMove.isCheck = isPlayersKingInCheck(board, history, otherPlayer);
  lastMove.isCheckmate = isPlayersKingCheckmated(board, history, otherPlayer);
  history[history.length - 1].move = writeAlgebraicNotation(lastMove);
};
