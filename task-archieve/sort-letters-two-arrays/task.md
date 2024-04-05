# Sort letters from one array via another array

We have 2 arrays with a length equal to `n`: one filled with letters, the other filled with numbers (the number are from 0 to n-1)

You gotta swap letters _in place_ in the 1st array such that the letters at indexes `i` from the 1st array correspond to numbers at indexes `i` from the 2nd array

For example:

```
[D A B E C] [3 0 1 4 2] -> [A B C D E]
```

So we look at 0'th element: it is `D` in the 1st array and `3` in the 2nd array, therefore `D` should be at index `3` in the result array and so on for each letter, `A` to `0`, `B` to `1`, `E` to `4` and `C` to `2`

The phrase "in place" in the extract above means that we don't create an intermediary array to return it, thus we gotta swap elements of the 1st array to get the result array

You also have a memory constraint here: `O(1)` (it means that the more elements the arrays have should not icrease memory consumption, this is also why we have to swap elements of the arrays _in place_, without creating intermediary arrays)

Note that you can mutate both of the arrays

<details>

<summary>Hint 1</summary>

We could jump over the elements of the 2nd array like so:

- first element is `3`, therefore go to element at index `3`
- at index `3` we have `4`, therefore go to element at index `4`
- at index `4` we have `2`, therefore go to element at index `2`
- at index `2` we have `1`, therefore go to element at index `1`
- at index `1` we have `0`, therefore go to element at index `0`
- we have iterated the 2nd array

If we do it like that also swapping the elements along the way we will indeed be able to match the arrays above but the problem here is that there can be a situation where you can be caught in a loop and therefore skip some part of the array, here is an example:

```
[D C B A E] [3 2 1 0 4]
3 -> 0 -> 3 -> ...
```

Therefore such solution, though clever, does not suit the requirements

</details>

<details>

<summary>Hint 2</summary>

To solve this task you need to simply _sort_ the elements of the 2nd array (the numbers) and every time you swap the elements of the 2nd array you need to also likewise swap the same elements of the 1st array (the letters). As a result you are going to get the letters in the right order sorted thanks to the 2nd array

</details>

<details>

<summary>Task Type</summary>

- __`In-Place Swap and Overwrite`__
  <details>

  <summary><i><b><code>Swap elements of one or more arrays</code></b></i></summary>

    We sort in place the 2nd array but together with the elements of the 2nd array we also swap the elements of the 1st array. There is a whole type of tasks that can be solved by swapping the elements of the array in a clever way (or in our case we swap the elements of the two arrays simultaneously)

    Here is another example of a solution for these kind of tasks with `O(n)` complexity though it doesn't solve this particular task:

    ```js
    function sort(array, order) {
      for (var i = 0; i < order.length; i++) {
        order[i] = array[order[i]];
      }
      return order;
    }
    ```

    __Note:__ this example of a solution above (which we said doesn't solve this particular task, the reason for it is what we saw in Hint 1) doesn't swap but rather overwrites elements of the array. The Approach we are studying in this particular task is called _`Swap elements of one or more arrays`_. To solve this particular task you need to swap elements instead of overwriting them and for the overwrite Approach of this Task Type feel free to check out the [sibling task](../remove-duplicates-sorted-array/task.md)

    __Note:__ we have already seen the ["Push Zeros Case" task](../../2\)%20Task%20Challanges.md#29-push-zeros-case) where we used the In-Place Swap type of algorithm to solve it

  </details>

</details>

---

| [:arrow_left: back](../README.md) | [:white_check_mark: solution](./solution.js) |
| :---: | :---: |
