export default class {
    constructor(data) {
        this.elem = data.elem;

        const handleClick = (e) => this.handleClick();
        this.elem.addEventListener('click', handleClick);
    }

    handleClick() {
        alert('Lazy programmer doesn\'t know what to do with this thing');
    }
}
