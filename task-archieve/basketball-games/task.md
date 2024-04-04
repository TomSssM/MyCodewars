# Basketball Games

We have basketball games. We know the start and the end of each game (in our universe day is not limited to 24 hours so it is OK if the entire duration of all games exceeds this limit). Every such game is to be attended by a judge and one judge can't attend two or more games at the same time (if the two or more games are happening at the same time). Once a game is over its judge becomes free and can attend another game. We need to count how many judges it takes to attend all games

__Example 1:__

```
Input: [[1, 5], [5, 8]]
Output: 1
Explanation: only one judge is required because once the first game [1, 5] is over the judge can go on and attend the next game [5, 8]
```

__Example 2:__

```
Input: [[1, 5], [2, 8]]
Output: 2
Explanation: takes two judges because the first judge is going to be busy attending the first game [1, 5] and won't be able to attend the second game [2, 8] which is happening in parallel with the first game for a while so we need a second judge to attend the second game
```

<details>

<summary>Hint</summary>

In order to find the number of judges required we merely need to find the max number of games happening simultaneously at any given point in time

The lines below represent games duration. The game starts and ends where the line starts and ends. Y axis represents the number of games while X axis represents the timeline. As you can see some games overlap (meaning they are happening all at the same time):

```
           █████           ███████████████████████████   ███████████   ████
   ████████████████
██████████████████████████████    ██████████████████████████████████████ ███████████████████
```

Thus we can see the max number of overlapping games here:

```
           ██░██           ███████████████████████████   ███████████   ████
   ██████████░█████
█████████████░████████████████    ██████████████████████████████████████ ███████████████████
```

As you can see we have 3 overlapping games and thus need at least 3 judges so that every game is attended by a judge:

```
           ██1██           ███████████████████████████   ███████████   ████
   ██████████2█████
█████████████3████████████████    ██████████████████████████████████████ ███████████████████
```

</details>

<details>

<summary>Task Type</summary>

- __`One Pointer One Array`__ + __`Array and Counter`__
  <details>

  <summary><i><b><code>Sort the array and do something with it</code></b></i> + <i><b><code>Iterate an array keeping one or more counters</code></b></i></summary>

    As was stated in the Hint above we merely need to find the max number of games happening at the same time. In order to do that we can change the array to be composed of elements where each element represents either start or end of any game. Then the business logic of applying the necessary Approaches becomes evident

    First we need to sort the points in time (when games start and end) thus attained. Then we need to loop through the array keeping track of the counter (the number of judges): if we encounter the start of a game then we increment the counter, if we encounter the end of a game then we decrement the counter. This will allow us to count the max number of games that have ever overlapped during the entire time period, which, as we have discussed, _is_ in fact equal to the number of judges we are going to need (for the number of judges required grows as the number of parallel games grows because a judge has only one limitation of not being able to attend two games simultaneously)

  </details>

</details>

---

| [:arrow_left: back](../task-type.md) | [:white_check_mark: solution](./solution.js) |
| :---: | :---: |
