import Pawn from '../components/pieces/Pawn';
import Rook from '../components/pieces/Rook';
import Knight from '../components/pieces/Knight';
import Bishop from '../components/pieces/Bishop';
import Queen from '../components/pieces/Queen';
import King from '../components/pieces/King';
import { createInitialBoard } from '../utils/boardUtils';

import { INITIALIZE_BOARD, SELECT_SQUARE } from '../actions';

const boardState = (state = {
  board: createInitialBoard(),
  selectedSquare: null,
  validMoveSquares: [],
  currentPlayer: 'white',
  history: [],
}, action) => {

  const { board, selectedSquare, validMoveSquares, currentPlayer } = state;
  const newState = { board, selectedSquare, validMoveSquares, currentPlayer }
  switch (action.type) {
    case INITIALIZE_BOARD:
      newState.board = createInitialBoard();
      break;
    case SELECT_SQUARE:
      const { board } = state;
      const { square } = action;

      if (selectedSquare) {

        if (selectedSquare.fileIndex === square.fileIndex && selectedSquare.rankIndex === square.rankIndex) {
          // If the same square is selected, deselect the square
          newState.selectedSquare = null;
          newState.validMoveSquares = [];
        } else if (selectedSquare.piece && square.piece && selectedSquare.piece.player === square.piece.player) {
          // If a square with another of the player's pieces is selected, select the square
          newState.selectedSquare = square;
          newState.validMoveSquares = getValidMovesFromSquare(board, square);
        } else if (validMoveSquares.some(validMoveSquare => (
          square.fileIndex === validMoveSquare.fileIndex && square.rankIndex === validMoveSquare.rankIndex
        ))) {
          // If a valid move square is selected, move the piece, deselect the square, and change players
          square.piece = selectedSquare.piece;
          selectedSquare.piece = null;
          if (square.piece.type === 'pawn') {
            square.piece.setHasMoved();
          }
          newState.selectedSquare = null;
          newState.validMoveSquares = [];
          newState.currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
        }
      } else if (square.piece && currentPlayer === square.piece.player) {
        newState.selectedSquare = square;
        newState.validMoveSquares = getValidMovesFromSquare(board, square);
      }
      break;
  }

  return newState;
};

const updateBoardPositions = (action) => {
  let { board, previousSelectedSquare, square } = action;
  if (previousSelectedSquare) {
    board = board.map(array => array.slice());
    board[square.column][square.row].piece = previousSelectedSquare.piece;
    board[previousSelectedSquare.column][previousSelectedSquare.row].piece = null;
  }

  return board;
};

const toggleSquareSelection = (selectedSquare, square) => {
  if (selectedSquare && selectedSquare.column === square.column && selectedSquare.row === square.row) {
    return null;
  }

  if (square.piece === null) {
    return null;
  }

  return square;
};

const getValidMovesFromSquare = (board, square) => {
  const piece = square.piece;
  return piece ? piece.getValidMoves(board, square) : [];
};

export default boardState;
