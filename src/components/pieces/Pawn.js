import Piece from './Piece';
import ChessUtils, { UP, LEFT, RIGHT, DOWN } from '../../ChessUtils';

export default class Pawn extends Piece {

    constructor(player) {
        super('pawn', player);
        this.state = {
            hasMoved: false,
            movedTwoSquaresInitially: false,
        }
    }

    getValidMoves(board, position) {
        
        const isPositionEmpty = (position) => { // MOVE TO CHESSUTILS

            if (ChessUtils.isPositionOnBoard(position)) {
                const square = board[position.column][position.row];
                return square.piece === null;
            }

            return false;
        };

        const isPositionOccupiedByOpponent = (position, currentPlayer) => { // MOVE TO CHESSUTILS

            if (ChessUtils.isPositionOnBoard(position)) {
                const square = board[position.column][position.row];
                return square.piece !== null && square.piece.player !== currentPlayer;
            }
        }

        const { hasMoved } = this.state;
        const newPositions = [];
        const verticalDirection = this.player === 'black' ? DOWN : UP;
        let validMoves = [];

        // Check if moving one square is possible
        let nextPosition = ChessUtils.getAdjacentPosition(position, verticalDirection);
        if (nextPosition && isPositionEmpty(nextPosition)) {
            validMoves.push(nextPosition);
            // Check if a two square initial move is possible
            nextPosition = ChessUtils.getAdjacentPosition(nextPosition, verticalDirection);
            if (!hasMoved && isPositionEmpty(nextPosition)) {
                validMoves.push(nextPosition);
            }
        }

        // Check if the pawn can capture diagonally
        nextPosition = ChessUtils.getAdjacentPosition(position, LEFT | verticalDirection);
        if (nextPosition && isPositionOccupiedByOpponent(nextPosition, this.player)) {
            validMoves.push(nextPosition);
        }

        nextPosition = ChessUtils.getAdjacentPosition(position, RIGHT | verticalDirection);
        if (nextPosition && isPositionOccupiedByOpponent(nextPosition, this.player)) {
            validMoves.push(nextPosition);
        }

        newPositions.forEach((newPosition) => {
            if (ChessUtils.isPositionOnBoard(newPosition) &&
                ChessUtils.isPositionLandable(board, newPosition, this.player)) {
                validMoves.push(newPosition);
            }
        });

        return validMoves;
    }
}
