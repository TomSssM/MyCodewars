class Slide {
    constructor(info) {
        this.elements = info.elements;
        this.index = 0;
        this.arrow = info.arrow;
        this.infoElm = {
            phase: info.phase,
            currTar: info.currTar,
        };
        this.currTar = null;

        document.addEventListener('keydown', (e) => {
            if (e.code === 'ArrowDown') {
                if(this.index === this.elements.length - 1) return;
                if(this.index === 0 && this.infoElm.phase.textContent === 'Bubble Phase') {
                    this.setInfo(this.infoElm.phase, 'Capture Phase');
                }
                this.index++;
                if(this.index === this.elements.length - 1) {
                    this.setInfo(this.infoElm.phase, 'Target Phase');
                }
                this.selectElm();
            } else if (e.code === 'ArrowUp') {
                if(this.index === 0) return;
                if(this.index === (this.elements.length - 1) && this.infoElm.phase.textContent === 'Target Phase') {
                    this.setInfo(this.infoElm.phase, 'Bubble Phase');
                }
                this.index--;
                this.selectElm();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.code === 'KeyB') {
                this.launchHandler(false);
            } else if (e.code === 'KeyC') {
                this.launchHandler(true);
            }
        });
    }

    init() {
        this.initArrow();
        this.selectElm(0);
        this.setInfo(this.infoElm.phase, 'Capture');
        this.setInfo(this.infoElm.currTar);
    }

    selectElm() {
        if(this.currTar) this.currTar.classList.remove('element--active');
        const elm = this.elements[this.index];
        this.currTar = elm;
        this.setInfo(this.infoElm.currTar);
        elm.classList.add('element--active');
        this.moveArrow(elm);
    }

    moveArrow(elem) {
        const coors = elem.getBoundingClientRect();
        const pos = coors.top + elem.offsetHeight / 2 - this.arrowHeight / 2;
        this.arrow.style.top = `${pos + window.pageYOffset}px`;
    }

    initArrow() {
        this.arrowHeight= this.arrow.offsetHeight;
        const elm = this.elements[0];
        const pos = (elm.getBoundingClientRect().left - 16) - this.arrow.offsetWidth;
        this.arrow.style.left = `${pos + window.pageXOffset}px`;
    }

    setInfo(elm, phase) {
        if(elm === this.infoElm.phase) {
            elm.textContent = phase;
        } else {
            elm.textContent = this.currTar.querySelector('.element__main').textContent.trim();
        }
        elm.classList.add('change');
        setTimeout(() => {
            elm.classList.remove('change');
        }, 1000);
    }

    launchHandler(enableCapture) {
        let handler;
        if (enableCapture) {
            handler = this.currTar.querySelector('.element__handler--capture');
        } else {
            handler = this.currTar.querySelector('.element__handler--bubble');
        }
        handler.classList.add('active');
        setTimeout(() => {
            handler.classList.remove('active');
        }, 1200);
    }
}


const slide = new Slide({
    elements: Array.from(document.querySelectorAll('.element')),
    arrow: document.querySelector('#js-arrow'),
    phase: document.querySelector('#js-phase'),
    currTar: document.querySelector('#js-curr-tar'),
});
slide.init();