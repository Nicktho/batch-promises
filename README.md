# batch-promises

Easily batch promises

**NOTE**: Requires runtime to support Promise or to be polyfilled.

## Api

```js
batchPromises(int: batchSize, array: Collection, i => Promise: Iteratee)
```

## Use:

```js
import batchPromises from 'batch-promises';

batchPromises(2, [1,2,3,4,5], i => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(i);
  }, 100);
}))
.then(results => {
  console.log(results); // [1,2,3,4,5]
});
```
