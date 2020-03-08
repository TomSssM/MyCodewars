const colorsReference = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",

    fgBlack: "\x1b[30m",
    fgRed: "\x1b[31m",
    fgGreen: "\x1b[32m",
    fgYellow: "\x1b[33m",
    fgBlue: "\x1b[34m",
    fgMagenta: "\x1b[35m",
    fgCyan: "\x1b[36m",
    fgWhite: "\x1b[37m",

    bgBlack: "\x1b[40m",
    bgRed: "\x1b[41m",
    bgGreen: "\x1b[42m",
    bgYellow: "\x1b[43m",
    bgBlue: "\x1b[44m",
    bgMagenta: "\x1b[45m",
    bgCyan: "\x1b[46m",
    bgWhite: "\x1b[47m",
};

const aliases = Object.entries(colorsReference).reduce((acc, [key, color]) => {
    if (key.startsWith('fg')) {
        acc[key[2].toLowerCase()] = color;
    }

    if (key.startsWith('bg')) {
        acc[key.slice(0, 3)] = color;
    }

    return acc;
}, {});

const allColors = {
    ...aliases,
    ...colorsReference,
};

const state = [];

const colorsFunction = (str) => {
    const colorsString = state.join('');
    state.length = 0;
    return colorsString + str + allColors.reset;
};

Object.entries(allColors).forEach(([colorName, colorValue]) => {
    Object.defineProperty(colorsFunction, colorName, {
        get () {
            state.push(colorValue);
            return colorsFunction;
        }
    })
});

module.exports = exports = colorsFunction;
