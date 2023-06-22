import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Announcement } from '../../typings';

const announcementsAtom = atom<Announcement[]>([]);

export const useAnnouncements = () => useAtomValue(announcementsAtom);
export const useSetAnnouncements = () => useSetAtom(announcementsAtom);
export const useAnnouncementsState = () => useAtom(announcementsAtom);
