import React from 'react';
import Modal from 'react-overlays/lib/Modal';

const PawnPromotionDialog = ({
  show,
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
      justifyContent: 'space-between',
      position: 'absolute',
      width: 400,
      top: top + '%', left: left + '%',
      transform: `translate(-${top}%, -${left}%)`,
      border: '1px solid #e5e5e5',
      backgroundColor: 'white',
      boxShadow: '0 5px 15px rgba(0,0,0,.5)',
      padding: 20,
    };
  };

  return (
    <Modal
      show={ show }
      style={ modalStyle }
      backdropStyle={ backdropStyle }
    >
      <div style={ dialogStyle() }>
        <a onClick={ () => onChoosePromotion('rook') }>Rook</a>
        <a onClick={ () => onChoosePromotion('knight') }>Knight</a>
        <a onClick={ () => onChoosePromotion('bishop') }>Bishop</a>
        <a onClick={ () => onChoosePromotion('queen') }>Queen</a>
      </div>
    </Modal>
  );
};

export default PawnPromotionDialog;
