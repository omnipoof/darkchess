import React, { Component } from 'react';
import PawnPromotionDialog from './PawnPromotionDialog';
import './Game.css';
import Board from './Board';
import History from './History';

class Game extends Component {
  render() {
    const {
      board,
      selectedSquare,
      validMoveSquares,
      allValidMoveSquares,
      currentPlayer,
      isCheck,
      isCheckmate,
      squareToPromote,
      onSelectSquare,
      promotePawn,
      history,
    } = this.props;

    return (
      <div className="page">
        <div className="content">
          <div className="core">
            <Board
              className="boardComponent"
              board={ board }
              selectedSquare={ selectedSquare }
              currentPlayer={ currentPlayer }
              isCheck={ isCheck }
              isCheckmate={ isCheckmate }
              onSelectSquare={ onSelectSquare }
              validMoveSquares={ validMoveSquares }
              allValidMoveSquares={ allValidMoveSquares }
            />
            <History
              className="historyComponent"
              history={ history }
            />
          </div>
        </div>
        <PawnPromotionDialog
          show={ squareToPromote }
          player={ currentPlayer }
          onChoosePromotion={ pieceType => promotePawn(squareToPromote, pieceType) }
        />
      </div>
    );
  }
}

export default Game;
