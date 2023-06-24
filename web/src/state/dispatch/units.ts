import { atom, useAtomValue, useSetAtom } from 'jotai';
import { Unit } from '../../typings';
import { isEnvBrowser } from '../../utils/misc';

const DEBUG_UNITS: Unit[] = [
  {
    name: 'Unit 2',
    members: [],
    type: 'heli',
    id: 2,
  },
];

const unitsAtom = atom<Unit[]>(isEnvBrowser() ? DEBUG_UNITS : []);

export const useUnits = () => useAtomValue(unitsAtom);
export const useSetUnits = () => useSetAtom(unitsAtom);
