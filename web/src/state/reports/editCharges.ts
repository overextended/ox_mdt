import { atom, useAtomValue, useSetAtom } from 'jotai';
import { splitAtom } from 'jotai/utils';

export interface SelectedCharge {
  label: string;
  count: number;
}

const selectedChargesAtom = atom<SelectedCharge[]>([]);
const selectedChargesAtomsAtom = splitAtom(selectedChargesAtom);

export const useSelectedCharges = () => useAtomValue(selectedChargesAtom);
export const useSelectedChargesAtoms = () => useAtomValue(selectedChargesAtomsAtom);
export const useSetSelectedCharges = () => useSetAtom(selectedChargesAtom);
