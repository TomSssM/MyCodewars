const DEFAULT_TYPE = 'text/plain';
const MAX_IMAGE_SIZE = 300;
const MAX_PREVIEW_SIZE = 400;
const itemKinds = {
    string: 'string',
    file: 'file',
};
const contentsElement = document.querySelector('#contents');

document.addEventListener('dragover', (e) => {
    e.preventDefault();
});
document.addEventListener('dragstart', (e) => {
    e.preventDefault();
});
document.addEventListener('paste', handleDataArrival);
document.addEventListener('drop', handleDataArrival);

function handleDataArrival (e) {
    const eventData = e.clipboardData || e.dataTransfer;
    e.preventDefault();
    let payload = null;
    let kind = null;
    let type = null;
    if (eventData.items) {
        Array.from(eventData.items).forEach((item) => {
            const { kind, type } = item;
            if (kind === itemKinds.string) {
                item.getAsString((payload) => {
                    renderMessage({
                        payload,
                        kind,
                        type,
                    });
                });
            } else if (kind === itemKinds.file) {
                renderMessage({
                    payload: item.getAsFile(),
                    kind,
                    type,
                });
            }
        });
    } else {
        payload = eventData.getData(DEFAULT_TYPE) || null;
        if (payload) {
            type = DEFAULT_TYPE;
            kind = itemKinds.string;
        }
        renderMessage({
            payload,
            type,
            kind,
        });
    }
}

function renderMessage({ payload, kind, type }) {
    const li = document.createElement('li');

    if (type !== null) {
        li.innerHTML = `<b>Type</b>: ${type || 'unknown'}`;
    } else {
        li.innerHTML = 'Nothing Found';
    }

    if (kind === itemKinds.string) {
        li.innerHTML += `<br />Payload: ${sanitize(payload)}`;
    }

    if (kind === itemKinds.file) {
        if (isImage(type)) {
            renderImageFromFile(payload, li);
        } else {
            renderFileLink(payload, li);
        }
    }

    contentsElement.append(li);
}

function sanitize(data) {
    let sanitized = data;
    sanitized = sanitized.replace(/</g, '&lt;');
    sanitized = sanitized.replace(/>/g, '&gt;');
    return sanitized;
}

function isImage(type) {
    return /^image\/?/.test(type);
}

function renderImageFromFile(file, element) {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
        img.width = Math.min(img.width, MAX_IMAGE_SIZE);
    };
    element.innerHTML += '<br />';
    element.append(img);
}

function renderFileLink(file, element) {
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
        element.innerHTML += '<br />Preview:<br />';
        const previewElement = document.createElement('pre');
        const data = reader.result;
        if (data.length > MAX_PREVIEW_SIZE) {
            previewElement.textContent = `${data.slice(0, MAX_PREVIEW_SIZE)}...`;
        } else {
            previewElement.textContent = data;
        }
        element.append(previewElement);
    };

    reader.onerror = () => {
        console.log('file read error happened');
    };

    element.innerHTML += '<br /> Link: ';
    const a = document.createElement('a');
    a.download = file.name;
    a.href = URL.createObjectURL(file);
    a.textContent = file.name;
    element.append(a);
}
