import Tool from './Tool.js';
export default class extends Tool {
    constructor(data) {
        super(data);
        this.brush = data.brush;
        this.events['click'] = (e) => {
            this.onClick(e);
        }
    }

    onClick(e) {
        const color = this.paint.getColor(e.target);
        if(color === 'null') {
            this.paint.currentColor = '#ffffff';
        } else this.paint.currentColor = color;
        this.paint.replaceCurrentTool(this.brush);
    }
}
