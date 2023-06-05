import { atom, useAtomValue, useSetAtom } from 'jotai';
import atomWithDebounce from '../../utils/atomWithDebounce';
import { fetchNui } from '../../utils/fetchNui';

interface ReportCard {
  title: string;
  author: string;
  date: number;
  id: number;
}

const DEBUG_REPORTS: ReportCard[] = [];

for (let i = 0; i < 25; i++) {
  DEBUG_REPORTS[i] = {
    title: `Report ${i + 1}`,
    id: i,
    author: 'Some One',
    date: Date.now(),
  };
}

const { isDebouncingAtom, debouncedValueAtom, currentValueAtom } = atomWithDebounce('');

const reportsListAtom = atom<Promise<ReportCard[]>>(async (get) => {
  const searchValue = get(debouncedValueAtom);

  return await fetchNui('getReports', searchValue, { data: DEBUG_REPORTS, delay: 1000 });
});

export const useReportsSearch = () => useAtomValue(currentValueAtom);
export const useIsReportsDebouncing = () => useAtomValue(isDebouncingAtom);
export const useSetReportsDebounce = () => useSetAtom(debouncedValueAtom);
export const useReportsList = () => useAtomValue(reportsListAtom);
