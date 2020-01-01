const DEFAULT_TYPE = 'text/plain';
const itemKinds = {
    string: 'string',
    file: 'file',
};
const contentsElement = document.querySelector('#contents');
document.addEventListener('paste', (e) => {
    const { clipboardData } = e;
    e.preventDefault();
    let payload = null;
    let kind = null;
    let type = null;
    if (clipboardData.items) {
        Array.from(clipboardData.items).forEach((item) => {
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
        payload = clipboardData.getData(DEFAULT_TYPE) || null;
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
});
function renderMessage({ payload, kind, type }) {
    const li = document.createElement('li');

    if (type) {
        li.innerHTML = `<b>Type</b>: ${type}`;
    } else {
        li.innerHTML = 'Nothing Found';
    }

    if (kind === itemKinds.string) {
        li.innerHTML += `<br />Payload: ${sanitize(payload)}`;
    }

    if (kind === itemKinds.file) {
        li.innerHTML += '<br />Payload: file'; // TODO: here
    }

    contentsElement.append(li);
}
function sanitize(data) {
    let sanitized = data;
    sanitized = sanitized.replace(/</g, '&lt;');
    sanitized = sanitized.replace(/>/g, '&gt;');
    return sanitized;
}