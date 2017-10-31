import { parseAlgebraicNotation } from './algebraicNotation';
import Pawn from '../components/pieces/Pawn';
import Rook from '../components/pieces/Rook';
import Knight from '../components/pieces/Knight';
import Bishop from '../components/pieces/Bishop';
import Queen from '../components/pieces/Queen';
import King from '../components/pieces/King';

export const boardSize = 8;

export const UP = 1;
export const LEFT = 2;
export const RIGHT = 4;
export const DOWN = 8;

export const createEmptyBoard = () => {

  const board = Array(boardSize);
  for (let fileIndex = 0; fileIndex < boardSize; fileIndex++) {
    board[fileIndex] = Array(boardSize);
    for (let rankIndex = 0; rankIndex < boardSize; rankIndex++) {
      board[fileIndex][rankIndex] = {
        piece: null,
        fileIndex,
        rankIndex: rankIndex,
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

export const isPositionOnBoard = (position) => {
  const { fileIndex, rankIndex } = position;
  return fileIndex >= 0 && fileIndex < boardSize && rankIndex >= 0 && rankIndex < boardSize;
}

export const isPositionLandable = (board, position, currentPlayer) => {

  if (isPositionOnBoard(position)) {
    const { fileIndex, rankIndex } = position;
    const square = board[fileIndex][rankIndex];
    return square.piece === null || square.piece.player !== currentPlayer;
  }
  
  return false;
}

export const getAdjacentPosition = (position, direction) => {

  const { fileIndex, rankIndex } = position;
  const newPosition = {
    fileIndex: fileIndex + (direction & LEFT ? -1 : (direction & RIGHT ? 1 : 0)),
    rankIndex: rankIndex + (direction & UP ? -1 : (direction & DOWN ? 1 : 0)),
  };

  return isPositionOnBoard(newPosition) ? newPosition : null;
}

export const getValidMovesInDirection = (board, currentPosition, direction, currentPlayer, recurse, validMoves) => {
  
  const nextPosition = getAdjacentPosition(currentPosition, direction);
  if (nextPosition !== null) {
    const square = board[nextPosition.fileIndex][nextPosition.rankIndex];
    if (isPositionLandable(board, nextPosition, currentPlayer)) {
      validMoves.push(nextPosition);
      if (recurse && square.piece === null) {
        return getValidMovesInDirection(board, nextPosition, direction, currentPlayer, recurse, validMoves);
      }
    }
  }

  return validMoves;
};

export const getValidMovesInDirections = (board, position, directions, currentPlayer, recurse = true) => {

  const validMoves = [];
  directions.forEach((direction) => {
    getValidMovesInDirection(board, position, direction, currentPlayer, recurse, validMoves);
  });

  return validMoves;
}
