// Money Exchange
// Description
// Write a method makeExchange that will determine the minimum number
// of coins needed to make change for a given amount in American currency.
// Coins used will be half-dollars,
// quarters, dimes, nickels, and pennies, worth 50¢, 25¢, 10¢, 5¢ and 1¢, respectively.
// They'll be represented by the strings H, Q, D, N and P.
// The argument passed in will be an integer representing the value in cents.
// The return value should be an object with the symbols as keys, and the numbers
// of coins as values.
// Coins that are not used should not be included in the object.
// IMPORTANT NOTES
// If the argument passed in is 0 or less, then the method should return an empty object.
// If the currency that you would like to exchange more than 10000
// please return following object:
//  {error: "You are rich, my friend! We don't have so much coins for exchange"}
// For example:
//   makeExchange(0)  --> {}
//   makeExchange(1)  --> {"P":1}
//   makeExchange(43) --> {"Q":1,"D":1,"N":1,"P":3}
//   makeExchange(91) --> {"H":1,"Q":1,"D":1,"N":1,"P":1}
//   makeExchange(9999999)  --> {
//  error: "You are rich, my friend! We don't have so much coins for exchange"
// }

function makeExchange(currency) {
  if(currency >= 10000) return ({
    error: "You are rich, my friend! We don't have so much coins for exchange"
  });

  if(currency <= 0) return {};

  const res = {
    H: 50,
    Q: 25,
    D: 10,
    N: 5,
    P: 1
  };
  
  for(let coin in res) {
    const leftover = currency % res[coin];
    res[coin] = Math.floor(currency / res[coin]);
    if(!res[coin]) delete res[coin];
    currency = leftover;
  }

  return res;
}