import { useAtom } from 'jotai';
import { Announcement } from '../../typings';
import { atomsWithInfiniteQuery } from 'jotai-tanstack-query';
import { fetchNui } from '../../utils/fetchNui';
import { queryClient } from '../../main';
import { isEnvBrowser } from '../../utils/misc';

const DEBUG_ANNOUNCEMENTS: Announcement[] = [
  {
    contents: 'Dsadaasd',
    id: 1,
    playerId: 1,
    position: [0, 0, 0],
    callSign: 132,
    firstName: 'Fdsadas',
    lastName: 'DSasd',
    stateId: 'dsadas',
    createdAt: Date.now(),
  },
];
const getAnnouncements = async (page: number): Promise<{ hasMore: boolean; announcements: Announcement[] }> => {
  if (isEnvBrowser()) {
    return {
      hasMore: true,
      announcements: DEBUG_ANNOUNCEMENTS.slice((page - 1) * 7, page * 7),
    };
  }
  return await fetchNui<{ hasMore: boolean; announcements: Announcement[] }>('getAnnouncements', page);
};

const [announcementsAtom, announcementsStatusAtom] = atomsWithInfiniteQuery(
  () => ({
    queryKey: ['announcements'],
    refetchOnMount: true,
    queryFn: async ({ pageParam = 1 }) => {
      return await getAnnouncements(pageParam);
    },
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.hasMore) return;
      return pages.length + 1;
    },
  }),
  () => queryClient
);

export const useAnnouncements = () => useAtom(announcementsAtom);
