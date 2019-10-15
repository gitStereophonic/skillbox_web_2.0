import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {
  renderSquare = i => {
    const isHighLighted = this.props.strike.find(o => o === i);
    let highlight = '';

    if (isHighLighted !== undefined) {
      highlight = ' highlight ';
    }

    return (
      <Square
        highlight={highlight}
        key={'square-' + i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  };

  renderBoard = n => {
    let board = [];
    for (let i = 0; i < n; ++i) {
      let row = [];
      for (let j = 0; j < n; ++j) {
        row = row.concat(this.renderSquare(i * n + j));
      }
      board = board.concat(
        <div className='board-row' key={'row-' + i}>
          {row}
        </div>
      );
    }
    return board;
  };

  render() {
    return <div>{this.renderBoard(3)}</div>;
  }
}

export default Board;
