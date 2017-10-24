import { combineReducers } from 'redux';
import boardState from './board';

const darkChessApp = combineReducers({
  boardState,
});

export default darkChessApp;