import { useAtomValue } from 'jotai';
import { Unit } from '../../typings';
import { isEnvBrowser } from '../../utils/misc';
import { atomsWithQuery } from 'jotai-tanstack-query';
import { queryClient } from '../../main';
import { fetchNui } from '../../utils/fetchNui';

const DEBUG_UNITS: Unit[] = [
  {
    name: 'Unit 132',
    members: [],
    type: 'car',
    id: 132,
  },
];

const getUnits = async (): Promise<Unit[]> => {
  if (isEnvBrowser()) return DEBUG_UNITS;

  const resp = await fetchNui<{ [key: string]: Omit<Unit, 'id'> }>('getUnits');
  return Object.entries(resp).map((entry) => ({ id: +entry[0], ...entry[1] })) as Unit[];
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
