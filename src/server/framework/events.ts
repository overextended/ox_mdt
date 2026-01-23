import { Config } from '@common/index';
import { GetPlayer, GetPlayers } from '@communityox/ox_core/server';
import { OfficerManager } from '../managers/officerManager';

const addOfficer = (playerId: number): void => {
  const player = GetPlayer(playerId);

  if (!player) return;

  const group = player.get('activeGroup');
  const grade = player.getGroup(group);

  if (!Config.policeGroups.includes(group)) return;

  OfficerManager.add(playerId, player.get('firstName'), player.get('lastName'), player.stateId, group, grade);
};

on('ox:playerLoaded', (playerId: number, userId: number, charId: number) => {
  addOfficer(playerId);
});

on('ox:setActiveGroup', (playerId: number, groupName: string, previousGroupName: string | undefined) => {
  const officer = OfficerManager.get(playerId);

  if (officer) {
    const grade = GetPlayer(playerId).getGroup(officer.group);

    if (officer.group == groupName) {
      if (!grade) {
        OfficerManager.remove(playerId);
        return;
      }

      officer.grade = grade;

      return;
    }
  }

  addOfficer(playerId);
});

on('ox:playerLogout', (playerId: number, userId: number, charId: number) => {
  const officer = OfficerManager.get(playerId);

  if (!officer) return;

  // ToDo:
  // const state = Player(playerId).state;
  // UnitManager.removePlayerFromUnit(officer, state);

  OfficerManager.remove(playerId);
});

setImmediate(() => {
  GetPlayers().forEach((ply) => {
    addOfficer(ply.source);
  });
});
