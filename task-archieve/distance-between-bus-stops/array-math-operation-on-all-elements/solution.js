function distanceBetweenBusStops(distance, start, destination) {
    if (start > destination) {
        const temp = start;
        start = destination;
        destination = temp;
    }

    let sum = 0;
    for (let i = start; i < destination; i++) {
        sum += distance[i];
    }

    let totalSum = 0;
    for (const value of distance) {
        totalSum += value;
    }

    return Math.min(sum, totalSum - sum);
}
