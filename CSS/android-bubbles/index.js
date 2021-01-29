const px = (size) => `${Math.round(size)}px`;

const ms = (duration) => `${Math.round(duration)}ms`;

const translate = (x, y) => `translate(${px(x)}, ${px(y)})`;

const scale = (value) => `scale(${value})`;

const transform = (...values) => values.join(' ');

const arrayRemoveAt = (arr, index) => {
    arr.splice(index, 1);
};

const classNameToSelector = (className) => `.${className}`;

const className = (...classNames) => classNames.filter(Boolean).join('\s');

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
    limitByContainer = true,
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

        if (limitByContainer) {
            x = Math.min(x, maxLeftOffset);
            y = Math.min(y, maxTopOffset);
            x = Math.max(x, 0);
            y = Math.max(y, 0);
        }
    }

    return {
        x: Math.round(x),
        y: Math.round(y),
    };
};

class Bubble {
    static MAX_BUBBLES = 20;

    static BUBBLE_CLASS_NAME = 'container__bubble';

    static SCALE = 4;

    static DEFAULT_TRANSITION = 400;

    constructor({
        tag,
        text,
        className,
        color,
        transition,
    }) {
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleTransitionEnd = this.handleTransitionEnd.bind(this);

        const {
            container,
            bubbleContainer,
        } = this.createContainers({
            tag,
            text,
            className,
        });
        this.container = container;
        this.bubbleContainer = bubbleContainer;
        this.bubbles = [];

        if (typeof transition === 'number') {
            this.transitionDuration = transition;
        } else {
            this.transitionDuration = Bubble.DEFAULT_TRANSITION;
        }

        this.bubbleDefer = Math.round(this.transitionDuration / 2);
        this.bubbleColor = color;

        this.container.addEventListener('mousedown', this.handleMouseDown);
        this.container.addEventListener('mouseup', this.handleMouseUp);
        this.container.addEventListener('mouseleave', this.handleMouseLeave);
        this.container.addEventListener('transitionend', this.handleTransitionEnd);
        document.body.append(this.container); // todo: remove
    }

    get bubbleSize() {
        const { clientWidth, clientHeight } = this.container;
        return Math.ceil(Math.sqrt(Math.pow(clientWidth, 2) + Math.pow(clientHeight, 2)));
    }

    /*
        300px - 100%
        Xpx   - 40%
        X = 300 * 40 / 100
        where X is the size of the scaled element
    */
    get scaledBubbleSize() {
        return this.bubbleSize * Bubble.SCALE * 10 / 100;
    }

    get domElem() {
        return this.container;
    }

    createContainers({
        tag,
        text,
        className,
    }) {
        const container = document.createElement(tag);
        const bubbleContainer = document.createElement(tag);
        const span = document.createElement('span');

        container.classList.add('container');
        span.classList.add('container__text');
        bubbleContainer.classList.add('container__bubble-container');

        if (typeof className === 'string') {
            container.classList.add(className);
        }

        span.append(document.createTextNode(text));
        container.append(bubbleContainer);
        container.append(span);

        return {
            container,
            bubbleContainer,
        };
    }

    createBubble() {
        const bubble = document.createElement('div');
        const { bubbleSize } = this;

        bubble.classList.add(Bubble.BUBBLE_CLASS_NAME);

        if (typeof this.bubbleColor === 'string') {
            bubble.style.backgroundColor = this.bubbleColor;
        }

        bubble.style.width = px(bubbleSize);
        bubble.style.height = px(bubbleSize);

        return bubble;
    }

    transitionBubble(clientX, clientY, bubble) {
        const { element: bubbleElement } = bubble;
        const { scaledBubbleSize } = this;
        const { x, y } = positionElement({
            x: clientX,
            y: clientY,
            element: {
                offsetWidth: scaledBubbleSize,
                offsetHeight: scaledBubbleSize,
            },
            containerElement: this.bubbleContainer,
        });
        bubbleElement.style.transform = transform(translate(x, y), scale(Bubble.SCALE / 10));
        requestAnimationFrame(() => {
            const { bubbleSize } = this;
            const {
                x: containerX,
                y: containerY,
                width: containerWidth,
                height: containerHeight,
            } = this.bubbleContainer.getBoundingClientRect();
            const { x, y } = positionElement({
                x: Math.round(containerX + containerWidth / 2),
                y: Math.round(containerY + containerHeight / 2),
                element: {
                    offsetWidth: bubbleSize,
                    offsetHeight: bubbleSize,
                },
                containerElement: this.bubbleContainer,
                limitByContainer: false,
            });
            bubbleElement.classList.add('container__bubble_fading-in');
            bubbleElement.style.transitionDuration = ms(this.transitionDuration);
            bubbleElement.style.transform = transform(translate(x, y), scale(1));
        });
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

        if (elapsedTime < this.bubbleDefer) {
            setTimeout(
                this.markBubbleForRemoval.bind(this, bubble),
                Math.round(this.bubbleDefer - elapsedTime),
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
        arrayRemoveAt(this.bubbles, bubbleIndex);
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
        this.bubbleContainer.append(bubble.element);
        this.transitionBubble(clientX, clientY, bubble);
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

// TODO: add colors
// TODO: create Button class that would already append stuff to document
// TODO: add a fixed option to Bubble
// TODO: test positionElement with other options
