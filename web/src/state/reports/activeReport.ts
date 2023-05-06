import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { splitAtom } from 'jotai/utils';
import { focusAtom } from 'jotai-optics';

export interface Criminal {
  name: string;
  id: number;
  charges: {
    label: string;
    count: number;
  }[];
  issueWarrant?: boolean;
  pleadedGuilty?: boolean;
  penalty?: {
    time?: number;
    fine?: number;
    points?: number;
    reduction?: number;
  };
}

export interface ActiveReport {
  title: string;
  id: number;
  description?: string;
  officersInvolved: {
    name: string;
    callSign: number;
  }[];
  evidence: {
    label: string;
    image: string;
  }[];
  criminals: Criminal[];
}

const activeReportAtom = atom<ActiveReport>({
  title: 'Report title',
  id: 0,
  description: '<p></p>',
  officersInvolved: [
    {
      name: 'Callum Graham',
      callSign: 188,
    },
    {
      name: 'Jacob Gray',
      callSign: 273,
    },
    {
      name: 'Edward Atkinson',
      callSign: 125,
    },
  ],
  evidence: [
    { label: 'Image 1', image: '1' },
    { label: 'Image 2', image: '2' },
    { label: 'Image 3', image: '3' },
  ],
  criminals: [
    {
      name: 'Archie Moss',
      id: 0,
      charges: [
        { label: 'Evading & Eluding', count: 3 },
        { label: 'Resisting Arrest', count: 4 },
        { label: 'Robbery of a financial institution', count: 1 },
      ],
      penalty: {
        time: 32,
        fine: 3000,
        points: 2,
      },
    },
  ],
});

const criminalsAtom = focusAtom(activeReportAtom, (optic) => optic.prop('criminals'));
const criminalsAtomsAtom = splitAtom(criminalsAtom);

const isReportActiveAtom = atom((get) => !!get(activeReportAtom));

export const useCriminals = () => useAtomValue(criminalsAtomsAtom);
export const useIsReportActive = () => useAtomValue(isReportActiveAtom);

export const useActiveReport = () => useAtomValue(activeReportAtom);
export const useSetActiveReport = () => useSetAtom(activeReportAtom);
export const useActiveReportState = () => useAtom(activeReportAtom);
