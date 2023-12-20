# Distance Between Bus Stops

A bus has `n` stops numbered from `0` to `n - 1` that form a circle. We know the distance between all pairs of neighboring stops where `distance[i]` is the distance between the stops number `i` and `(i + 1) % n`

The bus goes along both directions i.e. clockwise and counterclockwise

Return the shortest distance between the given `start` and `destination` stops

__Example 1:__

<img src=./diagram-1.jpg width=300 />

```
Input: distance = [1,2,3,4], start = 0, destination = 1
Output: 1
Explanation: Distance between 0 and 1 is 1 or 9, minimum is 1
```

__Example 2:__

<img src=./diagram-2.jpg width=300 />

```
Input: distance = [1,2,3,4], start = 0, destination = 2
Output: 3
Explanation: Distance between 0 and 2 is 3 or 7, minimum is 3
```

__Example 3:__

<img src=./diagram-3.jpg width=300 />

```
Input: distance = [1,2,3,4], start = 0, destination = 3
Output: 4
Explanation: Distance between 0 and 3 is 6 or 4, minimum is 4
```

<details>

<summary>Task Type</summary>

</details>

---

| [:arrow_left: back](../../task-type.md) | [:white_check_mark: solution](./solution.js)
| :---: | :---: |
