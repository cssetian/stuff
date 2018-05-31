class AsyncArray {
  constructor(items) {
    this.items = items;
    this.queue = [];
  }

  filter(fn) {
    this.queue.push((values) => {
      const result = null;
      const promises = [];
      values.forEach((value) => {
        promises.push(fn(value));
      });
      return Promise.all(promises).then((filterBools) => {
        return values.filter((value, idx) => {
          return filterBools[idx];
        });
      });
    });
    return this;
  }

  map(fn) {
    this.queue.push((values) => {
      const result = null;
      const promises = [];
      values.forEach((value) => {
        promises.push(fn(value));
      });
      return Promise.all(promises);
    });
    return this;
  }

  then(fn) {
    const promiseChain = this.queue.reduce((acc, func) => {
      return acc.then((results) => {
        return func(results);
      });
    }, Promise.resolve(this.items));
    promiseChain.then(result => fn(result));
  }
}

function delay(ms = 200) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function makeArray() {
  return new AsyncArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    .filter(num => {
      return delay().then(() => {
        return num <= 7;
      });
    })
    .map(num => {
      return delay().then(() => {
        return num * 2;
      });
    })
    .filter(num => {
      return delay().then(() => {
        return num >= 5;
      });
    })
    .then(nums => {
      console.log(nums);
    });
}

console.log('Generating Async Array:');
makeArray();