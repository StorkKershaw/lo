import type { StateCreator } from 'zustand';
import { type BooleanMatrix, createMatrix } from '@/services';
import { range } from '@/utils';

type EngineState = {
  size: number;
  matrix: BooleanMatrix;
  board: bigint;
  nullity: number;
  answer: boolean[];
};

type EngineActions = {
  initialize: (size: number) => void;
  recompute: () => void;
  flip: (index: number) => void;
  edit: (index: number) => void;
};

export type EngineSlice = EngineState & EngineActions;

export const createEngineSlice: StateCreator<EngineSlice, [], [], EngineSlice> = (set) => ({
  size: 0,
  matrix: createMatrix(0),
  board: 0n,
  nullity: 0,
  answer: [],
  initialize: (size) => {
    const matrix = createMatrix(size);
    const board = range(0, size ** 2)
      .filter(() => Math.random() < 0.5)
      .reduce((acc, cur) => matrix.at(cur) ^ acc, 0n);

    set({ size, matrix, board, ...matrix.eliminate(board) });
  },
  recompute: () => {
    set(({ matrix, board }) => ({ ...matrix.eliminate(board) }));
  },
  flip: (index) => {
    set(({ matrix, board, nullity, answer }) => ({
      board: matrix.at(index) ^ board,
      answer: nullity >= 0 ? answer.with(index, !answer[index]) : answer,
    }));
  },
  edit: (index) => {
    const bitmask = 1n << BigInt(index);
    set(({ matrix, board }) => ({
      board: board ^ bitmask,
      ...matrix.eliminate(board ^ bitmask),
    }));
  },
});
