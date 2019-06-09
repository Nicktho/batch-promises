type Promisable<T> = T | Promise<T>;

type Iterator<T, U> = (item: T) => Promisable<U>;

declare function batchPromises<T, U>(
  batchSize: number,
  collection: Promisable<T[]>,
  callback: Iterator<T, U>
): Promise<U[]>;

export = batchPromises;
