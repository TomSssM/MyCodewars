export default class {
  constructor(data) {
    this.settBtn = data.settBtn;
    this.settMenu = data.settMenu;
    this.settingButtons = data.settingButtons;
  }

  init() {
    const coords = this.settBtn.getBoundingClientRect();
    this.settMenu.style.top = coords.top;
    this.settMenu.style.right = coords.right;

    this.settBtn.addEventListener('click', () => {
      this.handleClick();
    });
    this.settMenu.addEventListener('mouseleave', () => {
      this.onMouseLeave();
    });
    this.settMenu.addEventListener('click', (e) => {
      const target = e.target.closest('.header-sett__btn');
      if (!target) return;
      this.settingButtons.forEach((button) => {
        if (target === button.button) {
          button.handleClick();
        }
      });
    });
  }

  handleClick() {
    this.settMenu.style.display = 'block';
    this.settMenu.style.opacity = '1';
  }

  onMouseLeave() {
    this.settMenu.style.opacity = '';
    setTimeout(() => {
      this.settMenu.style.display = '';
    }, 200);
  }
}
