type Result = {
  nullity: number;
  answer: boolean[];
};

export class BooleanMatrix {
  matrix: bigint[];

  constructor(matrix: bigint[]) {
    this.matrix = matrix;
  }

  at(i: number): bigint {
    return this.matrix[i];
  }

  eliminate(y: bigint): Result {
    const { matrix } = this;
    const size = matrix.length;
    const augmented = matrix.map((row, i) => (row << 1n) | ((y >> BigInt(i)) & 1n));

    for (let i = 0, col = 2n; i < size; ++i, col <<= 1n) {
      let pivot = i;
      while (pivot < size && !(augmented[pivot] & col)) {
        ++pivot;
      }

      if (pivot === size) {
        continue;
      }

      [augmented[i], augmented[pivot]] = [augmented[pivot], augmented[i]];

      for (let j = 0; j < size; ++j) {
        if (i === j) {
          continue;
        }

        if (augmented[j] & col) {
          augmented[j] ^= augmented[i];
        }
      }
    }

    const nullity = !augmented.includes(1n)
      ? augmented.reduce((acc, cur) => (cur === 0n ? ++acc : acc), 0)
      : -1;

    const answer =
      nullity >= 0 ? augmented.map((row) => Boolean(row & 1n)) : augmented.map(() => false);

    return { nullity, answer };
  }
}

class MatrixCreator {
  n: bigint;
  op: bigint[];
  bitmask1: bigint;
  bitmask2: bigint;

  constructor(n: bigint, op: bigint[]) {
    this.n = n;
    this.op = op;
    this.bitmask1 = (1n << n) - 1n;
    this.bitmask2 = (1n << (n ** 2n)) - 1n;
  }

  private *createSpan(i: bigint) {
    const { n, op, bitmask1, bitmask2 } = this;

    for (let j = 0n; j < n; ++j) {
      let vector = op
        .map((v) => ((v << j) >> 1n) & bitmask1)
        .reduce((acc, cur) => (acc << n) | cur);
      vector = ((vector << (i * n)) >> n) & bitmask2;
      yield vector;
    }
  }

  public *create() {
    for (let i = 0n; i < this.n; ++i) {
      yield* this.createSpan(i);
    }
  }
}

export function createMatrix(n: number) {
  const op = [2n, 7n, 2n];
  const creator = new MatrixCreator(BigInt(n), op);
  const matrix = Array.from(creator.create());
  return new BooleanMatrix(matrix);
}
