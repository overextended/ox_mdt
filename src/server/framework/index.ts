import { Ox } from '@communityox/ox_core/server';
import { Config, Permissions } from '@common/index';

// initialize event listeners
import './events';

Config.policeGroups.forEach((group) => {
  Ox.SetGroupPermission(group, 1, 'mdt.access', 'allow');

  for (const [permission, required] of Object.entries(Permissions)) {
    let grade: number | false = false;

    if (typeof required === 'number') {
      grade = required;
    } else {
      grade = (required as Record<string, number>)[group] ?? false;
    }

    if (typeof grade === 'number') Ox.SetGroupPermission(group, grade, `mdt.${permission}`, 'allow');
  }
});
