import { fetchNui } from '../../utils/fetchNui';
import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

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

const announcementsAtom = atom<Announcement[]>({
  key: 'announcements',
  default: selector({
    key: 'announcementsSelector',
    get: async () => {
      console.log(1);
      return await fetchNui<Announcement[]>('getAnnouncements', null, {
        data: [
          {
            id: 1,
            contents: 'Pogchamp',
            creator: {
              firstName: 'Some',
              lastName: 'One',
              id: 'ABD',
              callSign: 132,
            },
            createdAt: Date.now(),
          },
        ],
        delay: 1500,
      });
    },
  }),
});

export const useAnnouncements = () => useRecoilValue(announcementsAtom);
export const useSetAnnouncements = () => useSetRecoilState(announcementsAtom);
export const useAnnouncementsState = () => useRecoilState(announcementsAtom);
