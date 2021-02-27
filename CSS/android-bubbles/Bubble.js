class Bubble {
    constructor({
        tag,
        color,
        className,
        transition,
        text = '...',
        defer = true,
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

        this.defer = defer;
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

    /**
     * OK, here is a little tricky thing here, so let me explain.
     * Our task is: knowing the coordinates of bubble and container,
     * do not let bubble go outside the circumference described *inside*
     * the container, let's call this circumference _Circumference A_.
     *
     * In order to do that, let's introduce another circumference: _Circumference B_.
     * Circumference B is going to have a radius equal to the radius of Circumference A
     * minus half bubble size.
     *
     * In the beginning, we need to find out the distances from the middle of the bubble
     * to the inner edges of one of the four halves that make up the Circumference A.
     * Once we know those distances, we can use them as catets of the square triangle in order
     * to find out the radius from the middle of the bubble to the center of Circumference A.
     * If this radius exceeds the radius of Circumference B, then we need to position the bubble
     * such that the coordinates of its middle match the tip of the radius of Circumference B,
     * otherwise leave the bubble where it is.
     *
     * The reason that it works is the following: if bubble goes around Circumference B such that
     * its middle lies on the edge of Circumference B, then upon making a full revolution around
     * Circumference B one may observe that the bubble also goes such that its edge is always touching
     * the inner edge of Circumference A, and not leaving Circumference A.
     *
     * @param {Number} rawX
     * @param {Number} rawY
     */
    positionBubbleInsideContainer(rawX, rawY) {
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
        const { scaledBubbleSize: bubbleSize } = this;
        const halfContainerWidth = containerWidth / 2;
        const halfContainerHeight = containerHeight / 2;
        const halfBubbleSize = bubbleSize / 2;

        let x = rawX + halfBubbleSize;
        let y = rawY + halfBubbleSize;

        const circumferenceManager = new CircumferenceManager({
            circumference: {
                width: containerWidth,
                height: containerHeight,
            },
            x, y,
        });

        x %= halfContainerWidth;
        y %= halfContainerHeight;

        const catetA = circumferenceManager.y((plus) => plus ? y : halfContainerHeight - y);
        const catetB = circumferenceManager.x((plus) => plus ? x : halfContainerWidth - x);

        const hypotenusa = SquareTriangle.hypotenusa(catetA, catetB);
        const maxHypotenusa = this.containedBubbleSize / 2 - halfBubbleSize;

        if (hypotenusa <= maxHypotenusa) {
            return {
                x: rawX,
                y: rawY,
            };
        }

        const cosAlpha = SquareTriangle.cosAlpha(catetB, hypotenusa);
        const cosBeta = SquareTriangle.cosBeta(catetA, hypotenusa);

        const maxCatetA = SquareTriangle.catetA(maxHypotenusa, cosBeta);
        const maxCatetB = SquareTriangle.catetB(maxHypotenusa, cosAlpha);

        const maxLeft = circumferenceManager.x(halfContainerWidth, maxCatetB);
        const maxTop = circumferenceManager.y(halfContainerHeight, maxCatetA);

        let finalX = maxLeft - halfBubbleSize;
        let finalY = maxTop - halfBubbleSize;

        /**
         * sometimes the difference between old and new x and / or y is so
         * small that it is accttually less than 1px and browser thus draws
         * the bubble at the wrong coordinate, thus we need to either ceil or
         * floor the resulting value to get the right position
         */
        finalX = circumferenceManager.x(
            true,
            (plus) => plus
                ? Math.ceil(finalX)
                : Math.floor(finalX),
        );

        finalY = circumferenceManager.y(
            true,
            (plus) => plus
                ? Math.ceil(finalY)
                : Math.floor(finalY),
        );

        return {
            x: finalX,
            y: finalY,
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

    createBubbleElement() {
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

    createBubble() {
        return {
            element: this.createBubbleElement(),
            isUserAllowedToTransition: false,
            fadeOutStarted: false,
            fadeInFinished: false,
            createdAt: Date.now(),
        };
    }

    findBubbleFromElement(rawElement) {
        const bubbleElement = rawElement.closest(classname(true, this.BUBBLE_CLASS_NAME));
        const bubble = bubbleElement && this.bubbles.find(({ element }) => {
            return element === bubbleElement;
        });
        return bubble || null;
    }

    transitionBubble(rawClientX, rawClientY, { element: bubbleElement }) {
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

        const limitByContainer = this.bubbleSizeType === 'contain';

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

        const { x, y } = this.positionBubbleInsideContainer(rawX, rawY);

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
        this.bubbles.forEach((bubble) => {
            if (!bubble.isUserAllowedToTransition) {
                bubble.isUserAllowedToTransition = true;

                if (this.defer) {
                    const elapsedTime = Date.now() - bubble.createdAt;

                    if (elapsedTime < this.bubbleDefer) {
                        setTimeout(
                            this.fadeOutBubble.bind(this, bubble),
                            Math.round(this.bubbleDefer - elapsedTime),
                        );
                    } else {
                        this.fadeOutBubble(bubble);
                    }
                } else {
                    if (bubble.fadeInFinished) {
                        this.fadeOutBubble(bubble);
                    }
                }
            }
        });
    }

    // or markBubbleForRemoval
    fadeOutBubble(bubble) {
        bubble.fadeOutStarted = true;
        bubble.element.classList.add('container__bubble_fading-out');
    }

    removeBubble(bubble) {
        const bubbleIndex = this.bubbles.indexOf(bubble);
        arrayRemoveAt(this.bubbles, bubbleIndex);
        bubble.element.remove();
    }

    onOpacityChange(bubble) {
        bubble.fadeInFinished = true;
        if (bubble.fadeOutStarted) {
            this.removeBubble(bubble);
        } else if (
            !bubble.fadeOutStarted &&
            bubble.isUserAllowedToTransition
        ) {
            this.fadeOutBubble(bubble);
        }
    }

    handleMouseDown(event) {
        if (this.bubbles.length > this.MAX_BUBBLES) {
            return;
        }

        const {
            clientX,
            clientY,
        } = event;

        const bubble = this.createBubble();

        this.bubbles.push(bubble);
        this.bubbleContainer.append(bubble.element);
        this.transitionBubble(clientX, clientY, bubble);
    }

    handleTransitionEnd({ propertyName, target }) {
        const bubble = this.findBubbleFromElement(target);
        if (bubble && propertyName === 'opacity') {
            this.onOpacityChange(bubble);
        }
    }

    handleMouseUp() {
        this.userAllowBubbleToTransition();
    }

    handleMouseLeave() {
        this.userAllowBubbleToTransition();
    }
}
