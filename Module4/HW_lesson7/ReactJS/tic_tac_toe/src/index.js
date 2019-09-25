import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

function Sort(props) {
  return (
    <div>
      <input
        id="sort-trigger"
        type="checkbox"
        name="isAsc"
        checked={props.isAsc}
        onChange={props.onChangeHandler}
      >
      </input>
      <label
        className="sort-trigger"
        for="sort-trigger">
      </label>
    </div>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={'square-' + i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderBoard(n) {
    let board = [];
    for (let i = 0; i < n; ++i) {
      let row = [];
      for (let j = 0; j < n; ++j) {
        row = row.concat(
          this.renderSquare(i * n + j)
        );
      }
      board = board.concat(
        <div className="board-row" key={'row-' + i}>
          {row}
        </div>
      );
    }
    return board;
  }

  render() {
    return (
      <div>
        {this.renderBoard(3)}
      </div>
    );
  }
}

class Game extends React.Component {
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

    if (calculateWinner(squares) || squares[i]) {
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
    const winner = calculateWinner(current.squares);

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

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; ++i) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
