function distanceBetweenBusStops(distance, start, destination) {
    if (start > destination) {
        const temp = start;
        start = destination;
        destination = temp;
    }

    let sumClockwise = 0;
    for (let i = start; i < destination; i++) {
        sumClockwise += distance[i];
    }

    let totalSum = 0;
    for (const value of distance) {
        totalSum += value;
    }

    const sumCounterclockwise = totalSum - sumClockwise;

    return Math.min(sumClockwise, sumCounterclockwise);
}
