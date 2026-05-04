import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { RosterOfficer } from '../../typings';

const rosterRecordsAtom = atom<RosterOfficer[]>([]);

export const useRosterRecords = () => useAtomValue(rosterRecordsAtom);
export const useSetRosterRecords = () => useSetAtom(rosterRecordsAtom);
export const useRosterRecordsState = () => useAtom(rosterRecordsAtom);
