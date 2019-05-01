import Tool from './Tool.js';
export default class extends Tool {
    constructor(data) {
        super(data);
        this.events['click'] = (e) => {
            this.onClick(e);
        }
    }

    onClick(e) {
        if(e.target === this.paint.canvas || !this.paint.canvas.contains(e.target)) return;
        this.selectAreaAround(e.target);
        this.paintCurrArea();
    }

    selectAreaAround(elem) {
        this.currArea = [elem];
        let currInd = 0;
        let currElem;
        let i;
        let y;
        let left;
        let right;
        let top;
        let bott;
        const elms = this.paint.elmsArray;
        while(currInd < this.currArea.length) {
            currElem = this.currArea[currInd];
            i = +currElem.dataset.i;
            y = +currElem.dataset.y;
            if(elms[y] && elms[y][i-1]) {
                left = elms[y][i-1];
                if(!this.currArea.includes(left) && left.dataset.color === currElem.dataset.color) {
                    this.currArea.push(left);
                }
            }
            if(elms[y] && elms[y][i+1]) {
                right = elms[y][i+1];
                if(!this.currArea.includes(right) && right.dataset.color === currElem.dataset.color) {
                    this.currArea.push(right);
                }
            }
            if(elms[y+1] && elms[y+1][i]) {
                top = elms[y+1][i];
                if(!this.currArea.includes(top) && top.dataset.color === currElem.dataset.color) {
                    this.currArea.push(top);
                }
            }
            if(elms[y-1] && elms[y-1][i]) {
                bott = elms[y-1][i];
                if(!this.currArea.includes(bott) && bott.dataset.color === currElem.dataset.color) {
                    this.currArea.push(bott);
                }
            }
            currInd++;
        }
    }

    paintCurrArea() {
        if(!this.currArea) return;
        this.currArea.forEach(elem => {
            this.paint.setColor(
                elem,
                this.paint.currentColor
            );
        });
    }
}
