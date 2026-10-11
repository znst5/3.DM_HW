import './css/style.css';
import { GamePlay } from './js/GamePlay.js'
import { GameController } from './js/GameController.js'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('game-container');

  const gamePlay = new GamePlay(container);
  const controller = new GameController(gamePlay);

  controller.init();
});
