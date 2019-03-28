# 21) Remove Duplicate Chars from a String
```javascript
function removeDuplicateChar(str) {
  let char;
  const charCount = {};
  const newStr = [];

  for(let i =0; i < str.length; i++) {
    char = str[i];
    if(charCount[char]) {
      charCount[char]++;
    } else charCount[char] = 1;
  }

  for (let char in charCount) {
    if (charCount[char]==1) newStr.push(char);
  }

  return newStr.join('');
}

removeDuplicateChar('Learn more javascript dude'); // "Lnmojvsciptu"
```

# 22) Random Numbers
## Smth
## Random between a to b if we have random for a