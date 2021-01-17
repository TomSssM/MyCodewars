const px = (size) => `${Math.round(size)}px`;

const removeAt = (arr, index) => {
    arr.splice(index, 1);
};

const classNameToSelector = (className) => `.${className}`;

const onceTransitioned = (property, element, listener, delegateTo) => {
    let properties = Array.isArray(property) ? property : [property];
    const listen = ({ propertyName: transitionedProperty }) => {
        properties = properties.filter((propertyName) => {
            return propertyName !== transitionedProperty;
        });

        if (properties.length === 0) {
            element.removeEventListener('transitionend', listen);
            listener();
        }
    };

    if (delegateTo) {
        delegateTo.addEventListener('transitionend', (e) => {
            if (e.target === element) {
                listen(e);
            }
        });
    } else {
        element.addEventListener('transitionend', listen);
    }
};

const POSITIONS = {
    LEFT: 'left',
    CENTER: 'center',
    RIGHT: 'right',
    TOP: 'top',
    BOTTOM: 'bottom',
};

const getPosition = (position = 'center') => {
    let positionX;
    let positionY;

    if (Array.isArray(position)) {
        if (position.length !== 2) {
            throw new Error('Incorrect position format', position);
        }
        [positionX, positionY] = position;
    } else if (position === POSITIONS.CENTER) {
        positionX = positionY = POSITIONS.CENTER;
    }

    if (![
        POSITIONS.LEFT,
        POSITIONS.CENTER,
        POSITIONS.RIGHT,
    ].includes(positionX)) {
        throw new Error('Unknown position for x coordinate');
    }

    if (![
        POSITIONS.TOP,
        POSITIONS.CENTER,
        POSITIONS.BOTTOM,
    ].includes(positionY)) {
        throw new Error('Unknown position for y coordinate');
    }

    return {
        positionX,
        positionY,
    };
};

const positionElement = ({
    element,
    containerElement,
    position,
    x: initialX,
    y: initialY,
}) => {
    const {
        offsetWidth: elementWidth,
        offsetHeight: elementHeight,
    } = element;
    const {
        positionX,
        positionY,
    } = getPosition(position);
    let x = initialX;
    let y = initialY;

    if (positionX === POSITIONS.CENTER) {
        x -= elementWidth / 2;
    } else if (positionX === POSITIONS.RIGHT) {
        x -= elementWidth;
    }

    if (positionY === POSITIONS.CENTER) {
        y -= elementHeight / 2;
    } else if (positionY === POSITIONS.BOTTOM) {
        y -= elementHeight;
    }

    if (containerElement) {
        const {
            clientWidth: containerWidth,
            clientHeight: containerHeight,
        } = containerElement;
        const {
            x: containerX,
            y: containerY,
        } = containerElement.getBoundingClientRect();
        const maxLeftOffset = containerWidth - elementWidth;
        const maxTopOffset = containerHeight - elementHeight;

        x -= containerX;
        y -= containerY;

        x = Math.min(x, maxLeftOffset);
        y = Math.min(y, maxTopOffset);

        x = Math.max(x, 0);
        y = Math.max(y, 0);
    }

    return {
        x: Math.round(x),
        y: Math.round(y),
    };
};

class Bubble {
    static MAX_BUBBLES = 20;

    static BUBBLE_CLASS_NAME = 'container__bubble';

    static BUBBLE_DEFER = 400;

    constructor({ tag, text, className, color }) {
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleTransitionEnd = this.handleTransitionEnd.bind(this);

        this.container = this.createContainer({ tag, text, className, color });
        this.bubbles = [];

        this.container.addEventListener('mousedown', this.handleMouseDown);
        this.container.addEventListener('mouseup', this.handleMouseUp);
        this.container.addEventListener('mouseleave', this.handleMouseLeave);
        this.container.addEventListener('transitionend', this.handleTransitionEnd);
        document.body.append(this.container);
    }

