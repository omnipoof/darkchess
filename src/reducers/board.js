import Pawn from '../components/pieces/Pawn';
import Rook from '../components/pieces/Rook';
import Knight from '../components/pieces/Knight';
import Bishop from '../components/pieces/Bishop';
import Queen from '../components/pieces/Queen';
import King from '../components/pieces/King';
import { createInitialBoard } from '../utils/boardCreationUtils';
import { cloneBoard } from '../utils/boardUtils';

import { INITIALIZE_BOARD, SELECT_SQUARE } from '../actions';

const createInitialState = () => {
  const board = createInitialBoard();
  return {
    board,
    selectedSquare: null,
    validMoveSquares: [],
    currentPlayer: 'white',
    history: [{
      move: 'Start',
      board,
    }],
  }
};

const boardState = (state = createInitialState(), action) => {

  const { board, selectedSquare, validMoveSquares, currentPlayer, isCheck, history } = state;
  const newState = { board: cloneBoard(board), selectedSquare, validMoveSquares, currentPlayer, isCheck, history }
  switch (action.type) {
    case INITIALIZE_BOARD:
      return createInitialState();
    case SELECT_SQUARE:
      const { square } = action;

      if (selectedSquare) {

        if (selectedSquare.fileIndex === square.fileIndex && selectedSquare.rankIndex === square.rankIndex) {
          // If the same square is selected, deselect the square
          newState.selectedSquare = null;
          newState.validMoveSquares = [];
        } else if (selectedSquare.piece && square.piece && selectedSquare.piece.player === square.piece.player) {
          // If a square with another of the player's pieces is selected, select the square
          newState.selectedSquare = square;
          newState.validMoveSquares = getValidMovesFromSquare(board, square, history);
        } else if (validMoveSquares.some(validMoveSquare => (
          square.fileIndex === validMoveSquare.fileIndex && square.rankIndex === validMoveSquare.rankIndex
        ))) {
          // If a valid move square is selected, move the piece, deselect the square, change players, and update the history
          const moveInfo = selectedSquare.piece.move(
            newState.board,
            newState.board[selectedSquare.fileIndex][selectedSquare.rankIndex],
            newState.board[square.fileIndex][square.rankIndex],
            newState.history,
          );

          newState.selectedSquare = null;
          newState.validMoveSquares = [];
          newState.isCheck = moveInfo.isCheck;
          newState.currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
          newState.history.push({
            move: moveInfo.algebraicNotation,
            board: newState.board,
          });
        }
      } else if (square.piece && currentPlayer === square.piece.player) {
        newState.selectedSquare = square;
        newState.validMoveSquares = getValidMovesFromSquare(board, square, history);
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

const getValidMovesFromSquare = (board, square, history) => {
  const piece = square.piece;
  return piece ? piece.getValidMoves(board, square, history, true) : [];
};

export default boardState;
