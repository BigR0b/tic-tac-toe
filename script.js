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
  const _game = ['', '', '',
                '', '', '',
                '', '', '',];

  const _winCon = [
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
    }
  };

  const winner = () => {
    return checkWinner(checkMove(), _winCon);
  };
  //prettier-ignore
  return {
    addToGameBoard, _game, checkMove, _winCon, checkWinner, winner, mark, nextPlay
  };
})();

const displayController = (() => {
  const cells = document.querySelectorAll('.cell');
  const gameState = gameBoard.addToGameBoard();
  const turn = mark => {
    if (mark === 'X') {
      return 0;
    } else {
      return 1;
    }
  };

  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      const move = cell.dataset.cell;
      console.log(cell.textContent);
      if (!cell.textContent) {
        const mark = gameBoard.mark();
        gameBoard.addToGameBoard(move, mark);
        addToDom();
        const allMoves = gameBoard.checkMove();
        const playerTurn = turn(mark);
        const playerMove = allMoves[playerTurn];

        if (gameBoard.checkWinner(playerMove, gameBoard._winCon) === 'winner') {
          alert(`${mark} Wins!`);
        }
      }
    });
  });

  const addToDom = () => {
    for (let i = 0; i < cells.length; i++) {
      cells[i].textContent = gameState[i];
    }
  };
  return { addToDom, gameState };
})();

const Player = name => {
  const mark = gameBoard.mark();
  return { name, mark };
};

// const player1 = Player(prompt('Player 1 name'));
// const player2 = Player(prompt('Player 2 name'));
