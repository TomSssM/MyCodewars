# Sort the Matrix diagonally

Your task is to sort the Matrix diagonally meaning you should sort every diagonal row (going diagonally left to right and top to bottom)

Here is an example:

```js
// -> Unsorted Matrix:
[
[3,3,1,1],
[2,2,1,2],
[1,1,1,2]
]

// <- Diagonally-sorted Matrix:
[
[1,1,1,1],
[1,2,2,2],
[1,2,3,3]
]
```

<details>

<summary>Hint</summary>

- `1.` Iterate the first row (subarray at index 0) and _for each element_ do the following:
  - `1.1` Create a temporary array
  - `1.2` Go diagonally (left to right and top to bottom) and put each element into the temporary array
  - `1.3` Sort the temporary array
  - `1.4` Go diagonally again (left to right and top to bottom) over the same diagonal lines of the subarrays and replace each element with the element from the temporary array
- `2.` Starting at the second row (subarrays at index 1+) we can iterate and sort via a temporary array (see point 1. above) not each element but only the first element because the diagonal lines along the rest of the elements in the subarrays at index 1+ have already been sorted in point 1. above

</details>

<details>

<summary>Task Type</summary>

- __`Matrix`__
  <details>

  <summary><i><b><code>Iterate a Matrix</code></b></i></summary>

    This is a `Matrix` Task Type using Matrix mechanics or you could also say that you need to look at the _relation_ between the indexes of the array like [here](../zigzag-conversion/task.md)

  </details>

</details>

---

| [:arrow_left: back](../README.md) | [:white_check_mark: solution](./solution.js) |
| :---: | :---: |
