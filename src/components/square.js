import React from 'react';

const getIcon = (piece) => {
  return require(`../images/pieces/${ piece.player }/${ piece.type }.svg`);
};

const Square = ({
  square,
  isSelected,
  isHighlighted,
  onSelectSquare,
}) => {
  const piece = square.piece;
  const icon = piece ? getIcon(piece) : null;
  const classNames = 'square' + (isSelected ? ' selected' : '') + (isHighlighted ? ' highlighted' : '');
  const file = String.fromCharCode('a'.charCodeAt(0) + square.fileIndex);
  const rank = 8 - square.rankIndex;

  return (
    <button className={ classNames } onClick={ onSelectSquare }>
      {
        piece ?
          <img title={ piece.type } alt={ piece.player + '.' + piece.type } src={ icon } width='32px' height='32px' /> :
          <div style={ { fontWeight: 'bold' } }>{ file }{ rank }</div>
      }
    </button>
  );
};


export default Square;
