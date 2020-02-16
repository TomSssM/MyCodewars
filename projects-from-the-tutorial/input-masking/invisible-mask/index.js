class InputMasking {
    constructor({
        element,
        maskPlaceholderChar,
        maskValuesRegEx,
        limitInput = false,
    }) {
        this.element = element;
        this.mask = element.dataset.mask;

        if (!this.mask) {
            throw new Error('No mask found');
        }

        this.MASK_PLACEHODLER_CHAR = maskPlaceholderChar;
        this.maskValuesRegEx = maskValuesRegEx || null;
        this.limitInput = limitInput;

        if (maskValuesRegEx && maskValuesRegEx.test(this.mask)) {
            throw new Error('Mask values should not include the characters that the mask itself consists of');
        }

        this.inputElement = element;

        this.init();
    }

    static charToCharCode(char) {
        let charCode = char.codePointAt(0).toString(16);
        if (charCode.length > 4) {
            return `\\u\{${charCode}\}`;
        }
        if (charCode.length < 4) {
            charCode = '0'.repeat(4 - charCode.length) + charCode;
        }
        return `\\u${charCode}`;
    }

    static focusNextTabIndex() {
        const selectable = 'input, button, select, textarea, a[href] [tabindex]';
        const selectableElements =
            Array.from(document.querySelectorAll(selectable)).filter((elem) => elem.tabIndex > -1);
        const index = selectableElements.indexOf(document.activeElement);
        const elementToSelect = selectableElements[index + 1] || selectableElements[0];
        elementToSelect && elementToSelect.focus();
    }

    init() {
        this.inputElement.placeholder = this.mask;

        this.inputElement.addEventListener('keydown', this.onKeyDown);
        this.inputElement.addEventListener('input', this.onInput);
        this.inputElement.addEventListener('paste', this.onPaste);

        this.maskCharsRegEx = this.buildMaskCharsRegEx();

        if (!this.maskValuesRegEx) {
            this.maskValuesRegEx = new RegExp(`[^${maskCharsString}]`, 'gu');
        }

        if (!this.maskValuesRegEx.flags.includes('g')) {
            /*
              polyfill for RegExp.prototype.source:
                const regexBody = /^\/(.+)\/.*$/.exec(this.maskValuesRegEx.toString())[1];
            */
            this.maskValuesRegEx = new RegExp(
                this.maskValuesRegEx.source,
                'g' + this.maskValuesRegEx.flags,
            );
        }
    }

    /*
     * The RegEx that will be used to get
     * the raw data to operate on
     * */
    buildMaskCharsRegEx() {
        const charsMap = {};
        this.mask.split('').forEach((char) => {
            if (char !== this.MASK_PLACEHODLER_CHAR) {
                charsMap[char] = true;
            }
        });
        const maskCharsString = Object.keys(charsMap).map(InputMasking.charToCharCode).join('');
        return new RegExp(`[${maskCharsString}]`, 'gu');
    };

    onKeyDown = (event) => {
        const { key } = event;
        if (!this.isValidKeyPressed(event)) {
            if (key === this.MASK_PLACEHODLER_CHAR) {
                this.moveCursorTo(this.inputElement.selectionStart + 1);
            }
            event.preventDefault();
        }
    };

    onPaste = (e) => {
        const data = e.clipboardData.getData('text');
        if (typeof data !== 'string') {
            return;
        }

        /*
        * if data contains chars that cannot be
        * used as values for the mask:
        */
        if (data.replace(this.maskValuesRegEx, '').length) {
            e.preventDefault();
        }
    };

    onInput = (e) => {
        const input = e.currentTarget;
        if (input !== this.inputElement) {
            throw new Error('Internal error: input event happened on doesn\'t match the passed-in input element');
        }
        this.handleInput(e);
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

    moveCursorTo(newCursorPosition) {
        this.element.selectionStart = this.element.selectionEnd = newCursorPosition;
    }

    applyMask(inputValue, cursorPosition) {
        const data = inputValue.replace(this.maskCharsRegEx, '');
        let maskCharsBeforeCursor =
            inputValue.slice(0, cursorPosition).replace(this.maskValuesRegEx, '').length;
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
                if (maskIndex < newCursorPosition) {
                    if (maskCharsBeforeCursor > 0) {
                        maskCharsBeforeCursor -= 1;
                    } else {
                        newCursorPosition += 1;
                    }
                }
            }

            maskIndex += 1;
        }

        if (!this.limitInput) {
            newInputValue += data.slice(dataIndex);
        }

        return {
            newInputValue,
            newCursorPosition,
        };
    }

    handleInput() {
        const inputValue = this.inputElement.value;
        const cursorPosition = this.inputElement.selectionStart;

        const {
            newInputValue,
            newCursorPosition,
        } = this.applyMask(inputValue, cursorPosition);

        this.inputElement.value = newInputValue;
        this.moveCursorTo(newCursorPosition);

        if (this.limitInput && newInputValue.length >= this.mask.length) {
            InputMasking.focusNextTabIndex();
        }
    }
}
