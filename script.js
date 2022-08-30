'use strict';

const gameBoard = (() => {
  let nextPlay = 0;
  // prettier-ignore
  const game = ['', '', '',
                '', '', '',
                '', '', '',];

  const winCon = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [0, 3, 6],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const addToGameBoard = move => {
    if (game[move] === 'X' || game[move] === 'O') {
      return;
    } else {
      if (nextPlay === 0) {
        game[move] = 'O';
        nextPlay++;
        return game;
      } else {
        game[move] = 'X';
        nextPlay--;
        return game;
      }
    }
  };

  return { addToGameBoard };
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
