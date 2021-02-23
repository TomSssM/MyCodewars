function compose(...fns) {
    return function (...args) {
        return fns.reduce((acc, fn) => {
            return [fn(...acc)];
        }, args)[0];
    };
}

const placeholder = {};

function partialApplication(fn, ...args) {
    const boundArgs = args;
    return function (...extraArgs) {
        const realArgs = boundArgs.map((arg) => {
            if (arg === placeholder) {
                return extraArgs.shift();
            }
            return arg;
        });
        return fn(...realArgs, ...extraArgs);
    }
}

module.exports = exports = {
    compose,
    partialApplication,
    _: placeholder,
};
