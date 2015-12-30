module.exports = function(batchSize, arr, fn) {
    return arr
    .map(function(_, i) {
        return i%batchSize ? [] : arr.slice(i, i+batchSize);
    })
    .map(function(group) {
        return function(res) {
            return Promise.all(group.map(fn)).then(function(r) {
                return res.concat(r);
            });
        }
    })
    .reduce(function(chain, work) {
        return chain.then(work);
    }, Promise.resolve([]));
}
