import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { isEnvBrowser } from '../utils/misc';

const visibilityAtom = atom<boolean>({
  key: 'visibility',
  default: isEnvBrowser(),
});

export const useVisibility = () => useRecoilValue(visibilityAtom);
export const useSetVisibility = () => useSetRecoilState(visibilityAtom);
export const useVisibilityState = () => useRecoilState(visibilityAtom);
