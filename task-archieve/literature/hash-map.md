# Using HashMap to solve tasks

Imagine we have a task to find a duplicate number in an _unsorted_ array `[5, 2, 4, 3, 7, 1, 6, 7]`

The naive solution would be to use nested loops to solve this task. The code would be something like this:

```js
function findDuplicate(arr) {
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];

    for (let j = 0; j < arr.length; j++) {
      if (i === j) {
        continue;
      }

      if (arr[j] === value) {
        return value;
      }
    }
  }

  return null;
}
```

However the algorithm with nested loops above runs in `O(n^2)` time complexity and while it may still work pretty fast on small arrays it will be really _slow_ on really big arrays

So let's see how we can solve the problem of finding a duplicate number in an unsorted array by using a HashMap

First let's see what is a HashMap. HashMap is a Data Structure that allows us to associate some "key" (usually it is a simple string) with some value. So you store some value under some key and the main power of HashMap is that you can get any value from it by using the right key in _constant_ `O(1)` time ("constant" means that the operation of retrieving the value from the HashMap happens instantly and you don't have to iterate an array of all values in the HashMap to get the value but the HashMap can instantly return you the value as long as you give the HashMap the key of this value)

We could depict a HashMap visually like this:

```
a  ->  3
b  ->  true
c  ->  "ok"
```

