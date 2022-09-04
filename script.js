'use strict';
const gameBoard = (() => {
  let _nextPlay = 0;
  let mark = () => {
    if (_nextPlay === 0) {
      _nextPlay = 1;
      return 'X';
    } else {
      _nextPlay = 0;
      return 'O';
    }
  };
  // prettier-ignore
  const _game =['', '', '',
                '', '', '',
                '', '', '' ];

  const resetGame = () => {
    for (let i = 0; i < _game.length; i++) {
      _game[i] = '';
    }
    _nextPlay = 0;
  };

  const winCon = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const addToGameBoard = (cell, mark) => {
    if (_game[cell] === 'X' || _game[cell] === 'O') {
      return;
    } else {
      _game[cell] = mark;
      return _game;
    }
  };

  const checkMove = () => {
    const play1 = [];
    const play2 = [];
    for (let i = 0; i < _game.length; i++) {
      if (_game[i] == 'X') {
        play1.push(i);
      } else if (_game[i] == 'O') {
        play2.push(i);
      }
    }
    return [play1, play2];
  };

  const checkWinner = (plays, winCon) => {
    for (let i = 0; i < winCon.length; i++) {
      if (
        winCon[i].every(value => {
          return plays.includes(value);
        }) === true
      ) {
        return 'winner';
      }
      if (
        i === 7 &&
        winCon[i].every(value => {
          return plays.includes(value);
        }) === false &&
        checkMove()[0].length === 5
      ) {
        return 'tie';
      }
    }
  };

  //prettier-ignore
  return {
    addToGameBoard,  checkMove, winCon, checkWinner,  mark, resetGame
  };
})();

const displayController = (() => {
  const _cells = document.querySelectorAll('.cell');
  const _resetBtn = document.querySelector('.reset');
  const _gameState = gameBoard.addToGameBoard();
  const _announce = document.querySelector('.announce-text');
  const _player1 = document.querySelector('.player1');
  const _player2 = document.querySelector('.player2');
  const _playerBtn = document.querySelector('.playerBtn');
  const _playerPrompt = document.querySelector('.player-container');
  const _player1Name = document.querySelector('.player1-name');
  const _player2Name = document.querySelector('.player2-name');
  const _player1score = document.querySelector('.player1-score');
  const _player2score = document.querySelector('.player2-score');
  let _p1wins = 0;
  let _p2wins = 0;
  const _game = document.querySelector('.flex-container');
  const _turn = mark => {
    if (mark === 'X') {
      return 0;
    } else {
      return 1;
    }
  };

  _cells.forEach(cell => {
    cell.addEventListener('click', () => {
      const move = cell.dataset.cell;
      if (!cell.textContent) {
        const mark = gameBoard.mark();
        gameBoard.addToGameBoard(move, mark);
        addToDom();
        const allMoves = gameBoard.checkMove();
        const playerTurn = _turn(mark);
        const playerMove = allMoves[playerTurn];
        if (gameBoard.checkWinner(playerMove, gameBoard.winCon) === 'winner') {
          _announce.textContent = `${mark} Wins!`;
          if (playerTurn === 0) {
            _p1wins++;
            _player1score.textContent = _p1wins;
          } else if (playerTurn === 1) {
            _p2wins++;
            _player2score.textContent = _p2wins;
          }
          _cells.forEach(cell => {
            cell.classList.toggle('game-over');
          });
        } else if (
          gameBoard.checkWinner(playerMove, gameBoard.winCon) === 'tie'
        ) {
          _announce.textContent = 'Its a tie.';
        }
      }
    });
  });

  const addToDom = () => {
    for (let i = 0; i < _cells.length; i++) {
      _cells[i].textContent = _gameState[i];
    }
  };

  _resetBtn.addEventListener('click', () => {
    _announce.textContent = '';
    gameBoard.resetGame();
    addToDom();
    _cells.forEach(cell => {
      cell.classList.remove('game-over');
    });
  });
  _playerBtn.addEventListener('click', () => {
    const createdPlayer1 = Player(_player1.value);
    const createdPlayer2 = Player(_player2.value);

    if (_player1.value) {
      _player1Name.textContent = createdPlayer1.name;
    }
    if (_player2.value) {
      _player2Name.textContent = createdPlayer2.name;
    }

    _playerPrompt.classList.toggle('hidden');
    _game.classList.remove('hidden');
  });
})();

const Player = name => {
  const mark = gameBoard.mark();
  return { name, mark };
};
