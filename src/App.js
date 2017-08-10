import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <Board/>
    );
  }
}

class Board extends Component {

  constructor() {
    super();
    this.board = Array(8).fill(Array(8).fill(null));
    console.log(this.board);
  }

  render() {
    let counter = 0;
    return (
      <div>
        {this.board.map(row =>
          <div key={counter++}>
            {row.map(() =>
              <Tile key={counter++} />
            )}
          </div>
        )}
      </div>
    )
  }
}

class Tile extends Component {
  render() {
    return (
      <span className='tile'></span>
    )
  }
}

export default App;
