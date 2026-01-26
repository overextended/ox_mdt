import { GetPlayer, GetPlayerFromFilter } from '@communityox/ox_core/server';
import { DB } from '../framework';
import { OfficerManager } from '../managers/officerManager';
import { registerAuthorisedCallback } from '../utils/callback';
import { oxmysql } from '@communityox/oxmysql';
import { Config } from '@common/index';

registerAuthorisedCallback('ox_mdt:openMDT', (source) => {
  return OfficerManager.get(source);
});

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

registerAuthorisedCallback(
  'ox_mdt:setOfficerRank',
  async (
    source,
    data: {
      stateId: string;
      group: string;
      grade: number;
    }
  ) => {
    const player = GetPlayer(source);
    const grade = player.getGroup(data.group);

    if (player.stateId === data.stateId) return false;
    if (!grade || grade <= data.grade) return false;

    const target = GetPlayerFromFilter({
      stateId: data.stateId,
      groups: data.group,
    });

    if (target) {
      if (!target.getGroup(data.group)) return false;

      return target.setGroup(data.group, data.grade + 1);
    } else {
      await oxmysql.prepare(
        `
      UPDATE character_groups
      SET grade = ?

      WHERE charId = (
        SELECT charId
        FROM characters
        WHERE stateId = ?
      ) AND name = ? `,
        [data.grade + 1, data.stateId, data.group]
      );

      return true;
    }
  },
  'set_officer_rank'
);

registerAuthorisedCallback(
  'ox_mdt:fireOfficer',
  async (source, stateId: string) => {
    const target = GetPlayerFromFilter({ stateId });

    if (target) {
      Config.policeGroups.forEach((group) => {
        target.setGroup(group, 0);
      });

      return true;
    } else {
      const charId = await oxmysql.prepare('SELECT charid FROM characters WHERE stateId = ?', [stateId]);

      if (!charId) return false;

      await oxmysql.prepare(
        `
      DELETE FROM character_groups
      WHERE charId = ? AND name IN (?)`,
        [charId, Config.policeGroups]
      );

      return true;
    }
  },
  'fire_officer'
);

registerAuthorisedCallback(
  'ox_mdt:hireOfficer',
  async (source, stateId: string) => {
    const target = GetPlayerFromFilter({ stateId });

    if (target) {
      if (target.getGroup(Config.policeGroups)) return false;

      target.setGroup('police', 1);
      return true;
    } else {
      const charId = await oxmysql.prepare('SELECT charid FROM characters WHERE stateId = ?', [stateId]);

      if (!charId) return false;

      try {
        await oxmysql.prepare('INSERT INTO `character_groups` (`charId`, `name`, `grade`) VALUES (?, ?, ?)', [
          charId,
          'police',
          1,
        ]);

        return true;
      } catch {
        return false;
      }
    }
  },
  'hire_officer'
);

registerAuthorisedCallback('ox_mdt:fetchRoster', async (source, data: {
  page: number;
  search: string;
}) => {
  return await DB.fetchRoster(data.page, data.search);
});
