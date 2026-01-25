import { Charge, Criminal } from '@common/typings';
import { registerAuthorisedCallback } from '../utils/callback';
import { DB } from '../framework/db';

registerAuthorisedCallback(
  'ox_mdt:saveCriminal',
  async (
    source,
    data: {
      id: number;
      criminal: Criminal;
    }
  ) => {
    if (data.criminal.issueWarrant) {
      await DB.createWarrant(data.id, data.criminal.stateId, data.criminal.warrantExpiry);
    } else {
      await DB.removeWarrant(data.id, data.criminal.stateId);
    }

    return await DB.saveCriminal(data.id, data.criminal);
  },
  'save_criminal'
);

registerAuthorisedCallback('ox_mdt:getRecommendedWarrantExpiry', (source, charges: Charge[]) => {
  const currentTime = Date.now();
  const baseWarrantDuration = 259200000;
  let addonTime = 0;

  for (const charge of charges) {
    if (charge.time !== 0) {
      addonTime += charge.time * 60 * 60000 * charge.count;
    }
  }

  return currentTime + addonTime + baseWarrantDuration;
});

registerAuthorisedCallback('ox_mdt:getWarrants', async (source, search: string) => {
  return await DB.selectWarrants(search);
});
