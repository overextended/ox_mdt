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

const announcementsAtom = atom<Announcement[]>([]);

export const useAnnouncements = () => useAtomValue(announcementsAtom);
export const useSetAnnouncements = () => useSetAtom(announcementsAtom);
export const useAnnouncementsState = () => useAtom(announcementsAtom);
