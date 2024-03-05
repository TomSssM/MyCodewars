# Missing Number

Given an __unsorted__ array `nums` containing `n` distinct numbers in the range `[0, n]`, return _the only number in the range that is missing from the array_

__Example 1:__

```
Input: nums = [3,0,1]
Output: 2
Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums
```

__Example 2:__

```
Input: nums = [0,1]
Output: 2
Explanation: n = 2 since there are 2 numbers, so all numbers are in the range [0,2]. 2 is the missing number in the range since it does not appear in nums
```

__Example 3:__

```
Input: nums = [9,6,4,2,3,5,7,0,1]
Output: 8
Explanation: n = 9 since there are 9 numbers, so all numbers are in the range [0,9]. 8 is the missing number in the range since it does not appear in nums
```

<details>

<summary>Approach</summary>

- `Do math or bitwise operation first on all the elements of the array and then to the same counter on all the elements that should be in array`

</details>

<details>

<summary>Task Type</summary>

We can assume this task to be a "One Pointer One Array and HashMap" Task Type and solve it this way using a HashMap:

```js
function missingNumber(nums) {
  const len = nums.length;
  const hashMap = {};

  for (const num of nums) {
    hashMap[num] = true;
  }

  for (let i = 0; i < len; i++) {
    if (!hashMap[i]) {
      return i;
    }
  }

  return len;
}
```

But we can solve it even more effectively if we treat it as "Array Math Operation on All Elements" Task Type and apply XOR operation for all the elements of the array similar to [that task](../single-number/task.md) (we XOR `0` by all the elements of the array and save the result to some _counter_). However for this particular task you may need to apply the Math Operation (in our case XOR) _twice_: first for all the elements of the array, then to the same _counter_ for all the elements that _should be_ in the array (similar to the HashMap solution above). Thus you need to utilize the Approach "Do math or bitwise operation first on all the elements of the array and then to the same counter on all the elements that should be in array"

__Note:__ this task can also be solved not only by doing a XOR but also by applying a Math formula for all the elements of the array. You can find this solution [here](../../2\)%20Task%20Challanges.md#23-find-a-missing-number-in-an-unsorted-array)

</details>

---

| [:arrow_left: back](../task-type.md) | [:white_check_mark: solution](./solution.js) |
| :---: | :---: |
