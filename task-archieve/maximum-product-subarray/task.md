# Maximum Product Subarray

Given an integer array `nums`, find a subarray that has the largest product, and return _the product_

__Example 1:__

```
Input: nums = [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6
```

__Example 2:__

```
Input: nums = [-2,0,-1]
Output: 0
Explanation: The result cannot be 2, because [-2,-1] is not a subarray
```

<details>

<summary>Task Type</summary>

This is more of a numbers task type than any of the array task types

</details>

<details>

<summary>Hint</summary>

Since the product of two negatives is a positive we should be fine _unless_ there is only one negative in the array making the entire product negative, like here: `[-8,5,3,1,6]`

This is why we need to look for the biggest product first going left to right and then going right to left

</details>

---

| [:arrow_left: back](../README.md) | [:white_check_mark: solution](./solution.js) |
| :---: | :---: |
