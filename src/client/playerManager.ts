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
    return this.player;
  }

  static getGradeLabel(groupName: string, gradeId: number): string {
    const group = GetGroup(groupName);
    const grade = group.grades[gradeId];
    return `${group} ${grade}`;
  }

  static getGroupInfo() {
    if (!this.player) this.player = GetPlayer();

    this.group = this.player.get('activeGroup');

    if (!this.group || Config.policeGroups.includes(this.group)) return;

    this.grade = this.player.getGroup(this.group);
    this.label = this.getGradeLabel(this.group, this.grade);

    return {
      group: this.group,
      grade: this.grade,
      label: this.label,
    };
  }

  static getGroupTitle(officer: Officer) {
    return this.getGradeLabel(officer.group, officer.grade);
  }

  static getOfficerData() {
    if (!this.player) this.player = GetPlayer();

    this.getGroupInfo();

    this.officer.stateId = this.player.get('stateId');
    this.officer.firstName = this.player.get('firstName');
    this.officer.lastName = this.player.get('lastName');
    this.officer.group = this.group;
    this.officer.title = this.label;
    this.officer.grade = this.grade;

    return this.officer;
  }

  static getPermissions() {
    const groupPermissions: OxGroupPermissions = GlobalState[`group.${this.group}:permissions`];
    const permissions: Record<string, boolean> = {};

    if (!groupPermissions) return permissions;

    for (const [gradeKey, perms] of Object.entries(groupPermissions)) {
      const grade = parseInt(gradeKey);

      if (grade <= this.grade) {
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
