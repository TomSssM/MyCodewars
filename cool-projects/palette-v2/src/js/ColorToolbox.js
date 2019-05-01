export default class {
    constructor(data) {
        this.currColorButton = data.currColor;
        this.prevColorButton = data.prevColor;
        this.colorContainer = data.colorContainer;
        
        this.buttonClassName = data.buttonClassName;
        this.colorCircleClassName = data.colorCircleClass;
        
        data.colors.forEach(colorCirc => {
            this.setColor(
                colorCirc,
                this.getColor(colorCirc),
            );
        });
            
        this.currColorButton.addEventListener('click', () => {
            this.handleCurrColor();
        });
        this.prevColorButton.addEventListener('click', () => {
            this.handlePrevColor();
        });
        this.colorContainer.addEventListener('click', (e) => {
            this.handleCont(e.target);
        });

        this.nativeColorPicker = document.createElement('input');
        this.nativeColorPicker.type = 'color';
        this.nativeColorPicker.addEventListener('change', (e) => {
            this.currentColor = e.currentTarget.value;
        });
    }

    handleCurrColor() {
        this.nativeColorPicker.click();
    }

    handlePrevColor() {
        const color = this.getColor(this.prevColorButton);
        this.currentColor = color;
    }

    handleCont(target) {
        target = target.closest(this.buttonClassName);
        if(target && target.dataset.suggColors) {
            const color = this.getColor(target);
            if(this.currentColor === color) return;
            this.currentColor = color;
        }
    }

    set currentColor(color) {
        if(this.currentColor === color) return;
        this.setColor(
            this.prevColorButton,
            this.currentColor,
        );
        this.setColor(
            this.currColorButton,
            color,
        );
    }

    get currentColor() {
        return this.getColor(this.currColorButton);
    }

    setColor(elm, color) {
        if(!elm.dataset.color) elm = this.getCircle(elm);
        if(!elm) return;
        if(color === null) {
            elm.dataset.color = 'null';
            elm.style.backgroundColor = '';
        } else {
            elm.dataset.color = color;
            elm.style.backgroundColor = color;
        }
    }

    getColor(elm) {
        if(!elm.dataset.color) elm = this.getCircle(elm);
        if(!elm) return null;
        return elm.dataset.color;
    }

    getCircle(elem) {
        return elem.querySelector(this.colorCircleClassName);
    }

    makeStorage() {
        if(this.skipOnce) {
            this.skipOnce = false;
            return;
        }
        sessionStorage.setItem('curr-color', this.currentColor);
        sessionStorage.setItem('prev-color', this.getColor(
            this.prevColorButton
        ));
    }

    restoreFromStorage(storage) {
        const curr = storage.getItem('curr-color');
        const prev = storage.getItem('prev-color');
        if(curr) {
            this.setColor(
                this.currColorButton,
                curr
            );
        }
        if(prev) {
            this.setColor(
                this.prevColorButton,
                prev
            );
        }
    }
}
