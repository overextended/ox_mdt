import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Profile } from '../../typings';

export const DEBUG_PROFILE: Profile = {
  firstName: 'John',
  lastName: 'Doe',
  stateId: '139235',
  dob: Date.now(),
  phoneNumber: '813-242-0101',
  notes: '<p></p>',
  relatedReports: [
    {
      title: 'Report title',
      id: 1,
      author: 'Some One',
      date: '13/03/2023',
    },
    {
      title: 'Report title',
      id: 2,
      author: 'Some One',
      date: '13/03/2023',
    },
    {
      title: 'Report title',
      id: 3,
      author: 'Some One',
      date: '13/03/2023',
    },
    {
      title: 'Report title',
      id: 4,
      author: 'Some One',
      date: '13/03/2023',
    },
  ],
};

const profileAtom = atom<Profile | null>(null);
const isProfileActiveAtom = atom((get) => !!get(profileAtom));

export const useProfile = () => useAtomValue(profileAtom);
export const useSetProfile = () => useSetAtom(profileAtom);
export const useProfileState = () => useAtom(profileAtom);

export const useIsProfileActive = () => useAtomValue(isProfileActiveAtom);
