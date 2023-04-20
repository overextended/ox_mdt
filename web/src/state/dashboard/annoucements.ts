import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

export interface Announcement {
  id: number;
  creator: {
    id: string;
    firstName: string;
    lastName: string;
    callSign: number;
    image?: string;
  };
  contents: string;
  createdAt: number;
}

const announcementsAtom = atom<Announcement[]>([
  {
    id: 0,
    creator: {
      id: 'ABC321',
      firstName: 'John',
      lastName: 'Smith',
      callSign: 132,
    },
    createdAt: Date.now(),
    contents:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut enim est. Duis diam erat, hendrerit sed suscipit eu, varius et ante. Donec ut erat mauris. Cras lacinia pretium imperdiet. Aliquam eget elit vel ipsum mollis facilisis ac vel nunc. Class aptent taciti sociosqu ad litora torquent per conubia nostra.',
  },
]);

export const useAnnouncements = () => useAtomValue(announcementsAtom);
export const useSetAnnouncements = () => useSetAtom(announcementsAtom);
export const useAnnouncementsState = () => useAtom(announcementsAtom);
