async function promiseAllWithConcurrencyLimit(tasks, limit) {
  const results = new Array(tasks.length);
  let running = 0;
  let taskIndex = 0;
  return new Promise((resolve, reject) => {
    function runNext() {
      if (taskIndex === tasks.length && running === 0) {
        resolve(results);
        return;
      }
      if (taskIndex >= tasks.length || running >= limit) {
        return;
      }
      const currentIndex = taskIndex;
      const task = tasks[taskIndex];
      taskIndex++;
      running++;        
      task()
        .then(result => {
          results[currentIndex] = result;
        })
        .catch(reject)
        .finally(() => {
          running--;
          runNext();
        });
    }
    for (let i = 0; i < limit && i < tasks.length; i++) {
      runNext();
    }
  });
}

// --- Input Data for Testing ---
const createDriverTask = (id, delay) => () => 
  new Promise((resolve) => {
    console.log(`⏳ Fetching Driver ${id}...`);
    setTimeout(() => {
      console.log(`-- Driver ${id} loaded`);
      resolve(`Data for Driver ${id}`);
    }, delay);
  });

const tasks = [
  createDriverTask(1, 3000),  // 1 second
  createDriverTask(2, 2500),   // 0.5 seconds
  createDriverTask(3, 5000),  // 1.2 seconds
  createDriverTask(4, 3000),   // 0.8 seconds
  createDriverTask(5, 1600),   // 0.6 seconds
];

// Test with concurrency limit of 2
promiseAllWithConcurrencyLimit(tasks, 2).then(results => {
  console.log("\n🎉 All tasks completed:", results);
});
