export default class {
    constructor(data) {
        this.paint = data.paint;
        this.toolsArray = [];
        data.toolButtonsOrdered.forEach(butt => {
            this.toolsArray.push(
                data.tools.find(tool => {
                    return tool.button === butt;
                })
            );
        });
        this.toolsCount = this.toolsArray.length;

        this.paint.canvas.addEventListener('change-tool', (e) => {
            this.currInd = this.toolsArray.indexOf(e.detail.tool);
        });

        document.addEventListener('keydown', (e) => {
            if(e.code === 'ArrowUp') {
                this.onKeyUp();
                e.preventDefault();
            } else if(e.code === 'ArrowDown') {
                this.onKeyDown();
                e.preventDefault();
            }
        });
    }

    onKeyDown() {
        let i = (this.currInd + 1) % this.toolsCount;
        this.paint.replaceCurrentTool(this.toolsArray[i]);
    }

    onKeyUp() {
        let i = this.currInd - 1;
        if(i < 0) i = this.toolsCount - 1;
        this.paint.replaceCurrentTool(this.toolsArray[i]);
    }
}