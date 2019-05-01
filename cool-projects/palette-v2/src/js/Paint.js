export default class Paint {

    constructor(data) {
        this.colorToolbox = data.colorToolbox;
        this.canvas = data.canvas;
        this.currentTool = null;
    }

    setColor(elm, color) {
        this.colorToolbox.setColor(elm, color);
    }

    getColor(elm) {
        return this.colorToolbox.getColor(elm);
    }

    get currentColor() {
        return this.colorToolbox.currentColor;
    }

    set currentColor(color) {
        this.colorToolbox.currentColor = color;
    }

    setCurrentTool(tool) {
        if(this.currentTool) return;
        const changeToolEvent = new CustomEvent('change-tool', {
            bubbles: true,
            detail: {
                tool,
            },
        });
        this.canvas.dispatchEvent(changeToolEvent);
        this.currentTool = tool;
        this.currentTool.init();
    }

    removeCurrentTool() {
        if(this.currentTool) this.currentTool.stop();
        this.currentTool = null;
    }

    replaceCurrentTool(tool) {
        if(this.currentTool === tool) return;
        this.removeCurrentTool();
        this.setCurrentTool(tool);
    }

    createCanvas(elmsInRow) {
        if(this.elmsArray) this.deleteCanvas();
        this.elmsInRow = elmsInRow;
        this.elmsArray = [];
        let elmCount = elmsInRow ** 2;
        this.canvas.style.gridTemplateColumns = `repeat(${elmsInRow}, 1fr)`;

        let elm;
        let i = 0;
        let y = 0;
        while(elmCount) {
            if(!this.elmsArray[y]) this.elmsArray[y] = [];
            elm = this.createElem();
            elm.dataset.i = i;
            elm.dataset.y = y;
            this.elmsArray[y][i] = elm;
            this.canvas.append(elm);
            i++;
            elmCount--;
            if(i === elmsInRow) {
                i = 0;
                y++;
            }
        }
    }

    deleteCanvas() {
        while(this.canvas.children.length) {
            this.canvas.lastChild.remove();
        }
    }

    replaceCanvas(elmsInRow) {
        this.deleteCanvas();
        this.createCanvas(elmsInRow);
    }

    createElem() {
        const elem = document.createElement('div');
        elem.classList.add('canvas__elem');
        elem.dataset.color = null;
        elem.dataset.transformed = false;
        return elem;
    }

    get SIZE() {
        if(!this.canvas.firstChild) return null;
        return this.canvas.firstChild.offsetWidth;
    }

    makeStorage() {
        if(this.skipOnce) {
            this.skipOnce = false;
            return;
        }
        sessionStorage.setItem('prev-canvas-size', this.elmsInRow);
        const storageArray = [];
        let elm;
        for(let i = 0; i < this.elmsArray.length; i++) {
            for(let j = 0; j < this.elmsInRow; j++) {
                if(!storageArray[i]) {
                    storageArray[i] = [];
                }
                elm = this.elmsArray[i][j];
                storageArray[i][j] = {
                    clr: elm.dataset.color,
                    trns: elm.dataset.transformed,
                };
            }
        }
        sessionStorage.setItem('prev-canvas-picture', JSON.stringify(
            storageArray
        ));
    }

    loadFromStorage(data) {
        const prevCanvasArr = data.prevCanvasArr;
        const transformTool = data.transformTool;
        this.createCanvas(+data.size);
        let elm;
        for(let i = 0; i < prevCanvasArr.length; i++) {
            for(let j = 0; j < this.elmsInRow; j++) {
                elm = prevCanvasArr[i][j];
                if(elm.clr !== 'null') {
                    this.setColor(
                        this.elmsArray[i][j],
                        elm.clr
                    );
                }
                if(elm.trns !== 'false') {
                    transformTool.transform(this.elmsArray[i][j]);
                }
            }
        }
    }
}
