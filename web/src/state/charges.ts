import { atom, useAtomValue, useSetAtom } from 'jotai';
import { Charge } from '../typings';
import { isEnvBrowser } from '../utils/misc';

const DEBUG_CHARGES: { [category: string]: Charge[] } = {
  'OFFENSES AGAINST PERSONS': [
    {
      label: 'Robbery of a financial institution',
      description: 'Bank robbery go brrr',
      type: 'felony',
      time: 30,
      fine: 3000,
    },
    {
      label: 'Speeding',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, doloribus eveniet facere ipsam, ipsum minus modi molestiae nesciunt odio saepe sapiente sed sint voluptatibus voluptatum!',
      type: 'infraction',
      time: 0,
      fine: 2500,
    },
    {
      label: 'Loitering',
      description: 'Standing go brrr',
      type: 'misdemeanor',
      time: 90,
      fine: 25000,
    },
  ],
};

const charges = atom<{ [category: string]: Charge[] }>(isEnvBrowser() ? DEBUG_CHARGES : {});

export const useCharges = () => useAtomValue(charges);
export const useSetCharges = () => useSetAtom(charges);
