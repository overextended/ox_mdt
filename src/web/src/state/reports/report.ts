import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { selectAtom, splitAtom } from 'jotai/utils';
import { focusAtom } from 'jotai-optics';
import { Report } from '../../typings';

export const reportAtom = atom<Report>({
  title: 'Report title',
  id: 0,
  description: '<p></p>',
  officersInvolved: [
    {
      firstName: 'Callum',
      lastName: 'Graham',
      callSign: 188,
      stateId: '132142',
      playerId: 1,
      position: [0, 0, 0],
    },
    {
      firstName: 'Jacob',
      lastName: 'Gray',
      callSign: 273,
      stateId: '152312',
      playerId: 1,
      position: [0, 0, 0],
    },
    {
      firstName: 'Edward',
      lastName: 'Atkinson',
      callSign: 125,
      stateId: '948213',
      playerId: 1,
      position: [0, 0, 0],
    },
  ],
  evidence: [],
  criminals: [
    {
      firstName: 'Archie',
      lastName: 'Moss',
      dob: Date.now(),
      issueWarrant: false,
      processed: false,
      pleadedGuilty: false,
      stateId: '0',
      charges: [],
      penalty: {
        time: 0,
        fine: 0,
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

const reportIdAtom = selectAtom(reportAtom, (report) => report.id);

const isReportActiveAtom = atom(false);

export const useCriminals = () => useAtomValue(criminalsAtomsAtom);
export const useSetCriminals = () => useSetAtom(criminalsAtom);

export const useOfficersInvolved = () => useAtomValue(officersAtom);
export const useSetOfficersInvolved = () => useSetAtom(officersAtom);

export const useEvidence = () => useAtomValue(evidenceAtom);
export const useSetEvidence = () => useSetAtom(evidenceAtom);

export const useReportTitle = () => useAtomValue(reportTitleAtom);
export const useSetReportTitle = () => useSetAtom(reportTitleAtom);

export const useReportId = () => useAtomValue(reportIdAtom);

export const useReportDescription = () => useAtomValue(reportDescriptionAtom);
export const useSetReportDescription = () => useSetAtom(reportDescriptionAtom);
export const useReportDescriptionState = () => useAtom(reportDescriptionAtom);

export const useIsReportActive = () => useAtomValue(isReportActiveAtom);
export const useSetIsReportActive = () => useSetAtom(isReportActiveAtom);

export const useActiveReport = () => useAtomValue(reportAtom);
export const useSetActiveReport = () => useSetAtom(reportAtom);
export const useActiveReportState = () => useAtom(reportAtom);
