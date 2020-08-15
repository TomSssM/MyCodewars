// substring search is the search of a substring inside a string
// if we are looking for 'man' inside 'anmafomanok'
// the workflow is as follows:
// we look at the first letter of the string (it's 'a') and
// the first letter of substring (it's 'm') like that
// 'anmafomanok'  'man'
//  ^              ^
// these two aren't equal so look at the second letter of the string
// 'anmafomanok'  'man'
//   ^             ^
// aren't the same either so proceed:
// 'anmafomanok'  'man'
//    ^            ^
// Aha! Now the first letter of the substring and the current letter of the
// string are the same, so now we look at the next letter of the string as
// well as the next letter of the substring like so:
// 'anmafomanok'  'man'
//     ^            ^
// Equal too! proceed in the same manner:
// 'anmafomanok'  'man'
//      ^            ^
// Oop! now the last letter of the substring and the current letter of
// the string aren't equal. So what we do is we switch over the letter that
// was the first match (it was 'm') and see if its neighbor will match the substring
// 'anmafomanok'  'man'
//     ^           ^
// We find that 'a' isn't the same as 'm' so keep going
// 'anmafomanok'  'man'
//      ^          ^
// 'anmafomanok'  'man'
//       ^         ^
// 'anmafomanok'  'man'
//        ^        ^
// Found a match again! Let's check the letters like last time:
// 'anmafomanok'  'man'
//        ^        ^
// 'anmafomanok'  'man'
//         ^        ^
// 'anmafomanok'  'man'
//          ^        ^
// Since we reached the end of the substring and every letter matched we
// can say that we found our substring
// do note that if the last letter 'n' didn't match ( that is if the string were
// something like: 'anmafomaWok' ) we would only look at the letters 'a' and 'W'
// but there would be no point in considering the
// letters 'ok' as there is no way they are going to match 'man' as they are not even
// composed of the same number of characters ( that is to say a substring of 2 chars can't be
// the same as any substring of 3 chars )
// there is also a way to optimize this approach of course but this one is the simple Substring Search

function substringSearchS(sub, str) {
  let subLength = sub.length;
  let strLen = str.length - subLength + 1;

  // no need to search all the characters of the original string:
  // if the string is 7 chars long and our
  // substring is 3 chars long it makes sense
  // to look at only 5 chars of our string as the last
  // two chars can't contain the substring because the
  // substring is three chars long (1 char longer than the remaining digits)
  for (let i = 0; i < strLen; i++) {
    let j = 0;
    while (j < subLength && sub.charAt(j) === str.charAt(i+j)) j++;
    if (j === subLength) return i;
  }

  return -1;
}

console.log(substringSearchS('man', 'superman hero'));
console.log(substringSearchS('saddssd', 'aaaaaaaaaaaaa'));