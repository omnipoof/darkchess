import { combineReducers } from 'redux';
import board from './board';
import selectedSquare from './selection';
import validMoveSquares from './validMoves';

const darkChessApp = combineReducers({
    board,
    selectedSquare,
    validMoveSquares,
});

export default darkChessApp;