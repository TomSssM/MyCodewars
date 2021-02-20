class InternalError extends Error {
    constructor() {
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

const classname = (...classnames) => classnames
    .map(value => value.startsWith('.') ? value : `.${value}`)
    .filter(Boolean)
    .join('\s');

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
