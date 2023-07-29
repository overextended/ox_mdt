import { atom, useAtomValue, useSetAtom } from 'jotai';
import { Unit } from '../../typings';
import { isEnvBrowser } from '../../utils/misc';
import { atomsWithQuery } from 'jotai-tanstack-query';
import { queryClient } from '../../main';
import { fetchNui } from '../../utils/fetchNui';

const DEBUG_UNITS: Unit[] = [
  {
    name: 'Unit 2',
    members: [],
    type: 'heli',
    id: 2,
  },
];

const getUnits = async (): Promise<Unit[]> => {
  if (isEnvBrowser()) return DEBUG_UNITS;
  return await fetchNui<Unit[]>('getUnits');
};

const [unitsAtom] = atomsWithQuery(
  () => ({
    queryKey: ['units'],
    refetchOnMount: true,
    queryFn: async () => {
      return await getUnits();
    },
  }),
  () => queryClient
);

export const useUnits = () => useAtomValue(unitsAtom);
