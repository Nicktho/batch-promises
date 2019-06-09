# batch-promises

Easily batch promises.

**NOTE**: Requires Promsies to be supported by runtime or polyfilled.

## API

### default export

```typescript
type Promisable<T> = T | Promise<T>;

type Iterator<T, U> = (item: T) => Promisable<U>;

declare function batchPromises<T, U>(
  batchSize: number,
  collection: Promisable<T[]>,
  callback: Iterator<T, U>
): Promise<U[]>;

export = batchPromises;
```

`callback` will be called for each `item` in `collection`, parallel in batches of size `batchSize`, which are run in order once each previous batch is resolved.

To better illustrate, with a collection of 5 items (`[1, 2, 3, 4, 5]`) , and a batch size of `2`:

- Call `callback` for item `1` and `2` and wait for both promises to resolve, THEN
- Call `callback` for item `3` and `4` and wait for both promises to resolve, THEN
- Call `callback` for item `5` and wait for promise to resolve, THEN
- Return an ordered array with the result of each callback

## Use

```javascript
import batchPromises from 'batch-promises';

batchPromises(
  2,
  [1, 2, 3, 4, 5],
  (i) =>
    new Promise((resolve, reject) => {
      // The iteratee will fire after each batch resulting in the following behaviour:
      // @ 100ms resolve items 1 and 2 (first batch of 2)
      // @ 200ms resolve items 3 and 4 (second batch of 2)
      // @ 300ms resolve remaining item 5 (last remaining batch)
      setTimeout(() => {
        resolve(i);
      }, 100);
    })
).then((results) => {
  console.log(results); // [1, 2, 3, 4, 5]
});
```
