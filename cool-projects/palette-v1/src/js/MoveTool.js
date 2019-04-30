import Tool from './Tool.js';
export default class extends Tool {
    constructor(data) {
        super(data);
        this.isMoving = false;
        this.isTransitioning = false;
        this.events['mousedown'] = (e) => {
            this.onMouseDown(e);
        };
        this.events['mousemove'] = (e) => {
            this.onMouseMove(e);
        };
        this.events['mouseup'] = (e) => {
            this.onMouseUp(e);
        };
        this.events['mouseleave'] = (e) => {
            this.onMouseUp();
        }
        this.events['transitionend'] = (e) => {
            if(e.target !== this.swapElem) return;
            this.onTransitionend();
        }
    }

    onMouseDown(e) {
        this.isMoving = true;
        this.currElem = e.target;
    }

    onMouseMove(e) {
        if(!this.isMoving) return;
        if(this.isTransitioning) return;

        const target = document.elementFromPoint(e.clientX, e.clientY);
        if(target === this.currElem) return;

        // for rounded elements:
        if(target === this.paint.canvas) return;

        this.onSwap(target);
    }

    onMouseUp() {
        if(!this.isMoving) return;
        this.isMoving = false;
    }

    onTransitionend() {
        if(!this.currentCallback) return;
        this.isTransitioning = false;
        this.currElem.style.transform = '';
        this.swapElem.style.transform = '';
        this.currElem.style.transition = '';
        this.swapElem.style.transition = '';
        this.currentCallback();
        this.currentCallback = null;
    }

    onSwap(swapWith) {
        this.swapElem = swapWith;
        const currI = +this.currElem.dataset.i;
        const currY = +this.currElem.dataset.y;
        const swapI = +swapWith.dataset.i;
        const swapY = +swapWith.dataset.y;
        if(swapI < currI) {
            this.swapLeft();
        } else if(swapI > currI) {
            this.swapRight();
        } else if(swapY < currY) {
            this.swapTop();
        } else {
            this.swapBottom();
        }
        this.currElem.dataset.i = swapI;
        this.currElem.dataset.y = swapY;
        this.swapElem.dataset.i = currI;
        this.swapElem.dataset.y = currY;
    }

    swapLeft() {
        this.currentCallback = () => {
            this.swapElem.before(this.currElem);
        };
        this.makeTransition(-this.SIZE, 0, this.SIZE, 0);
    }

    swapRight() {
        this.currentCallback = () => {
            this.swapElem.after(this.currElem);
        };
        this.makeTransition(this.SIZE, 0, -this.SIZE, 0);
    }

    swapTop() {
        this.MakeVerticalCallback();
        this.makeTransition(0, -this.SIZE, 0, this.SIZE);
    }

    swapBottom() {
        this.MakeVerticalCallback();
        this.makeTransition(0, this.SIZE, 0, -this.SIZE);
    }

    makeTransition(x1, y1, x2, y2) {
        this.isTransitioning = true;
        this.currElem.style.transition = '.2s transform ease-in-out';
        this.swapElem.style.transition = '.2s transform ease-in-out';
        this.currElem.style.transform = `translate(${x1}px, ${y1}px)`;
        this.swapElem.style.transform = `translate(${x2}px, ${y2}px)`;
    }

    MakeVerticalCallback() {
        this.currentCallback = () => {
            let sibling;
            let isNextSibling = false;
            if(this.currElem.previousElementSibling) {
                sibling = this.currElem.previousElementSibling;
            } else {
                sibling = this.currElem.nextElementSibling;
                isNextSibling = true;
            }
            this.swapElem.after(this.currElem);
            if(isNextSibling) {
                sibling.before(this.swapElem);
            } else sibling.after(this.swapElem);
        };
    }

    get SIZE() {
        return this.paint.SIZE;
    }
}
