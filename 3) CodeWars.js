//Task 21
// Another example of recursion
function doNTimes(n, fun) {
  function recursionFun(x) {
    if(x >= 1) {
       fun();
       recursionFun(x - 1);
    }	  
  }
  recursionFun(n);	
}