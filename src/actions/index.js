export const INITIALIZE_BOARD = 'INITIALIZE_BOARD';

export const SELECT_SQUARE = 'SELECT_SQUARE';

export const PROMOTE_PAWN = 'PROMOTE_PAWN';

export const initializeBoard = () => {
  return {
    type: INITIALIZE_BOARD,
  };
};

export const selectSquare = (board, previousSelectedSquare, square) => {
  return {
    type: SELECT_SQUARE,
    board,
    previousSelectedSquare,
    square,
  };   
};

export const promotePawn = (square, pieceType) => {
  return {
    type: PROMOTE_PAWN,
    square,
    pieceType,
  };
};
