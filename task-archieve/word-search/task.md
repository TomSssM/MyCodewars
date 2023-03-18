# Word Search

Given an `m x n` grid of characters `board` and a string `word`, return `true` _if_ `word` _exists in the grid_

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once

__Example 1:__

<img width=150 src="./assets/word1.jpeg" />

```
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true
```

__Example 2:__

<img width=150 src="./assets/word2.jpeg" />

```
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
Output: true
```

__Example 3:__

<img width=150 src="./assets/word3.jpeg" />

```
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
Output: false
```

<details>

<summary>Task Type</summary>

This task is similar to [Sudoku solver](../../cheatsheet/sudoku.js) where you call a function to see if you can solve the game starting at a certain position as you iterate through the board

In this task we should see if a letter matches the one in the word and if so recursively check its neighbors as well as marking the letters that we looked at

</details>
