import Tool from './Tool.js';
export default class extends Tool {
    constructor(data) {
        super(data);
        this.isErasing = false;

        this.events['mousedown'] = (e) => {
            this.onMouseDown(e);
        };
        this.events['mousemove'] = (e) => {
            this.onMouseMove(e);
        };
        this.events['mouseup'] = () => {
            this.onMouseUp();
        };
        this.events['mouseleave'] = () => {
            this.onMouseUp();
        };
    }

    onMouseDown(e) {
        this.isErasing = true;
        const elm = e.target;
        this.erase(elm);
    }

    onMouseMove(e) {
        if(!this.isErasing) return;
        const elm = document.elementFromPoint(e.clientX, e.clientY);
        this.erase(elm);
    }

    onMouseUp() {
        this.isErasing = false;
        this.lastElem = null;
    }

    erase(elm) {
        if(elm === this.paint.canvas) return;
        this.lastElem = elm;
        this.paint.setColor(elm, null);
    }
}