'use strict';

const gameBoard = (function () {
  const gameBoardArr = ['x', 'o', 'x', 'o', 'x', 'o'];
  const gameBoardCells = document.querySelectorAll('.cell');
  const addPiece = function () {
    for (let i = 0; i < gameBoardArr.length; i++) {
      gameBoardCells[i].textContent = gameBoardArr[i];
    }
  };
  return { addPiece };
})();

const Player = (name) => {
  const playerName = name;
  const wins = 0;
  return { playerName };
};

const player1 = Player('Player 1');
const player2 = Player('Player 2');
