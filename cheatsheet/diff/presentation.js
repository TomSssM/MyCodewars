const { diff, TYPES_ENUM } = require('./diff');
const { firstFile, secondFile, messages } = require('./data');
const colors = require('./colors');
const { frame, sideBySide } = require('./cli-utils'); // wild west

function diffToOutput(str1, str2) {
    let message = '';
    message += `1st: ${colors.bright}${str1}${colors.reset}\n`;
    message += `2nd: ${colors.bright}${str2}${colors.reset}\n`;
    message += `Out:\n\n`;
    message += diff(str1, str2).map(({ val, type }) => {
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
    }).join('');
    return frame(message + colors.reset);
}

function compareFiles(file1, file2) {
    return 'COMPARED FILES!';
}

function header (str) {
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

console.log(header('Line Per Line Comparison'));
console.log(messages.map(([str1, str2]) => diffToOutput(str1, str2)).join('\n') + '\n');
console.log(header('File per File Comparison'));
console.log(`\n${colors.bright}Diff:\n${colors.reset}`);
console.log(compareFiles(firstFile, secondFile));
console.log('\n\n');
console.log(sideBySide(firstFile, secondFile) + '\n');
