'use strict';

const gameBoard = (function () {
  let nextPlay = 0;
  // prettier-ignore
  const arr = [ , , ,
                , , ,
                , , ,];

  const cells = document.querySelectorAll('.cell');
  const addPiece = function () {
    for (let i = 0; i < arr.length; i++) {
      cells[i].textContent = arr[i];
    }
  };

  const playClick = function () {
    if (!this.textContent) {
      if (nextPlay === 0) {
        this.textContent = 'X';
        arr[this.dataset.cell] = this.textContent;
        nextPlay++;
      } else {
        this.textContent = 'O';
        arr[this.dataset.cell] = this.textContent;
        nextPlay--;
      }
    }
  };
  const play = cells.forEach((cell) => {
    cell.addEventListener('click', playClick);
  });

  return { addPiece };
})();

const Player = (name, mark) => {
  const playerName = name;
  const mark = mark;

  return { mark };
};

const player1 = Player('Player 1');
const player2 = Player('Player 2');
