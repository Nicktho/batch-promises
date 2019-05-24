'use strict';

/** @type {import('./index')} */
function batchPromises(batchSize, collection, callback) {
  return Promise.resolve(collection).then((arr) =>
    arr
      .map((_, i) => (i % batchSize ? [] : arr.slice(i, i + batchSize)))
      .map((group) => (res) => Promise.all(group.map(callback)).then((r) => res.concat(r)))
      .reduce((chain, work) => chain.then(work), Promise.resolve([]))
  );
}

module.exports = batchPromises;
