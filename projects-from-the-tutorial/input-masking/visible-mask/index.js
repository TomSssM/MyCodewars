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
        const inputValue = this.inputElement.value;
        const cursorPosition = this.inputElement.selectionStart;
        return false; // TODO: here
    }

    insertOver() {
        // TODO: here
    }
}
