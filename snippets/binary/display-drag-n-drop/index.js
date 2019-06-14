const fileInput = document.querySelector('#file-input');
const uploadBtn = document.querySelector('#upload-button');
const span = document.querySelector('#dragging-toggle');
let labelSet = false;

uploadBtn.addEventListener('click', () => {
    const files = fileInput.files;
    if (!files.length) {
        alert('Please select some image files');
        return;
    }
    renderImagesFromFiles(files);
});

document.addEventListener('dragstart', (e) => {
    e.preventDefault();
});

document.addEventListener('dragenter', (e) => {
    // dragenter and dragleave events will also trigger if
    // the cursor with the image penetrates ( or leaves )
    // one of the children of the window element excluding
    // body and html element
    if (!labelSet && e.relatedTarget === null) {
        toggleSpan();
    }
});

document.addEventListener('dragleave', (e) => {
    if (labelSet && e.relatedTarget === null) {
        toggleSpan();
    }
});

document.addEventListener('dragover', (e) => {
    e.preventDefault();
});

document.addEventListener('drop', (e) => {
    e.preventDefault();
    if (labelSet) {
        toggleSpan();
    }
    renderImagesFromFiles(e.dataTransfer.files);
});

function renderImagesFromFiles(files) {
    const filesCount = files.length;
    let file;
    let i = 0;
    while (i < filesCount) {
        file = files[i];
        renderImageFromFile(file);
        i += 1;
    }
}

function renderImageFromFile(file) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
        createImageFromURL(fileReader.result);
    };
    fileReader.onerror = () => {
        alert('file error happened, please make sure that the file is an image');
    };
}

function createImageFromURL(url) {
    const img = new Image();
    img.src = url;
    img.onload = () => {
        if (img.width > 400) {
            img.width = 400;
        }
        document.body.append(img);
    };
    img.onerror = () => {
        alert('File error happened');
    };
}

function toggleSpan() {
    span.hidden = !span.hidden;
    labelSet = !labelSet;
}