const { diff, TYPES_ENUM } = require('./diff');
const { firstFile, secondFile, messages } = require('./data');
const colors = require('./colors');
const { frame, sideBySide } = require('./cli-utils'); // wild west

function makeSlide(str1, str2) {
    let message = '';
    message += `1st: ${colors.bright}${str1}${colors.reset}\n`;
    message += `2nd: ${colors.bright}${str2}${colors.reset}\n`;
    message += `Out:\n\n`;
    message += _diffToOutput(str1, str2) || 'None';
    return frame(message);
}

function _diffToOutput(str1, str2) {
    const diffResult = diff(str1, str2);

    if (diffResult) {
        return diffResult.map(({ val, type }) => {
            let color;
            switch (type) {
                case TYPES_ENUM.MODIFIED:
                    color = colors.fgCyan;
                    break;
                case TYPES_ENUM.DELETED:
                    color = colors.fgRed;
                    break;
                case TYPES_ENUM.INSERTED:
                    color = colors.fgGreen;
                    break;
                default:
                    color = '';
            }
            return color + val + colors.reset;
        }).join('') + colors.reset;
    }

    return '';
}

function compareFiles(file1, file2) {
    const parsedFile1 = file1.split('\n');
    const parsedFile2 = file2.split('\n');
    while (parsedFile2.length > parsedFile1.length) {
        parsedFile1.push('');
    }
    while (parsedFile1.length > parsedFile2.length) {
        parsedFile2.push('');
    }
    const output = [];
    parsedFile1.forEach((line, index) => {
        output.push(_diffToOutput(line, parsedFile2[index]) || line);
    });
    return output.join('\n');
}

function header(str) {
    return (
        ''
        + colors.bright
        + colors.fgGreen
        + colors.reverse
        + ' '
        + str
        + ' '
        + colors.reset
    );
}

function subheader(str) {
    return `\n${colors.bright}${str}:\n${colors.reset}`;
}

console.log(header('Line Per Line Comparison'));
console.log(messages.map(([str1, str2]) => makeSlide(str1, str2)).join('\n') + '\n');
console.log(header('File per File Comparison'));
console.log(subheader('Diff:'));
console.log(compareFiles(firstFile, secondFile));
console.log(subheader('Source Files'));
console.log(sideBySide(firstFile, secondFile) + '\n');
