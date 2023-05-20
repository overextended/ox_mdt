import atomWithDebounce from '../../utils/atomWithDebounce';
import { atom, useSetAtom, useAtomValue } from 'jotai';
import { fetchNui } from '../../utils/fetchNui';
import type { Report } from './report';

const { isDebouncingAtom, debouncedValueAtom, currentValueAtom } = atomWithDebounce('');

interface Officer {
  name: string;
  callSign: number;
}

const OFFICERS: Officer[] = [
  { name: 'John Doe', callSign: 132 },
  { name: 'Billy Bob', callSign: 288 },
  { name: 'Michael Jackson', callSign: 311 },
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
