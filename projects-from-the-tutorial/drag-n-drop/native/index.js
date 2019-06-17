const cpyElem = document.querySelector('#copy');
const elem = document.querySelector('#elem');
let copied = false;

elem.addEventListener('dragstart', e => {
    // aestetic effect:
    // however in order for it to be we need to display
    // none _after_ the browser paints the translucent image
    // thus we need to display none after it does the paint, for
    // which reason we choose to do so asynchronously
    setTimeout(() => {
        e.target.style.display = 'none';
    }, 0);
});
elem.addEventListener('dragend', e => {
    e.target.style.display = '';
});

cpyElem.addEventListener('dragover', e => {
    if (copied) return;

    // by default browser forbids drop events, it means that if, during drag, we release
    // mouse button over a droppable the drop event won't fire; in order for it to actually
    // happen we need to prevent default behavior either during 'dragover' event
    e.preventDefault();

    // also since we are going to be copying the element we need to change the default
    // cursor via a special property:
    e.dataTransfer.dropEffect = 'copy';
});
cpyElem.addEventListener('drop', e => {
    // and here is another thing, since we prevent default during dragover for cpyElem
    // drop event will be triggered on cpyElem, however please note that it will also
    // be triggered on all the children of cpyElem and e.target property will be that
    // one child on which the user released a mouse button over, that is why we can't rely
    // on e.target property like: e.target.children.length, we use e.currentTarget instead

    e.currentTarget.classList.remove('box--hovered');
    if (e.currentTarget.children.length) return;
    const cpy = elem.cloneNode(true);
    cpy.style.display = '';
    cpy.setAttribute('draggable', 'false');
    e.currentTarget.append(cpy);

    // after we copied the image let's make our copy box no longer droppable:
    copied = true;
});

// we will also add dragenter and dragleave event listeners:
cpyElem.addEventListener('dragenter', e => {
    if (copied) return;
    e.target.classList.add('box--hovered');
});
cpyElem.addEventListener('dragleave', e => {
    if (copied) return;
    e.target.classList.remove('box--hovered');
});