//Quadratic equation
//Recall school math!
//
//Task
//Your task is to implement solveEquation function, wihch solves Quadratic equation. Each equality has exact 2 integer solutions. Return those numbers as ordered array.
//
//Example:
//
//  const solutions = solveEquation('2 * x^2 - 10 * x + 12');
//  console.log(solutions); // [2, 3]

//My Solution
function solveEquation(equation) {
  let arr = [], a, b, c, x1, x2, newArr = [];
  equation = equation.replace(/x/g, "");
  equation = equation.replace("^2", "");
  equation = equation.replace(/\*/g, "");

  arr = equation.split(/\s+/);
  let len = arr.length;
  if (arr[0] == "") {
    arr[0] = 1;
  } else {
    arr[0] *= 1;
  }

  for (let i = 0; i < len; i++) {
    if (arr[i] == "-") {
      arr[i + 1] *= -1;
      arr.splice(i, 1);
    } else if (arr[i] == "+") {
      arr[i + 1] *= 1;
      arr.splice(i, 1);
    }
  }
  a = arr[0];
  b = arr[1];
  c = arr[2];

  let D = Math.pow(b, 2) - 4 * (a * c);
  D = Math.sqrt(D);

  x1 = (-1 * b - D) / (2 * a);
  x2 = (-1 * b + D) / (2 * a);

  newArr[0] = Math.round(x1);
  newArr[1] = Math.round(x2);

  return newArr.sort(function (a, b) {
    return a - b
  });
}
