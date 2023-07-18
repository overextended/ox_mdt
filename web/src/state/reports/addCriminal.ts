import atomWithDebounce from '../../utils/atomWithDebounce';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { fetchNui } from '../../utils/fetchNui';
import { CriminalProfile } from '../../typings';

const { isDebouncingAtom, debouncedValueAtom, currentValueAtom } = atomWithDebounce('');

const PROFILES: CriminalProfile[] = [
  { firstName: 'John', lastName: 'Doe', dob: Date.now(), stateId: '12345' },
  { firstName: 'Jane', lastName: 'Smith', dob: Date.now(), stateId: '67890' },
  { firstName: 'David', lastName: 'Williams', dob: Date.now(), stateId: '13579' },
  { firstName: 'Samantha', lastName: 'Jones', dob: Date.now(), stateId: '24680' },
  { firstName: 'Robert', lastName: 'Garcia', dob: Date.now(), stateId: '97531' },
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
