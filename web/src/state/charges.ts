import { atom, useAtomValue, useSetAtom } from 'jotai';
import { Charge } from '../typings';

const CHARGES: Charge[] = [
  {
    label: 'Robbery of a finanical institution',
    description: 'Bank robbery go brrr',
    type: 'felony',
    penalty: {
      time: 30,
      fine: 3000,
    },
  },
  {
    label: 'Speeding',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, doloribus eveniet facere ipsam, ipsum minus modi molestiae nesciunt odio saepe sapiente sed sint voluptatibus voluptatum!',
    type: 'infraction',
    penalty: {
      time: 0,
      fine: 2500,
    },
  },
  {
    label: 'Loitering',
    description: 'Standing go brrr',
    type: 'misdemeanour',
    penalty: {
      time: 90,
      fine: 25000,
    },
  },
];

const chargesAtom = atom<Charge[]>(CHARGES);

const categoryCharges = atom<{ [category: string]: Charge[] }>({});

export const useCharges = () => useAtomValue(chargesAtom);
export const useSetCharges = () => useSetAtom(chargesAtom);

export const useCategoryCharges = () => useAtomValue(categoryCharges);
export const useSetCategoryCharges = () => useSetAtom(categoryCharges);
