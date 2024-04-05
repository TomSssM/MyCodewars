# Container With Most Water

You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i'th` line are `(i, 0)` and `(i, height[i])`

Find two lines that together with the x-axis form a container, such that the container contains the most water

Return _the maximum amount of water a container can store_

__Notice__ that you may not slant the container

__Example 1:__

<img width=400 src="./assets/question_11.jpg" />

__Input:__ `height = [1,8,6,2,5,4,8,3,7]`

__Output:__ `49`

__Explanation:__ The above vertical lines are represented by array `[1,8,6,2,5,4,8,3,7]`. In this case, the max area of water (blue section) the container can contain is `49`

__Example 2:__

```
Input: height = [1,1]
Output: 1
```

<details>

<summary>Hint 1</summary>

The aim is to maximize the area formed between the vertical lines. The area of any container is calculated using the shorter line as length and the distance between the lines as the width of the rectangle

`Area = length of shorter vertical line * distance between lines`

We can definitely get the maximum width container as the outermost lines have the maximum distance between them. However, this container __might not be the maximum in size__ as one of the vertical lines of
this container could be really short

Contemplate this example:
```
[3, 9, 3, 4, 7, 2, 12, 6]
```

<img width=400 src="./assets/hint_water_trap_1.png" />
<br />
<img width=400 src="./assets/hint_water_trap_2.png" />

</details>

<details>

<summary>Hint 2</summary>

Start with the maximum width container and go to a shorter width container if there is a vertical line longer than the current containers shorter line. This way we are compromising on the width but we are looking forward to a longer length container

</details>

<details>

<summary>Task Type</summary>

- __`Two Pointers One Array`__
  <details>

  <summary><i><b><code>Two pointers go from start and end until some condition</code></b></i></summary>

    For the solution of this particular task your left pointer going from the start to the end and your right pointer going from the end to the start are going to form a rectangular space. You need to note the size of that space formed by the left and right pointers and keep increasing either the left pointer or the right one depending on which one has the smaller height. This allows us to try and find the biggest rectangular space that can be formed by two pointers and thus attain the solution. The business logic of this Task is somewhat related to geometry by its nature

  </details>

</details>

---

| [:arrow_left: back](../README.md) | [:white_check_mark: solution](./solution.js) |
| :---: | :---: |
