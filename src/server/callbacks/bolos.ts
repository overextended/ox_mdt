import { DB } from '../framework/db';
import { OfficerManager } from '../managers/officerManager';
import { registerAuthorisedCallback } from '../utils/callback';

registerAuthorisedCallback('ox_mdt:getBOLOs', async (source, page: number) => {
  const bolos = await DB.getBolos([page]);

  return {
    hasMore: bolos.length === 5,
    bolos,
  };
});

registerAuthorisedCallback(
  'ox_mdt:deleteBOLO',
  async (source, id: number) => {
    return DB.deleteBOLO(id);
  },
  'delete_bolo'
);

type BoloEditData = {
  id: number;
  contents: string;
  images: string[];
};
registerAuthorisedCallback('ox_mdt:editBOLO', async (source, data: BoloEditData) => {
  const officer = OfficerManager.get(source);

  if (!officer) return;

  const bolo = await DB.selectBolo(data.id);

  if (!bolo || bolo.creator !== officer.stateId) return;

  return await DB.updateBOLO(data.id, data.contents, data.images);
});

type BoloCreateData = {
  contents: string;
  images: string[];
};
registerAuthorisedCallback(
  'ox_mdt:createBOLO',
  async (source, data: BoloCreateData) => {
    const officer = OfficerManager.get(source);

    return await DB.createBolo(officer.stateId, data.contents, data.images);
  },
  'create_bolo'
);
