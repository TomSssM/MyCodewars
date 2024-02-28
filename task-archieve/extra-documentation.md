# Extra Documentation of Task Archieve

The Task Archieve MyCodewars Project groups algorithms tasks by the common approaches used for solving them and teaches the reader to find the right one of the known approaches and apply it to solve any task at all based on the preception that any known task can be generalized and abstracted away to represent one of the known general approaches that can be used when solving an algorithmic problem. So the Task Archieve is sort of a way of building neuron links in your brain

## Terminology of Task Archieve

The Task Archieve is composed of the following entities:
- Task Type
- Approach
- Variation of Approach
- Task
- Similar Tasks

### Task

First let's define a Task. It is simply an algorithmic challenge that needs to be solved

### Approach

Approach is a general algorithm that can be applied to solve a Task

For example many Tasks can be solved by iterating an array. Then we say that to iterate an array is an Approach for solving a Task. A Task can be solved if you understand that you need to simply iterate an array (therefore you have found the right Approach for the Task), all that is left to do is to understand the particulars of the logic that go into iterating an array and the solution will manifest itself

Please note that Approaches are very granular in our philosophy here. For example to iterate an array from the beginning of the array to the end is one Approach but to iterate an array from the end to the beginning of the array is another Approach

### Variation of Approach

Just to avoid confusion let's also define what is meant by Variation of Approach

If you look at different Approaches you may find that you can write code that does the same thing (follows the same Approach) in many different ways. For example you can iterate an array by using a for loop _or_ you can iterate an array by using recursion. Then we say that the Approach of iterating an array has two Variations: loop and recursive

### Task Type

Task Type is simply a group of similar Approaches that utilize similar mechanics

For example we can group all Approaches that operate on an array and use only one pointer to do so into a single Task Type and call this Task Type "One Pointer One Array" for our own convenience of structuring our knowledge

### Similar Tasks

A Similar Task is defined by its relation to some other Task. We call Task `A` a Similar Task to Task `B` if Task `A` can be solved using the same Approach as Task `B`

Thus Similar Tasks are a group of Tasks whose solution is attainable via the same Approach

## Structure of Task Archieve

On the [front page](./README.md) you can find a list of Tasks in the chronological order but by clicking the "_scroll_" ( [:scroll:](./task-type.md) ) icon in the header you may toggle the representation of the Tasks menu to the representation where all the Tasks are grouped by a specific Task Type whereas each Task in the group represents one of the Approaches that can be used for solving numerous Tasks. From this point forward we are going to discuss the structure of this latter ["grouped by Task Type" representation](./task-type.md)

Naturally any Task under any particular Task Type header is going to introduce the reader to some Approach with a detailed description thereof and all the further Tasks directly under it _may_ build upon previous knowledge. For example the ["Best Time to Buy and Sell Stock"](./best-time-to-buy-and-sell-stock/task.md) Task introduces the reader to the "Sliding Window" Approach going in detail about this Approach whereas the ["Summary Ranges"](./summary-ranges/task.md) Task is situated right under the "Best Time to Buy and Sell Stock" Task and assumes the previous knowledge of the Approach learned while solving the "Best Time to Buy and Sell Stock" Task

If any given Task can be solved using the same Approach of the Task Type as we have already encounterd then such a Task will not be found on the main menu page where we see tasks grouped by Task Type though such a Task can be found in the "Similar Tasks" spoiler of the Task that it is derived from or on the front page where you can find a list of Tasks in the chronological order. Feel free to solve as many "Similar Tasks" as you wish after learning a certain Approach to get a solid grasp of the newly learnt concept

Therefore the structure of the main menu page where we see tasks grouped by Task Type can be represented as:

```
- Task Type
  - Task
    * Approach
    * Similar Tasks
```

__Note:__ in the hardest cases different Approaches may call to help each other in a relationship many to many for the solution of a particular Task. Naturally in this case we enlist a Task under the header of the Task Type whose Approach is more crucial to the solution of this Task

__Note:__ a very useful component of the Task Archieve is indeed [Task Type Summary](./task-type-summary/README.md). Task Type Summary gives a quick summary of all the Approaches and Task Types discovered in the Task Archieve. It is extremely useful if you need to refresh your memory on everything learnt as it also provides very clever and succinct code examples of all the Approaches

The rest is simple: learn all the different Approaches, study them, remember them and solidify your knowledge of all the different Approaches and Task Types by studying Tasks and solving Similar Tasks and finally apply all this knowledge and see yourself cracking some of the hardest algorithmic problems with ease and grace

## Bonus

### When you can't solve something

One should never worry regarding the matter or suffer any other kindred blunders so characteristic of a studious mind

If one is stuck at the problem for more than 5 to 10 minutes the best approach to resolving this situation is to search for the solution on the Internet (or someplace more adjacent) and start studying the solution instead of trying in vain to reinvent the wheel

### General algorithm to find a solution

When looking for a solution to an algorithmic problem follow this flow: first determine which Task Type the problem _might_ be, then which Approach you may need to employ and then sooner or later the solution will come up

### The objective of a learner

This here your task is to study. Most of the work is going to be concerned with reading and studying the solutions rather than trying to figure them out. And when you try to solve some challenge you merely observe how your mind reacts to challenges as an experiment and the ability of actually solving the challenges comes automatically as a result of this experiment but you don't concentrate on it so much as on the experiment. So it is about building the mindset of a person who can solve these challenges rather than trying to just solve these challenges

It was prudently observed by the creators of the Task Archieve MyCodewars Project that in order to crack the algorithms code interview (unlike Core JS interview for example) one doesn't need to concern themselves with how to solve this particular challenge or other but rather how to build the mindset of a person who knows how to solve these challenges in general. And the same state of mind is to be applied also in the real interview because you do the best job when in this state of mind

### During a Code Interview

One should first determine the Task Type and the Approach thereof if possible. Once that is accomplished one should write pseudo-code to see if the chosen Task Type and Approach solve the Task and discuss it with the interviewer or ask for Hints if necessary. And only after that shall one start writing the actual code for solving the Task in question

Also train your mind to run code in your head as if your mind were a debugger

Oh, and one more thing: stay calm and happy!
