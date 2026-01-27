import { GetGroup, OxGroupPermissions } from '@communityox/ox_core';
import { GetPlayer } from '@communityox/ox_core/client';
import { Config } from '@common/index';
import { Officer } from '@common/typings';
import { MdtUiState } from './nui';

export class PlayerManager {
  private static player = GetPlayer();
  private static officer: Partial<Officer> = {};
  private static group: string;
  private static grade: number;
  private static label: string;

  static getPlayer() {
    return PlayerManager.player;
  }

  static getGradeLabel(groupName: string, gradeId: number): string {
    const group = GetGroup(groupName);
    const grade = group.grades[gradeId - 1];
    return `${group.label} ${grade}`;
  }

  static getGroupInfo() {
    if (!PlayerManager.player) PlayerManager.player = GetPlayer();

    PlayerManager.group = PlayerManager.player.get('activeGroup');

    if (!PlayerManager.group || !Config.policeGroups.includes(PlayerManager.group)) return;

    PlayerManager.grade = PlayerManager.player.getGroup(PlayerManager.group);
    PlayerManager.label = PlayerManager.getGradeLabel(PlayerManager.group, PlayerManager.grade);

    return {
      group: PlayerManager.group,
      grade: PlayerManager.grade,
      label: PlayerManager.label,
    };
  }

  static getGroupTitle(officer: Officer) {
    return PlayerManager.getGradeLabel(officer.group, officer.grade);
  }

  static getOfficerData() {
    if (!PlayerManager.player) PlayerManager.player = GetPlayer();

    this.getGroupInfo();

    PlayerManager.officer.stateId = PlayerManager.player.get('stateId');
    PlayerManager.officer.firstName = PlayerManager.player.get('firstName');
    PlayerManager.officer.lastName = PlayerManager.player.get('lastName');
    PlayerManager.officer.group = PlayerManager.group;
    PlayerManager.officer.title = PlayerManager.label;
    PlayerManager.officer.grade = PlayerManager.grade;

    return PlayerManager.officer;
  }

  static getPermissions() {
    const groupPermissions: OxGroupPermissions = GlobalState[`group.${PlayerManager.group}:permissions`];
    const permissions: Record<string, boolean> = {};

    if (!groupPermissions) return permissions;

    for (const [gradeKey, perms] of Object.entries(groupPermissions)) {
      const grade = parseInt(gradeKey);

      if (grade <= PlayerManager.grade) {
        for (const [permNode, access] of Object.entries(perms)) {
          if (permNode.startsWith('mdt.')) {
            const permission = permNode.replace('mdt.', '');
            permissions[permission] = access;
          }
        }
      }
    }

    return permissions;
  }
}

on('ox:playerLoaded', () => {
  PlayerManager.getOfficerData();
});

onNet('ox:setGroup', () => {
  const { group: lastGroup } = PlayerManager.getPlayer();

  const updatedPlayer = PlayerManager.getOfficerData();

  if ((!updatedPlayer.group && lastGroup) || lastGroup !== updatedPlayer.group) {
    MdtUiState.closeMDT(true);
  }
});

RegisterNuiCallback('getDepartmentsData', (_: null, cb: (data: object) => void) => {
  let groups: {
    [key: string]: {
      label: string;
      ranks: string[];
    };
  } = {};

  Config.policeGroups.forEach((group) => {
    const groupData = GetGroup(group);

    groups[group] = {
      label: groupData.label,
      ranks: groupData.grades,
    };
  });

  cb(groups);
});
