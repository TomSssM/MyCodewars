// Here are Tasks from 1 to 10

// Task 1

function OppositeNumber(number) {
  return (-number);
  // return number * (-1); alternative
  // const opposite = number => -number; alternative
}

// Task 2 - 1
// ["h","o","l","a"]
//
// Output: String with comma delimited elements of the array in th same order.
//
// "h,o,l,a"

function printArray(array){

  var newArray = [], result = "";

  for (let i = 0; i < array.length; i++) {

    if (i == (array.length - 1)) {
      newArray[i] = array[i];
    }
    else {
      newArray[i] = array[i] + ",";
    }

    result += newArray[i];
  }
  return result;
}

// Task 2 - 2

function printArray(array){
  return array.join();
}

// Task 2 -3

function printArray(array){
  return array.toString();
}

// Task 2 - 4

function printArray(array){
  return String(array);
}
// Task 3 - 1
// After a hard quarter in the office you decide to get some rest on a vacation.
// So you will book a flight to leave all the mess behind you.
// You will need a rental car in order for you to get around in your vacation.
// The manager of the car rental makes you some good offers.
// Every day you rent the car costs $40. If you rent the car for 7 or more days, you get $50 off your total.
// Alternatively, if you rent the car for 3 or more days, you get $20 off your total.
// Write a code that gives out the total amount for different days(d)

function rentalCarCost(d) {
  let totalCost = 0;
  for(let i = 1; i <= d; i++) {
    totalCost += 40;
  }

  if (d >= 7) {
    totalCost -= 50;
  }
  else if (d >= 3 && d < 7) {
    totalCost -= 20;
  }

  return totalCost;
}

// Task 3 -2

function rentalCarCost(d) {
  if(d<3) return d * 40;
  if(7>d && d>=3) return (d*40 -20);
  if(d>=7) return (d*40 -50);
}

// Task 4
// You are going to be given a word.
// Your job is to return the middle character of the word.
// If the word's length is odd, return the middle character.
// If the word's length is even, return the middle 2 characters.
//
// Kata.getMiddle("test") should return "es"
//
// Kata.getMiddle("testing") should return "t"
//
// Kata.getMiddle("middle") should return "dd"
//
// Kata.getMiddle("A") should return "A"

function getMiddle(s)
{
  var News;

  if (s.length == 1) {
    return s;
  }

  else if (s.length % 2 == 0) {
    var i = (s.length / 2) - 1;
    News = s.slice(i, i*(-1));
    return News;
  }

  else {
    var m = (s.length - 1)/2;
    News = s.slice(m, m*(-1));
    return News;
  }
}

// Task 5
// This time we want to write calculations using functions and get the results.
// Let's have a look at some examples:
// seven(times(five())); must return 35
// four(plus(nine())); must return 13
// eight(minus(three())); must return 5
// six(dividedBy(two())); must return 3

// Defining the main function

var arr = [];

function math() {

  if(arr.length == 3) {
    var a = arr[2];
    var operator = arr[1];
    var z = arr[0];
    arr = [];

    if(operator == "+") {
      return a + z;
    }
    else if (operator == "-") {return a - z;}
    else if (operator == "*") {return a * z;}
    else {return Math.floor(a / z);}
  }
  else {return arr;}

}

// values:

function zero() {
  arr.push(0);
  return math();
}

function one() {
  arr.push(1);
  return math();
}

function two() {
  arr.push(2);
  return math();
}

function three() {
  arr.push(3);
  return math();
}

function four() {
  arr.push(4);
  return math();
}

function five() {
  arr.push(5);
  return math();
}

function six() {
  arr.push(6);
  return math();
}

function seven() {
  arr.push(7);
  return math();
}

function eight() {
  arr.push(8);
  return math();
}

function nine() {
  arr.push(9);
  return math();
}

function plus() {
  arr.push("+");
  return arr;
}

function minus() {
  arr.push("-");
  return arr;
}

function times() {
  arr.push("*");
  return arr;
}

function dividedBy() {
  arr.push("/");
  return arr;
}

// Task 6
// Love triangles
// History
// Spichonees (made-up name) live in country Spichland where are no gender.
// Spichonees are big lovers, so each Spichonee loves any another Spichonee.
// Unfortunately there are sometimes situations, when Spichonee A loves Spichonee B, Spichonee B loves Spichonee C
// and Spichonee C loves Spichonee A. This phenomenon is called Love triangle.
// Task
// Your task is to implement function getLoveTrianglesCount which calculates how many love triangles phenomenons take place. The function takes the array of integers as the only parameter. An integer k on nth place means, that nth Spichonee loves kth Spichonee.
//
// For example:
// 1  2  3  Spichonees
//   let count = getLoveTrianglesCount([2, 3, 1]);
//   console.log(count); result is 1
  /**
    1st Spichonee loves 2nd Spichonee.
    2nd Spichonee loves 3rd Spichonee.
    3rd Spichonee love 1st Spichonee.
    There is love triangle.
  */
