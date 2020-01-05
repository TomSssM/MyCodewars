class InputMasking {
    constructor({
        element,
        maskPlaceholderChar,
        maskValuesRegEx,
        maskVisible = false,
        limitInput = false,
    }) {
        /**
         * @property {Element} element
         */
        this.element = element;

        /**
         * @property {string | null} mask
         */
        this.mask = element.dataset.mask || null;

        if (!this.mask) {
            throw new Error('No mask found');
        }

        /**
         * @property {string} MASK_PLACEHODLER_CHAR the character instead of which we can type things into the input
         */
        this.MASK_PLACEHODLER_CHAR = maskPlaceholderChar;

        /**
         * @property {string} BACKSPACE_KEY
         */
        this.BACKSPACE_KEY = 'Backspace';

        /**
         * @property {RegExp|null} maskValuesRegEx the values that can go instead of the placeholder character in the mask
         */
        this.maskValuesRegEx = maskValuesRegEx || null;

        /**
         * @property {boolean} limitInput
         */
        this.limitInput = limitInput;

        /**
         * @property {boolean} maskVisible
         */
        this.maskVisible = maskVisible;

        if (!this.maskVisible) {
            element.placeholder = this.mask;
        } else {
            element.value = this.mask;
        }

        if (maskValuesRegEx && maskValuesRegEx.test(this.mask)) {
            throw new Error('Mask values should not include the characters that the mask itself consists of');
        }

        element.addEventListener('keydown', this.validateKey);
        element.addEventListener('input', this.handleInput);
        element.addEventListener('paste', this.handlePaste);
        this.init();
    }

    init() {
        const charsMap = {};
        this.mask.split('').forEach((char) => {
            if (!charsMap[char] && char !== this.MASK_PLACEHODLER_CHAR) {
                charsMap[char] = true;
            }
        });

        const maskCharsString = Object.keys(charsMap).map(this.charToCharCode).join('');

        /**
         * @property {RegExp} maskPlaceholderRegEx regex to match the placeholder character
         */
        this.maskPlaceholderRegEx = new RegExp(this.charToCharCode(this.MASK_PLACEHODLER_CHAR), 'gu');

        /**
         * @property {RegExp} maskCharsRegEx regex to match the characters of the mask
         */
        this.maskCharsRegEx = new RegExp(`[${maskCharsString}]`, 'gu');
        if (!this.maskValuesRegEx) {
            this.maskValuesRegEx = new RegExp(`[^${maskCharsString}]`, 'gu');
        }

        if (!this.maskValuesRegEx.flags.includes('g')) {
            /*
              polyfill for RegExp.prototype.source:
                const regexBody = /^\/(.+)\/.*$/.exec(this.maskValuesRegEx.toString())[1];
            */
            this.maskValuesRegEx = new RegExp(this.maskValuesRegEx.source, `g${this.maskValuesRegEx.flags}`);
        }
    }

    // event listeners:
    validateKey = (event) => {
        const { key } = event;
        if (!this.isValidKeyPressed(event)) {
            if (key === this.MASK_PLACEHODLER_CHAR) {
                this.moveCursorBy(1);
            }
            event.preventDefault();
        }
    };

    handlePaste = (e) => {
        const data = e.clipboardData.getData('text');

        if (typeof data !== 'string') {
            return;
        }

        for (let i = 0; i < data.length; i += 1) {
            const char = data[i];
            // make sure that the char can be used in the mask
            if (char.search(this.maskValuesRegEx) === -1) {
                e.preventDefault();
                return;
            }
        }
    };

    handleInput = (e) => {
        /*
          the two algorithms below for handling input for invisible
          vs visible mask ( this.handleVisibleMask vs this.handleInvisibleMask )
          are intentionally different because why not
        */

        if (!this.mask) {
            return;
        }

        if (this.maskVisible) {
            this.handleVisibleMask(e);
        } else {
            this.handleInvisibleMask(e);
        }
    };

    // helpers:
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

    moveCursorBy(value = 1) {
        const newCursorPosition = this.element.selectionStart + value;
        this.element.selectionStart = this.element.selectionEnd = newCursorPosition;
    }

    charToCharCode(char) {
        // is not going to work too well for emoji and some UTF-16 Surrogates
        let charCode = char.codePointAt(0).toString(16);
        if (charCode.length > 4) {
            return `\\u\{${charCode}\}`;
        }
        if (charCode.length < 4) {
            charCode = '0'.repeat(4 - charCode.length) + charCode;
        }
        return `\\u${charCode}`;
    }

    focusNextTabIndex() {
        const selectable = 'input, button, select, textarea, a[href] [tabindex]';
        const selectableElements = Array.from(document.querySelectorAll(selectable)).filter((elem) => elem.tabIndex > -1);
        const index = selectableElements.indexOf(document.activeElement);
        const elementToSelect = selectableElements[index + 1] || selectableElements[0];
        elementToSelect && elementToSelect.focus();
    }

    handleVisibleMask(e) {
        // TODO: here
    }

    handleInvisibleMask(e) {
        const input = e.currentTarget;
        const inputValue = input.value;
        const cursorPosition = input.selectionStart;
        const data = inputValue.replace(this.maskCharsRegEx, '');

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

        input.value = newInputValue;
        input.selectionStart = input.selectionEnd = newCursorPosition;

        if (this.limitInput && newInputValue.length >= this.mask.length) {
            this.focusNextTabIndex();
        }
    }
}
