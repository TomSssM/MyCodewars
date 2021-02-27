class InternalError extends Error {
    constructor() {
        super();
        this.message = 'Internal error';
    }
}

const px = (size) => `${Math.round(size)}px`;

const ms = (duration) => `${Math.round(duration)}ms`;

const translate = (x, y) => `translate(${px(x)}, ${px(y)})`;

const scale = (value) => `scale(${value})`;

const transform = (...values) => values.join(' ');

const arrayRemoveAt = (arr, index) => {
    arr.splice(index, 1);
};

const getOpacity = (element) => {
    if (!(element instanceof Element)) {
        throw new Error('Passed a wrong value to getOpacity');
    }
    const { opacity: rawOpacity } = getComputedStyle(element);
    return Number(rawOpacity);
};

const classname = (rawSelect, ...rawClassnames) => {
    const classnames = typeof rawSelect === 'boolean'
        ? [...rawClassnames]
        : [rawSelect, ...rawClassnames];
    const select = typeof rawSelect === 'boolean' ? rawSelect : false;
    const selector = (value) => value.startsWith('.') ? value : `.${value}`;

    return classnames
        .map(value => select ? selector(value) : value)
        .filter(Boolean)
        .join(' ');
};

const throttle = (fn, rawTime) => {
    const time = Number.isNaN(rawTime) ? 0 : Math.max(rawTime, 0);
    if (time <= 0) return fn;
    let prev;
    return (...args) => {
        const current = Date.now();
        if (!prev || current - prev > time) {
            prev = current;
            fn(...args);
        }
    };
};

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

/**
 *
 *         |\
 *         |β\
 *  catetA |  \  hypotenusa
 *         |   \
 *         |   α\
 *          -----
 *          catetB
 */
const SquareTriangle = {
    hypotenusa(catetA, catetB) {
        return Math.sqrt(Math.pow(catetA, 2) + Math.pow(catetB, 2));
    },
    catetA(hypotenusa, cosBeta) {
        return hypotenusa * cosBeta;
    },
    catetB(hypotenusa, cosAlpha) {
        return hypotenusa * cosAlpha;
    },
    cosAlpha(catetB, hypotenusa) {
        return catetB / hypotenusa;
    },
    cosBeta(catetA, hypotenusa) {
        return catetA / hypotenusa;
    },
};

/**
 * Calculates operation to carry out in order
 * to push or pull a coordinate from the middle
 * of circumference
 */
class CircumferenceManager {
    constructor({
        circumference,
        x, y,
    }) {
        const {
            width,
            height,
        } = circumference;

        const halfWidth = width / 2;
        const halfHeight = height / 2;

        this.topLeftHalf = (
            x < halfWidth &&
            y < halfHeight
        );
        this.topRightHalf = (
            x >= halfWidth &&
            y < halfHeight
        );
        this.bottomLeftHalf = (
            x < halfWidth &&
            y >= halfHeight
        );
        this.bottomRightHalf = (
            x >= halfWidth &&
            y >= halfHeight
        );

        this.x = this.decordator(this.x);
        this.y = this.decordator(this.y);
    }

    x() {
        let operation;

        if (this.topLeftHalf) {
            operation = false;
        } else if (this.topRightHalf) {
            operation = true;
        } else if (this.bottomRightHalf) {
            operation = true;
        } else if (this.bottomLeftHalf) {
            operation = false;
        } else {
            throw new InternalError();
        }

        return operation;
    }

    y() {
        let operation;

        if (this.topLeftHalf) {
            operation = false;
        } else if (this.topRightHalf) {
            operation = false;
        } else if (this.bottomRightHalf) {
            operation = true;
        } else if (this.bottomLeftHalf) {
            operation = true;
        } else {
            throw new InternalError();
        }

        return operation;
    }

    decordator(fn) {
        return (...args) => {
            let reverse;
            let operator;

            if (args.length === 1) {
                reverse = false;
                [operator] = args;
            }

            if (args.length === 2) {
                const [val1, val2] = args;

                if (typeof val2 === 'function') {
                    reverse = val1;
                    operator = val2;
                } else {
                    reverse = false;
                    operator = this.defaultOperator(val1, val2);
                }
            }

            if (args.length === 3) {
                const [, val1, val2] = args;

                [reverse] = args;
                operator = this.defaultOperator(val1, val2);
            }

            if (typeof reverse !== 'boolean') {
                throw new TypeError('`reverse` should be Boolean');
            }

            if (typeof operator !== 'function') {
                throw new TypeError('`operator` should be a function');
            }

            const operation = fn.call(this);

            return operator(reverse ? !operation : operation);
        }
    }

    defaultOperator(val1, val2) {
        return (plus) => plus
            ? val1 + val2
            : val1 - val2;
    }
}
