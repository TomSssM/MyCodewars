const canvas = document.querySelector('#canvasElem');
const coords = canvas.getBoundingClientRect();
const offsets = {
    x: coords.left,
    y: coords.top
};
canvas.onmousemove = e => {
    const ctx = canvas.getContext('2d');
    ctx.lineTo(e.clientX - offsets.x, e.clientY - offsets.y);
    ctx.stroke();
};
async function submit() {
    const blob = await new Promise(res => canvas.toBlob(res, 'image/png'));
    const formData = new FormData();
    formData.append("imageName", 'imageWithBlob');
    formData.append("imageData", blob);
    const res = await fetch('./post-this-message', {
        method: 'POST',
        body: formData,
    });
    alert(`server response: ${await res.text()}`);
    // Here FormData automatically encodes the form, <input type="file"> fields are
    // handled also, and sends it using 'Content-Type: form/multipart'
}