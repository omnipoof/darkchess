export const INITIALIZE_BOARD = 'INITIALIZE_BOARD';

export const SELECT_SQUARE = 'SELECT_SQUARE';

export const initializeBoard = () => {
    return {
        type: INITIALIZE_BOARD,
    }
};

export const selectSquare = (board, previousSelectedSquare, square) => {
    return {
        type: SELECT_SQUARE,
        board,
        previousSelectedSquare,
        square,
    }   
};