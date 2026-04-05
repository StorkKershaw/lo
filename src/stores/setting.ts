import type { StateCreator } from 'zustand';
import { range } from '@/utils';
import type { EngineSlice } from './engine';

export type Mode = 'play' | 'edit' | 'auto';

type SettingState = {
  isSpoiling: boolean;
  mode: Mode;
};

type SettingActions = {
  setIsSpoiling: (value: boolean) => void;
  setEdit: (value: boolean) => void;
  autoFlip: () => void;
};

export type SettingSlice = SettingState & SettingActions;

type Store = EngineSlice & SettingSlice;

export const createSettingSlice: StateCreator<Store, [], [], SettingSlice> = (set, get) => ({
  isSpoiling: false,
  mode: 'play',
  setIsSpoiling: (value) => {
    set({ isSpoiling: value });
  },
  setEdit: (value) => {
    const { mode } = get();
    if (mode === 'auto') {
      return;
    }

    const next = value ? 'edit' : 'play';
    if (next === mode) {
      return;
    }

    set({ mode: next });
  },
  autoFlip: () => {
    const { mode, answer, flip } = get();

    if (mode !== 'play') {
      return;
    }

    const where = range(0, answer.length)
      .filter((index) => answer[index])
      .toArray();

    set({ mode: 'auto' });

    let current = 0;
    let lastTime = Number.NEGATIVE_INFINITY;
    const interval = Math.min(5000 / where.length, 50);

    const tickImmediate = () => {
      if (current === where.length) {
        set({ mode: 'play' });
        return;
      }

      flip(where[current++]);
      requestAnimationFrame(tickImmediate);
    };

    const tickInterval = (timestamp: number) => {
      if (current === where.length) {
        set({ mode: 'play' });
        return;
      }

      if (timestamp - lastTime >= interval) {
        flip(where[current++]);
        lastTime = timestamp;
      }

      requestAnimationFrame(tickInterval);
    };

    requestAnimationFrame(interval < 1 ? tickImmediate : tickInterval);
  },
});
