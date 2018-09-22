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
