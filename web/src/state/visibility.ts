import { atom, useAtomValue, useSetAtom, useAtom } from 'jotai';

const visibilityAtom = atom<boolean>(false);

export const useVisibility = () => useAtomValue(visibilityAtom);
export const useSetVisibility = () => useSetAtom(visibilityAtom);
export const useVisibilityState = () => useAtom(visibilityAtom);
