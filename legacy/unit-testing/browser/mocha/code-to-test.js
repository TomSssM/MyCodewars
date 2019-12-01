function isPrime(num) {
  
  for(let i = 0; i <= Math.sqrt(num); i++) {
    if(!(num % i)) return false;
  }

  return true;
}