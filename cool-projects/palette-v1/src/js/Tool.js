export default class Tool {
    constructor(data) {
        this.paint = data.paint;
        this.classNameCanvas = data.classNameCanvas;
        this.button = data.button;
        this.classNameButton = data.classNameButton;
        this.events = {};

        this.button.addEventListener('click', () => {
            this.paint.replaceCurrentTool(this);
        });
    }

    init() {
        this.button.classList.add(this.classNameButton);
        this.paint.canvas.classList.add(this.classNameCanvas);
        for(let key in this.events) {
            this.paint.canvas.addEventListener(key, this.events[key]);
        }
    }

    stop() {
        this.button.classList.remove(this.classNameButton);
        this.paint.canvas.classList.remove(this.classNameCanvas);
        for(let key in this.events) {
            this.paint.canvas.removeEventListener(key, this.events[key]);
        }
    }
}
