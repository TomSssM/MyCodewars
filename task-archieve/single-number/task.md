# Single Number

Given a non-empty _unsorted_ array of integers `nums`, every element appears twice except for one. Find that missing number

You must implement a solution with a linear runtime complexity and use only constant extra space

<details>

<summary>Task Type</summary>

We can assume this task to be a "One Pointer One Array and HashMap" Task Type and solve it this way: as we iterate through the `nums` array we store the elements encountered and check if we find them again while iteration continues and the element we didn't find twice is the missing element:

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

But this HashMap approach uses `O(n)` extra memory. We can optimize it if we treat this task _not_ as a "One Pointer One Array and HashMap" Task Type but rather as "Array Math Operation on All Elements" Task Type

"Array Math Operation on All Elements" Task Type is the type of task where we do some Math operation on all elements of the array and the result of this operation on all the elements is the result of solving the task. For example we saw the [Find a Missing Number in an Unsorted Array](../../2\)%20Task%20Challanges.md#23-find-a-missing-number-in-an-unsorted-array) task earlier. In order to solve that task we summed all the elements of the array and then extracted the sum we got from the sum we wanted and were thus able to find the missing element using constant `O(1)` extra memory

Let's see how we can use the "Array Math Operation on All Elements" approach to solve this task. XOR of any two numbers gives the difference of bits as `1` and the same bits as `0`. Thus using this we get `1 ^ 1 == 0` because the same numbers have the same bits. In order to find the missing element we simply need to XOR all the elements of the array

This way we will always get the single missing element because all the same numbers will evaluate to `0` and `0 ^ missing_number = missing_number`

</details>

---

| [:arrow_left: back](../task-type.md) | [:white_check_mark: solution](./solution.js) |
| :---: | :---: |
