'use strict';
const gameBoard = (() => {
  let nextPlay = 0;
  let mark = () => {
    if (nextPlay === 0) {
      nextPlay = 1;
      return 'X';
    } else {
      nextPlay = 0;
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
    nextPlay = 0;
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
    addToGameBoard,  checkMove, winCon, checkWinner,  mark, nextPlay, resetGame
  };
})();

const displayController = (() => {
  const _cells = document.querySelectorAll('.cell');
  const resetBtn = document.querySelector('.reset');
  const gameState = gameBoard.addToGameBoard();
  const announce = document.querySelector('.announce-text');
  const player1 = document.querySelector('.player1');
  const player2 = document.querySelector('.player2');
  const playerBtn = document.querySelector('.playerBtn');
  const playerPrompt = document.querySelector('.player-container');
  const player1Name = document.querySelector('.player1-name');
  const player2Name = document.querySelector('.player2-name');
  const player1score = document.querySelector('.player1-score');
  const player2score = document.querySelector('.player2-score');
  let p1wins = 0;
  let p2wins = 0;
  const game = document.querySelector('.flex-container');
  const turn = mark => {
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
        const playerTurn = turn(mark);
        const playerMove = allMoves[playerTurn];
        if (gameBoard.checkWinner(playerMove, gameBoard.winCon) === 'winner') {
          announce.textContent = `${mark} Wins!`;
          if (turn(mark) === 0) {
            p1wins++;
            player1score.textContent = p1wins;
          } else if (turn(mark) === 1) {
            p2wins++;
            player2score.textContent = p2wins;
          }
          _cells.forEach(cell => {
            cell.classList.toggle('game-over');
          });
        } else if (
          gameBoard.checkWinner(playerMove, gameBoard.winCon) === 'tie'
        ) {
          announce.textContent = 'Its a tie.';
        }
      }
    });
  });

  const addToDom = () => {
    for (let i = 0; i < _cells.length; i++) {
      _cells[i].textContent = gameState[i];
    }
  };

  resetBtn.addEventListener('click', () => {
    announce.textContent = '';
    gameBoard.resetGame();
    addToDom();
    _cells.forEach(cell => {
      cell.classList.remove('game-over');
    });
  });
  playerBtn.addEventListener('click', () => {
    const createdPlayer1 = Player(player1.value);
    const createdPlayer2 = Player(player2.value);

    if (player1.value) {
      player1Name.textContent = createdPlayer1.name;
    }
    if (player2.value) {
      player2Name.textContent = createdPlayer2.name;
    }

    playerPrompt.classList.toggle('hidden');
    game.classList.remove('hidden');
  });

  return { addToDom, gameState };
})();

const Player = name => {
  const mark = gameBoard.mark();
  const bot = false;
  return { name, mark };
};

// const player1 = Player(prompt('Player 1 name'));
// const player2 = Player(prompt('Player 2 name'));
