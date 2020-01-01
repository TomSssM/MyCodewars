class InputMasking {
    constructor({
        element,
        maskPlaceholderChar,
        maskValuesRegEx,
        preserveMask = false,
        limitInput = false,
    }) {
        this.element = element;
        this.mask = element.dataset.mask || null;

        if (!this.mask) {
            throw new Error('No mask found');
        }

        this.MASK_PLACEHODLER_CHAR = maskPlaceholderChar;
        this.maskValuesRegEx = maskValuesRegEx || null;
        this.preserveMask = preserveMask;
        this.limitInput = limitInput;

        if (!this.preserveMask) {
            element.placeholder = this.mask;
        } else {
            element.value = this.mask;
        }

        if (maskValuesRegEx && maskValuesRegEx.test(this.mask)) {
            throw new Error('Mask values should not include the characters that the mask itself consists of');
        }

        element.addEventListener('keydown', this.validateKey);
        element.addEventListener('input', this.handleInput);
        this.init();
    }

    validateKey = (event) => {
        if (!this.isValidKeyPressed(event)) {
            if (event.key === this.MASK_PLACEHODLER_CHAR) {
                this.moveCursorBy(1);
            }
            event.preventDefault();
        }
    };

    handleInput = (e) => {
        // TODO: paste check
        // TODO: visible mask
        if (!this.mask) {
            return;
        }
        const input = e.currentTarget;
        const inputValue = input.value;
        const data = inputValue.replace(this.maskRegEx, '');
        const cursorPosition = input.selectionStart;

        let maskCharsBeforeCursor = inputValue.slice(0, cursorPosition).replace(this.maskValuesRegEx, '').length;
        let newCursorPosition = cursorPosition;
        let newInputValue = '';
        let dataIndex = 0;
        let maskIndex = 0;

        while (this.mask[maskIndex] && data[dataIndex]) {
            const maskChar = this.mask[maskIndex];
            const dataChar = data[dataIndex];

            if (maskChar === this.MASK_PLACEHODLER_CHAR) {
                newInputValue += dataChar;
                dataIndex += 1;
            } else {
                newInputValue += maskChar;
                /*
                  if we are inserting a mask character before the cursor and there
                  didn't use to be such a character there before, then we need to move
                  the cursor to the right
                 */
                if (maskIndex <= cursorPosition) {
                    if (maskCharsBeforeCursor > 0) {
                        maskCharsBeforeCursor -= 1;
                    } else {
                        newCursorPosition += 1;
                    }
                }
            }

            maskIndex += 1;
        }

        if (this.limitInput) {
            // TODO: make it select next element on the tab list
        } else {
            newInputValue += data.slice(dataIndex);
        }

        input.value = newInputValue;
        input.selectionStart = input.selectionEnd = newCursorPosition;
    };

    isValidKeyPressed(event) {
        const { key } = event;
        const commandKeyPressed = event.metaKey || event.ctrlKey || event.altKey;
        if (commandKeyPressed) {
            return true;
        }
        /*
          We should not do preventDefault() for Control Keys so that the user can at least
          navigate via arrow keys.

          Control keys are keys that don't produce a character when pressed,
          keys like Backspace, or Shift, but how do we check that in JavaScript?
          Let's assume that control keys are the ones whose key
          is not one character long, like the key of Shift is "Shift" while
          key of the "a" key or the "/" key is "a" or "/" accordingly, both of
          which are 1 character long
        */

        if (key.length > 1) {
            return true;
        }

        return this.maskValuesRegEx.test(key);
    }

    init() {
        if (typeof this.mask !== 'string') {
            return;
        }

        const charsMap = {};
        this.mask.split('').forEach((char) => {
            if (!charsMap[char] && char !== this.MASK_PLACEHODLER_CHAR) {
                charsMap[char] = true;
            }
        });

        this.maskChars = Object.keys(charsMap);
        this.maskRegEx = new RegExp(`[${this.maskChars.join('')}]`, 'g');

        if (!this.maskValuesRegEx) {
            this.maskValuesRegEx = new RegExp(`[^${this.maskChars.join('')}]`, 'g');
        }

        if (!this.maskValuesRegEx.flags.includes('g')) {
            const regexBody = /^\/(.+)\/.*$/.exec(this.maskValuesRegEx.toString())[1];
            this.maskValuesRegEx = new RegExp(regexBody, 'g');
        }
    }

    moveCursorBy(value = 1) {
        const newCursorPosition = this.element.selectionStart + value;
        this.element.selectionStart = this.element.selectionEnd = newCursorPosition;
    }
}
