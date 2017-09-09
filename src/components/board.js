import React, { Component } from 'react';
import Square from './square';

class Board extends Component {

    reflectBoard = (board) => {

        let column, row;
        const newBoard = Array(8);
        for (column = 0; column < 8; column++) {
            newBoard[column] = Array(8);
            for (row = 0; row < 8; row++) {
                newBoard[column][row] = null;
            }
        }

        for (column = 0; column < 8; column++) {
            for (row = 0; row < 8; row++) {
                newBoard[row][column] = board[column][row];
            }
        }

        return newBoard;
    }

    isValidMoveSquare(square) {
        const { validMoveSquares } = this.props;
        for (let i = 0; i < validMoveSquares.length; i++) {
            const validMoveSquare = validMoveSquares[i];
            if (validMoveSquare.column === square.column && validMoveSquare.row === square.row) {
                return true;
            }
        }

        return false;
    }
    
    render() {
        const { board, selectedSquare, onSelectSquare } = this.props;
        let counter = 0;
        return (
            <div>
                {
                    this.reflectBoard(board).map(row =>
                        <div key={counter++}>
                            {row.map((square) =>
                                <Square
                                    key={counter++}
                                    board={ board }
                                    square={ square }
                                    isSelected={ selectedSquare && square.column === selectedSquare.column && square.row === selectedSquare.row }
                                    isHighlighted={ this.isValidMoveSquare(square) }
                                    onSelectSquare={ () => onSelectSquare(board, selectedSquare, square) }
                                />
                            )}
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Board;
