import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import atomWithDebounce from '../../utils/atomWithDebounce';
import { fetchNui } from '../../utils/fetchNui';
import { ReportCard } from '../../typings';
import { atomsWithInfiniteQuery } from 'jotai-tanstack-query';
import { isEnvBrowser } from '../../utils/misc';
import { queryClient } from '../../main';
const DEBUG_REPORTS: ReportCard[] = [];

for (let i = 0; i < 25; i++) {
  DEBUG_REPORTS[i] = {
    title: `Report ${i + 1}`,
    id: i,
    author: 'Some One',
    date: Date.now(),
  };
}

const getReports = async (page: number, search?: string) => {
  if (isEnvBrowser()) {
    return DEBUG_REPORTS.slice((page - 1) * 10, page * 10);
  }
  return await fetchNui('getReports', { page, search }, { data: DEBUG_REPORTS, delay: 1000 });
};

export const reportsListAtoms = atomWithDebounce('');

const [reportsAtom, reportsStatusAtom] = atomsWithInfiniteQuery(
  (get) => ({
    queryKey: ['reports', get(reportsListAtoms.debouncedValueAtom)],
    queryFn: async ({ queryKey, pageParam = 1 }) => {
      return await getReports(pageParam, queryKey[1] as string);
    },
    getNextPageParam: (_, pages) => pages.length + 1,
  }),
  () => queryClient
);

export const useReportsSearch = () => useAtomValue(reportsListAtoms.currentValueAtom);
export const useIsReportsDebouncing = () => useAtomValue(reportsListAtoms.isDebouncingAtom);
export const useSetReportsDebounce = () => useSetAtom(reportsListAtoms.debouncedValueAtom);
export const useReportsList = () => useAtom(reportsAtom);
export const useSetReportsList = () => useSetAtom(reportsAtom);
