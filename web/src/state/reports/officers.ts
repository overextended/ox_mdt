import atomWithDebounce from '../../utils/atomWithDebounce';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { fetchNui } from '../../utils/fetchNui';

import { Officer, Report } from '../../typings';

const { isDebouncingAtom, debouncedValueAtom, currentValueAtom } = atomWithDebounce('');

const OFFICERS: Officer[] = [
  { firstName: 'John', lastName: 'Doe', callSign: 132 },
  { firstName: 'Billy', lastName: 'Bob', callSign: 288 },
  { firstName: 'Michael', lastName: 'Jackson', callSign: 311 },
];

const officersAtom = atom<Promise<Officer[]>>(async (get) => {
  const searchValue = get(debouncedValueAtom);

  if (searchValue === '') return [];

  return await fetchNui('getSearchOfficers', searchValue, { data: OFFICERS, delay: 300 });
});

const selectedOfficersAtom = atom<Report['officersInvolved']>([]);

export const useOfficersSearch = () => useAtomValue(currentValueAtom);
export const useIsOfficersDebouncing = () => useAtomValue(isDebouncingAtom);
export const useSetOfficersDebounce = () => useSetAtom(debouncedValueAtom);
export const useOfficers = () => useAtomValue(officersAtom);

export const useSelectedOfficers = () => useAtomValue(selectedOfficersAtom);
export const useSetSelectedOfficers = () => useSetAtom(selectedOfficersAtom);
