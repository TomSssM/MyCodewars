//History
//Spichonees (made-up name) live in country Spichland where are no gender. Spichonees are big lovers, so each Spichonee loves any another Spichonee. Unfortunately there are sometimes situations, when Spichonee A loves Spichonee B, Spichonee B loves Spichonee C and Spichonee C loves Spichonee A. This phenomenon is called Love triangle.
//
//Task
//Your task is to implement function getLoveTrianglesCount which calculates how many love triangles phenomenons take place. The function takes the array of integers as the only parameter. An integer k on nth place means, that nth Spichonee loves kth Spichonee.
//
//For example:
//
//                                  // 1  2  3  Spichonees
//  let count = getLoveTrianglesCount([2, 3, 1]);
//  console.log(count); // 1
//
//    1st Spichonee loves 2nd Spichonee.
//    2nd Spichonee loves 3rd Spichonee.
//    3rd Spichonee love 1st Spichonee.
//    There is love triangle.

//Proposed Solution
function getLoveTrianglesCount(preferences = []) {

  let count = 0;

  for (let i = 0, len = preferences.length; i <= len; i++) { //we can define variables right in the for loop
    const firstPos = preferences[i]; //we should always use const when declaring arrays and objects ( arrays are onjects )
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

//I tried solving 2 and smth years afterward:
/**
 * @param preferences - an array of integers. Indices of people, whom they love
 * @returns number of love triangles
 */
function getLoveTrianglesCount(preferences = []) {
    let count = 0;
    preferences.forEach((whomLoves, index) => {
        if (index !== whomLoves - 1) {
            const whomLastOneLoves = preferences[preferences[whomLoves - 1] - 1];
            if (index === whomLastOneLoves - 1) {
                count += 1;
            }
        }
    });
    return count / 3;
}
