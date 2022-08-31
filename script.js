'use strict';

const gameBoard = (() => {
  let nextPlay = 0;
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

  const addToGameBoard = move => {
    if (_game[move] === 'X' || _game[move] === 'O') {
      return;
    } else {
      if (nextPlay === 0) {
        _game[move] = 'O';
        nextPlay++;
        return _game;
      } else {
        _game[move] = 'X';
        nextPlay--;
        return _game;
      }
    }
  };

  const checkMove = () => {
    const play = [];
    for (let i = 0; i < _game.length; i++) {
      if (_game[i] == 'X') {
        play.push(i);
      }
    }
    return play;
  };

  const checkWinner = (arr, values) => {
    for (let i = 0; i < _winCon.length; i++) {
      if (
        values[i].every(value => {
          return arr.includes(value);
        }) === true
      ) {
        return 'winner';
      }
    }
  };
  //prettier-ignore
  return {
    addToGameBoard, _game, checkMove, nextPlay, _winCon, checkWinner,
  };
})();

const displayController = (() => {
  const cells = document.querySelectorAll('.cell');
  const gameState = gameBoard.addToGameBoard();

  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      const move = cell.dataset.cell;
      gameBoard.addToGameBoard(move);
      addToDom();
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
  const playerName = name;
  const playerMark = mark;
  const plays = [];

  return { mark };
};
