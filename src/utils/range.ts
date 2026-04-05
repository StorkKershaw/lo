export function* range(start: number, stop: number, step: number = 1) {
  for (let current = start; current < stop; current += step) {
    yield current;
  }
}
