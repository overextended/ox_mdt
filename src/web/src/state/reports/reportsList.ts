import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import atomWithDebounce from '../../utils/atomWithDebounce';
import { fetchNui } from '../../utils/fetchNui';
import { PartialReportData } from '../../typings';
import { atomsWithInfiniteQuery } from 'jotai-tanstack-query';
import { isEnvBrowser } from '../../utils/misc';
import { queryClient } from '../../main';

const DEBUG_REPORTS: PartialReportData[] = [];

for (let i = 0; i < 25; i++) {
  DEBUG_REPORTS[i] = {
    title: `Report ${i + 1}`,
    id: i,
    author: 'Some One',
    date: Date.now(),
  };
}

const getReports = async (
  page: number,
  search?: string
): Promise<{ hasMore: boolean; reports: PartialReportData[] }> => {
  if (isEnvBrowser()) {
    return {
      hasMore: true,
      reports: DEBUG_REPORTS.slice((page - 1) * 10, page * 10),
    };
  }
  return await fetchNui<{ hasMore: boolean; reports: PartialReportData[] }>('getReports', { page, search });
};

export const reportsListAtoms = atomWithDebounce('');

const [reportsAtom, reportsStatusAtom] = atomsWithInfiniteQuery(
  (get) => ({
    queryKey: ['reports', get(reportsListAtoms.debouncedValueAtom)],
    refetchOnMount: true,
    queryFn: async ({ queryKey, pageParam = 1 }) => {
      return await getReports(pageParam, queryKey[1] as string);
    },
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.hasMore) return;
      return pages.length + 1;
    },
  }),
  () => queryClient
);

export const useReportsSearch = () => useAtomValue(reportsListAtoms.currentValueAtom);
export const useIsReportsDebouncing = () => useAtomValue(reportsListAtoms.isDebouncingAtom);
export const useSetReportsDebounce = () => useSetAtom(reportsListAtoms.debouncedValueAtom);
export const useReportsList = () => useAtom(reportsAtom);
export const useSetReportsList = () => useSetAtom(reportsAtom);
