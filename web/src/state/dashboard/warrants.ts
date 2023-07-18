import { atomsWithQuery } from 'jotai-tanstack-query';
import { fetchNui } from '../../utils/fetchNui';
import { Warrant } from '../../typings/warrant';
import { useAtomValue } from 'jotai';
import { queryClient } from '../../main';

// TODO: Implement search
const [warrantsAtom] = atomsWithQuery(
  () => ({
    queryKey: ['warrants'],
    queryFn: async () => {
      return fetchNui<Warrant[]>('getWarrants', null, { data: [] });
    },
  }),
  () => queryClient
);

export const useWarrants = () => useAtomValue(warrantsAtom);
