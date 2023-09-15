import { Character } from '../typings';
import permissions from '../permissions';

export const hasPermission = (character: Character, permission: keyof typeof permissions) => {
  // todo: remove hardcoded police job
  const perm = permissions[permission];
  return typeof perm !== 'object' ? character.grade >= perm : character.grade >= perm.police;
};
