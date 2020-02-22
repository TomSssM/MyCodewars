const assert = require('assert');
const { diff, TYPES_ENUM } = require('./diff');

try {
    assert.deepEqual(
        diff('ablc', 'fdabkkcdd'),
        [
            {
                val: 'fd',
                type: TYPES_ENUM.INSERTED,
            },
            {
                val: 'ab',
                type: TYPES_ENUM.UNCHANGED,
            },
            {
                val: 'kk',
                type: TYPES_ENUM.MODIFIED,
            },
            {
                val: 'c',
                type: TYPES_ENUM.UNCHANGED,
            },
            {
                val: 'dd',
                type: TYPES_ENUM.INSERTED,
            },
        ],
    );
    console.log('1 OK');

    assert.deepEqual(
        diff('abcd', 'abd'),
        [
            {
                val: 'ab',
                type: TYPES_ENUM.UNCHANGED,
            },
            {
                val: 'c',
                type: TYPES_ENUM.DELETED,
            },
            {
                val: 'd',
                type: TYPES_ENUM.UNCHANGED,
            },
        ],
    );
    console.log('2 OK');

    assert.deepEqual(
        diff('abcd', 'ababced'),
        [
            {
                val: 'ab',
                type: TYPES_ENUM.UNCHANGED,
            },
            {
                val: 'ab',
                type: TYPES_ENUM.INSERTED,
            },
            {
                val: 'c',
                type: TYPES_ENUM.UNCHANGED,
            },
            {
                val: 'e',
                type: TYPES_ENUM.INSERTED,
            },
            {
                val: 'd',
                type: TYPES_ENUM.UNCHANGED,
            },
        ],
    );
    console.log('3 OK');

    assert.deepEqual(
        diff('abcd', 'abbd'),
        [
            {
                val: 'ab',
                type: TYPES_ENUM.UNCHANGED,
            },
            {
                val: 'b',
                type: TYPES_ENUM.MODIFIED,
            },
            {
                val: 'd',
                type: TYPES_ENUM.UNCHANGED,
            },
        ],
    );
    console.log('4 OK');

    assert.deepEqual(
        diff('it is a good day', 'it is an awesome day'),
        [
            {
                val: 'it is a',
                type: TYPES_ENUM.UNCHANGED,
            },
            {
                val: 'n',
                type: TYPES_ENUM.INSERTED,
            },
            {
                val: ' ',
                type: TYPES_ENUM.UNCHANGED,
            },
            {
                val: 'awes',
                type: TYPES_ENUM.MODIFIED,
            },
            {
                val: 'o',
                type: TYPES_ENUM.UNCHANGED,
            },
            {
                val: 'me',
                type: TYPES_ENUM.MODIFIED,
            },
            {
                val: ' day',
                type: TYPES_ENUM.UNCHANGED,
            },
        ],
    );
    console.log('5 OK');

    assert.deepEqual(
        diff('some word', 'man some word'),
        [
            {
                val: 'man ',
                type: TYPES_ENUM.INSERTED,
            },
            {
                val: 'some word',
                type: TYPES_ENUM.UNCHANGED,
            },
        ],
    );
    console.log('6 OK');

    assert.deepEqual(
        diff('some word', 'some some word'),
        [
            {
                val: 'some ',
                type: TYPES_ENUM.UNCHANGED,
            },
            {
                val: 'some ',
                type: TYPES_ENUM.INSERTED,
            },
            {
                val: 'word',
                type: TYPES_ENUM.UNCHANGED,
            },
        ],
    );
    console.log('7 OK');

    assert.deepEqual(
        diff('some word', 'some word here'),
        [
            {
                val: 'some word',
                type: TYPES_ENUM.UNCHANGED,
            },
            {
                val: ' here',
                type: TYPES_ENUM.INSERTED,
            },
        ],
    );
    console.log('8 OK');

    assert.deepEqual(
        diff('what', 'is it'),
        [
            {
                val: 'is i',
                type: TYPES_ENUM.MODIFIED,
            },
            {
                val: 't',
                type: TYPES_ENUM.UNCHANGED,
            },
        ],
    );
    console.log('9 OK');

    assert.strictEqual(
        diff('same', 'same'),
        null,
    );
    console.log('10 OK');

    assert.deepEqual(
        diff('1234', 'different'),
        [
            {
                val: 'different',
                type: TYPES_ENUM.MODIFIED,
            },
        ],
    );
    console.log('11 OK');

    assert.deepEqual(
        diff('', 'NEW STUFF'),
        [
            {
                val: 'NEW STUFF',
                type: TYPES_ENUM.INSERTED,
            },
        ],
    );
    console.log('12 OK');

    assert.deepEqual(
        diff('deleted', ''),
        [
            {
                val: 'deleted',
                type: TYPES_ENUM.DELETED,
            },
        ],
    );
    console.log('13 OK');

    assert.throws(
        () => {
            diff('wow\nnew\nlines\n', 'wow too');
        },
        {
            message: 'Cannot parse string with new lines',
        },
    );
    console.log('14 OK');

    assert.deepEqual(
        diff('34', '344'),
        [
            {
                val: '34',
                type: 0,
            },
            {
                type: 2,
                val: '4',
            },
        ]
    );
    console.log('15 OK');
} catch (e) {
    console.log('tests fail, but no sweat!\n');
    throw e;
}

console.log('tests success!');
