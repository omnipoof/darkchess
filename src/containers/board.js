import { connect } from 'react-redux';
import { selectSquare } from '../actions';
import BoardComponent from '../components/board';

const getBoard = (board) => {
    return board;
}

const mapStateToProps = (state) => {
    return {
        board: state.board,
        selectedSquare: state.selectedSquare,
        validMoveSquares: state.validMoveSquares,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelectSquare: (board, previousSelectedSquare, square) => {
            dispatch(selectSquare(board, previousSelectedSquare, square));
        }
    }
}

const Board = connect(
    mapStateToProps,
    mapDispatchToProps,
)(BoardComponent)

export default Board;
