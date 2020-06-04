export interface Iterable<A, C, I, S> {
  reduce: (reducer: (accumulator: A, current: C, index: I, source: S) => A, initialAccumulator: A) => A;
}
