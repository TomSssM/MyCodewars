# Flatten non-recursive v2

Your task is to write a function that flattens the array like so:

```js
flatten([1,2,3,[4,[5]],[6],7]); // -> [1,2,3,4,5,6,7]
```

So we need to unpack the arrays inside this array (and leave other data types untouched)

But the difficulty is that you can only use `.push()` and `.pop()` methods of the `Array` because all the other methods are badly optimized across different JS engines in different browsers

Also you cannot use recursion because an array can be very big and nested very deep and you may thus get a stack overflow error

<details>

<summary>Task Type</summary>

You can achieve the non-recursive solution by using a simple "stack and while loop" technique but at least one way of solving this means pushing elements into the stack in reverse order

</details>

---

| [:arrow_left: back](../task-type.md) | [:white_check_mark: solution](./solution.js) | [:white_check_mark: solution 2](./solution-2.js) |
| :---: | :---: | :---: |
