import React, { Component } from 'react';
import Square from './Square';
import './Board.css';

class Board extends Component {
  isValidMoveSquare(square) {
    const { validMoveSquares } = this.props;
    for (let i = 0; i < validMoveSquares.length; i++) {
      const validMoveSquare = validMoveSquares[i];
      if (validMoveSquare.destinationFileIndex === square.fileIndex && validMoveSquare.destinationRankIndex === square.rankIndex) {
        return true;
      }
    }

    return false;
  }

  render() {
    const {
      board,
      selectedSquare,
      currentPlayer,
      isCheck,
      isCheckmate,
      onSelectSquare,
    } = this.props;
    let counter = 0;

    return (
      <div className="board">
        {
          board.map(rank =>
            <div key={counter++}>
              {
                rank.map((square) =>
                  <Square
                    key={counter++}
                    square={ square }
                    isSelected={ selectedSquare && square.fileIndex === selectedSquare.fileIndex && square.rankIndex === selectedSquare.rankIndex }
                    isChecked={ isCheck && square.piece && square.piece.type === 'king' && square.piece.player === currentPlayer }
                    isCheckmated={ isCheckmate && square.piece && square.piece.type === 'king' && square.piece.player === currentPlayer }
                    isHighlighted={ this.isValidMoveSquare(square) }
                    onSelectSquare={ () => onSelectSquare(board, selectedSquare, square, currentPlayer) }
                  />
                )
              }
            </div>
          )
        }
      </div>
    );
  }
}

export default Board;
