import Tool from './Tool.js';
export default class extends Tool {
    constructor(data) {
        super(data);
        this.events['click'] = (e) => {
            this.onClick(e);
        }
    }

    onClick(e) {
        const color = this.paint.getColor(e.target);
        if(color === 'null') {
            this.paint.currentColor = '#ffffff';
            return;
        }
        this.paint.currentColor = color;
    }
}
