import { Character } from '../typings';
import permissions from '../permissions';

export const hasPermission = (character: Character, permission: keyof typeof permissions) => {
  // todo: remove hardcoded police job
  return typeof permissions[permission] === 'number'
    ? //   @ts-ignore - having all properties as object causes headaches
      character.grade >= permissions[permission]
    : //   @ts-ignore
      character.grade >= permissions[permission].police;
};
