# Single Number

Given a non-empty array of integers `nums`, every element appears twice except for one. Find that missing number

You must implement a solution with a linear runtime complexity and use only constant extra space

<details>

<summary>Task Type</summary>

We can assume this task to be a "One Pointer One Array + HashMap" Task Type and solve it this way: as we iterate through the `nums` array we store the elements encountered and check if we find them again while iteration continues and the element we didn't find twice is the missing element:

```js
function singleNumber(nums) {
  const hashMap = {};

  for (const num of nums) {
    if (num in hashMap) {
      delete hashMap[num];
    } else {
      hashMap[num] = true;
    }
  }

  return Object.keys(hashMap)[0];
}
```

But this HashMap approach uses `O(n)` extra memory. We can optimize it if we treat this task not as a "One Pointer One Array + HashMap" Task Type but rather as a "Numbers Math" Task Type

Let's see how it can be done. Xor of any two numbers gives the difference of bit as `1` and same bit as `0`. Thus using this we get `1 ^ 1 == 0` because the same numbers have the same bits

So, we will always get the single missing element because all the same numbers will evaluate to `0` and `0 ^ missing_number = missing_number`

</details>

---

| [:arrow_left: back](../README.md) | [:white_check_mark: solution](./solution.js) |
| :---: | :---: |
