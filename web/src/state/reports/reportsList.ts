import { atom, useAtomValue, useSetAtom } from 'jotai';
import atomWithDebounce from '../../utils/atomWithDebounce';
import { fetchNui } from '../../utils/fetchNui';
import { ReportCard } from '../../typings';

const DEBUG_REPORTS: ReportCard[] = [];

for (let i = 0; i < 25; i++) {
  DEBUG_REPORTS[i] = {
    title: `Report ${i + 1}`,
    id: i,
    author: 'Some One',
    date: Date.now(),
  };
}

const getReports = async (search?: string) =>
  await fetchNui('getReports', search, { data: DEBUG_REPORTS, delay: 1000 });

export const reportsListAtoms = atomWithDebounce('');

const rawReportsAtom = atom<ReportCard[]>([]);

// TODO: fix creating a new report while searching then removing the search not refreshing the reports list
const reportsAtom = atom(
  async (get) => {
    const rawReports = get(rawReportsAtom);
    const search = get(reportsListAtoms.debouncedValueAtom);
    return rawReports.length === 0 || search !== '' ? getReports(search) : rawReports;
  },
  async (get, set, by?: ReportCard[] | undefined) => {
    const search = get(reportsListAtoms.debouncedValueAtom);
    return search !== '' ? set(rawReportsAtom, by ?? (await getReports(search))) : set(rawReportsAtom, by ?? []);
  }
);

export const useReportsSearch = () => useAtomValue(reportsListAtoms.currentValueAtom);
export const useIsReportsDebouncing = () => useAtomValue(reportsListAtoms.isDebouncingAtom);
export const useSetReportsDebounce = () => useSetAtom(reportsListAtoms.debouncedValueAtom);
export const useReportsList = () => useAtomValue(reportsAtom);
export const useSetReportsList = () => useSetAtom(reportsAtom);
