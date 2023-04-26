import { atom, useAtomValue, useSetAtom } from 'jotai';

export interface Profile {
  firstName: string;
  lastName: string;
  stateId: number;
  dob: string;
  notes?: string;
  licenses?: Array<{ label: string; points: number } | string>;
  weapons?: {
    label: string;
    serial: string;
  }[];
  vehicles?: {
    label: string;
    plate: string;
  }[];
  pastCharges?: {
    label: string;
    count: number;
  }[];
  relatedReports?: {
    title: string;
    author: string;
    date: string;
    id: number;
  }[];
}

const DEBUG_PROFILE: Profile = {
  firstName: 'John',
  lastName: 'Doe',
  stateId: 139235,
  dob: '15/06/1990',
  licenses: [
    {
      label: 'Driving license',
      points: 3,
    },
    'Hunting license',
    'Fishing license',
  ],
  weapons: [
    {
      label: 'Pistol',
      serial: 'XYZ123456789',
    },
    {
      label: 'AP Pistol',
      serial: 'XYZ123456789',
    },
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
      id: 31142,
      author: 'Some One',
      date: '13/03/2023',
    },
    {
      title: 'Report title',
      id: 31142,
      author: 'Some One',
      date: '13/03/2023',
    },
    {
      title: 'Report title',
      id: 31142,
      author: 'Some One',
      date: '13/03/2023',
    },
    {
      title: 'Report title',
      id: 31142,
      author: 'Some One',
      date: '13/03/2023',
    },
  ],
};

const profileAtom = atom<Profile | null>(DEBUG_PROFILE);

export const useProfile = () => useAtomValue(profileAtom);
export const useSetProfile = () => useSetAtom(profileAtom);
