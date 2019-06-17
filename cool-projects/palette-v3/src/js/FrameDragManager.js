export default class FrameDragManager {
  constructor(data) {
    this.framesManager = data.framesManager;
    this.dragging = false;
  }

  init() {
    this.framesManager.frames.addEventListener('mousedown', (e) => {
      this.onMouseDown(e);
    });

    this.framesManager.frames.addEventListener('dragstart', e => e.preventDefault());

    this.framesManager.frames.addEventListener('mousemove', (e) => {
      this.onMouseMove(e);
    });

    this.framesManager.frames.addEventListener('mouseup', () => {
      this.onMouseUp();
    });

    this.framesManager.frames.addEventListener('mouseleave', () => {
      this.onMouseUp();
    });
  }

  onMouseDown(event) {
    if (event.target.closest('.slide__tool--move')) {
      this.startDragging(event);
    }
  }

  startDragging(event) {
    this.dragging = true;
    this.originalClickY = event.clientY;
    this.dragElement = event.target.closest('.slide');
    this.createFutureFrameElement();
    this.initDragElem();
  }

  createFutureFrameElement() {
    this.futureFrame = document.createElement('div');
    this.futureFrame.className = 'slides__element slides__element--translucent';
    this.insertInd = this.framesManager.constructor.getFrameInd(this.dragElement);
    this.dragElement.after(this.futureFrame);
  }

  moveFutureFrameTo(indexToInsertAt) {
    let newIndex = indexToInsertAt;
    if (newIndex >= this.framesManager.framesCount) {
      newIndex = this.framesManager.framesCount - 1;
    }
    if (newIndex < 0) {
      newIndex = 0;
    }
    if (newIndex > this.insertInd) {
      this.shiftFutureElement(newIndex - this.insertInd, true);
    } else if (newIndex < this.insertInd) {
      this.shiftFutureElement(this.insertInd - newIndex, false);
    }
    this.insertInd = newIndex;
  }

  shiftFutureElement(howMany, down) {
    let i = 0;
    let sibling;
    while (i < howMany) {
      if (down) {
        sibling = this.futureFrame.nextElementSibling;
        sibling.after(this.futureFrame);
      } else {
        sibling = this.futureFrame.previousElementSibling;
        sibling.before(this.futureFrame);
      }
      i += 1;
    }
  }

  initDragElem() {
    this.dragElement.classList.add('slide--dragging');
    this.dragBox = document.createElement('div');
    this.dragBox.classList.add('slides__element--dragbox');

    const framesTop = this.framesManager.frames.getBoundingClientRect().top;
    const dragElemTop = this.dragElement.getBoundingClientRect().top;
    this.baseOffset = dragElemTop - framesTop;
    this.frameHeight = this.dragElement.offsetHeight;

    this.positionDragBox(this.originalClickY);
    this.dragBox.append(this.dragElement);
    this.framesManager.frames.append(this.dragBox);
  }

  positionDragBox(newY) {
    const newOffset = newY - this.originalClickY + this.baseOffset;
    if (newOffset - this.currentOffsetY < 0) {
      this.goingUp = true;
    } else {
      this.goingUp = false;
    }
    this.currentOffsetY = newOffset;
    this.dragBox.style.transform = `translateY(${this.currentOffsetY}px)`;
  }

  onMouseMove(e) {
    if (!this.dragging) return;
    this.positionDragBox(e.clientY);
    this.checkInsertFrame(e.clientX, e.clientY);
  }

  checkInsertFrame() {
    if (this.framesManager.framesCount === 1) return;
    const dragBoxCoords = this.dragBox.getBoundingClientRect();
    const futureFrameCoords = this.futureFrame.getBoundingClientRect();
    const differenceOfTops = dragBoxCoords.top - futureFrameCoords.top;

    let newIndex;
    if (differenceOfTops > 40 && !this.goingUp) {
      newIndex = this.insertInd + 1;
    } else if (differenceOfTops < -1 * this.frameHeight && this.goingUp) {
      newIndex = this.insertInd - 1;
    } else {
      return;
    }
    this.moveFutureFrameTo(newIndex);
  }

  onMouseUp() {
    if (!this.dragging) return;
    this.insertDragElement();
    this.updateIndexes();
    this.framesManager.makeActive(this.dragElement);
    this.dragging = false;
    this.originalClickY = null;
    this.dragElement = null;
    this.dragBox = null;
    this.insertInd = null;
    this.currentOffsetY = null;
  }

  insertDragElement() {
    this.dragElement.classList.remove('slide--dragging');
    this.framesManager.frames.replaceChild(this.dragElement, this.futureFrame);
    this.futureFrame.remove();
    this.dragBox.remove();
  }

  updateIndexes() {
    const oldIndex = this.framesManager.constructor.getFrameInd(this.dragElement);
    const newIndex = this.insertInd;
    const dragElem = this.framesManager.framesStorage[oldIndex];
    const currentActiveIndex = this.framesManager.currActiveInd;

    if (oldIndex > currentActiveIndex && newIndex <= currentActiveIndex) {
      this.framesManager.currActiveInd += 1;
    } else if (oldIndex < currentActiveIndex && newIndex >= currentActiveIndex) {
      this.framesManager.currActiveInd -= 1;
    } else if (oldIndex === this.framesManager.currActiveInd) {
      this.framesManager.currActiveInd = newIndex;
    }

    this.framesManager.framesStorage.splice(oldIndex, 1);
    this.framesManager.framesStorage.splice(newIndex, 0, dragElem);
    this.framesManager.numberFrames(Math.min(newIndex, oldIndex));
  }
}
