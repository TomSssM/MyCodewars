# Extra Documentation of Task Archieve

The Task Archieve MyCodewars Project groups algorithms tasks by the common approaches used for solving them and teaches the reader to find the right one of the known approaches and apply it to solve any task at all based on the preception that any known task can be generalized and abstracted away to represent one of the known general approaches that can be used when solving an algorithmic problem. So the Task Archieve is sort of a way of building neuron links in your brain

Any common approach that can be used to solve any task is termed as "Task Type" within The Task Archieve Project. For example there is a Task Type where we use two pointers to iterate an array and solve the problem or there is also a Task Type where we use a HashMap (and there are quite a few tasks that can be solved using a HashMap) and so on

On the [front page](./README.md) you can find a list of tasks in the chronological order but by clicking the "_scroll_" ( [:scroll:](./task-type.md) ) icon in the header you may toggle the representation of the tasks menu to the representation where all the tasks are grouped by a specific approach that can be used for solving numerous tasks (or Task Type as it is called here). From this point forward we are going to discuss the structure of this latter "grouped by Task Type" representation

Naturally the first task under any particular Task Type header is going to introduce the reader to the Task Type in question with a detailed description thereof while all the further tasks directly under it build upon previous knowledge. For example the ["Best Time to Buy and Sell Stock"](./best-time-to-buy-and-sell-stock/task.md) task introduces the reader to the "Sliding Window" Task Type going in detail about this approach whereas the ["Summary Ranges"](./summary-ranges/task.md) task is situated right under the "Best Time to Buy and Sell Stock" task and assumes the previous knowledge of the Task Type learned while solving the "Best Time to Buy and Sell Stock" task

While the first task in the list under a specific Task Type in the menu, as we said, introduces the reader to the Task Type, all the further tasks that are a part of the list under the same Task Type introduce the reader to the different "_Variations_" that any given Task Type may have

Variations are different perhaps somewhat not obvious ways that a Task Type can be applied. For example if we look at the Task Type which entails using two pointers to iterate an array (and thus solve the task) then the 2 possible Variations of the Two Pointers One Array Task Type are going to be: first a Variation where the first pointer moves from start to end and the second pointer moves from end to start and the second Variation is going to be where both of the two pointers move in the same direction

If any given task can be solved using the same Variation of the Task Type as we have already encounterd then such a task will not be found on the main menu page where we see tasks grouped by Task Type though such a task can be found in the "Similar Tasks" spoiler of the task that it is derived from or on the front page where you can find a list of tasks in the chronological order. Feel free to solve as many "Similar Tasks" as you wish after learning a certain Task Type (or its Variation) to get a solid grasp of the newly learnt concept

Therefore the structure of the main menu page where we see tasks grouped by Task Type can be represented as:

```
- Task Type
  - Task
    * Variation of the Task Type
    * links to Similar Tasks
```

We have looked at the core entities that make up the Task Archieve philosophy and knowledge base
- "Task" is simply an algorithms problem or challenge that you need to solve
- "Task Type" is a general approach that can be employed to solve a Task
- "Variation" is the not too extreme and perhaps not very obvious tweak that we can make to the general Task Type approach to code a solution of the Task

__Note:__ in the hardest cases different Task Types (and their Variations of course) may call to help each other in relationship many to many for the solution of a particular Task

The rest is simple: learn all the different Task Types, study them, remember them and solidify your knowledge of all the different Task Types and their Variations by studying Tasks and solving Similar Tasks and finally apply all this knowledge and see yourself cracking some of the hardest algorithmic problems with ease and grace

## Bonus

### When you can't solve something

One should never worry regarding the matter or suffer any other kindred bluders so characteristic of a studious mind

If one is stuck at the problem for more than 5 to 10 minutes the best approach to resolving this situation is to search for the solution on the Internet (or someplace more adjacent) and start studying the solution instead of trying in vain to reinvent the wheel

### General algorithm to find a solution

When looking for a solution to an algorithmic problem follow this flow: first determine which Task Type the problem _might_ be, then which Variation of the Task Type you may need to employ and sooner or later the solution will come up

### The objective of a learner

This here your task is to study. Most of the work is going to be concerned with reading and studying the solutions rather than trying to figure them out. And when you try to solve some challenge you merely observe how your mind reacts to challenges as an experiment and the ability of actually solving the challenges comes automatically as a result of this experiment but you don't concentrate on it so much as on the experiment. So it is about building the mindset of a person who can solve these challenges rather than trying to just solve these challenges because it was prudently observed by the creators of this project that in order to crack the algorithms code interview (unlike Core JS interview for example) one doesn't need to concern themselves with how to solve this particular challenge or that but rather how to build the mindset of a person who knows how to solve these challenges in general. And the same state of mind is to be applied also in the real interview because you do the best job when in this state of mind

### During a Code Interview

One should first determine the Task Type and the Variation thereof if possible. Once that is accomplished one should write pseudo-code to see if the chosen Task Type and Variation accomplishes the task and discuss it with the interviewer or ask for Hints if necessary. And only after that shall one start writing the actual code for solving the algorithmic problem in question

Oh, and one more thing: stay calm and happy!
