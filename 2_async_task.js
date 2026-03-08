// **Question:** Predict the exact output. Explain why the `asyncFn` behaves differently than a standard promise chain.

console.log('1 - Sync');

setTimeout(() => {
  console.log('2 - Macrotask');
}, 0);

async function asyncFn() {
  console.log('3 - Inside Async');
  await Promise.resolve();
  console.log('4 - After Await');
}

asyncFn();

Promise.resolve().then(() => {
  console.log('5 - Microtask');
});

console.log('6 - Sync End');

/**
 * '1 - Sync' is logged
 * setTimeout is moved to Macrotask queue by Browser Web API
 * asyncFn() is called and '3 - Inside Async' is logged. Next,
 * Promise is encountered. From there to end of function, everything is moved to Microtask queue
 * Line 17-19 is also moved to Microtask queue and placed after previous promise
 * '6 - Sync End' is logged
 * Now since call stack is empty, event loop checks Microtask and pushed both promises to call stack in order
 * '4 - After Await' is logged
 * '5 - Microtask' is logged
 * Now since Microtask queue is also empty, event loop check Microtasks and pushes to call stack
 * '2 - Macrotask' is logged
 */