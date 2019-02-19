const aGeneratorObject = function* () {
  yield 1;
  yield 2;
  yield 3;
}();

typeof aGeneratorObject.next;
// "function", because it has a next method, so it's an iterator

typeof aGeneratorObject[Symbol.iterator];
// "function", because it has an @@iterator method, so it's an iterable

aGeneratorObject[Symbol.iterator]() === aGeneratorObject;
// true, because its @@iterator method returns itself (an iterator), so
// it's an well-formed iterable

[...aGeneratorObject];
// [1, 2, 3]