function combine(n, k) {
    const result = [];

    function dfs(cur) {
        if (cur.length === k) {
            result.push([...cur]);
            return;
        }

        for (let i = (cur.at(-1) ?? 0) + 1; i <= n; i++) {
            // instead of .concat we do .push/.pop
            cur.push(i);
            dfs(cur);
            cur.pop();
        }
    }

    dfs([]);

    return result;
}

console.log('n=4, k=2', combine(4, 2));
console.log('n=1, k=1', combine(1, 1));
