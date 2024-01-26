function unpackIP(ips) {
    let queue = [[]];
    const masks = ips.split('.');

    for (const mask of masks) {
        const octets = getOctets(mask);
        const currentQueue = [];

        while (queue.length) {
            const prefix = queue.shift();

            for (const octet of octets) {
                const newPrefix = [...prefix, octet];

                currentQueue.push(newPrefix);
            }
        }

        queue = currentQueue;
    }

    return queue.map((value) => value.join('.'));
}

function getOctets(mask) {
    return mask.split(',').flatMap((value) => {
        const range = value.split('-');

        if (range.length === 2) {
            const values = [];

            let i = range[0];
            const length = range[1];

            while (i <= length) {
                values.push(i.toString());
                i++;
            }

            return values;
        }

        return value;
    });
}

unpackIP('1.2.3.4');  // ['1.2.3.4']
unpackIP('1.2.3.4-6');  // ['1.2.3.4', '1.2.3.5', '1.2.3.6']
unpackIP('1.2.3,6.4');  // ['1.2.3.4', '1.2.6.4']
unpackIP('1.2.3.1-3,7');  // ['1.2.3.1', '1.2.3.2', '1.2.3.3', '1.2.3.7']
