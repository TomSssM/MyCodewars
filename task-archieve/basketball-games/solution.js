function countJudges(games) {
    games = games.reduce((acc, [start, end]) => {
        acc.push({ isStart: true, time: start });
        acc.push({ isStart: false, time: end });

        return acc;
    }, []);

    games = games.sort((a, b) => a.time - b.time);

    let max = 0;
    let judges = 0;

    games.forEach(({ isStart }) => {
        if (isStart) {
            judges++;
        } else {
            judges--;
        }

        max = Math.max(judges, max);
    });

    return max;
}
