class VisibleInputMasking extends InputMasking {
    constructor(data) {
        super(data);
        this.prevInput = this.mask;
        this.prevCursorPos = 0;
        this.inputElement.placeholder = '';
        this.inputElement.value = this.mask;
    }

    shouldFocusNext() {
        const inputValue = this.inputElement.value;
        const allValuesFilled = inputValue.replace(
            new RegExp(
                InputMasking.charToCharCode(this.MASK_PLACEHODLER_CHAR),
                'g',
            ),
            '',
        ).length === inputValue.length;

        return (
            this.limitInput &&
            inputValue.length >= this.mask.length &&
            allValuesFilled
        );
    }

    handleInput() {
        if (this.isAddition()) {
            this.insertOver();
        } else {
            super.handleInput();
            this.orderTheEnding();
        }

        this.prevInput = this.inputElement.value;
        this.prevCursorPos = this.inputElement.selectionStart;
    }

    orderTheEnding() {
        /*
          make sure that, if the user were to delete the end of
          the string, the ending still remains visible
         */
        this.setInputValueTo(
            this.inputElement.value +
            this.mask.slice(this.inputElement.value.length)
        );
    }

    isAddition() {
        const inputLength = this.inputElement.value.length - 1;
        const prevInputLength = this.prevInput.length - 1;

        return inputLength > prevInputLength;
    }

    insertOver() {
        const inputLength = this.inputElement.value.length - 1;
        const prevInputLength = this.prevInput.length - 1;
        const insertEnd = this.inputElement.selectionStart;
        const insertStart = insertEnd - (inputLength - prevInputLength);

        const outputData = this.prevInput.split('');
        const dataToInsert = this.inputElement.value
            .slice(insertStart, insertEnd)
            .split('');
        const extraDataToInsert = [];
        let i = insertStart;

        const write = (insertData, extraData) => {
            /*
             * make sure NOT to use !this.maskCharsRegEx.test here because
             * it behaves funny if called multiple times on the same RegEx
             * instance with global flag turned on
             */
            if (outputData[i].search(this.maskCharsRegEx) === -1) {
                if (outputData[i] !== this.MASK_PLACEHODLER_CHAR) {
                    extraData.push(outputData[i]);
                }
                outputData[i] = insertData.shift();
            }
        };

        while (i < this.mask.length && dataToInsert.length) {
            write(dataToInsert, extraDataToInsert);
            i += 1;
        }

        const nextCursorPosition = i;

        while (i < this.mask.length && extraDataToInsert.length) {
            write(extraDataToInsert, extraDataToInsert);
            i += 1;
        }

        this.setInputValueTo(outputData.join(''));
        this.moveCursorTo(nextCursorPosition);
    }
}
