# Longest sequence of letters

> __type:__ `Array` | `String`

You are given a string of length `L` composed of `N` different letters. Your task is to find the longest substring that would consist of at least `K` different letters

__Example:__
string `'aaccdd'` if `L = 6` and `N = 3` and
- `K=1` then `2`
- `K=2` then `4`
- `K=3` then `6`

```js
longestStr('aaccdd', 1); // L=6 N=3 K=1 result: 2
longestStr('aaccdd', 2); // L=6 N=3 K=2 result: 4
longestStr('aaccdd', 3); // L=6 N=3 K=3 result: 6
longestStr('aabaaccdd', 3); // L=9 N=4 K=3 result: 7
longestStr('ababababccddddddd', 3); // L=17 N=4 K=3 result: 10
```

<details>

<summary>Hint</summary>

It is one of those tasks where you use two pointers (save indexes like `i` and `j` to a variable) to iterate an array _specially_ for example by increasing / decrasing either one or the other or both pointers per iteration. Here is [another task](../most-water/task.md) whose solution uses similar mechanics

But for this particular task you may also need to enable the _power of hashmap_

</details>
