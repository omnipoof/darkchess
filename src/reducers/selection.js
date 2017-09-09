import { SELECT_SQUARE } from '../actions';

const toggleSquareSelection = (selectedSquare, square) => {
    if (selectedSquare && selectedSquare.column === square.column && selectedSquare.row === square.row) {
        return null;
    }

    if (square.piece === null) {
        return null;
    }

    return square;
}

const selectedSquare = (selectedSquare = null, action) => {
    switch (action.type) {
        case SELECT_SQUARE:
            return toggleSquareSelection(selectedSquare, action.square);
        default:
            return selectedSquare;
    }
}

export default selectedSquare;
