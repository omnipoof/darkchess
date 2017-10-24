import React, { Component } from 'react';
import Square from './square';

class Board extends Component {

    reflectBoard = (board) => {

        let fileIndex, rankIndex;
        const newBoard = Array(8);
        for (fileIndex = 0; fileIndex < 8; fileIndex++) {
            newBoard[fileIndex] = Array(8);
            for (rankIndex = 0; rankIndex < 8; rankIndex++) {
                newBoard[fileIndex][rankIndex] = null;
            }
        }

        for (fileIndex = 0; fileIndex < 8; fileIndex++) {
            for (rankIndex = 0; rankIndex < 8; rankIndex++) {
                newBoard[rankIndex][fileIndex] = board[fileIndex][rankIndex];
            }
        }

        return newBoard;
    }

    isValidMoveSquare(square) {
        const { validMoveSquares } = this.props;
        for (let i = 0; i < validMoveSquares.length; i++) {
            const validMoveSquare = validMoveSquares[i];
            if (validMoveSquare.fileIndex === square.fileIndex && validMoveSquare.rankIndex === square.rankIndex) {
                return true;
            }
        }

        return false;
    }
    
    render() {
        const { board, selectedSquare, currentPlayer, onSelectSquare } = this.props;
        let counter = 0;
        return (
            <div>
                <div>
                    <h1>Current Player: { currentPlayer === 'white' ? 'White' : 'Black' }</h1>
                </div>
                <div>
                    {
                        this.reflectBoard(board).map(rank =>
                            <div key={counter++}>
                                {rank.map((square) =>
                                    <Square
                                        key={counter++}
                                        board={ board }
                                        square={ square }
                                        isSelected={ selectedSquare && square.fileIndex === selectedSquare.fileIndex && square.rankIndex === selectedSquare.rankIndex }
                                        isHighlighted={ this.isValidMoveSquare(square) }
                                        onSelectSquare={ () => onSelectSquare(board, selectedSquare, square) }
                                    />
                                )}
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Board;
