import { atom, useAtomValue, useSetAtom } from 'jotai';
import L from 'leaflet';

const dispatchMapAtom = atom<L.Map | null>(null);

export const useDispatchMap = () => useAtomValue(dispatchMapAtom);
export const useSetDispatchMap = () => useSetAtom(dispatchMapAtom);
