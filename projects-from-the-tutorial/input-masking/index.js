const inputElement = document.querySelector('#mask-input');
const mask = inputElement.dataset.mask;
const MASK_PLACEHODLER_CHAR = 'x';
let previousCursorPosition = null;

inputElement.addEventListener('keydown', (e) => {
    const controlKeyPressed = isControlKey(e);
    if (controlKeyPressed) {
        return;
    }
    if (!isNumberKey(e)) {
        e.preventDefault();
    }
});

inputElement.addEventListener('input', (e) => {
    const input = e.currentTarget;
    const inputValue = input.value;
    const data = inputValue.replace(/\D/g, '');
    const cursorPosition = input.selectionStart;

    let newCursorPosition = cursorPosition;
    let newInputValue = '';
    let dataIndex = 0;
    let maskIndex = 0;

    while (mask[maskIndex] && data[dataIndex]) {
        const maskChar = mask[maskIndex];
        const dataChar = data[dataIndex];

        if (maskChar === MASK_PLACEHODLER_CHAR) {
            newInputValue += dataChar;
            dataIndex += 1;
        } else {
            newInputValue += maskChar;
            /*
              move the cursor if we inserted the characters from the mask between old
              and new positions of the cursor; we need to check exactly between old and
              new not to move the cursor too much to the right
            */
            if (maskIndex < cursorPosition && maskIndex >= previousCursorPosition) {
                newCursorPosition += 1;
            }
        }

        maskIndex += 1;
    }

    newInputValue += data.slice(dataIndex);

    previousCursorPosition = newCursorPosition;
    input.value = newInputValue;
    input.selectionStart = input.selectionEnd = newCursorPosition;
});

// helpers:
function isControlKey(event) {
    /*
      Control keys are keys that don't produce a character when pressed,
      keys like Backspace, or Shift, but how do we check that in JavaScript?
      Let's assume that control keys are the ones whose key
      is not one character long, like the key of Shift is "Shift" while
      key of the "a" key or the "/" key is "a" or "/" accordingly, both of
      which are 1 character long
    */
    const { key } = event;
    const wasCommandKeyPressed = event.metaKey || event.shiftKey;
    return key.length !== 1 || wasCommandKeyPressed;
}

function isNumberKey(e) {
    const { key } = e;
    if (Number.isNaN(parseInt(key, 10))) {
        return false;
    }
    return !Number.isNaN(Number(key));
}
