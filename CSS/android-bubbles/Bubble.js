class Bubble {
    constructor({
        tag,
        color,
        className,
        transition,
        text = '...',
        fixed = false,
        display = 'block',
        overflow = 'hidden',
        throttleTimeout = 300,
        bubbleSize = 'overflow',
        transparentFade = false,
    } = {}) {
        this.handleMouseDown = throttle(this.handleMouseDown.bind(this), throttleTimeout);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleTransitionEnd = this.handleTransitionEnd.bind(this);

        if (typeof text === 'string') {
            this.text = document.createTextNode(text);
        } else if (text instanceof Element || text === null) {
            this.text = text;
        } else {
            throw new Error('Value of \'text\' param is invalid');
        }

        this.fixed = fixed;
        this.display = display;
        this.bubbleSizeType = bubbleSize;
        this.tag = tag || this.defaultTag;
        this.overflow = overflow !== 'hidden';
        this.transparentFade = transparentFade;

        this.SCALE = 2;
        this.MAX_BUBBLES = 20;
        this.DEFAULT_TRANSITION = 300;
        this.BUBBLE_CLASS_NAME = 'container__bubble';

        const {
            container,
            bubbleContainer,
        } = this.createContainers(className);

        this.container = container;
        this.bubbleContainer = bubbleContainer;
        this.bubbles = [];

        if (typeof transition === 'number') {
            this.transitionDuration = transition;
        } else {
            this.transitionDuration = this.DEFAULT_TRANSITION;
        }

        this.bubbleDefer = Math.round(this.transitionDuration / 2);
        this.bubbleColor = color;

        this.container.addEventListener('mousedown', this.handleMouseDown);
        this.container.addEventListener('mouseup', this.handleMouseUp);
        this.container.addEventListener('mouseleave', this.handleMouseLeave);
        this.container.addEventListener('transitionend', this.handleTransitionEnd);
    }

    get defaultTag() {
        return this.display === 'block' ? 'div' : 'span';
    }

    get fullBubbleSize() {
        const { containerWidth, containerHeight } = this.containerRectangle;
        return Math.ceil(SquareTriangle.hypotenusa(containerWidth, containerHeight));
    }

    get containedBubbleSize() {
        const { containerWidth, containerHeight } = this.containerRectangle;
        return Math.round(Math.max(containerWidth, containerHeight));
    }

    get bubbleSize() {
        return this.bubbleSizeType === 'overflow'
            ? this.fullBubbleSize
            : this.containedBubbleSize;
    }

    /*
        300px - 100%
        Xpx   - 40%
        X = 300 * 40 / 100
        where X is the size of the scaled element
    */
    get scaledBubbleSize() {
        return this.bubbleSize * this.SCALE * 10 / 100;
    }

    get containerRectangle() {
        return {
            containerWidth: this.container.clientWidth,
            containerHeight: this.container.clientHeight,
        };
    }

    positionBubbleInsideContainer(rawX, rawY, bubbleSize) {
        if (
            this.bubbleSizeType !== 'contain' ||
            this.fixed
        ) {
            return {
                x: rawX,
                y: rawY,
            };
        }

        const {
            containerWidth,
            containerHeight,
        } = this.containerRectangle;

        const halfContainerWidth = containerWidth / 2;
        const halfContainerHeight = containerHeight / 2;
        const halfBubbleSize = bubbleSize / 2;

        let x = rawX % halfContainerWidth;
        let y = rawY % halfContainerHeight;

        const topLeftHalf = (
            rawX < halfContainerWidth &&
            rawY < halfContainerHeight
        );
        const rightTopHalf = (
            rawX >= halfContainerWidth &&
            rawY < halfContainerHeight
        );
        const bottomRightHalf = (
            rawX >= halfContainerWidth &&
            rawY >= halfContainerHeight
        );
        const bottomLeftHalf = (
            rawX < halfContainerWidth &&
            rawY >= halfContainerHeight
        );

        let catetA;
        let catetB;

        if (topLeftHalf) {
            catetB = halfContainerWidth - x;
            catetA = halfContainerHeight - y;
        } else if (rightTopHalf) {
            catetB = x;
            catetA = halfContainerHeight - y;
        } else if (bottomRightHalf) {
            catetB = x;
            catetA = y;
        } else if (bottomLeftHalf) {
            catetB = halfContainerWidth - x;
            catetA = y;
        } else {
            throw new InternalError();
        }

        const hypotenusa = SquareTriangle.hypotenusa(catetA, catetB);
        const maxHypotenusa = this.containedBubbleSize / 2 - halfBubbleSize;

        if (hypotenusa <= maxHypotenusa - halfBubbleSize) {
            return {
                x: rawX,
                y: rawY,
            };
        }

        const cosAlpha = SquareTriangle.cosAlpha(catetB, hypotenusa);
        const cosBeta = SquareTriangle.cosBeta(catetA, hypotenusa);

        const maxCatetA = SquareTriangle.catetA(maxHypotenusa, cosBeta);
        const maxCatetB = SquareTriangle.catetB(maxHypotenusa, cosAlpha);

        let maxLeft;
        let maxTop;

        if (topLeftHalf) {
            maxLeft = halfContainerWidth - maxCatetB;
            maxTop = halfContainerHeight - maxCatetA;
        } else if (rightTopHalf) {
            maxLeft = halfContainerWidth + maxCatetB;
            maxTop = halfContainerHeight - maxCatetA;
        } else if (bottomRightHalf) {
            maxLeft = halfContainerWidth + maxCatetB;
            maxTop = halfContainerHeight + maxCatetA;
        } else if (bottomLeftHalf) {
            maxLeft = halfContainerWidth - maxCatetB;
            maxTop = halfContainerHeight + maxCatetA;
        } else {
            throw new InternalError();
        }

        return {
            x: maxLeft - halfBubbleSize,
            y: maxTop - halfBubbleSize,
        };
    }

    domElem() {
        return this.container;
    }

    createContainers(containerClassName) {
        const container = document.createElement(this.tag);
        const bubbleContainer = document.createElement(this.defaultTag);
        const text = document.createElement('span');

        container.className = classname('container', containerClassName);
        text.classList.add('container__text');
        bubbleContainer.classList.add('container__bubble-container');

        if (!this.overflow) {
            bubbleContainer.classList.add('container__bubble-container_overflow_no');
        }

        text.append(this.text || '');
        container.append(bubbleContainer);
        container.append(text);

        return {
            container,
            bubbleContainer,
        };
    }

    createBubble() {
        const bubble = document.createElement('div');
        const { bubbleSize } = this;

        bubble.classList.add(this.BUBBLE_CLASS_NAME);

        if (typeof this.bubbleColor === 'string') {
            bubble.style.backgroundColor = this.bubbleColor;
        }

        if (this.transparentFade) {
            bubble.classList.add('container__bubble_fade-type_transparent');
        }

        bubble.style.width = px(bubbleSize);
        bubble.style.height = px(bubbleSize);

        return bubble;
    }

    transitionBubble(rawClientX, rawClientY, { element: bubbleElement }) {
        const limitByContainer = this.bubbleSizeType === 'contain';
        const {
            scaledBubbleSize,
            bubbleSize,
        } = this;
        const {
            x: containerX,
            y: containerY,
            width: containerWidth,
            height: containerHeight,
        } = this.bubbleContainer.getBoundingClientRect();

        const halfContainerWidthCoordinate = Math.round(containerX + containerWidth / 2);
        const halfContainerHeightCoordinate = Math.round(containerY + containerHeight / 2);

        const clientX = this.fixed ? halfContainerWidthCoordinate : rawClientX;
        const clientY = this.fixed ? halfContainerHeightCoordinate : rawClientY;

        const { x: rawX, y: rawY } = positionElement({
            x: clientX,
            y: clientY,
            element: {
                offsetWidth: scaledBubbleSize,
                offsetHeight: scaledBubbleSize,
            },
            containerElement: this.bubbleContainer,
            limitByContainer,
        });

        const { x, y } = this.positionBubbleInsideContainer(rawX, rawY, scaledBubbleSize);

        bubbleElement.style.transform = transform(translate(x, y), scale(this.SCALE / 10));

        requestAnimationFrame(() => {
            const { x, y } = positionElement({
                x: halfContainerWidthCoordinate,
                y: halfContainerHeightCoordinate,
                element: {
                    offsetWidth: bubbleSize,
                    offsetHeight: bubbleSize,
                },
                containerElement: this.bubbleContainer,
                limitByContainer,
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
        if (this.bubbles.length > this.MAX_BUBBLES) {
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
        const bubbleElement = target.closest(classname(true, this.BUBBLE_CLASS_NAME));
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