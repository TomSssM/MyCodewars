const canvas = document.querySelector('#clock');
const ctx = canvas.getContext('2d');
const clockWidth = canvas.width - 20;

function initClock() {
    ctx.fillStyle = '#ddd';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        clockWidth / 2,
        0, Math.PI * 2, true,
    );
    ctx.fillStyle = '#fff';
    ctx.fill();
}

function drawCenter() {
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        10,
        0, Math.PI * 2, true,
    );
    ctx.fill();
}

function initNumbers() {
    const radius = clockWidth / 2 - 30;
    const offsetFromCenter = 10;

    for (let i = 1; i <= 12; i += 1) {
        const angle = (i - 3) * (Math.PI * 2) / 12;
        const x = Math.cos(angle) * radius + canvas.width / 2 - offsetFromCenter;
        const y = Math.sin(angle) * radius + canvas.width / 2 + offsetFromCenter;
        ctx.fillStyle = "#000";
        ctx.font = "30px sans-serif";
        ctx.fillText(i, x, y);
    }
}

function drawSecondsHand(ss) {
    const angle = ((Math.PI * 2) * (ss / 60)) - ((Math.PI * 2) / 4);
    const secHandLength = clockWidth / 2 - 40;
    const tailLength = 40;
    const mainX = canvas.width / 2 + Math.cos(angle) * secHandLength;
    const mainY = canvas.height / 2 + Math.sin(angle) * secHandLength;
    const tailX = canvas.width / 2 - Math.cos(angle) * tailLength;
    const tailY = canvas.height / 2 - Math.sin(angle) * tailLength;

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#808080';

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(mainX, mainY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(tailX, tailY);
    ctx.stroke();
}

function drawMinutesHand(mm, ss) {
    const angle = ((Math.PI * 2) * (mm / 60)) - ((Math.PI * 2) / 4);
    const minutesHandLength = 120;
    const x = canvas.width / 2 + Math.cos(angle) * minutesHandLength;
    const y = canvas.height / 2 + Math.sin(angle) * minutesHandLength;

    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(x, y);

    ctx.strokeStyle = '#777';
    ctx.stroke();
}

function drawHoursHand(hh, mm) {
    const angle = ((Math.PI * 2) * ((hh * 5 + (mm / 60) * 5) / 60)) - ((Math.PI * 2) / 4);
    const hourHandLength = 100;
    const x = canvas.width / 2 + Math.cos(angle) * hourHandLength;
    const y = canvas.height / 2 + Math.sin(angle) * hourHandLength;
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(x, y);

    ctx.strokeStyle = '#575757';
    ctx.stroke();
}

function drawClock() {
    initClock();
    initNumbers();

    const now = new Date();
    const hh = now.getHours();
    const ss = now.getSeconds();
    const mm = now.getMinutes();

    drawSecondsHand(ss);
    drawHoursHand(hh, mm);
    drawMinutesHand(mm, ss);
    drawCenter();
}

drawClock();
setInterval(drawClock, 500);