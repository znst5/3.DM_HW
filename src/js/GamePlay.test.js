import { GamePlay } from './GamePlay';
import { GameController } from './GameController';

window.alert = jest.fn();

describe('Тестирование логики игры Goblin Attack', () => {
  let container;
  let gamePlay;
  let controller;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    gamePlay = new GamePlay(container);
    controller = new GameController(gamePlay);

    jest.useFakeTimers();
  });

  afterEach(() => {
    document.body.replaceChildren();
    jest.useRealTimers();
  });

  test('Должен увеличивать счет при клике на правильную ячейку', () => {
    controller.init();

    const activeIndex = gamePlay.currentCellIndex;
    gamePlay.cells[activeIndex].dispatchEvent(new Event('click'));

    expect(controller.score).toBe(1);
    expect(controller.isCurrentStepClicked).toBe(true);
  });

  test('Должен засчитывать промах, если за секунду не было клика', () => {
    controller.init();
    jest.advanceTimersByTime(1000);
    expect(controller.misses).toBe(1);
  });

  test('Игра должна завершаться после 5 промахов', () => {
    controller.init();
    jest.advanceTimersByTime(5000);
    expect(controller.misses).toBe(5);
    expect(controller.intervalId).toBeNull();
    expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('Игра окончена'));
  });
});
