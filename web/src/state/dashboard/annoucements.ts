import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

export interface Announcement {
  id: number;
  contents: string;
  firstName: string;
  lastName: string;
  image?: string;
  callSign: number;
  createdAt: number;
}

const announcementsAtom = atom<Announcement[]>([
  {
    id: 0,
    firstName: 'John',
    lastName: 'Smith',
    createdAt: Date.now(),
    callSign: 132,
    contents:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut enim est. Duis diam erat, hendrerit sed suscipit eu, varius et ante. Donec ut erat mauris. Cras lacinia pretium imperdiet. Aliquam eget elit vel ipsum mollis facilisis ac vel nunc. Class aptent taciti sociosqu ad litora torquent per conubia nostra.',
  },
]);

export const useAnnouncements = () => useAtomValue(announcementsAtom);
export const useSetAnnouncements = () => useSetAtom(announcementsAtom);
export const useAnnouncementsState = () => useAtom(announcementsAtom);
