import React from 'react';
import _ from 'lodash';
import Modal from 'react-overlays/lib/Modal';
import Rook from './pieces/Rook';
import Knight from './pieces/Knight';
import Bishop from './pieces/Bishop';
import Queen from './pieces/Queen';
import { getPieceImage } from '../utils/renderUtils';
import './PawnPromotionDialog.css';

const PawnPromotionDialog = ({
  show,
  player,
  onChoosePromotion,
}) => {
  const modalStyle = {
    position: 'fixed',
    zIndex: 1040,
    top: 0, bottom: 0, left: 0, right: 0,
  };

  const backdropStyle = {
    ...modalStyle,
    zIndex: 'auto',
    backgroundColor: '#000',
    opacity: 0.5,
  };

  const dialogStyle = function() {
    let top = 50;
    let left = 50;

    return {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'absolute',
      fontFamily: 'Palanquin',
      width: 400,
      top: top + '%', left: left + '%',
      transform: `translate(-${top}%, -${left}%)`,
      border: '4px solid #D18B47',
      backgroundColor: 'white',
      boxShadow: '0 5px 15px rgba(0,0,0,.5)',
      padding: 20,
    };
  };

  const renderPiece = (piece) => (
    <a className="piece" onClick={ () => onChoosePromotion(piece.type) }>
      <img title={ _.startCase(piece.type) } alt={ piece.player + '.' + piece.type } src={ getPieceImage(piece) } />
      <span>{ _.startCase(piece.type) }</span>
    </a>
  );

  return (
    <Modal
      show={ true }//show }
      style={ modalStyle }
      backdropStyle={ backdropStyle }
    >
      <div style={ dialogStyle() }>
        <div>Promote your pawn by clicking a piece below:</div>
        <div className="pieces">
          { renderPiece(new Rook(player)) }
          { renderPiece(new Knight(player)) }
          { renderPiece(new Bishop(player)) }
          { renderPiece(new Queen(player)) }
        </div>
      </div>
    </Modal>
  );
};

export default PawnPromotionDialog;
