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

- __`One Pointer One Array`__
  <details>

  <summary><i><b><code>Iterate an array</code></b></i> + <i><b><code>Iterate an array in reverse</code></b></i></summary>

    In order to solve this Task we first iterate the array and count the sum and then iterate the array in reverse (meaning counterclockwise) and count the sum. Make sure to overlap to the beginning or end of the array when necessary. Then return the lesser sum

    Thus we combine the two Approaches _`Iterate an array`_ and _`Iterate an array in reverse`_ in order to solve this Task ([solution 1](./solution.js))

  </details>

---

- __`Array Math Operation on All Elements`__
  <details>

  <summary><i><b><code>Do math or bitwise operation first on one part of the array and then on another part of of the array</code></b></i></summary>

    <!-- TODO: abstract explanation of the Approach: The Approach is that ... -->

    This Task can also be solved using the Approach _`Do math or bitwise operation first on one part of the array and then on another part of of the array`_ ([solution 2](./solution-2.js)). First of all make sure that the pointer `start` is always _before_ the pointer `destination` (swap them if not so). Then you need to sum all the elements between `start` and `destination` (this is your sum going clockwise, math operation first on one part of the array), after this get the total sum of all the elements of the array and extract the sum of going clockwise from this total sum (this is your sum going counterclockwise, math operation on another part of of the array). Then return the lesser sum

  </details>

</details>

---

| [:arrow_left: back](../README.md) | [:white_check_mark: solution](./solution.js) | [:white_check_mark: solution 2](./solution-2.js) |
| :---: | :---: | :---: |
