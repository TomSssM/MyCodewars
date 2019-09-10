const sortByAge = (left, right) => left.age - right.age;
const sortByName = (left, right) => {
    const firstCharLeft = left.name[0];
    const firstCharRight = right.name[0];

    if (firstCharLeft === firstCharRight) return 0;

    return firstCharLeft > firstCharRight ? 1 : -1;
};
function sortBySurname (left, right) {
    const firstCharLeft = left.surname[0];
    const firstCharRight = right.surname[0];

    if (firstCharLeft === firstCharRight) return 0;

    return firstCharLeft > firstCharRight ? 1 : -1;
}
const items = [
    {name: 'Zh', surname: 'Pak', age: 19},
    {name: 'Va',  surname: 'In',  age: 26},
    {name: 'Mi',  surname: 'Zz', age: 31},
    {name: 'An',   surname: 'Ik', age: 27},
    {name: 'Mi',  surname: 'Tr', age: 30},
    {name: 'Ma',  surname: 'Pv', age: 30},
];
items.sort((left, right) => {
    const firstCharLeft = left.name[0];
    const firstCharRight = right.name[0];

    if (firstCharLeft === firstCharRight) {
        return sortBySurname(left, right);
    }

    return firstCharLeft > firstCharRight ? 1 : -1;
});

function composeSort(...sortCbs) {
    return (left, right) => {
        return sortCbs.reduce((t, cb) => t || cb(left, right), 0);
    };
}

// const compose = (...funcs) => (a, b) => funcs.reduce((acc, next) => acc || next(a, b), 0);

items.sort(composeSort(sortByName, sortBySurname, sortByAge));

console.log(items);
