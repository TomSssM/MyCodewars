export default class {
    constructor(data) {
        this.paint = data.paint;
        this.colorToolbox = data.colorToolbox;
        this.elem = data.elem;

        window.addEventListener('unload', () => {
            this.onUnload();
        });

        this.elem.addEventListener('click', () => {
            this.reset();
        });
    }

    onUnload() {
        this.paint.makeStorage();
        this.colorToolbox.makeStorage();
    }

    reset() {
        this.paint.skipOnce = true;
        this.colorToolbox.skipOnce = true;
        sessionStorage.clear();
        alert('Storage Cleared :)');
    }
}
