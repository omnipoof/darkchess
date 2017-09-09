import { SELECT_SQUARE } from '../actions';

const getValidMovesFromSquare = (board, square) => {
    const piece = square.piece;
    return piece ? piece.getValidMoves(board, square) : [];
}

const validMovesSquares = (validMoveSquares = [], action) => {
    switch (action.type) {
        case SELECT_SQUARE:
            return getValidMovesFromSquare(action.board, action.square);
        default:
            return validMoveSquares;
    }
}

export default validMovesSquares;
