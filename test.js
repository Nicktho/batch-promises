'use strict';

const assert = require('assert');
const batchPromises = require('./index.js');

describe('batchPromises', () => {
  it('should return an array of results', () => {
    return batchPromises(
      2,
      [1, 2, 3, 4, 5],
      (i) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(i);
          }, 10);
        })
    ).then((res) => {
      assert.deepEqual(res, [1, 2, 3, 4, 5]);
    });
  });

  it('should work with a promise returning an array', () => {
    return batchPromises(
      2,
      Promise.resolve([1, 2, 3, 4, 5]),
      (i) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(i);
          }, 10);
        })
    ).then((res) => {
      assert.deepEqual(res, [1, 2, 3, 4, 5]);
    });
  });

  it('should batch promises', () => {
    let mostConcurrent = 0;
    let currentBatch = 0;

    return batchPromises(
      2,
      [1, 2, 3, 4, 5],
      (i) =>
        new Promise((resolve) => {
          setTimeout(() => {
            currentBatch++;
            if (currentBatch > mostConcurrent) mostConcurrent = currentBatch;
            resolve(i);
          }, 10);
          setTimeout(() => {
            currentBatch = 0;
          }, 11);
        })
    ).then(() => {
      assert.equal(mostConcurrent, 2);
    });
  });

  it('should reject on an error and halt execution', () => {
    let highestPromise;
    const expectedError = new Error('something went wrong');

    return batchPromises(
      2,
      [1, 2, 3, 4, 5],
      (i) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            if (i === 3) return reject(expectedError);
            highestPromise = i;
            resolve(i);
          }, 10);
        })
    ).catch((actualError) => {
      assert.equal(actualError, expectedError);
      assert.equal(highestPromise, 2);
    });
  });
});
