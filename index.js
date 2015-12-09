module.exports = function(batchSize, arr, fn) {
  var results = [];
  return arr.map(function(_, i) {
    return i%batchSize ? [] : arr.slice(i, i+batchSize);
  })
  .reduce(function(chain, group) {
    return chain.then(function() {
      return Promise.all(group.map(function(x, i) {
        return (!fn ? Promise.resolve(x) : fn(x, i))["then"](function(result) {
          results.push(result);
        });
      }));
    });
  }, Promise.resolve())
  .then(function() {
    return results;
  });
}
