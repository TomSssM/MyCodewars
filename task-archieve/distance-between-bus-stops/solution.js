function distanceBetweenBusStops(distance, start, destination) {
    let clockwise = 0;
    let counterclockwise = 0;

    let i = start;

    while (i !== destination) {
        clockwise += distance[i];
        i = (i + 1) % distance.length;
    }

    i = start;

    while (i !== destination) {
        i -= 1;

        if (i < 0) {
            i = distance.length - 1;
        }

        counterclockwise += distance[i];
    }

    return Math.min(clockwise, counterclockwise);
}
