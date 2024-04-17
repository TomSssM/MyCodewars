function wordBreak(s, wordDict) {
    const wordDictSet = new Set(wordDict);

    function inspect(part) {
        if (part.length === 0) {
            return true;
        }

        for (let i = 0; i < s.length; i++) {
            const word = part.slice(0, i + 1);
            const rest = part.slice(i + 1);

            if (wordDictSet.has(word) && inspect(rest)) {
                return true;
            }
        }

        return false;
    }

    return inspect(s);
}
