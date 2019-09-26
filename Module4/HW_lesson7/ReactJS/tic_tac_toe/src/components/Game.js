import React, { Component } from 'react';

import Board from './Board';
import Sort from './Sort';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        coord: {
          row: 0,
          col: 0
        },
        sign: 'X'
      }],
      stepNumber: 0,
      xIsNext: true,
      isAsc: true,
    };

    this.onSortChangeHandler = this.onSortChangeHandler.bind(this);
  }

  clearButtons() {
    const btns = document.getElementsByClassName("current-btn");
    if (btns.length)
      btns[0].classList.remove('current-btn');
  }

  handleClick(i) {
    this.clearButtons();
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const sign = this.state.xIsNext ? 'X' : 'O';

    if (this.props.calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = sign;
    const row = parseInt(i / 3);
    const col = i % 3;
    this.setState({
      history: history.concat([{
        squares: squares,
        coord: {
          row: row,
          col: col
        },
        sign: sign
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step, e) {
    this.clearButtons();
    e.currentTarget.classList.add('current-btn');

    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  onSortChangeHandler(event) {
    const { name, checked } = event.target;
    this.setState({
      [name]: checked
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.props.calculateWinner(current.squares);

    const mvs = history.map((step, move) => {
      const desc = move ?
        [
          <p key='move'>{'Go to move #' + move}</p>,
          <p key='coords'>{
            '{ ' + step.sign + ' at row: ' +
            (step.coord.row + 1) + ' and column: ' + (step.coord.col + 1) + ' }'
          }</p>
        ] : [
          <p key='start-game'>Go to game start</p>
        ];

      return (
        <li key={move}>
          <button className='history-btn' onClick={(e) => this.jumpTo(move, e)}>{desc}</button>
        </li>
      );
    });

    const moves = this.state.isAsc ? mvs.slice() : mvs.slice().reverse();

    let status;
    if (winner)
      status = 'Winner: ' + winner;
    else
      status = 'Next player is ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className='status-header'>{status}</div>
          <Sort
            onChangeHandler={this.onSortChangeHandler}
          />
          <ul>{moves}</ul>
        </div>
      </div>
    );
  }
}

export default Game;
