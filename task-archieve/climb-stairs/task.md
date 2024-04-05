# Climbing Stairs

You are climbing a staircase. It takes `n` steps to reach the top

Each time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?

__Example 1:__

```
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top:
  1. 1 step + 1 step
  2. 2 steps
```

__Example 2:__

```
Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top:
  1. 1 step + 1 step + 1 step
  2. 1 step + 2 steps
  3. 2 steps + 1 step
```

__Note:__ you need to write a function that returns _the number of ways to climb a staircase (integer)_ __not__ the possible combinations of steps to climb a staircase

<details>

<summary>Task Type</summary>

- __`Numbers Math`__
  <details>

  <summary><i><b><code>Use Fibonacci Sequence</code></b></i></summary>

    You need to use the [Fibonacci Sequence](../../1\)%20Task%20Challanges.md#12-fibonacci) to solve it

  </details>

</details>

<details>

<summary>Hint</summary>

You can store a Fibonacci Sequence in an array and you get `O(n)` memory complexity but you can also solve the task with `O(1)` memory complexity by using two counters instead of an array to get a Fibonacci Sequence

</details>

---

| [:arrow_left: back](../README.md) | [:white_check_mark: solution](./solution.js) | [:white_check_mark: solution 2](./solution-2.js) | [:white_check_mark: solution 3](./solution-3.js) |
| :---: | :---: | :---: | :---: |
