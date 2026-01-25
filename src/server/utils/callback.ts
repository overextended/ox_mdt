import { onClientCallback } from '@communityox/ox_lib/server';
import { isAuthorised } from '../framework/authorizedCheck';
import { PermissionKeys } from '@common/index';

export const registerAuthorisedCallback = (
  event: string,
  cb: (source: number, ...args: any[]) => any,
  permission: PermissionKeys | 'access' | false = 'access'
) => {
  onClientCallback(event, (playerId, ...args) => {
    if (typeof permission === 'string' && !isAuthorised(source, permission)) {
      DEV: console.info(`User (${source}) tried accessing callback without required permission (${permission}).`);
      return false;
    }

    return cb(playerId, ...args);
  });
};
