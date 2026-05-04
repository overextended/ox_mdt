import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import atomWithDebounce from '../../utils/atomWithDebounce';
import { PartialProfileData } from '../../typings';
import { atomsWithInfiniteQuery } from 'jotai-tanstack-query';
import { queryClient } from '../../main';
import { fetchNui } from '../../utils/fetchNui';
import { isEnvBrowser } from '../../utils/misc';

const DEBUG_PROFILES: PartialProfileData[] = [];

for (let i = 0; i < 25; i++) {
  DEBUG_PROFILES[i] = {
    firstName: 'Firstname',
    lastName: `Lastname ${i + 1}`,
    dob: Date.now(),
    stateId: i.toString(),
  };
}

export const profilesListAtoms = atomWithDebounce('');

const getProfiles = async (
  page: number,
  search?: string
): Promise<{ hasMore: boolean; profiles: PartialProfileData[] }> => {
  if (isEnvBrowser()) {
    return {
      hasMore: true,
      profiles: DEBUG_PROFILES.slice((page - 1) * 10, page * 10),
    };
  }
  return await fetchNui<{ hasMore: boolean; profiles: PartialProfileData[] }>(
    'getProfiles',
    { page, search },
    { data: { hasMore: false, profiles: [] } }
  );
};

const [profilesListAtom, profilesStatusAtom] = atomsWithInfiniteQuery(
  (get) => ({
    queryKey: ['profiles', get(profilesListAtoms.debouncedValueAtom)],
    refetchOnMount: true,
    queryFn: async ({ queryKey, pageParam = 1 }) => {
      return await getProfiles(pageParam, queryKey[1] as string);
    },
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.hasMore) return;
      return pages.length + 1;
    },
  }),
  () => queryClient
);

export const useProfilesSearch = () => useAtomValue(profilesListAtoms.currentValueAtom);
export const useIsProfilesDebouncing = () => useAtomValue(profilesListAtoms.isDebouncingAtom);
export const useSetProfilesDebounce = () => useSetAtom(profilesListAtoms.debouncedValueAtom);
export const useProfilesList = () => useAtom(profilesListAtom);
