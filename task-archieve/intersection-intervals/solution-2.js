console.log(intersection(
    [[8, 12], [17, 22]],
    [[5, 11], [14, 18], [20, 23]]
)); // [[8, 11], [17, 18], [20, 22]]

console.log(intersection(
    [[9, 15], [18, 21]],
    [[10, 14], [21, 22]]
)); // [[10, 14]]

function intersection(user1, user2) {
    const result = [];
    let n = 0;
    let m = 0;

    while (n < user1.length) {
        const interval = getInterval(user1[n], user2[m]);

        if (interval) {
            result.push(interval);
            m++;
        } else {
            n++;
        }
    }

    return result;
}

function getInterval(interval1, interval2) {
    if (!interval1 || !interval2) {
        return null;
    }

    const [start1, end1] = interval1;
    const [start2, end2] = interval2;

    if (start1 < end2 && start2 < end1) {
        return [
            Math.max(start1, start2),
            Math.min(end1, end2)
        ];
    }

    return null;
}
