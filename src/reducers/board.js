import Pawn from '../components/pieces/Pawn';
import Rook from '../components/pieces/Rook';
import Knight from '../components/pieces/Knight';
import Bishop from '../components/pieces/Bishop';
import Queen from '../components/pieces/Queen';
import King from '../components/pieces/King';

import { INITIALIZE_BOARD, SELECT_SQUARE } from '../actions';

const getInitializedBoard = () => {
    
  const board = Array(8);
  for (let column = 0; column < 8; column++) {
    board[column] = Array(8);
    for (let row = 0; row < 8; row++) {
      board[column][row] = {
        piece: null,
        column,
        row,
      };
    }
  }

  board[0][1].piece = new Rook('black');
  board[1][0].piece = new Knight('black');
  board[2][0].piece = new Bishop('black');
  board[3][0].piece = new King('black');
  board[4][0].piece = new Queen('black');
  board[5][0].piece = new Bishop('black');
  board[6][0].piece = new Knight('black');
  board[7][1].piece = new Rook('black');
  // for (let i = 0; i < 8; i++) {
  board[1][2].piece = new Pawn('black');
  board[5][4].piece = new Pawn('black');
  board[2][3].piece = new Pawn('white');
  board[5][5].piece = new Pawn('white');
  board[6][5].piece = new Pawn('white');
  // }
  board[0][6].piece = new Rook('white');
  board[1][7].piece = new Knight('white');
  board[2][7].piece = new Bishop('white');
  board[3][7].piece = new King('white');
  board[4][7].piece = new Queen('white');
  board[5][7].piece = new Bishop('white');
  board[6][7].piece = new Knight('white');
  board[7][6].piece = new Rook('white');

  return board;
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

const board = (board = getInitializedBoard(), action) => {

  switch (action.type) {
  case INITIALIZE_BOARD:
    return getInitializedBoard();
  case SELECT_SQUARE:
    return updateBoardPositions(action);
  default:
    return board;
  }
};

export default board;
