import { Evidence, PartialReportData } from '@common/typings';
import { DB } from '../framework';
import { OfficerManager } from '../managers/officerManager';
import { registerAuthorisedCallback } from '../utils/callback';

registerAuthorisedCallback('ox_mdt:getCriminalProfiles', async (source, search) => {
  return await DB.getCharacters(search);
});

registerAuthorisedCallback(
  'ox_mdt:createReport',
  async (source, title: string) => {
    const officer = OfficerManager.get(source);

    if (!officer) return;

    return await DB.createReport(title, `${officer.firstName} ${officer.lastName}`);
  },
  'create_report'
);

registerAuthorisedCallback(
  'ox_mdt:getReports',
  async (
    source,
    data: {
      search: string | number;
      page: number;
    }
  ) => {
    let reports: PartialReportData[];

    if (typeof data.search === 'number') {
      reports = await DB.getReportById(data.search);
    } else {
      reports = await DB.selectReports(data.page, data.search);
    }

    return {
      hasMore: reports.length === 10,
      reports,
    };
  }
);

registerAuthorisedCallback('ox_mdt:getReport', async (source, reportId: number) => {
  let report = await DB.getReportById(reportId);

  if (!report) return;

  const officersInvolved = await DB.getOfficersInvolved(reportId);
  const evidence = await DB.selectEvidence(reportId);
  const criminals = await DB.selectCriminalsInvolved(reportId);

  return {
    ...report,
    officersInvolved,
    evidence,
    criminals,
  };
});

registerAuthorisedCallback(
  'ox_mdt:deleteReport',
  async (source, reportId) => {
    return await DB.deleteReport(reportId);
  },
  'delete_report'
);

registerAuthorisedCallback(
  'ox_mdt:setReportTitle',
  async (
    source,
    data: {
      id: number;
      title: string;
    }
  ) => {
    return await DB.updateReportTitle(data.id, data.title);
  },
  'edit_report_title'
);

registerAuthorisedCallback(
  'ox_mdt:saveReportContents',
  async (source, reportId) => {
    return DB.deleteReport(reportId);
  },
  'edit_report_contents'
);

registerAuthorisedCallback(
  'ox_mdt:addCriminal',
  async (
    source,
    data: {
      id: number;
      criminalId: string;
    }
  ) => {
    return await DB.addCriminal(data.id, data.criminalId);
  },
  'add_criminal'
);

registerAuthorisedCallback(
  'ox_mdt:removeCriminal',
  async (
    source,
    data: {
      id: number;
      criminalId: string;
    }
  ) => {
    return await DB.removeCriminal(data.id, data.criminalId);
  },
  'remove_criminal'
);

registerAuthorisedCallback(
  'ox_mdt:addEvidence',
  async (
    source,
    data: {
      id: number;
      evidence: Evidence;
    }
  ) => {
    return await DB.addEvidence(data.id, data.evidence.label, data.evidence.image);
  },
  'add_evidence'
);

registerAuthorisedCallback(
  'ox_mdt:removeEvidence',
  async (
    source,
    data: {
      id: number;
      evidence: Evidence;
    }
  ) => {
    return await DB.removeEvidence(data.id, data.evidence.label, data.evidence.image);
  },
  'add_evidence'
);

registerAuthorisedCallback(
  'ox_mdt:getProfiles',
  async (
    source,
    data: {
      page: number;
      search: string;
    }
  ) => {
    try {
      const profiles = await DB.selectProfiles(data.page, data.search);

      return {
        hasMore: profiles.length === 10,
        profiles,
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

registerAuthorisedCallback('ox_mdt:getProfile', async (source, data: string) => {
  return await DB.selectCharacterProfile(data);
});

registerAuthorisedCallback(
  'ox_mdt:saveProfileImage',
  async (
    source,
    data: {
      stateId: string;
      image: string;
    }
  ) => {
    return await DB.updateProfilePicture(data.stateId, data.image);
  },
  'change_profile_picture'
);

registerAuthorisedCallback(
  'ox_mdt:saveProfileNotes',
  async (
    source,
    data: {
      stateId: string;
      notes: string;
    }
  ) => {
    return await DB.updateProfileNotes(data.stateId, data.notes);
  },
  'edit_profile_notes'
);

registerAuthorisedCallback(
  'ox_mdt:addOfficer',
  async (
    source,
    data: {
      id: number;
      stateId: string;
    }
  ) => {
    return await DB.addOfficer(data.id, data.stateId);
  },
  'add_officer_involved'
);

registerAuthorisedCallback(
  'ox_mdt:removeOfficer',
  async (
    source,
    data: {
      id: number;
      stateId: string;
    }
  ) => {
    return await DB.removeOfficer(data.id, data.stateId);
  },
  'remove_officer_involved'
);