function getLoveTrianglesCount(preferences = []) {
  let count = 0;

  for(let i = 0, len = preferences.length; i <= len; i++) { //we can define variables right in the for loop
    const firstPos = preferences[i];
    const secondPos = preferences[firstPos - 1];
    const thirdPos = preferences[secondPos - 1];

    const conditionOne = thirdPos === i + 1;
    const conditionTwo = firstPos !== i + 1;

    if (conditionOne && conditionTwo) {
      count++;
    }
  }

  return count / 3;
};

// Task 7
// Can you realize a function that returns word count from a given string?
//
// You have to ensure that spaces in string is a whitespace for real.
//
// What we want and finish of work:
//
// countWords("Hello"); // returns 1 as int
// countWords("Hello, World!") // returns 2
// countWords("No results for search term `s`") // returns 6
// countWords(" Hello") // returns 1
// // ... and so on
// What kind of tests we got for your code:
//
// Function have to count words, but not spaces, so be sure that it does right.
// Empty string has no words.
// String with spaces around should be trimmed.
// Non-whitespace (ex. breakspace, unicode chars) should be assumed as delimiter
// Be sure that words with chars like -, ', ` are counted right.
function validator(string) {

  let left, right, length = string.length;

  string = string.trim();

  for (let i = 0; i < length; i++) {
    if( string[i] == " " && string[i] == string[i+1]) {
      left = string.substring(0, i);
      right = string.substring(i+1, length);
      string = left.concat(right);
      i--;
    }
  }
  return string;
}

function countWords(str) {

  let number, count = 0;

  str = validator(str);

  if(str.length == 0) {

    return 0;

  }

  while (number != -1) {
    number = str.search(/\s/);
    str = str.replace(/\s/, "");
    count++;
  }

  return count;

}

// alternative :)
function countWordsAlt(str) {
  str = str.trim();
  if (str === '') return 0;
  return str.split(/\s+/).length;
}

//Task 8
//Quadratic equation
//Recall school math!
//
//Task
//Your task is to implement solveEquation function, wihch solves Quadratic equation.
//*Each* equality has exact 2 *integer* solutions. Return those numbers as ordered array.
//
//Example:
//  js
//  const solutions = solveEquation('2 * x^2 - 10 * x + 12');
//  console.log(solutions); // [2, 3]

function solveEquation(equation) {
  let arr = [], a, b, c, x1, x2, newArr = [];
  equation = equation.replace(/x/g, "");
  equation = equation.replace("^2", "");
  equation = equation.replace(/\*/g, "");
  
  arr = equation.split(/\s+/);
  let len = arr.length;
  if(arr[0] == "") {
    arr[0] = 1;
  }
  else {
      arr[0] *= 1;
  }
  
  for(let i = 0; i < len; i++) {
    if (arr[i] == "-") {
      arr[i+1] *= -1;
      arr.splice(i, 1);
    }
    else if (arr[i] == "+") {
      arr[i+1] *= 1;
      arr.splice(i, 1);
    }
  }
  a = arr[0]; b = arr[1]; c = arr[2];
  
  let D = b*b - 4*(a*c);
  D = Math.sqrt(D);
  
  x1 = (-1*b - D)/(2*a);
  x2 = (-1*b + D)/(2*a);
  
  newArr[0] = Math.round(x1);
  newArr[1] = Math.round(x2);

  return newArr;

}

//Task 9
//Description:
//Given an array (arr) as an argument complete 
//the function countSmileys that should return the total number of smiling faces.
//Rules for a smiling face:
//-Each smiley face must contain a valid pair of eyes.
//Eyes can be marked as : or ;
//-A smiley face can have a nose but it does not have to.
//Valid characters for a nose are - or ~
//-Every smiling face must have a smiling mouth that should be marked with either
//) or D.
//No additional characters are allowed except for those mentioned.
//Valid smiley face examples:
//:) :D ;-D :~)
//Invalid smiley faces:
//;( :> :} :]
//Example cases:
//countSmileys([':)', ';(', ';}', ':-D']);       // should return 2;
//countSmileys([';D', ':-(', ':-)', ';~)']);     // should return 3;
//countSmileys([';]', ':[', ';*', ':$', ';-D']); // should return 1;
//Note: In case of an empty array return 0. You will not be tested with invalid input (input will always be an array). Order of the face (eyes, nose, mouth) elements will always be the same

function countSmileys(arr) {
  if(arr.length === 0) {
    return 0;
  }
  var regex = /(:|;)(-|~)?(\)|D)/g
  var matches = arr.join('').match(regex);
  return matches ? matches.length : 0; 
}

//Task 10
//This is a spin off of my first Kata, you are given a list of characters as a comma separated string.
//Write a function to return a string containing all except the first and last characters, separated by spaces.
//If the input string is empty, or the removal of the first and last items would cause the string to be empty, return null value.
//Arrays are joined by adding a single space between each consecutive array element.
//Test.assertEquals(array(''), null);
//Test.assertEquals(array('1'), null);
//Test.assertEquals(array('1, 3'), null);
//Test.assertEquals(array('1,2,3'), '2');

function array(arr){
  return arr.split(",").slice(1,-1).join(" ") || null;
}