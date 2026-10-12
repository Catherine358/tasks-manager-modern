import { atom } from 'jotai';

export type FilterKeys = 'all' | 'new' | 'done' | 'escalated';

export const activeFilterAtom = atom<FilterKeys>('all');
