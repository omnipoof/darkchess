import React, { Component } from 'react';
import Board from './Board';
import History from './History';
import PawnPromotionDialog from './PawnPromotionDialog';
import './Game.css';

class Game extends Component {
  render() {
    const {
      board,
      selectedSquare,
      validMoveSquares,
      allValidMoveSquares,
      currentPlayer,
      hasMoved,
      hasEndedTurn,
      isCheck,
      isCheckmate,
      threatenedKingColor,
      squareToPromote,
      onSelectSquare,
      onEndTurn,
      onStartTurn,
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
              hasEndedTurn={ hasEndedTurn }
              isCheck={ isCheck }
              isCheckmate={ isCheckmate }
              threatenedKingColor={ threatenedKingColor }
              onSelectSquare={ onSelectSquare }
              validMoveSquares={ validMoveSquares }
              allValidMoveSquares={ allValidMoveSquares }
            />
            <div className="sidebar">
              <input
                className={ `turnButton ${ !hasMoved ? 'disabled' : '' }` }
                type="button"
                disabled={ !hasMoved }
                value={ !hasEndedTurn ? 'End Turn' : 'Start Turn' }
                onClick={ !hasEndedTurn ? onEndTurn : onStartTurn }
              />
              <History
                className="historyComponent"
                history={ history }
                currentPlayer={ currentPlayer }
                hasEndedTurn={ hasEndedTurn }
              />
            </div>
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
