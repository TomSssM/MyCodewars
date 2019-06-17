export default class FramesManager {
  constructor(data) {
    this.frames = data.frames;
    this.framesControl = data.framesControl;
    this.paint = data.paint;
    this.frameSize = null;
    this.animationPlayer = data.animationPlayer;
    this.currentPlayingFrameInd = 0;
    this.interval = null;
    this.prevActiveFps = null;
  }

  init() {
    this.framesCount = 0;
    this.framesStorage = [];
    this.currActiveInd = null;
    this.addNewFrame();
    this.setFpsFromTarget(document.querySelector('.animation-player__fps-setting'));

    this.frames.addEventListener('click', (e) => {
      this.onClick(e.target);
    });

    this.animationPlayer.playerFpsContainer.addEventListener('click', (e) => {
      this.setFpsFromTarget(e.target);
    });

    this.paint.canvas.addEventListener('update-active-frame', (e) => {
      this.updateActiveFrame(e.detail);
    });

    this.paint.canvas.addEventListener('transform-at', (e) => {
      this.transformAt(e.detail.x, e.detail.y);
    });

    this.paint.canvas.addEventListener('move-frames-via', (e) => {
      this.offsetActiveFrame(e.detail.x, e.detail.y);
      this.createAnimationFrame();
    });

    this.paint.canvas.addEventListener('recreate-frames', () => {
      this.recreateFrames();
    });
  }

  onClick(eventTarget) {
    const frameTarget = eventTarget.closest('.slide');
    const toolTarget = eventTarget.closest('.slide__tool');
    const frameController = eventTarget.closest('.frame-controller');

    if (toolTarget) {
      this.handleToolClick(toolTarget);
    } else if (frameTarget) {
      this.makeActive(frameTarget);
    } else if (frameController) {
      this.addNewFrame();
    }
  }

  addNewFrame() {
    this.framesCount += 1;
    const frame = this.renderFrame();
    this.framesControl.before(frame);
    const context = FramesManager.generateContextFor(frame);
    this.framesStorage.push(context);
    this.markFirstFrame();
    this.makeActive(frame);
  }

  static generateContextFor(frameRef) {
    const canvas = frameRef.querySelector('.slide__canvas');
    const ctx = canvas.getContext('2d');
    return {
      ref: frameRef,
      canvas,
      ctx,
      image: null,
      transformed: [],
    };
  }

  renderFrame() {
    const frame = document.createElement('div');
    frame.className = 'slides__element slide';
    frame.innerHTML = (
      `<span class="slide__tool slide__tool--slide-number">${this.framesCount}</span>
       <span class="slide__tool slide__tool--delete">
           <i class="slide__icon fas fa-trash-alt"></i>
       </span>
       <span class="slide__tool slide__tool--move">
           <i class="slide__icon fas fa-grip-vertical"></i>
       </span>
       <span class="slide__tool slide__tool--copy">
           <i class="slide__icon fas fa-copy"></i>
       </span>
       <canvas class="slide__canvas" width="100" height="100"></canvas>`
    );

    if (!this.frameSize) {
      this.frameSize = this.initCanvasSize(100);
    }

    const canvas = frame.querySelector('.slide__canvas');
    canvas.width = this.frameSize;
    canvas.height = this.frameSize;

    return frame;
  }

  initCanvasSize(canvasWidth) {
    const numOfSquares = this.paint.elmsArray.length;
    const squareWidth = Math.floor(canvasWidth / numOfSquares);
    return squareWidth * numOfSquares;
  }

  handleToolClick(targetTool) {
    const frame = targetTool.closest('.slide');
    if (targetTool.classList.contains('slide__tool--copy')) {
      this.copyFrame(frame);
    } else if (targetTool.classList.contains('slide__tool--delete')) {
      this.deleteFrame(frame);
    }
  }

  deleteFrame(frameElem) {
    const frameToDelete = frameElem;
    const indexToDelete = FramesManager.getFrameInd(frameToDelete);

    let indexToSwitchTo = indexToDelete - 1;
    if (indexToSwitchTo < 0) {
      indexToSwitchTo = indexToDelete + 1;
    }
    const frameToSwitchTo = this.framesStorage[indexToSwitchTo].ref;

    if (indexToDelete === this.currActiveInd) {
      this.makeActive(frameToSwitchTo);
      const handler = () => {
        frameToDelete.remove();
        this.framesCount -= 1;
        this.framesStorage.splice(indexToDelete, 1);
        this.playAnimation();
        this.numberFrames(indexToDelete);
        this.markFirstFrame();
        if (indexToSwitchTo > indexToDelete) {
          this.currActiveInd -= 1;
        }
        document.body.removeEventListener('finish-restoring-paint', handler);
      };
      document.body.addEventListener('finish-restoring-paint', handler);
    } else {
      if (indexToDelete < this.currActiveInd) {
        this.currActiveInd -= 1;
      }
      frameToDelete.remove();
      this.framesCount -= 1;
      this.framesStorage.splice(indexToDelete, 1);
      this.numberFrames(indexToDelete);
      this.playAnimation();
      this.markFirstFrame();
    }
  }

  copyFrame(frameElem) {
    this.framesCount += 1;
    const copyFromInd = FramesManager.getFrameInd(frameElem);
    const frame = this.renderFrame();
    const context = FramesManager.generateContextFor(frame);
    const copyContext = this.framesStorage[copyFromInd];

    this.framesControl.before(frame);
    context.transformed = copyContext.transformed.map(obj => ({ ...obj }));

    this.framesStorage.push(context);
    this.markFirstFrame();
    const handler = () => {
      document.body.removeEventListener('finish-restoring-paint', handler);
      this.updateActiveFrame();
    };
    document.body.addEventListener('finish-restoring-paint', handler);
    if (copyFromInd === this.currActiveInd) {
      this.makeActive(frame, copyFromInd, true);
    } else {
      this.makeActive(frame, copyFromInd);
    }
  }

  numberFrames(from = 0) {
    const { length } = this.framesStorage;
    let numElem;
    for (let i = from; i < length; i += 1) {
      numElem = this.framesStorage[i].ref.querySelector('.slide__tool--slide-number');
      numElem.innerHTML = i + 1;
    }
  }

  static getFrameInd(frame) {
    return frame.querySelector('.slide__tool--slide-number').innerHTML - 1;
  }

  updateActiveFrame(changedSquares) {
    const data = this.framesStorage[this.currActiveInd];
    const { canvas, ctx } = data;
    const squareSize = canvas.width / this.paint.elmsArray.length;

    if (changedSquares) {
      changedSquares.forEach((square) => {
        this.paintSquare(square, ctx, squareSize);
      });
    } else {
      let square;
      const size = this.paint.elmsArray.length;
      for (let i = 0; i < size; i += 1) {
        for (let j = 0; j < size; j += 1) {
          square = {
            x: j,
            y: i,
          };
          this.paintSquare(square, ctx, squareSize);
        }
      }
    }
    this.createAnimationFrame();
  }

  paintSquare(square, ctx, squareSize) {
    const { x, y } = square;
    const { color, transformed } = this.paint.elmsArray[y][x].dataset;
    FramesManager.fillCanvasAt(ctx, x, y, squareSize, color, transformed);
  }

  static fillCanvasAt(context, x, y, size, color, transformed) {
    const ctx = context;
    if (color !== 'null' && transformed === 'false') {
      ctx.fillStyle = color;
      ctx.fillRect(x * size, y * size, size, size);
    } else if (color !== 'null' && transformed === 'true') {
      ctx.clearRect(x * size, y * size, size, size);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(
        x * size + size / 2,
        y * size + size / 2,
        size / 2, 0, Math.PI * 2, true,
      );
      ctx.fill();
    } else {
      ctx.clearRect(x * size, y * size, size, size);
    }
  }

  makeActive(frame, index, dontRestore) {
    const ind = FramesManager.getFrameInd(frame);
    if (ind === this.currActiveInd) return;
    if (this.currActiveInd !== null) {
      this.framesStorage[this.currActiveInd].ref.classList.remove('slide--active');
      this.genEvent('transform-squares', this.framesStorage[this.currActiveInd].transformed);
    }
    frame.classList.add('slide--active');
    this.currActiveInd = ind;
    this.genEvent('transform-squares', this.framesStorage[this.currActiveInd].transformed);
    const paintRestoreIndex = index === undefined ? ind : index;
    if (!dontRestore) {
      this.restorePaintFromFrame(paintRestoreIndex);
    } else {
      this.genEvent('finish-restoring-paint', null, document.body);
    }
  }

  restorePaintFromFrame(frameInd) {
    let indOfFrameToRestoreFrom;
    const step = 20;
    if (frameInd !== undefined) {
      indOfFrameToRestoreFrom = frameInd;
    } else {
      indOfFrameToRestoreFrom = this.currActiveInd;
    }
    let i = 0;
    const id = setInterval(() => {
      if (i + step >= this.paint.elmsArray.length) {
        this.colorRows(i, this.paint.elmsArray.length - i, indOfFrameToRestoreFrom);
        this.genEvent('finish-restoring-paint', null, document.body);
        clearInterval(id);
      } else {
        this.colorRows(i, step, indOfFrameToRestoreFrom);
        i += step;
      }
    }, 0);
  }

  colorRows(from, totalToColor, index) {
    const frameData = this.framesStorage[index];
    const { ctx, canvas } = frameData;
    const squareSize = canvas.width / this.paint.elmsArray.length;

    const size = this.paint.elmsArray.length;
    const last = from + totalToColor;

    let i = from;
    let j = 0;
    while (i < last) {
      let color = '#';
      const imageData = ctx.getImageData(
        i * squareSize + squareSize / 2,
        j * squareSize + squareSize / 2,
        1, 1,
      );
      if (imageData.data[3] !== 0) {
        color += FramesManager.getColorFromPixel(imageData.data[0]);
        color += FramesManager.getColorFromPixel(imageData.data[1]);
        color += FramesManager.getColorFromPixel(imageData.data[2]);
        this.paint.setColor(this.paint.elmsArray[j][i], color);
      } else {
        this.paint.setColor(this.paint.elmsArray[j][i], null);
      }
      j += 1;
      if (j === size) {
        i += 1;
        j = 0;
      }
    }
  }

  static getColorFromPixel(numberBaseTen) {
    let res;
    if (numberBaseTen === 0) {
      return '00';
    }
    res = numberBaseTen.toString(16);
    if (res.length < 2) {
      res = `0${res}`;
    }
    return res;
  }

  playAnimation() {
    if (this.animationPlayId) {
      clearInterval(this.animationPlayId);
    }
    this.currentPlayingFrameInd = 0;

    const callback = () => {
      const url = this.framesStorage[this.currentPlayingFrameInd].image;
      if (url !== null) {
        this.animationPlayer.setBackgroundImage(url);
        this.currentPlayingFrameInd += 1;
      } else {
        this.createAnimationFrame();
      }
      if (this.currentPlayingFrameInd >= this.framesStorage.length) {
        this.currentPlayingFrameInd = 0;
      }
    };
    callback();
    this.animationPlayId = setInterval(callback, this.interval);
  }

  transformAt(x, y) {
    const element = this.paint.elmsArray[y][x];
    const frameData = this.framesStorage[this.currActiveInd];
    const { ctx } = frameData;
    const { canvas } = frameData;
    const squareCount = this.paint.elmsArray.length;
    const squareSize = canvas.width / squareCount;
    ctx.clearRect(x * squareSize, y * squareSize, squareSize, squareSize);
    ctx.fillStyle = element.dataset.color;
    if (element.dataset.transformed === 'true') {
      ctx.beginPath();
      ctx.arc(
        x * squareSize + squareSize / 2,
        y * squareSize + squareSize / 2,
        squareSize / 2, 0, Math.PI * 2, true,
      );
      ctx.fill();
      frameData.transformed.push({
        x,
        y,
      });
    } else {
      ctx.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
      const ind = frameData.transformed.findIndex(obj => obj.x === x && obj.y === y);
      frameData.transformed.splice(ind, 1);
    }
    this.createAnimationFrame();
  }

  createAnimationFrame() {
    const data = this.framesStorage[this.currActiveInd];
    const elmCount = this.paint.elmsArray.length;
    const imageCanvas = document.createElement('canvas');
    const size = this.initCanvasSize(400);
    imageCanvas.width = size;
    imageCanvas.height = size;
    const squareSize = imageCanvas.width / elmCount;
    const ctx = imageCanvas.getContext('2d');
    let color;
    let transformed;

    for (let i = 0; i < elmCount; i += 1) {
      for (let j = 0; j < elmCount; j += 1) {
        ({ color, transformed } = this.paint.elmsArray[i][j].dataset);
        FramesManager.fillCanvasAt(ctx, j, i, squareSize, color, transformed);
      }
    }

    data.image = imageCanvas.toDataURL('image/png');
  }

  genEvent(name, detail, elem = this.paint.canvas) {
    const event = new CustomEvent(name, {
      bubbles: true,
      detail,
    });
    elem.dispatchEvent(event);
  }

  offsetActiveFrame(x, y) {
    const data = this.framesStorage[this.currActiveInd];
    const { canvas, ctx } = data;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const squareSize = canvas.width / this.paint.elmsArray.length;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(imageData, squareSize * x, squareSize * y);
    FramesManager.offsetTransformedIndexes(x, y, data.transformed);
  }

  static offsetTransformedIndexes(x, y, transformed) {
    let square;
    for (let i = 0; i < transformed.length; i += 1) {
      square = transformed[i];
      square.x = Number(square.x) + x;
      square.y = Number(square.y) + y;
      if (square.x < 0 || square.y < 0) {
        transformed.splice(i, 1);
        i -= 1;
      }
    }
  }

  recreateFrames() {
    this.reset();
    this.addNewFrame();
  }

  reset() {
    this.frameSize = null;
    this.framesStorage = [];
    this.currentPlayingFrameInd = 0;
    this.currActiveInd = null;
    while (this.framesCount > 0) {
      this.frames.firstElementChild.remove();
      this.framesCount -= 1;
    }
  }

  setFpsFromTarget(target) {
    if (!target.classList.contains('animation-player__fps-setting')) return;
    const fps = parseInt(target.innerHTML, 10);
    this.interval = Math.floor(1000 / fps);
    if (this.prevActiveFps) {
      this.prevActiveFps.classList.remove('animation-player__fps-setting--active');
    }
    target.classList.add('animation-player__fps-setting--active');
    this.prevActiveFps = target;
    this.playAnimation();
  }

  markFirstFrame() {
    if (this.framesCount === 1) {
      this.framesStorage[0].ref.classList.add('slide--first');
    } else {
      this.framesStorage[0].ref.classList.remove('slide--first');
    }
  }
}
