'use strict';

const gameBoard = (function () {
  let nextPlay = 0;
  // prettier-ignore
  const gameState = [ '', '', '',
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

  const addToGameBoard = (move) => {
    if (gameState[move] === 'X' || gameState[move] === 'O') {
      return;
    } else {
      if (nextPlay === 0) {
        gameState[move] = 'X';
        nextPlay++;
        console.log(gameState);
      } else {
        gameState[move] = 'O';
        nextPlay--;
        console.log(gameState);
      }
    }
  };

  // const play = cells.forEach((cell) => {
  //   cell.addEventListener('click', playClick);
  // });

  return { gameState, addToGameBoard, nextPlay };
})();

const displayController = (function () {
  const cells = document.querySelectorAll('.cell');

  cells.forEach((e) => {
    e.addEventListener('click', () => {
      const move = e.dataset.cell;
      gameBoard.addToGameBoard(move);
    });
  });
  return {};
})();

const Player = (name) => {
  const playerName = name;
  const playerMark = mark;
  const plays = [];

  return { mark };
};
