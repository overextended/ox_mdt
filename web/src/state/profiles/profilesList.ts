import { atom, useAtomValue, useSetAtom } from 'jotai';
import atomWithDebounce from '../../utils/atomWithDebounce';
import { fetchNui } from '../../utils/fetchNui';

interface ProfileCard {
  firstName: string;
  lastName: string;
  dob: string;
  playerId: number | string;
}

const DEBUG_PROFILES: ProfileCard[] = [];

for (let i = 0; i < 25; i++) {
  DEBUG_PROFILES[i] = {
    firstName: 'Firstname',
    lastName: `Lastname ${i + 1}`,
    dob: '1/1/1990',
    playerId: i,
  };
}

const { isDebouncingAtom, debouncedValueAtom, currentValueAtom } = atomWithDebounce('');

const reportsListAtom = atom<Promise<ProfileCard[]>>(async (get) => {
  const searchValue = get(debouncedValueAtom);

  return await fetchNui('getProfiles', searchValue, { data: DEBUG_PROFILES, delay: 1000 });
});

export const useProfilesSearch = () => useAtomValue(currentValueAtom);
export const useIsProfilesDebouncing = () => useAtomValue(isDebouncingAtom);
export const useSetProfilesDebounce = () => useSetAtom(debouncedValueAtom);
export const useProfilesList = () => useAtomValue(reportsListAtom);