    createContainer({
        tag,
        text,
        color,
        className,
    }) {
        const container = document.createElement(tag);
        const span = document.createElement('span');

        container.classList.add('container');
        span.classList.add('container__text');

        if (color) {
            container.classList.add(`container_color_${color}`);
        }

        if (className) {
            container.classList.add(className);
        }

        span.append(document.createTextNode(text));
        container.append(span);

        return container;
    }

    createBubble() {
        const bubble = document.createElement('div');
        const {
            clientWidth: containerWidth,
            clientHeight: containerHeight,
        } = this.container;
        const maxSize = Math.max(
            containerWidth,
            containerHeight,
        );
        const initialBubbleSize = Math.round(maxSize * 0.4);

        bubble.classList.add(Bubble.BUBBLE_CLASS_NAME);
        bubble.style.width = px(initialBubbleSize);
        bubble.style.height = px(initialBubbleSize);

        return bubble;
    }

    positionBubble(x, y, { element: bubble }) {
        const {
            x: left,
            y: top,
        } = positionElement({
            x, y,
            element: bubble,
            containerElement: this.container,
        });

        bubble.style.left = px(left);
        bubble.style.top = px(top);
    }

    transitionBubble(bubble) {
        const { element: bubbleElement } = bubble;

        bubbleElement.style.width = null;
        bubbleElement.style.height = null;
        bubbleElement.style.top = null;
        bubbleElement.style.left = null;
        bubbleElement.classList.add('container__bubble_fading-in');
    }

    userAllowBubbleToTransition() {
        const bubble = this.bubbles.find(({ isUserAllowedToTransition }) => {
            return isUserAllowedToTransition === false;
        });

        if (!bubble) {
            return;
        }

        bubble.isUserAllowedToTransition = true;

        const elapsedTime = Date.now() - bubble.createdAt;

        if (elapsedTime < Bubble.BUBBLE_DEFER) {
            setTimeout(
                this.markBubbleForRemoval.bind(this, bubble),
                Math.round(Bubble.BUBBLE_DEFER - elapsedTime),
            );
        } else {
            this.markBubbleForRemoval(bubble);
        }
    }

    markBubbleForRemoval(bubble) {
        bubble.element.classList.add('container__bubble_fading-out');
    }

    removeBubble(bubble) {
        if (
            !bubble.isUserAllowedToTransition ||
            !bubble.isTransitioned
        ) {
            return;
        }

        const bubbleIndex = this.bubbles.indexOf(bubble);

        removeAt(this.bubbles, bubbleIndex);
        bubble.element.remove();
    }

    handleMouseDown(event) {
        if (this.bubbles.length > Bubble.MAX_BUBBLES) {
            return;
        }

        const {
            clientX,
            clientY,
        } = event;
        const bubble = {
            element: this.createBubble(),
            isUserAllowedToTransition: false,
            isTransitioned: false,
            createdAt: Date.now(),
        };

        this.bubbles.push(bubble);
        this.container.append(bubble.element);
        this.positionBubble(clientX, clientY, bubble);
        requestAnimationFrame(this.transitionBubble.bind(this, bubble));
    }

    handleTransitionEnd({ propertyName, target }) {
        const bubbleElement = target.closest(classNameToSelector(Bubble.BUBBLE_CLASS_NAME));
        const bubble = bubbleElement && this.bubbles.find(({ element }) => {
            return element === bubbleElement;
        });

        if (bubble && propertyName === 'opacity') {
            bubble.isTransitioned = true;
            this.removeBubble(bubble);
        }
    }

    handleMouseUp() {
        this.userAllowBubbleToTransition();
    }

    handleMouseLeave() {
        this.userAllowBubbleToTransition();
    }
}

// TODO: defer onMouseDown
// TODO: test positionElement with other options
// TODO: create bubbleContainer
// TODO: replace left / top to transform
// TODO: use scale instead of width + height ( if it works )
// TODO: add colors
