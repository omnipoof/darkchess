import { connect } from 'react-redux';
import { selectSquare, promotePawn } from '../actions';
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
