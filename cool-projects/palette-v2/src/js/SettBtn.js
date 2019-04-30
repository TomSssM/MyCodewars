export default class {
    constructor(data) {
        this.settBtn = data.settBtn;
        this.settMenu = data.settMenu;

        const coords = this.settBtn.getBoundingClientRect();
        this.settMenu.style.top = coords.top;
        this.settMenu.style.right = coords.right;

        this.settBtn.addEventListener('click', (e) => {
            this.handleClick();
        });
        this.settMenu.addEventListener('mouseleave', (e) => {
            this.onMouseLeave();
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
