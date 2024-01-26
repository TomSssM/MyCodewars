const IP_OCTET_COUNT = 4;

function unpackIP(ips) {
    const result = [];
    const masks = ips.split('.');

    function unpackMask(prefix, offset) {
        if (offset === IP_OCTET_COUNT) {
            result.push(prefix);
            return;
        }

        const mask = masks[offset];
        const octets = getOctets(mask);

        for (const octet of octets) {
            unpackMask([...prefix, octet], offset + 1);
        }
    }

    unpackMask([], 0);

    return result.map((value) => value.join('.'));
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
