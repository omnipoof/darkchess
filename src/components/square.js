import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { getPieceImage } from '../utils/renderUtils';
import './Square.css';



const Square = ({
  square: {
    fileIndex,
    rankIndex,
    piece,
  },
  isSelected,
  isChecked,
  isCheckmated,
  isHighlighted,
  onSelectSquare,
}) => {
  const icon = piece ? getPieceImage(piece) : null;
  const variant = (rankIndex % 2 + fileIndex) % 2;

  return (
    <span
      className={ classNames(
        'square',
        variant ? 'variant1' : 'variant2',
        {
          'selected': isSelected,
          'highlighted': isHighlighted,
          'checked': isChecked,
          'checkmated': isCheckmated,
        }
      ) }
      onClick={ onSelectSquare }
    >
      {
        piece &&
        <img className="piece" title={ _.startCase(piece.type) } alt={ piece.player + '.' + piece.type } src={ icon } />
      }
    </span>
  );
};


export default Square;
