import Tool from './Tool.js';
export default class extends Tool {
    constructor(data) {
        super(data);
        this.isMoving = false;
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
    }

    onMouseDown(e) {
        this.isMoving = true;
        this.currElem = e.target;
        this.offsetsData = {
            left: 0,
            top: 0,
        };
    }

    onMouseMove(e) {
        if(!this.isMoving) return;

        const target = document.elementFromPoint(e.clientX, e.clientY);
        if(target === this.currElem) return;

        // for rounded elements:
        if(target === this.paint.canvas) return;

        this.onSwap(target);
    }

    onMouseUp() {
        if(!this.isMoving) return;
        this.isMoving = false;
        this.RebuildTheGrid();
    }

    onSwap(swapWith) {
        if(!this.paint.canvas.contains(swapWith)) return;
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
        this.offsetCanvas();
    }

    swapLeft() {
        this.offsetsData.left--;
    }

    swapRight() {
        this.offsetsData.left++;
    }

    swapTop() {
        this.offsetsData.top--;
    }

    swapBottom() {
        this.offsetsData.top++;
    }

    offsetCanvas() {
        const marginLeft = this.offsetsData.left * this.SIZE;
        const marginTop = this.offsetsData.top * this.SIZE;
        this.paint.canvas.style.transform = `translate(${marginLeft}px, ${marginTop}px)`;
    }

    RebuildTheGrid() {
        this.paint.canvas.style.transform = '';
        if(this.offsetsData.left === 0 && this.offsetsData.top === 0) return;

        this.offsetsData.left = +this.offsetsData.left;
        this.offsetsData.top = +this.offsetsData.top;
        
        if(this.offsetsData.left !== 0) {
            if(this.offsetsData.left < 0) {
                this.deleteColumnsLeft(-this.offsetsData.left);
            } else {
                this.deleteColumnsRight(this.offsetsData.left);
            }
        }

        if(this.offsetsData.top !== 0) {
            if(this.offsetsData.top < 0) {
                this.deleteRowsTop(-this.offsetsData.top);
            } else {
                this.deleteRowsBottom(this.offsetsData.top);
            }
        }

        this.setIndexes();
    }

    deleteRowsTop(n) {
        let appendArr;
        let newElem;
        const arr = this.paint.elmsArray;
        const canvas = this.paint.canvas;
        while(n) {
            appendArr = [];
            arr.shift().forEach(elm => {
                elm.remove();
                newElem = this.paint.createElem();
                canvas.append(newElem);
                appendArr.push(newElem);
            });
            arr.push(appendArr);
            n--;
        }
    }

    deleteRowsBottom(n) {
        let prependArr;
        let newElem;
        const arr = this.paint.elmsArray;
        const canvas = this.paint.canvas;
        while(n) {
            prependArr = [];
            arr.pop().forEach(elm => {
                elm.remove();
                newElem = this.paint.createElem();
                canvas.prepend(newElem);
                prependArr.unshift(newElem);
            });
            arr.unshift(prependArr);
            n--;
        }
    }

    deleteColumnsLeft(n) {
        let newElem;
        const arr = this.paint.elmsArray;
        while(n) {
            arr.forEach(row => {
                newElem = this.paint.createElem();
                row[row.length - 1].after(newElem);
                row.shift().remove();
                row.push(newElem);
            });
            n--;
        }
    }

    deleteColumnsRight(n) {
        let newElem;
        const arr = this.paint.elmsArray;
        while(n) {
            arr.forEach(row => {
                newElem = this.paint.createElem();
                row[0].before(newElem);
                row.pop().remove();
                row.unshift(newElem);
            });
            n--;
        }
    }

    setIndexes() {
        const lengthColumn = this.paint.elmsArray.length;
        const lengthRow = this.paint.elmsArray[0].length;
        for(let y = 0; y < lengthColumn; y++) {
            for(let i = 0; i < lengthRow; i++) {
                this.paint.elmsArray[y][i].dataset.i = i;
                this.paint.elmsArray[y][i].dataset.y = y;
            }
        }
    }

    get SIZE() {
        return this.paint.SIZE;
    }
}
