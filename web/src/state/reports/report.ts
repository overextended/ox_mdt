import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { splitAtom } from 'jotai/utils';
import { focusAtom } from 'jotai-optics';
import { isEnvBrowser } from '../../utils/misc';

export interface Criminal {
  name: string;
  id: number;
  charges: {
    label: string;
    count: number;
  }[];
  issueWarrant: boolean;
  pleadedGuilty?: boolean;
  penalty?: {
    time: number;
    fine: number;
    points: number;
    reduction: number | null;
  };
}

type ImageEvidence = {
  type: 'image';
  url: string;
  label: string;
};

type ItemEvidence = {
  type: 'item';
  item: string;
  count: number;
};

export interface Report {
  title: string;
  id: number;
  description?: string;
  officersInvolved: {
    name: string;
    callSign: number;
  }[];
  evidence: Array<ImageEvidence | ItemEvidence>;
  criminals: Criminal[];
}

export const reportAtom = atom<Report>({
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
  evidence: [],
  criminals: [
    {
      name: 'Archie Moss',
      issueWarrant: false,
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
        reduction: null,
      },
    },
  ],
});

const criminalsAtom = focusAtom(reportAtom, (optic) => optic.prop('criminals'));
const criminalsAtomsAtom = splitAtom(criminalsAtom);

const officersAtom = focusAtom(reportAtom, (optic) => optic.prop('officersInvolved'));

const evidenceAtom = focusAtom(reportAtom, (optic) => optic.prop('evidence'));

const reportTitleAtom = focusAtom(reportAtom, (optic) => optic.prop('title'));

const reportDescriptionAtom = focusAtom(reportAtom, (optic) => optic.prop('description'));

const isReportActiveAtom = atom(isEnvBrowser());

export const useCriminals = () => useAtomValue(criminalsAtomsAtom);
export const useSetCriminals = () => useSetAtom(criminalsAtom);

export const useOfficersInvolved = () => useAtomValue(officersAtom);
export const useSetOfficersInvolved = () => useSetAtom(officersAtom);

export const useEvidence = () => useAtomValue(evidenceAtom);
export const useSetEvidence = () => useSetAtom(evidenceAtom);

export const useReportTitle = () => useAtomValue(reportTitleAtom);
export const useSetReportTitle = () => useSetAtom(reportTitleAtom);

export const useReportDescription = () => useAtomValue(reportDescriptionAtom);
export const useSetReportDescription = () => useSetAtom(reportDescriptionAtom);
export const useReportDescriptionState = () => useAtom(reportDescriptionAtom);

export const useIsReportActive = () => useAtomValue(isReportActiveAtom);
export const useSetIsReportActive = () => useSetAtom(isReportActiveAtom);

export const useActiveReport = () => useAtomValue(reportAtom);
export const useSetActiveReport = () => useSetAtom(reportAtom);
export const useActiveReportState = () => useAtom(reportAtom);
