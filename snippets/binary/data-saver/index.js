const form = document.querySelector('#form');
const imageInput = document.querySelector('#image-input');
const textInput = document.querySelector('#text-input');
const saveComp = document.querySelector('#save-comp');
const saveBrowser = document.querySelector('#save-browse');
const uploadComp = document.querySelector('#upload-comp');
const uploadBrowse = document.querySelector('#upload-browse');
let currentJSON = null;
let uploadInput;

toggleDisabled();

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!imageInput.files.length || !textInput.value) {
        alert('Not all data');
        return;
    }
    currentJSON = await createJSONFromVals();
    toggleDisabled();
});
saveComp.addEventListener('click', saveOnComputer);
uploadComp.addEventListener('change', uploadFromComputer);
saveBrowser.addEventListener('click', saveStuffInBrowser);
uploadBrowse.addEventListener('click', uploadFromBrowser);

function uploadFromComputer() {
    const file = uploadComp.files[0];
    const fileReader = new FileReader();
    new Promise((resolve, reject) => {
        uploadComp.disabled = true;
        fileReader.readAsText(file, 'utf-8');
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = reject;
    }).then(
        createCardFromJSON,
    ).finally(
        () => {
            uploadComp.disabled = false;
        },
    ).catch(() => alert('only .tom files here :)'));
}

function saveOnComputer() {
    if (!currentJSON) return;
    const blob = new Blob([currentJSON]);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.hidden = true;
    link.download = 'my-lifestory.tom';
    document.body.append(link);
    link.click();
    setTimeout(() => {
        URL.revokeObjectURL(link.href);
        link.remove();
        currentJSON = null;
        toggleDisabled();
    });
}

async function createJSONFromVals() {
    let fileURL;
    try {
        fileURL = await renderImageFromFile(imageInput.files[0]);
    } catch {
        alert('File error!');
    }
    const text = textInput.value;
    return JSON.stringify({
        text,
        fileURL,
    });
}

function saveStuffInBrowser() {
    if (!currentJSON) return;
    localStorage.setItem('ourSave', currentJSON);
    currentJSON = null;
    toggleDisabled();
}

function uploadFromBrowser() {
    const data = localStorage.getItem('ourSave');
    if (!data) return;
    createCardFromJSON(data);
    localStorage.setItem('ourSave', '');
    toggleDisabled();
}

// helpers:
function renderImageFromFile(file) {
    const fileReader = new FileReader();
    return new Promise((resolve, reject) => {
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = reject;
    });
}

function createCardFromJSON(json) {
    const obj = JSON.parse(json);
    const div = document.createElement('div');
    div.classList.add('output-container');
    const img = new Image();
    img.src = obj.fileURL;
    img.classList.add('output-container__img');
    const p = document.createElement('p');
    p.textContent = obj.text;
    div.append(img);
    div.append(p);
    document.body.append(div);
}

function toggleDisabled() {
    if (!currentJSON) {
        saveBrowser.disabled = true;
        saveComp.disabled = true;
    } else {
        saveBrowser.disabled = false;
        saveComp.disabled = false;
    }
    uploadBrowse.disabled = !localStorage.getItem('ourSave');
}
