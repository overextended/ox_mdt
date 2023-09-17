import { Character } from '../typings';
import permissions, { PermissionKey } from '../permissions';
import { fail } from 'assert';

export const hasPermission = (character: Character, permission: PermissionKey | PermissionKey[]) => {
  // todo: remove hardcoded police job

  if (!Array.isArray(permission)) {
    const perm = permissions[permission];

    return typeof perm !== 'object' ? character.grade >= perm : character.grade >= perm.police;
  }

  let failedPerms = 0;
  for (let i = 0; i < permission.length; i++) {
    const perm = permissions[permission[i]];

    if (typeof perm !== 'object' ? character.grade < perm : character.grade < perm.police) {
      failedPerms++;
    }

    if (failedPerms === permission.length) {
      return false;
    }
  }

  return true;
};
