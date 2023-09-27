import { atomsWithInfiniteQuery } from 'jotai-tanstack-query';
import { queryClient } from '../../main';
import { BOLO } from '../../typings/bolo';
import { isEnvBrowser } from '../../utils/misc';
import { fetchNui } from '../../utils/fetchNui';
import { useAtom } from 'jotai';

type BOLOData = { hasMore: boolean; bolos: BOLO[] };

const DEBUG_BOLOS: BOLOData = {
  hasMore: false,
  bolos: [
    {
      contents:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores aspernatur at facilis magni necessitatibus nemo odit possimus temporibus, veniam. A adipisci amet architecto, asperiores atque debitis deleniti, doloremque earum eos error expedita impedit ipsa iste magni maiores maxime, molestiae natus nisi odit omnis quidem quo repellat soluta tempora ut voluptates!',
      id: 0,
      stateId: 'AF3112',
      callSign: '132',
      firstName: 'John',
      lastName: 'Doe',
      createdAt: Date.now(),
      images: [
        'https://i.imgur.com/nrfd1sp.png',
        'https://i.imgur.com/2hHFe6t.png',
        'https://i.imgur.com/cJ5sPD9.png',
        'https://i.imgur.com/dqopYB9b.jpg',
        'https://wallpaper.dog/large/20537599.jpg',
      ],
    },
  ],
};

const getBolos = async (page: number): Promise<{ hasMore: boolean; bolos: BOLO[] }> => {
  if (isEnvBrowser()) {
    return {
      hasMore: true,
      bolos: DEBUG_BOLOS.bolos.slice((page - 1) * 7, page * 7),
    };
  }
  return await fetchNui<BOLOData>('getBOLOs', page, { data: DEBUG_BOLOS });
};

const [bolosAtom] = atomsWithInfiniteQuery(
  () => ({
    queryKey: ['bolos'],
    refetchOnMount: true,
    queryFn: async ({ pageParam = 1 }) => {
      return await getBolos(pageParam);
    },
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.hasMore) return;
      return pages.length + 1;
    },
  }),
  () => queryClient
);

export const useBolos = () => useAtom(bolosAtom);
