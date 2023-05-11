import atomWithDebounce from '../../utils/atomWithDebounce';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { fetchNui } from '../../utils/fetchNui';

const { isDebouncingAtom, debouncedValueAtom, currentValueAtom } = atomWithDebounce('');

interface CriminalProfile {
  firstName: string;
  lastName: string;
  dob: string;
  id: number;
  image?: string;
}

const PROFILES: CriminalProfile[] = [
  { firstName: 'John', lastName: 'Doe', dob: '1985-06-15', id: 12345 },
  { firstName: 'Jane', lastName: 'Smith', dob: '1972-09-22', id: 67890 },
  { firstName: 'David', lastName: 'Williams', dob: '1990-02-03', id: 13579 },
  { firstName: 'Samantha', lastName: 'Jones', dob: '1987-12-25', id: 24680 },
  { firstName: 'Robert', lastName: 'Garcia', dob: '1979-04-01', id: 97531 },
];

const criminalProfilesAtom = atom<Promise<CriminalProfile[]>>(async (get) => {
  const searchValue = get(debouncedValueAtom);

  if (searchValue === '') return [];

  return await fetchNui('getCriminalProfiles', searchValue, { data: PROFILES, delay: 300 });
});

export const useCriminalSearch = () => useAtomValue(currentValueAtom);
export const useIsCriminalsDebouncing = () => useAtomValue(isDebouncingAtom);
export const useSetCriminalDebounce = () => useSetAtom(debouncedValueAtom);
export const useCriminalProfiles = () => useAtomValue(criminalProfilesAtom);
