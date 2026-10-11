export class GameController {
  constructor(gamePlay) {
    this.gamePlay = gamePlay;
    this.score = 0;
    this.misses = 0;
    this.intervalId = null;
    this.isCurrentStepClicked = false;
  }

  init() {
    this.gamePlay.drawUi();
    this.gamePlay.registerCellClickListener(this.onCellClick.bind(this));
    this.startGameLoop();
  }

  startGameLoop() {
    this.step();
    this.intervalId = setInterval(() => this.step(), 1000);
  }

  step() {
    if (!this.isCurrentStepClicked && this.gamePlay.currentCellIndex !== -1) {
      this.misses++;
      this.gamePlay.updateStats(this.score, this.misses);

      if (this.misses >= 5) {
        this.endGame('Игра окончена! Вы пропустили гоблина 5 раз.');
        return;
      }
    }

    this.isCurrentStepClicked = false;
    this.gamePlay.moveCharacter();
  }

  onCellClick(cellIndex) {
    if (cellIndex === this.gamePlay.currentCellIndex && !this.isCurrentStepClicked) {
      this.score++;
      this.isCurrentStepClicked = true;
      this.gamePlay.removeCharacter();
      this.gamePlay.updateStats(this.score, this.misses);
    }
  }

  endGame(message) {
    clearInterval(this.intervalId);
      this.intervalId = null;
      alert(message);
  }
}
