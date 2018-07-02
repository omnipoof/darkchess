import { connect } from 'react-redux';
import { selectSquare, endTurn, startTurn, promotePawn } from '../actions';
import GameComponent from '../components/Game';

const mapStateToProps = (state) => {
  const {
    boardState: {
      board,
      pieces,
      selectedSquare,
      validMoveSquares,
      allValidMoveSquares,
      currentPlayer,
      hasMoved,
      hasEndedTurn,
      isCheck,
      isCheckmate,
      squareToPromote,
      history,
    },
  } = state;

  return {
    board,
    pieces,
    selectedSquare,
    validMoveSquares,
    allValidMoveSquares,
    currentPlayer,
    hasMoved,
    hasEndedTurn,
    isCheck,
    isCheckmate,
    squareToPromote,
    history,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectSquare: (board, previousSelectedSquare, square, currentPlayer) => {
      dispatch(selectSquare(board, previousSelectedSquare, square, currentPlayer));
    },

    onEndTurn: () => {
      dispatch(endTurn());
    },

    onStartTurn: () => {
      dispatch(startTurn());
    },

    promotePawn: (square, pieceType) => {
      dispatch(promotePawn(square, pieceType));
    },
  };
};

const Game = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameComponent);

export default Game;
