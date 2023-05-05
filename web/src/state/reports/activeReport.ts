import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import activeReport from '../../pages/reports/components/ActiveReport';

interface ActiveReport {
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
  criminals: {
    name: string;
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
  }[];
}

const activeReportAtom = atom<ActiveReport | null>({
  key: 'activeReport',
  default: {
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
  },
});

export const useActiveReport = () => useRecoilValue(activeReportAtom);
export const useSetActiveReport = () => useSetRecoilState(activeReportAtom);
export const useActiveReportState = () => useRecoilState(activeReportAtom);
