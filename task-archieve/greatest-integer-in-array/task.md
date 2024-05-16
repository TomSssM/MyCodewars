# Greatest integer in array

Given an array of positive integers return the _greatest integer in the array_. If an array is empty return `-1`

__Example 1:__

```
Input: [1,2,1]
Output: 2
```

__Example 2:__

```
Input: [2,3,2,1,4,7,3,2,2,1]
Output: 7
```

__Example 3:__

```
Input: []
Output: -1
```

<details>

<summary>Task Type</summary>

- __`Array and Counter`__
  <details>

  <summary><i><b><code>Iterate an array keeping one or more max or min counters</code></b></i></summary>

    The Approach is that we create a counter and then iterate the array. If we come across an element in the array whose value is greater than the current value of the counter then we set the value of this element to the counter and keep on iterating. This way at the end of the iteration of the entire array our counter is going to hold the value of the greatest element of the array. We can also use this Approach to find the smallest element of the array: iterate the array updating the counter if we come across a value in the array that is smaller than the current value of the counter

    __Note:__ only make sure to _initialize_ the counter to a value that is definitely going to be smaller (to find max value of the array) or greater (to find min value of the array) than the first element of the array (for example `-Infinity` or `Infinity`) or simply initialize the counter to the first value of the array and start iterating the array from the second element

    __Note:__ a counter that keeps track of the greatest value in the array we call "max counter" and a counter that keeps track of the smallest value in the array we call "min counter"

    In order to solve this Task we merely need to create and keep track of a max counter iterating the array and return the max counter. Initialize the max counter to `-1`

  </details>

</details>

---

| [:arrow_left: back](../README.md) | [:white_check_mark: solution](./solution.js) |
| :---: | :---: |
