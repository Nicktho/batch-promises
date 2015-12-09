# batch-promises

Easily batch promises

**NOTE**: Requires runtime to support Promise or to be polyfilled.

## Api

```js
batchPromises(int: batchSize, array: Collection, i => Promise: Iteratee)
```

The `Promise: Iteratee` will be called after each batch.

## Use:

```js
import batchPromises from 'batch-promises';

batchPromises(2, [1,2,3,4,5], i => new Promise((resolve, reject) => {

  // The iteratee will fire after each batch resulting in the following behaviour:
  // @ 100ms resolve items 1 and 2 (first batch of 2)
  // @ 200ms resolve items 3 and 4 (second batch of 2)
  // @ 300ms resolve remaining item 5 (last remaining batch)
  setTimeout(() => {
    resolve(i);
  }, 100);
}))
.then(results => {
  console.log(results); // [1,2,3,4,5]
});
```
