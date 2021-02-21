class Button {
    constructor({
        fixed,
        text,
        color,
        square = false,
    } = {}) {
        this.square = square;
        this.bubble = new Bubble({
            display: 'inline',
            fixed,
            bubbleSize: square ? 'contain' : 'overflow',
            transparentFade: !square,
            text: square ? this.squareContent : text,
            color: this.bubbleColor(color),
            tag: 'button',
            className: classname(
                'page-element',
                'bubble-button',
                `bubble-button_color_${this.buttonColor(color)}`,
                square && 'bubble-button_square_yes',
            ),
        });
        this.button = this.bubble.domElem();
        document.body.append(this.button);
    }

    buttonColor(color) {
        return this.colorMapCache.has(color) ? color : 'default';
    }

    bubbleColor(color) {
        if (this.square) return '#b1b1b1';
        return this.colorMapCache.get(color);
    }

    get colorMapCache() {
        if (!this.colorsMap) {
            this.colorsMap = new Map();
            this.colorsMap.set('blue', '#acacec');
            this.colorsMap.set('green', '#7ecf7e');
        }
        return this.colorsMap;
    }

    get squareContent () {
        const dots = document.createElement('span');
        dots.classList.add('bubble-button__dots');
        return dots;
    }
}
