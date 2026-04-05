import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { createEngineSlice, type EngineSlice } from './engine';
import { createSettingSlice, type SettingSlice } from './setting';

export type Store = EngineSlice & SettingSlice;

export const useStore = create<Store>()(
  subscribeWithSelector((...a) => ({
    ...createEngineSlice(...a),
    ...createSettingSlice(...a),
  })),
);
