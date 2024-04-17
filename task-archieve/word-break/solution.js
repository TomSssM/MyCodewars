function wordBreak(s, wordDict) {
    const n = s.length;
    const dp = new Array(n + 1).fill(false);
    const wordDictSet = new Set(wordDict);

    dp[0] = true;

    for (let i = 0; i < n; i++) {
        if (!dp[i]) {
            continue;
        }

        for (let j = i + 1; j <= n; j++) {
            const part = s.slice(i, j);

            if (wordDictSet.has(part)) {
                dp[j] = true;
            }
        }
    }

    return dp[n];
}
