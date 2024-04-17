# Reverse an Array

You need to merely reverse an array of values

__Example 1:__

```
Input: [1,2,3,4]
Output: [4,3,2,1]
```

__Example 2:__

```
Input: ['a','b','c']
Output: ['c','b','a']
```

<details>

<summary>Task Type</summary>

- __`One Pointer One Array`__
  <details>

  <summary><i><b><code>Iterate an array in reverse</code></b></i></summary>

    <!-- TODO: abstract explanation of the Approach: The Approach is that ... -->

    We can iterate the array in reverse, create a new array with all the elements in reverse order and return the new array. Applying this Approach we can create a solution that uses `O(n)` memory where `n` is the size of the array

  </details>

---

- __`In-Place Swap and Overwrite`__
  <details>

  <summary><i><b><code>Swap elements of one or more arrays. Swap one part of the array with the other part of the array</code></b></i></summary>

    <!-- TODO: abstract explanation of the Approach: The Approach is that ... -->

    We can separate the array in the middle into two equal parts. Then we swap the elements of the first part with the elements of the other part. For example if we use pointer `i` to iterate the array then we swap element `i` (element from the first part of the array) with element `length - i` (element from the other part of the array). Applying this Approach we can create a solution that uses `O(1)` memory which is good

  </details>

</details>

---

| [:arrow_left: back](../README.md) | [:white_check_mark: solution](./solution.js) | [:white_check_mark: solution 2](./solution-2.js) |
| :---: | :---: | :---: |
