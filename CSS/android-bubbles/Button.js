class Button {
    constructor({
        fixed,
        text,
        color,
        square = false,
        bounce = false,
    } = {}) {
        this.bounce = bounce;
        this.square = square;
        this.deferId = null;

        this.DEFER_TIMEOUT = 200;
        this.PRESSED_CLASSNAME = 'bubble-button_pressed_yes';

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);

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

        if (this.bounce) {
            this.button.addEventListener('mousedown', this.handleMouseDown);
            this.button.addEventListener('mouseleave', this.handleMouseLeave);
            document.body.addEventListener('mouseup', this.handleMouseUp);
        }
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

    buttonColor(color) {
        return this.colorMapCache.has(color) ? color : 'default';
    }

    bubbleColor(color) {
        if (this.square) return '#b1b1b1';
        return this.colorMapCache.get(color);
    }

    handleMouseDown() {
        this.pressButton();
    }

    handleMouseUp() {
        this.unpressButton();
    }

    handleMouseLeave () {
        this.unpressButton();
    }

    pressButton () {
        if (this.deferId === null) {
            this.deferId = setTimeout(() => {
                this.button.classList.add(this.PRESSED_CLASSNAME);
            }, this.DEFER_TIMEOUT);
        }
    }

    unpressButton () {
        if (this.deferId !== null) {
            clearTimeout(this.deferId);
            this.deferId = null;
            this.button.classList.remove(this.PRESSED_CLASSNAME);
        }
    }
}
