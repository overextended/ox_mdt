import { triggerServerCallback } from '@communityox/ox_lib/client';
import { Calls, Officer } from '@common/typings';
import { PlayerManager } from '../playerManager';

const serverNuiCallback = <T = any>(event: string, clientCb?: (data: T, cb: (data: T) => void) => void) => {
  RegisterNuiCallback(event, async function (data: T, cb: (data: T) => void) {
    const response = (await triggerServerCallback<Promise<unknown>>(`ox_mdt:${event}`, null, data)) as T;

    if (clientCb) {
      clientCb(response, cb);
    } else {
      cb(response);
    }
  });
};

// Dashboard
serverNuiCallback('getAnnouncements');
serverNuiCallback('getWarrants');
serverNuiCallback('createAnnouncement');
serverNuiCallback('editAnnouncement');
serverNuiCallback('deleteAnnouncement');
serverNuiCallback('getBOLOs');
serverNuiCallback('deleteBOLO');
serverNuiCallback('createBOLO');
serverNuiCallback('editBOLO');

// Reports
serverNuiCallback('getCriminalProfiles');
serverNuiCallback('createReport');
serverNuiCallback('getReports');
serverNuiCallback('getReport');
serverNuiCallback('deleteReport');
serverNuiCallback('setReportTitle');
serverNuiCallback('getSearchOfficers');
serverNuiCallback('addCriminal');
serverNuiCallback('removeCriminal');
serverNuiCallback('saveCriminal');
serverNuiCallback('addOfficer');
serverNuiCallback('removeOfficer');
serverNuiCallback('addEvidence');
serverNuiCallback('removeEvidence');
serverNuiCallback('saveReportContents');
serverNuiCallback('getRecommendedWarrantExpiry');

// Profiles
serverNuiCallback('getProfiles');
serverNuiCallback('getProfile');
serverNuiCallback('saveProfileImage');
serverNuiCallback('saveProfileNotes');

// Dispatch
serverNuiCallback('attachToCall');
serverNuiCallback('completeCall');
serverNuiCallback('detachFromCall');
serverNuiCallback<Calls>('getCalls', (data, cb) => {
  // Assign street names to data from the sever to be sent to UI
  for (let i = 0; i < data.length; i++) {
    const call = data[i];
    const [x, y, z = 0] = call.coords;
    const [h, _] = GetStreetNameAtCoord(x, y, z);
    data[i].location = GetStreetNameFromHashKey(h);
  }

  cb(data);
});
serverNuiCallback('getUnits');
serverNuiCallback('createUnit');
serverNuiCallback('joinUnit');
serverNuiCallback('leaveUnit');
serverNuiCallback('setCallUnits');
serverNuiCallback('getActiveOfficers');
serverNuiCallback('setUnitOfficers');
serverNuiCallback('setUnitType');
serverNuiCallback('setOfficerCallSign');
serverNuiCallback('setOfficerRank');
serverNuiCallback('fireOfficer');
serverNuiCallback('hireOfficer');
serverNuiCallback('fetchRoster', ({ officers, totalRecords }: { officers: Officer[]; totalRecords: number }, cb) => {
  officers.forEach((officer) => {
    officer.title = PlayerManager.getGradeLabel(officer.group, officer.grade);
  });

  cb({ officers, totalRecords });
});
