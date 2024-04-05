# Flatten non-recursive

Your task is to write a function that flattens the array like so:

```js
flatten([1,2,3,[4,[5]],[6],7]); // -> [1,2,3,4,5,6,7]
```

So we need to unpack the arrays inside this array (and leave other data types untouched)

But the difficulty is that you can only use `.push()` and `.pop()` methods of the `Array` because all the other methods are badly optimized across different JS engines in different browsers

Also you cannot use recursion because an array can be very big and nested very deep and you may thus get a stack overflow error

<details>

<summary>Task Type</summary>

- __`Stack or Queue`__
  <details>

  <summary><i><b><code>Do while loop while Stack is not empty popping and pushing along the way</code></b></i></summary>

    The key to solving this particular Task is to see that you also need to push elements into the Stack in reverse order

    __Note:__ the same Approach of using a Stack or a Queue and a while loop was used to perform the depth-first search or breadth-first search of a Binary Tree for example [here](../../corejs-codejam/task/07-yield-tasks.js#L113) or [here](../../corejs-codejam/task/07-yield-tasks.js#L147) (alternatively [here](../../snippets/Data%20Structures/binary-search-tree.js#L222))

  </details>

</details>

---

| [:arrow_left: back](../README.md) | [:white_check_mark: solution](./solution.js) | [:white_check_mark: solution 2](./solution-2.js) |
| :---: | :---: | :---: |
