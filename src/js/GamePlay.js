import goblinImg from '../pic/goblin.png';

export class GamePlay {
  constructor(container) {
    this.container = container;
    this.boardSize = 4;
    this.cells = [];
    this.currentCellIndex = -1;
    this.character = null;
    this.onCellClickCallback = null;
  }

  drawUi() {
    this.container.replaceChildren();
    this.cells = [];

    const statsBoard = document.createElement('div');
    statsBoard.classList.add('stats-board');
    const scoreStat = document.createElement('div');
    scoreStat.classList.add('stat');
    scoreStat.textContent = 'Попадания: ';
    const scoreCount = document.createElement('span');
    scoreCount.id = 'score-count';
    scoreCount.textContent = '0';
    scoreStat.append(scoreCount);
    const missesStat = document.createElement('div');
    missesStat.classList.add('stat');
    missesStat.textContent = 'Промахи: ';
    const missesCount = document.createElement('span');
    missesCount.id = 'misses-count';
    missesCount.textContent = '0/5';
    missesStat.append(missesCount);
    statsBoard.append(scoreStat, missesStat);
    this.container.append(statsBoard);

    const board = document.createElement('div');
    board.classList.add('game-board');
    const totalCells = this.boardSize * this.boardSize;
    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      cell.addEventListener('click', () => {
        if (this.onCellClickCallback) {
          this.onCellClickCallback(i);
        }
      });

      board.append(cell);
      this.cells.push(cell);
    }
    this.container.append(board);

    this.character = document.createElement('img');
    this.character.src = goblinImg;
    this.character.classList.add('character');
  }

  registerCellClickListener(callback) {
    this.onCellClickCallback = callback;
  }

  updateStats(score, misses) {
    const scoreEl = document.getElementById('score-count');
    const missesEl = document.getElementById('misses-count');
    if (scoreEl) scoreEl.textContent = score;
    if (missesEl) missesEl.textContent = `${misses}/5`;
  }

  generateNewIndex() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.cells.length);
    } while (newIndex === this.currentCellIndex);

    return newIndex;
  }

  moveCharacter() {
    const newIndex = this.generateNewIndex();
    this.cells[newIndex].append(this.character);
    this.currentCellIndex = newIndex;
    return newIndex;
  }

  removeCharacter() {
    if (this.character && this.character.parentElement) {
      this.character.remove();

    }
  }
}