In the _picture_ above we can see that the HashMap has 3 keys (let's say the keys are simple strings): `a`, `b` and `c`. The key `a` is associated with the the value `3` (number), the key `b` is associated with the the value `true` (boolean) and the key `c` is associated with the the value `"ok"` (string). So for example if we wanted to get the value `"ok"` from the HashMap we would ask the HashMap: _give me the value associated with the key_ `c`; and then we would give the HashMap the key `c` and the HashMap would give to us the value `"ok"`. Moreover, the HashMap is going to give us the value `"ok"` in _constant_ time (like we said before, the HashMap is _not_ going to iterate all the values, it is not going to first look at `3`, then look at `true` only to find `"ok"` at long last in the very end but it is going to return `"ok"` _instantly_, in constant time). This ability of HashMap to return values associated with keys in constant time is very often utilized to solve the tasks

If you want to find out more about HashMap or how it works under the hood, you can look [here](../../snippets/Data%20Structures/hash-tables.js) or better still watch the CS50 lecture or some other Computer Science video on HashMaps but please note that HashMap go by different names all of which mean the same thing. The alternative names for HashMap are: Hash Table, Map or, more broadly, Key-Value Storage. We are going to use the name "HashMap" merely for consistency and to avoid confusion

So how do we use a HashMap in JavaScript and how could we possibly use it to solve our task? Let's look into that!

HashMaps are already built into JavaScript, they are a part of the language. In JavaScript HashMaps are simple object literals! Let's write some JavaScript code that creates a HashMap (meaning a simple object) and stores the value `3` (number) associated with the key `abc` and then retireves it:

```js
const hashMapObjectLiteral = {}; // create HashMap

hashMapObjectLiteral["abc"] = 3; // add value to HashMap

hashMapObjectLiteral["abc"]; // retireves value from HashMap in O(1)
```

or:

```js
const hashMapObjectLiteral = {}; // create HashMap

hashMapObjectLiteral.abc = 3; // add value to HashMap

hashMapObjectLiteral.abc; // retireves value from HashMap in O(1)
```

__Note:__ in JavaScript there is also a built-in `Map` class that allows you to do even more advanced HashMap things (the primary difference is that the built-in `Map` class allows you to use _any values_ as keys while object literals support only strings as keys)

Now that we know how to use a HashMap in JavaScript for constant time lookup of values let's see how we can use a HashMap to solve our task

We indeed don't have to use nested loops to solve our task but we can use a HashMap. We will write an algorithm that will iterate the array and for every value do the following:

- use _value of the array_ as a _key_ of the HashMap and store in HashMap the value `true` associated with every key of the HashMap (the key being, as we said, the value of the array we are currently looking at, therefore a number, which can be easily converted to a string in JavaScript to be used as a key like `3` becomes `"3"`)

- see if there is any value in the HashMap associated with that key

- if there is no value associated with that key in the HashMap then let's store value `true` at that key in the HashMap

- if HashMap already has value `true` associated with that key (once again, the key being the value of the array we are currently looking at) then it means that we have already _seen_ (in one of the previous iterations) the value of the array we are currently looking at and therefore we know that this value is _duplicated_ and we can return it

Here is the code:

```js
function findDuplicate(arr) {
  const hashMap = {}; // create HashMap

  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];

    if (hashMap[value]) {
      // we have already seen this value!
      return value;
    } else {
      // we haven't seen this value before
      hashMap[value] = true;
    }
  }

  return null; // no value is duplicated
}
```

Note how the algorithm using a HashMap above also uses only _one_ for-loop to do the job. Therefore the solution above has `O(n)` time complexity (where `n` is the number of elements in the array), which is significantly better than our previous `O(n^2)` solution using nested loops

HashMap is a very powerful Data Structure and a technique for solving tasks efficiently and we will see many tasks to solve which you need to use the power of HashMap

### Notes

__Note:__ this task cannot be solved in `O(n)` _just_ by using for-loops but we would easily solve this task in `O(n)` indeed by using only one for-loop _if_ the elements in the array were to be sorted because then we would simply look at the current element and see if the next element is equal to it or not: the equal element (number that is) would be the one that is duplicated. So if the array is sorted then it is not a HashMap type of task but a simple One Pointer One Array type of task

__Note:__ using a HashMap is indeed a great performance optimization and almost always you will want to use a HashMap if it solves the problem but merely for practical purposes it is worth mentioning that using a HashMap is sort of a trade-off because when you use a HashMap your code starts consuming more memory (because HashMap requires memory in RAM to store all the values and keys), in other words it requires `O(n)` extra memory (where `n` is the number of elements in the array), so the bigger the input arrray the more memory our code will need while the approach with two nested loops does not consume any extra memory at all. Usually it is OK to consume memory in order to make apps work faster by using all kinds of fancy Data Structures all of which require memory space to store data but it is still worth mentioning that using HashMap or other Data Structures is a trade-off whereas you can make your code run faster at the expense of consuming more memory

__Note:__ HashMap is not the only Data Structure that we can utilize in addition to for-loops and while-loops in order to solve tasks. There are also all kinds of other Data Structures out there that can help us solve tasks in linear `O(n)` time or that provide the only way to solve the task at all but we will see them later on. Feel free to have a look at other [Task Types](../task-type.md) for application of other Data Structures for solving tasks. Good examples of other Data Structures that we can use for solving tasks (just like we have seen HashMap used in this article) are Binary Trees or Graphs

### Bonus

Here is another task that can be solved using HashMap. Try solving this one yourself so you can train your brain to see the cases where you may need to use HashMap. And if you get stuck feel free to see the solution in the spoiler down below

So here is the task:

Given a string of the form `aaabbcccbbbddc` transform it into a string of the form `a3b5c4d2` (letters followed by the number of times the letter is encountered within the string, note that letters may not form a contiguous sequence, look at the letter `b` for example, it is followed by other letters and then can be seen again)

<details>

<summary>Solution</summary>

We need to iterate the string as an array and create a HashMap using letters of the string as keys of the HashMap and associate with every key (therefore a letter of the string) the number of times the letter has been encountered inside the string. Then all we gotta do is iterate the keys of the HashMap (therefore all the letters that were encountered inside the string) and output each key of the HashMap (therefore a letter from the string) followed by the value associated with that key of the HashMap (therefore the number of times the letter has been encountered in the string) and we will get the result that we need

Here is the code:

```js
function transformString(str) {
  const hashMap = {};

  for (let i = 0; i < str.length; i++) {
    const letter = str[i];

    if (letter in hashMap) {
      hashMap[letter]++;
    } else {
      hashMap[letter] = 1;
    }
  }

  return Object.entries(hashMap).reduce(
    (result, [letter, count]) => result + letter + count,
    ''
  );
}
```

</details>
