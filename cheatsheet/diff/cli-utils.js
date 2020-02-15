function _purify(str) {
    return str.replace(/\u001b\[\d*m/g, ''); // replace colors
}

function _border(
    input,
    right = '',
    left = '',
    top = '',
    bottom = '',
    [
        topLeft = '',
        topRight = '',
        bottomLeft = '',
        bottomRight = '',

    ] = [],
) {
    const parsedInput = input.split('\n').map(_purify);
    const frameSize = Math.max(...parsedInput.map(str => str.length)) + left.length + right.length;
    const borderTopSize = frameSize - topLeft.length - topRight.length;
    const borderBottomSize = frameSize - bottomLeft.length - bottomRight.length;

    let output = '';

    if (top) {
        output += topLeft + top.repeat(borderTopSize) + topRight + '\n';
    }

    if (left || right) {
        output += input.split('\n').map((val, index) => {
            const vacantSpaceNeeded = frameSize
                - left.length
                - right.length
                - parsedInput[index].length;
            return left + val + ' '.repeat(vacantSpaceNeeded) + right;
        }).join('\n');
    } else {
        output += input;
    }

    if (bottom) {
        output += '\n' + bottomLeft + bottom.repeat(borderBottomSize) + bottomRight;
    }

    return output;
}

function _compose(...fns) {
    return function (...args) {
        return fns.reduce((acc, fn) => {
            return [fn(...acc)];
        }, args)[0];
    };
}

function frame (input) {
    return _border(
        input,
        ' │', // right border
        '│ ', // left border
        '─', // border bottom
        '─', // border top
        '┌┐└┘'.split(''), // corners
    );
}

function sideBySide (str1, str2) {
    const splitFirstStr = str1.split('\n');
    const splitSecondStr = str2.split('\n');
    if (splitFirstStr.length < splitSecondStr.length) {
        while (splitFirstStr.length < splitSecondStr.length) {
            splitFirstStr.push('');
        }
    }
    return _compose(
        (str) => _border(str, ' ║', '', '═', '═', ['', '╦', '', '╩']),
        (str) => {
            const borderedSecondStr = _border(str2, '', ' ', '═', '═').split('\n');
            return str.split('\n').map((line, index) => {
                return line + borderedSecondStr[index];
            }).join('\n');
        },
    )(splitFirstStr.join('\n'));
}

module.exports = exports = {
    frame,
    sideBySide,
};
