export default class {
    constructor(data) {
        this.paint = data.paint;
        this.elem = data.elem;
        this.modalCoverClassName = data.modalCoverClassName;
        this.modalClassName = data.modalClassName;
        this.modalFadeOutClassName = data.modalFadeOutClassName;
        this.modalElem = data.modalElem;
        this.inputElem = this.modalElem.querySelector('input[type="text"]');
        this.outputElem = data.outputElem;
        this.isTyping = false;

        this.modalElem.addEventListener('click', (e) => {
            this.handleModalClick(e);
        });
        this.modalElem.addEventListener('focusin', () => {
            this.isTyping = true;
        });

        this.modalElem.addEventListener('keyup', () => {
            this.handleKeyup();
        });

        this.modalElem.addEventListener('focusout', () => {
            this.isTyping = false;
        });

        this.modalElem.addEventListener('submit', (e) => {
            this.onSubmit(e);
        });

        this.elem.addEventListener('click', () => {
            this.handleButtonClick();
        });
    }

    handleButtonClick() {
        this.showEverything();
    }

    handleModalClick(e) {
        if(e.target.value === 'Cancel') {
            this.hideEverything();
        }
    }

    showCover() {
        this.modalCover = document.createElement('div');
        this.modalCover.classList.add(this.modalCoverClassName);
        this.modalElem.before(this.modalCover);
        setTimeout(() => {
            this.modalCover.style.opacity = '1';
        }, 0);
    }

    hideCover() {
        this.modalCover.style.opacity = '';
        setTimeout(() => {
            this.modalCover.remove();
            this.modalCover = null;
        }, 500);
    }

    showElem() {
        this.modalElem.style.display = 'flex';
    }

    hideElem() {
        this.modalElem.classList.add(this.modalFadeOutClassName);
        setTimeout(() => {
            this.modalElem.style.display = '';
            this.modalElem.classList.remove(this.modalFadeOutClassName);
        }, 500);
    }

    showEverything() {
        this.showElem();
        this.showCover();
        this.inputElem.focus();
    }

    hideEverything() {
        this.inputElem.value = '';
        this.outputElem.innerHTML = '';
        this.hideElem();
        this.hideCover();
    }

    onSubmit(e) {
        e.preventDefault();
        const input = Number(this.inputElem.value);
        this.validateInput(input);
        this.paint.createCanvas(input, true);
        this.hideEverything();
    }

    validateInput(val) {
        if(isNaN(val)) throw new Error('please enter a valid number');
        if(val < 1 || val > 64) throw new Error('range error');
        return true;
    }

    writeRatio(ratio) {
        this.outputElem.innerHTML = `${ratio}X${ratio}`;
    }

    handleKeyup() {
        if(!this.isTyping) return;
        if(this.inputElem.value === '') {
            this.outputElem.innerHTML = '';
            return;
        }
        const input = Number(this.inputElem.value);
        this.validateInput(input);
        this.writeRatio(input);
    }
}
