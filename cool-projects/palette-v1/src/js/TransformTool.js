import Tool from './Tool.js';
export default class extends Tool {
    constructor(data) {
        super(data);
        this.classNameTransformed = data.classNameTransformed;
        this.classNameDefault = data.classNameDefault;
        this.events['click'] = (e) => {
            this.onClick(e);
        };
    }

    onClick(e) {
        let elem = e.target;
        if(elem.classList.contains(this.classNameDefault)) {
            this.transform(elem);
        }
    }

    transform(elem) {
        elem.classList.toggle(this.classNameTransformed);
        elem.dataset.transformed = true;
    }
}
