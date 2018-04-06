import React from 'react';
import classNames from 'classnames';
import './PlayerIndicator.css';

const PlayerIndicator = ({
  currentPlayer,
}) => {
  const arrow = require(`../images/${ currentPlayer }-arrow.svg`);
  const altText = `${ currentPlayer }'s turn`;
  return (
    <div className="indicator">
      <img alt={ altText } className={ classNames('arrow', { 'white': currentPlayer === 'white' }) } src={ arrow } />
    </div>
  );
};

export default PlayerIndicator;
