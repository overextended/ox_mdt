import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Profile } from '../../typings';

export const DEBUG_PROFILE: Profile = {
  firstName: 'John',
  lastName: 'Doe',
  stateId: '139235',
  dob: Date.now(),
  notes: '<p></p>',
  licenses: [
    {
      label: 'Driving license',
      points: 3,
    },
    'Hunting license',
    'Fishing license',
  ],
  vehicles: [
    {
      label: 'Dinka Blista',
      plate: '123XYZ321',
    },
  ],
  pastCharges: [
    {
      label: 'Assault with a deadly weapon',
      count: 3,
    },
    {
      label: 'Fleeing and eluding',
      count: 5,
    },
    {
      label: 'Bank robbery',
      count: 1,
    },
  ],
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
