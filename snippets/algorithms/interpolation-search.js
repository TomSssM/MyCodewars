// interpolation search works really well if the elements in an
// array are not ony sorted but also uniformly distributed
// the way it works is as follows:

// imagine we have the following array: [1,2,3,4,5,6,7]
// we can depict it in the following graph where the left is indexes [0-6]
// and the bottom is the values [1-7]:
//   y
//   ^
//   |
// 6 |                  .
// 5 |               .
// 4 |            .
// 3 |         .
// 2 |      .  
// 1 |   .     
// 0 |__ __ __ __ __ __ __ --> x
//    1  2  3  4  5  6  7
// if we put dots for every item in an array we should then be able to draw
// a slanted straight line
// the beginning of our line (the dot [1,0]) is going to have the coordinates [x1,y1]
// the end of our line is going to have the coordinates [7,6] == [x2,y2] and
// somewhere along this line is going to be our value we are looking for and its
// coordinates are going to be [x,y]; well we don't know the index of this value
// (that is what we are looking for) but we do know its value (it's going to be passed as a parameter)
// let's pretend for this test that we are looking for the index of the value 3
// thus the x is going to be equal to = 3
// what does this give us? Well now we can put all these things into the following formula:
//  __ __ __ __ __ __ __ __ __ __ __ __ __ __ __
// |                                            |
// | y = (y2 - y1) / (x2 - x1) * (x - x1) + y1  |
// |__ __ __ __ __ __ __ __ __ __ __ __ __ __ __|
//
// given that in our case: x1 = 1, x2 = 7, y1 = 0, y2 = 6 and x = 3
// y = (6 - 0) / (7 - 1) * (3 - 1) + 0 = 2
// the item with value 3 is going to be at index 2, which is correct
// now, here is the thing: we were able to cheat like that because our values in the array are
// very uniformly distributed. However if we had an array like [1,7,20,80 ...] where the values are not
// so uniformly distributed we would get the wrong result
// thus if the element at the resulting index isn't what we are looking for but smaller
// then we should look everywhere lower (y2 = y - 1), otherwise if the element we are looking for 
// is bigger we should traverse along the upper portion of the slanted line thus: y1 = y + 1
// this way it gets pretty close to linear, here is the time complexity:
// ╔══════════════════════════════════╦════════════╗
// ║      If Uniformly Distributed    ║ Worst Case ║
// ╠══════════════════════════════════╬════════════╣
// ║           Ο(log(log(n)))         ║    O(n)    ║
// ╚══════════════════════════════════╩════════════╝

function InterpolationSearch(arr, elm) {
    let pos;
    let start = 0
    let end = arr.length - 1;

    while (arr[start] < elm && arr[end] > elm) {
      pos = start + Math.floor(((end - start) * (elm - arr[start])) / (arr[end] - arr[start]));
      if (arr[pos] < elm) start = pos + 1;
      else if (arr[pos] > elm) end = pos - 1;
      else return pos;
    }

    if (arr[start] === elm) return start;
    else if (arr[end] === elm) return end;
    else return -1;
}

console.log(InterpolationSearch([1,2,3,4,5,6,7], 3)); // 2
console.log(InterpolationSearch([4, 8, 12, 18], 12)); // 2