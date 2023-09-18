import { Character } from '../typings';
import permissions, { PermissionKey } from '../permissions';

export const hasPermission = (character: Character, permission: PermissionKey | PermissionKey[]) => {
  if (!Array.isArray(permission)) {
    const perm = permissions[permission];

    return typeof perm !== 'object' ? character.grade >= perm : character.grade >= perm[character.group];
  }

  let failedPerms = 0;
  for (let i = 0; i < permission.length; i++) {
    const perm = permissions[permission[i]];

    if (typeof perm !== 'object' ? character.grade < perm : character.grade < perm[character.group]) {
      failedPerms++;
    }

    if (failedPerms === permission.length) {
      return false;
    }
  }

  return true;
};
