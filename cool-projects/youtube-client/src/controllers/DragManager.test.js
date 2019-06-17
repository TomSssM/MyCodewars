import App from './App';
import DragManager from './DragManager';
import AppModel from '../models/AppModel';

document.body.innerHTML = (
  `<main class="main">
    <input id="js-search" type="text" class="scroll-search">
    <div class="scroll">
      <div id="js-loading" class="scroll__load-indicator"></div>
      <div id="js-slider" class="scroll__slider"></div>
    </div>
    <div id="js-btn-container" class="scroll-controls"></div>
  </main>`
);

const app = new App();
app.start();

const { dragManager } = app;

describe('DragManager.getX', () => {
  test('gets the current x position of the pointer for both click or touch events', () => {
    expect(DragManager.getX({
      changedTouches: [
        {
          clientX: 12,
        },
      ],
    })).toBe(12);
    expect(DragManager.getX({
      clientX: 12,
    })).toBe(12);
  });
});

describe('DragManager.prototype.onDragStart', () => {
  const evt = {
    clientX: 12,
  };
  dragManager.onDragStart(evt);

  test('remembers clientX', () => {
    expect(dragManager.clickCoord).toBe(evt.clientX);
  });
  test('changes the state of the slider to grabbing', () => {
    expect(dragManager.view.slider.classList.contains('scroll__slider--grabbing')).toBe(true);
  });
  test('resets transitionDuration for the slider', () => {
    expect(dragManager.view.slider.style.transitionDuration).toBe('');
  });
});
