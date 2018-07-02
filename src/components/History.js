import React, { Component } from 'react';
import classNames from 'classnames';
import ObjectID from 'bson-objectid';
import { parseAlgebraicNotation } from '../utils/algebraicNotation';
import './History.css';

export default class History extends Component {
  render() {
    const { className, history, currentPlayer, hasEndedTurn } = this.props;

    let roundNum = 1;
    const historyElements = history.reduce((memo, value, index) => {
      const { move } = value;
      const isCapture = index > 0 && parseAlgebraicNotation(move).isCapture;
      if (index === 0) {
        memo.push(<span className="move start">{ move }</span>);
      } else if (index % 2) {
        const entry = `${ !hasEndedTurn && (currentPlayer === 'white' || isCapture) ? move : '?' }`;
        memo.push([
          <span className="round">{ `${ roundNum }.` }</span>,
          <span className="move">{ entry }</span>,
          <span className="move">{ /* placeholder */ }</span>,
        ]);
      } else {
        const entry = memo.pop();
        entry.pop(); // Remove placeholder
        entry.push(<span className="move">{ ` ${ !hasEndedTurn && (currentPlayer === 'black' || isCapture) ? move : '?' }` }</span>);
        memo.push(entry);
        roundNum += 1;
      }

      return memo;
    }, []);

    return (
      <div className={ classNames(className, 'history') }>
        <div className="title">History</div>
        <div className="content">
          {
            historyElements.map(historyElement => (
              <div className="entry" key={ ObjectID() }>
                { historyElement }
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}
