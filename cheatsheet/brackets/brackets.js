//Implement function check(str, bracketsConfig), that for given brackets sequence will return true if it is correct and false otherwise
//
//In the second param there is bracketsConfig - the array of pairs open-closed brackets. Each subarray includes only 2 elements - opening and closing bracket
//
//check('()', [['(', ')']]) // -> true
//check('((()))()', [['(', ')']]) // -> true
//check('())(', [['(', ')']]) // -> false
//check('([{}])', [['(', ')'], ['[', ']'], ['{', '}']]) // -> true
//check('[(])', [['(', ')'], ['[', ']']]) // -> false
//check('[]()', [['(', ')'], ['[', ']']]) // -> true
//check('[]()(', [['(', ')'], ['[', ']']]) // -> false
//
// special case: opening and closing bracket can be the same :)
//
//check('||', [['|', '|']]) // -> true
//check('|()|', [['(', ')'], ['|', '|']]) // -> true
//check('|(|)', [['(', ')'], ['|', '|']]) // -> false
//check('|()|(||)||', [['(', ')'], ['|', '|']]) // -> true

//My Solution
function check(str, bracketsConfig) {
  let len = bracketsConfig.length;
  let comparisor = "";
  let count = 0;
  let brackets = "";
  while (count !== len) {
    count = 0;
    for (let i = 0; i < len; i++) {
      brackets = bracketsConfig[i][0] + bracketsConfig[i][1];
      comparisor = str.replace(brackets, "");
      if (str === comparisor) {
        count++;
      }
      str = comparisor;
    }
  }
  return str.length === 0;
}

//Proposed Solution
function check(str, bracketsConfig) {
  for (let strKey = str.length; strKey >= 0; strKey--) {
    for(let bracketsKey = 0; bracketsKey < bracketsConfig.length; bracketsKey++) {
      if(str[strKey] === bracketsConfig[bracketsKey][0]) {
        str = str.replace(bracketsConfig[bracketsKey].join(""),"");
      }
    }
  }

  return str === "";
}
