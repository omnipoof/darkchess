import { connect } from 'react-redux';
import { selectSquare } from '../actions';
import BoardComponent from '../components/board';

const mapStateToProps = (state) => {
    const { boardState: { board, selectedSquare, validMoveSquares, currentPlayer, isCheck, isCheckmate, history } } = state;
    return {
        board,
        selectedSquare,
        validMoveSquares,
        currentPlayer,
        isCheck,
        isCheckmate,
        history,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelectSquare: (board, previousSelectedSquare, square, currentPlayer) => {
            dispatch(selectSquare(board, previousSelectedSquare, square, currentPlayer));
        }
    }
}

const Board = connect(
    mapStateToProps,
    mapDispatchToProps,
)(BoardComponent)

export default Board;
