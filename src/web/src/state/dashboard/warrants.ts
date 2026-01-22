import { atomsWithQuery } from 'jotai-tanstack-query';
import { fetchNui } from '../../utils/fetchNui';
import { Warrant } from '../../typings/warrant';
import { useAtomValue, useSetAtom } from 'jotai';
import { queryClient } from '../../main';
import atomWithDebounce from '../../utils/atomWithDebounce';

export const warrantsSearchAtoms = atomWithDebounce('');

const [warrantsAtom] = atomsWithQuery(
  (get) => ({
    queryKey: ['warrants', get(warrantsSearchAtoms.debouncedValueAtom)],
    refetchOnMount: true,
    queryFn: async () => {
      return fetchNui<Warrant[]>('getWarrants', get(warrantsSearchAtoms.debouncedValueAtom), {
        data: [
          {
            stateId: 'AF30442',
            firstName: 'Billy',
            lastName: 'Bob',
            reportId: 3,
            expiresAt: Date.now(),
            image: 'https://i.imgur.com/dqopYB9b.jpg',
          },
        ],
      });
    },
  }),
  () => queryClient
);

export const useWarrants = () => useAtomValue(warrantsAtom);
export const useSetWarrantsDebounce = () => useSetAtom(warrantsSearchAtoms.debouncedValueAtom);
