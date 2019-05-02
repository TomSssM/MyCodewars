import Tool from './Tool.js';
export default class extends Tool {
    constructor(data) {
        super(data);
        this.isDrawing = false;
        this.events['mousedown'] = (e) => {
            this.onMouseDown(e);
        };
        this.events['mouseup'] = () => {
            this.onMouseUp();
        };
        this.events['mouseleave'] = () => {
            this.onMouseout();
        };
        this.events['mousemove'] = (e) => {
            this.onMouseMove(e);
        };
        this.events['dragstart'] = (e) => {
            e.preventDefault();
        };
    }

    onMouseDown(e) {
        this.isDrawing = true;
        this.drawColor = this.paint.currentColor;
        this.colorElm(e.target);
    }

    onMouseMove(e) {
        if(!this.isDrawing) return;
        const target = document.elementFromPoint(e.clientX, e.clientY);
        if(target === this.currElm) return;
        this.colorElm(target);
    }

    onMouseUp() {
        this.isDrawing = false;
    }

    onMouseout() {
        this.onMouseUp();
    }

    colorElm(elem) {
        this.currElm = elem;
        this.paint.setColor(
            this.currElm,
            this.drawColor,
        );
    }
}
