import AppModel from '../models/AppModel';

export default class DragManager {
  constructor(data) {
    this.view = data.view;
    this.model = data.model;
    this.clickCoord = null;
    this.currentOffset = 0;
    this.currentPos = null;
    this.view.slider.style.transitionDuration = '0.5s';

    this.view.slider.addEventListener('mousedown', (e) => {
      this.onDragStart(e);
    });
    this.view.slider.addEventListener('touchstart', (e) => {
      this.onDragStart(e);
    });
    this.view.slider.addEventListener('mousemove', (e) => {
      this.onDrag(e);
    });
    this.view.slider.addEventListener('touchmove', (e) => {
      this.onDrag(e);
    });
    this.view.slider.addEventListener('mouseup', () => {
      this.onDragEnd();
    });
    this.view.slider.addEventListener('touchend', () => {
      this.onDragEnd();
    });
    this.view.slider.addEventListener('dragstart', e => e.preventDefault());
    this.view.slider.addEventListener('mouseleave', () => {
      this.onDragEnd();
    });
  }

  onDragStart(e) {
    this.clickCoord = DragManager.getX(e);
    this.view.slider.classList.add('scroll__slider--grabbing');
    this.view.slider.style.transitionDuration = '';
  }

  onDrag(e) {
    if (this.clickCoord === null) return;
    this.currentPos = DragManager.getX(e);
    this.view.offetSlider(this.currentPos + this.currentOffset - this.clickCoord);
  }

  onDragEnd() {
    if (this.clickCoord === null) return;
    const difference = this.currentPos - this.clickCoord;
    const differencePerc = Math.abs(difference) / AppModel.sliderWidth * 100;
    let timeVal;
    if (differencePerc > 20) {
      timeVal = (100 - differencePerc) / 100 * 0.5;
    } else {
      timeVal = differencePerc / 100 * 0.5;
    }
    this.view.slider.style.transitionDuration = `${timeVal}s`;

    if (differencePerc > 20 && difference < 0) {
      this.moveRight();
    } else if (differencePerc > 20 && difference > 0) {
      this.moveLeft();
    } else {
      this.view.offetSlider(this.currentOffset);
    }

    this.clickCoord = null;
    this.view.slider.classList.remove('scroll__slider--grabbing');
  }

  moveRight(times = 1) {
    this.model.activeCardInd += this.model.cardsPerPage * times;
    if (this.model.activeCardInd >= this.model.maxIndex && !this.model.error) {
      this.dispatchMoreVidEvt();
    }
    this.currentOffset = -1 * this.model.activeCardInd * this.model.currentCardWidth;
    this.view.offetSlider(this.currentOffset);
    this.dispatchBtnEvt();
  }

  moveLeft(times = 1) {
    this.model.activeCardInd -= this.model.cardsPerPage * times;
    this.model.activeCardInd = Math.max(this.model.activeCardInd, 0);
    this.currentOffset = -1 * this.model.activeCardInd * this.model.currentCardWidth;
    this.view.offetSlider(this.currentOffset);
    this.dispatchBtnEvt();
  }

  static getX(e) {
    if (e.changedTouches) return e.changedTouches[0].clientX;
    return e.clientX;
  }

  calculateCurrPage() {
    return Math.ceil(this.model.activeCardInd / this.model.cardsPerPage);
  }

  dispatchBtnEvt() {
    const evt = new CustomEvent('change-buttons', {
      bubbles: true,
      detail: {
        pageNum: this.calculateCurrPage(),
      },
    });
    this.view.btnContainer.dispatchEvent(evt);
  }

  dispatchMoreVidEvt() {
    const evt = new CustomEvent('need-more-videos', {
      bubbles: true,
    });
    this.view.slider.dispatchEvent(evt);
  }
}
