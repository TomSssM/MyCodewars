export default class AnimationPlayer {
  constructor(data) {
    this.playerCanvas = data.playerCanvas;
    this.playerFpsContainer = data.playerFpsContainer;
  }

  setBackgroundImage(url) {
    this.playerCanvas.style.backgroundImage = `url("${url}")`;
  }
}
