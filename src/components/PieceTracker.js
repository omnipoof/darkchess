import React, { Component } from 'react';
import ObjectID from 'bson-objectid';
import classNames from 'classnames';
import { getPieceImage } from '../utils/renderUtils';
import './PieceTracker.css';

const captured = require('../images/captured.svg');

export default class PieceTracker extends Component {
  renderPieceRow(startIndex, endIndex) {
    const { player, pieces } = this.props;
    return (
      pieces[player].slice(startIndex, endIndex + 1).map((piece) => {
        const image = getPieceImage(piece);
        return (
          <React.Fragment key={ ObjectID() }>
            {
              piece.isCaptured &&
              <img alt="captured" className="captured" src={ captured } />
            }
            <img alt={ piece.type } className="piece" src={ image } />
          </React.Fragment>
        );
      })
    );
  }
  
  render() {
    const { className } = this.props;
    return (
      <div className={ classNames(className, 'tracker') }>
        <div>{ this.renderPieceRow(0, 7) }</div>
        <div>{ this.renderPieceRow(8, 15) }</div>
      </div>
    );
  }
}
