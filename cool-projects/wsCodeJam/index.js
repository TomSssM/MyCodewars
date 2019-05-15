let TOKEN = null;
let bufferData = null;
let bits = null;

const ws = new WebSocket('ws://wsc.2123.io');
ws.binaryType = 'arraybuffer';
ws.onopen = () => {
    console.log('Connection Opened');
    ws.send(JSON.stringify({
        "name": "TomDude",
        "command": "challenge accepted" 
    }));
};
ws.onmessage = e => {
    console.log(e.data);
    if (typeof e.data !== 'string') {
        bufferData = e.data;
        solveBinary(bits, bufferData);
        return;
    }
    const data = JSON.parse(e.data);
    if (data.token) {
        register(data);
    }
    if (data.task) {
        solveTask(data);
    } else if (data.next) {
        requestTask(data.next);
    }
};

function solveTask(data) {
    if (data.name === "arithmetic") {
        solveArithmetic(data);
    } else if (data.name === "function_evaluation") {
        solveEvaluation(data);
    } else if (data.name === "binary_arithmetic") {
        bits = data.task.bits;
    }
}

function requestTask(taskName) {
    ws.send(JSON.stringify({
        command: taskName,
        token: TOKEN,
    }));
}

function register(data) {
    TOKEN = data.token;
    const message = JSON.stringify({
        token: TOKEN,
        command: data.next,
    });
    ws.send(message);
}

function solveArithmetic(data) {
    const sign = data.task.sign;
    const res = data.task.values.reduce((t,v) => {
        if (sign === '+') {
            return t + v;
        } else if (sign === '-') {
            return t - v;
        } else {
            return t * v;
        }
    });
    ws.send(JSON.stringify({
        token: TOKEN,
        command: data.name,
        answer: res
    }));
}

function solveEvaluation(data) {
    const res = eval(data.task.fn)();
    ws.send(JSON.stringify({
        token: TOKEN,
        command: data.name,
        answer: res,
    }));
}

function solveBinary(bits, data) {
    let view;
    if (bits === 16) {
        view = new Uint16Array(data);
    } else {
        view = new Uint8Array(data);
    }
    const winValue = view.reduce((t,v) => t + v);
    console.log(winValue);
    ws.send(JSON.stringify({
        token: TOKEN,
        command: "binary_arithmetic",
        answer: winValue,
    }));
}