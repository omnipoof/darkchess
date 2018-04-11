import React, { Component } from 'react';
import PawnPromotionDialog from './PawnPromotionDialog';
import './Game.css';
import Board from './Board';
import PlayerIndicator from './PlayerIndicator';
import PieceTracker from './PieceTracker';
import History from './History';

class Game extends Component {
  render() {
    const {
      board,
      pieces,
      selectedSquare,
      validMoveSquares,
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
            <div className="information">
              <PieceTracker
                className="tracker"
                pieces={ pieces }
                player={ 'black' }
              />
              <PlayerIndicator
                currentPlayer={ currentPlayer }
              />
              <PieceTracker
                className="tracker"
                pieces={ pieces }
                player={ 'white' }
              />
            </div>
            <Board
              board={ board }
              selectedSquare={ selectedSquare }
              currentPlayer={ currentPlayer }
              isCheck={ isCheck }
              isCheckmate={ isCheckmate }
              onSelectSquare={ onSelectSquare }
              validMoveSquares={ validMoveSquares }
            />
            <History
              className="history"
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
