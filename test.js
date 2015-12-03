var assert = require('assert');
var batchPromises = require('./index.js');

describe('batchPromises', function() {
  it('should return an array of results', function() {
    return batchPromises(2, [1,2,3,4,5], function(i) {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve(i)
        }, 100);
      });
    })
    .then(function(res) {
      assert.deepEqual(res, [1,2,3,4,5]);
    });
  });

  it('should batch promises', function() {
    var mostConcurrent = 0;
    var currentBatch = 0;

    return batchPromises(2, [1,2,3,4,5], function(i) {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          currentBatch++;
          if (currentBatch > mostConcurrent) mostConcurrent = currentBatch;
          resolve(i)
        }, 100);
        setTimeout(function() {
          currentBatch = 0;
        }, 110);
      });
    }).then(function(res) {
      assert.equal(mostConcurrent, 2);
    });
  });

  it('should reject on an error and halt execution', function() {
    var highestPromise;
    var error = new Error('something went wrong');

    return batchPromises(2, [1,2,3,4,5], function(i) {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          if (i === 3) return reject(error);
          highestPromise = i;
          resolve(i);
        }, 100);
      });
    })
    .catch(function(e) {
      assert.equal(e, error);
      assert.equal(highestPromise, 4);
    });
  });
});
