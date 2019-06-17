export default class HambMenuButton {
  constructor(data) {
    this.btn = data.btn;
    this.main = data.main;
  }

  init() {
    this.btn.addEventListener('click', () => {
      this.onClick();
    });
  }

  onClick() {
    this.main.classList.toggle('main--collapsed');
  }
}
