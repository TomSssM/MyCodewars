const canvas = document.querySelector('#my-canvas');
const ctx = canvas.getContext('2d');
const saveBtn = document.querySelector('#save-btn');
const extensionPut = document.querySelector('#extension');
const fileNameInput = document.querySelector('#file-name');
let offsets = {};
let extension = extensionPut.value;
let fileName = fileNameInput.value;

initCanvas();
initBtn();
initInputs();

function initCanvas() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    const coords = canvas.getBoundingClientRect();
    offsets.top = coords.top;
    offsets.left = coords.left;
    canvas.addEventListener('mousemove', (e) => {
        const x = e.clientX - offsets.left;
        const y = e.clientY - offsets.top;
        ctx.lineTo(x, y);
        ctx.stroke();
    });
}

function initInputs() {
    fileNameInput.addEventListener('change', () => {
        fileName = fileNameInput.value;
    });
    extensionPut.addEventListener('change', () => {
        extension = extensionPut.value;
    });
}

function initBtn() {
    saveBtn.addEventListener('click', () => {
        if (!fileName) {
            alert('Please enter a valid file name');
            return;
        }
        if (!extension) {
            alert('Please enter a valid extension');
            return;
        }
        saveAsImage();
    });
}

async function saveAsImage() {
    const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, `image/${extension}`);
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.hidden = true;
    link.download = `${fileName}.${extension}`;
    document.body.append(link);
    link.click();
    setTimeout(() => {
        URL.revokeObjectURL(link.href);
        link.remove();
    });
}