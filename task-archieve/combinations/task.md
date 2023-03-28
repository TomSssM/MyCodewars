# Combinations

Given two integers `n` and `k`, return _all possible combinations of_ `k` _numbers chosen from the range_ `[1, n]`

You may return the answer in __any order__

__Example 1:__

```
Input: n = 4, k = 2
Output: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
Explanation: There are 4 choose 2 = 6 total combinations
Note that combinations are unordered, i.e., [1,2] and [2,1] are considered to be the same combination
```

__Example 2:__

```
Input: n = 1, k = 1
Output: [[1]]
Explanation: There is 1 choose 1 = 1 total combination
```

<details>

<summary>Task Type</summary>

This task is for __*Recursive Backtracking*__. You should use it to do __*Depth-first Search of Array*__

</details>

<details>

<summary>Hint</summary>

This task is for __*Recursive Backtracking*__. Note that unlike the ["Permutations of a String" task](../../2\)%20Task%20Challanges.md#28-permutations-of-a-string), in this task we are supposed to return the output in __any order__. So for this task the order of the permutations doesn't matter. When the order of the permutations doesn't matter you should apply a permutations algorithm that is actually different from the one we saw before in the "Permutations of a String" task in order not to come up with duplicates (i.e., `[1,2]` and `[2,1]`)

While in the "Permutations of a String" task we would iterate the array and take out one element out of the array and get the rest of the permutations by recursively backtracking thereby always splitting the array into smaller and smaller chunks what we need to do here is somewhat the opposite though similar: we need to apply the function that by recursively backtracking builds back the array into bigger and bigger chunks (appending elements on the right to the elements on the left)

This is what the output of the function should look like:

```
Input: [1,2,3]
Output: [
  [],
  [1],              [2],           [3],
  [1,2],[1,3],      [2,3]
  [1,2,3],
]
```

Every level (for example `[1], [2], [3]` is level 1, `[1,2],[1,3], [2,3]` is level 2 and `[1,2,3]` is level 3) indicates the depth of the call stack (thus every next level is a recursive call) and every element separated by a space " " indicates iterations within the same function call

Here is the function:

```js
function backtrack(arr) {
  const result = [];

  function dfs(cur, offset) { // depth first search
    result.push(cur);

    if (offset === arr.length) {
      return;
    }

    for (let i = offset; i < arr.length; i++) {
      dfs(cur.concat(arr[i]), i + 1);
    }
  }

  dfs([], 0);

  return result;
}
```

In order to solve the task you need to tweak this function to suit your needs

__Note:__ we called the recursive function inside the `backtrack` function as `dfs` meaning _Depth-first Search_ because it behaves similarly to the Depth-first Search in Binary Trees (or Graphs) but please don't confuse the two: the Binary Trees versions can be found [here](../../corejs-codejam/test/07-yield-tests.js#L457), [here](../../corejs-codejam/task/07-yield-tasks.js#L113) and of course [here](../../snippets/Data%20Structures/binary-search-tree.js)

</details>

---

| [:arrow_left: back](../README.md) | [:white_check_mark: solution](./solution.js) |
| :---: | :---: |
