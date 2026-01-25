import { DB } from '../framework/db';
import { OfficerManager } from '../managers/officerManager';
import { registerAuthorisedCallback } from '../utils/callback';

registerAuthorisedCallback('ox_mdt:getSearchOfficers', async (source, data: string) => {
  return await DB.searchOfficers(data);
});

registerAuthorisedCallback('ox_mdt:getActiveOfficers', (source) => {
  return OfficerManager.getAll();
});

registerAuthorisedCallback(
  'ox_mdt:setOfficerCallSign',
  async (source, data: { stateId: string; callSign: string }) => {
    const exists = await DB.selectOfficerCallsign(data.callSign);

    if (exists) return false;

    await DB.updateOfficerCallsign(data.stateId, data.callSign);

    return true;
  },
  'set_call_sign'
);
