import { atom, useAtomValue, useSetAtom } from 'jotai';
import { isEnvBrowser } from '../utils/misc';

const visibilityAtom = atom<boolean>(isEnvBrowser());

export const useVisibility = () => useAtomValue(visibilityAtom);
export const useSetVisibility = () => useSetAtom(visibilityAtom);
