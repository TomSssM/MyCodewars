// min included, max excluded
function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function keygen(len, sum) {
    if (len === 1) {
        return [sum];
    }

    const res = [];
    let f = null;

    while (sum > 0) {
        if (len - res.length > 1) {
            f = random(1, Math.floor(sum / 2));
        } else {
            f = sum;
        }

        res.push(f);
        sum -= f;
    }

    return res;
}

console.log('keygen(5, 10)', keygen(5, 10));
console.log('keygen(4, 13)', keygen(4, 13));
