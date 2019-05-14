class StatusTracker {
    constructor(data) {
        this.btn = data.btn;
        this.status = data.status;
    }

    doEvent(detailObj) {
        const event = new CustomEvent('write-to-log', {
            bubbles: true,
            detail: Object.create(detailObj),
        });
        this.status.dispatchEvent(event);
    }

    sendReq() {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'upload-file', true);
        xhr.upload.onprogress = e => {
            this.onProgress(e);
        };
        xhr.onerror = () => {
            this.onError();
        };
        xhr.onload = () => {
            this.onLoad(xhr.status);
        };
        xhr.send(this.file);
    }

    onError() {
        this.doEvent({
            data: 'Network Error',
        });
    }

    onLoad(status) {
        if (status !== 200) {
            this.doEvent({
                data: 'HTTP Error',
            });
        } else {
            this.doEvent({
                data: 'Upload Finished',
            });
        }
    }
}

class Upload extends StatusTracker {
    constructor(data) {
        super(data);
        this.form = data.form;

        this.btn.addEventListener('click', e => {
            e.preventDefault();
            this.getFile();
            this.sendReq();
        });
    }

    getFile() {
        this.file = this.form.myfile.files[0];
    }

    onProgress(e) {
        const perc = Math.floor(100 * e.loaded / e.total);
        this.doEvent({
            data: perc,
        });
    }
}

class Download extends StatusTracker {
    constructor(data) {
        super(data);

        this.btn.addEventListener('click', () => {
            this.sendReq();
        });
    }

    sendReq() {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'download-file', true);
        xhr.onprogress = e => {
            this.onProgress(e);
        };
        xhr.onerror = () => {
            this.onError();
        };
        xhr.onload = () => {
            this.onLoad(xhr.status);
        };
        xhr.send(this.file);
        this.doEvent({
            data: 'Processing Request...',
        });
    }

    onProgress(e) {
        if (e.lengthComputable) {
            const perc = Math.floor(100 * e.loaded / e.total);
            this.doEvent({
                data: perc,
            });
        } else {
            this.doEvent({
                data: `${e.loaded} bytes downloaded`,
            });
        }
    }

    onLoad(status) {
        if (status !== 200) {
            this.doEvent({
                data: 'HTTP Error',
            });
        } else {
            this.doEvent({
                data: 'Download Finished',
            });
        }
    }
}

class Status {
    constructor(data) {
        this.uploadBar = data.uploadBar;
        this.downloadBar = data.downloadBar;

        this.uploadBar.addEventListener('write-to-log', e => {
            this.onWrite(e);
        });
        this.downloadBar.addEventListener('write-to-log', e => {
            this.onWrite(e);
        });
    }

    onWrite(e) {
        const elem = e.target;
        let data = e.detail.data;
        elem.style.backgroundColor = '';
        if (!isNaN(data)) {
            data += '%';
            elem.querySelector('.status__text').innerHTML = data;
            elem.querySelector('.status__progress').style.width = data;
        } else {
            elem.querySelector('.status__text').innerHTML = data;
            elem.querySelector('.status__progress').style.width = '';
            elem.style.backgroundColor = '#eee';
        }
    }
}

new Upload({
    btn: document.querySelector('#js-upload-btn'),
    form: document.querySelector('#js-form'),
    status: document.querySelector('#js-upload-bar'),
});

new Download({
    btn: document.querySelector('#js-download-btn'),
    status: document.querySelector('#js-download-bar'),
});

new Status({
    uploadBar: document.querySelector('#js-upload-bar'),
    downloadBar: document.querySelector('#js-download-bar'),
});