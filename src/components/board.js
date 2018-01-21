import React, { Component } from 'react';
import ObjectID from 'bson-objectid';
import Square from './square';
import { reflectBoardForDisplay } from '../utils/boardUtils';

class Board extends Component {

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
        const { board, selectedSquare, currentPlayer, isCheck, isCheckmate, onSelectSquare, history } = this.props;
        let counter = 0;
        return (
            <div>
                <div>
                    <h1>Current Player: { currentPlayer === 'white' ? 'White' : 'Black' }</h1>
                </div>
                <div>
                    {
                        reflectBoardForDisplay(board).map(rank =>
                            <div key={counter++}>
                                {rank.map((square) =>
                                    <Square
                                        key={counter++}
                                        square={ square }
                                        isSelected={ selectedSquare && square.fileIndex === selectedSquare.fileIndex && square.rankIndex === selectedSquare.rankIndex }
                                        isChecked={ isCheck && square.piece && square.piece.type === 'king' && square.piece.player === currentPlayer }
                                        isCheckmated={ isCheckmate && square.piece && square.piece.type === 'king' && square.piece.player === currentPlayer }
                                        isHighlighted={ this.isValidMoveSquare(square) }
                                        onSelectSquare={ () => onSelectSquare(board, selectedSquare, square) }
                                    />
                                )}
                            </div>
                        )
                    }
                </div>
                <div>
                    <h2>History</h2>
                    {
                        history.map(historicalState => (
                            <div key={ ObjectID() }>
                                { historicalState.move }
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default Board;
