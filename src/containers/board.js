import { connect } from 'react-redux';
import { selectSquare, promotePawn } from '../actions';
import BoardComponent from '../components/board';

const mapStateToProps = (state) => {
    const {
        boardState: {
            board,
            pieces,
            selectedSquare,
            validMoveSquares,
            currentPlayer,
            isCheck,
            isCheckmate,
            squareToPromote,
            history,
        }
    } = state;

    return {
        board,
        pieces,
        selectedSquare,
        validMoveSquares,
        currentPlayer,
        isCheck,
        isCheckmate,
        squareToPromote,
        history,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelectSquare: (board, previousSelectedSquare, square, currentPlayer) => {
            dispatch(selectSquare(board, previousSelectedSquare, square, currentPlayer));
        },

        promotePawn: (square, pieceType) => {
            dispatch(promotePawn(square, pieceType));
        }
    }
}

const Board = connect(
    mapStateToProps,
    mapDispatchToProps,
)(BoardComponent)

export default Board;
