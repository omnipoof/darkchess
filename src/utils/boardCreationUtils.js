import { parseAlgebraicNotation } from './algebraicNotation';
import Pawn from '../components/pieces/Pawn';
import Rook from '../components/pieces/Rook';
import Knight from '../components/pieces/Knight';
import Bishop from '../components/pieces/Bishop';
import Queen from '../components/pieces/Queen';
import King from '../components/pieces/King';

export const boardSize = 8;

export const createEmptyBoard = () => {
  const board = Array(boardSize);
  for (let fileIndex = 0; fileIndex < boardSize; fileIndex++) {
    board[fileIndex] = Array(boardSize);
    for (let rankIndex = 0; rankIndex < boardSize; rankIndex++) {
      board[fileIndex][rankIndex] = {
        piece: null,
        fileIndex,
        rankIndex,
      };
    }
  }

  return board;
};

export const createBoard = (algebraicNotationPiecePositions) => {
  const board = createEmptyBoard();
  algebraicNotationPiecePositions.forEach((notation) => {
    const parsedNotation = parseAlgebraicNotation(notation);
    const { player, fileIndex, rankIndex } = parsedNotation;
    let piece;
    switch(parsedNotation.pieceType) {
      case 'bishop':
        piece = new Bishop(player);
        break;
      case 'king':
        piece = new King(player);
        break;
      case 'knight':
        piece = new Knight(player);
        break;
      case 'queen':
        piece = new Queen(player);
        break;
      case 'rook':
        piece = new Rook(player);
        break;
      default:
        piece = new Pawn(player);
    }
    board[fileIndex][rankIndex].piece = piece;
  });

  return board;
};

export const createInitialBoard = () => {
  return createBoard([
    '...Ra8', '...Nb8', '...Bc8', '...Qd8', '...Ke8', '...Bf8', '...Ng8', '...Rh8',
    '...a7', '...b7', '...c7', '...d7', '...e7', '...f7', '...g7', '...h7',
    'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
    'Ra1', 'Nb1', 'Bc1', 'Qd1', 'Ke1', 'Bf1', 'Ng1', 'Rh1',
  ]);
};
