import atomWithDebounce from '../../utils/atomWithDebounce';
import { useAtomValue, useSetAtom } from 'jotai';

export const tableSearchAtoms = atomWithDebounce('', undefined, true);

export const useSetRosterSearchDebounce = () => useSetAtom(tableSearchAtoms.debouncedValueAtom);
export const useRosterSearchDebouncedValue = () => useAtomValue(tableSearchAtoms.debouncedValueAtom);
export const useIsRosterDebouncing = () => useAtomValue(tableSearchAtoms.isDebouncingAtom);
