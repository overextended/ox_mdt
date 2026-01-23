import { onClientCallback } from '@communityox/ox_lib/server';
import { isAuthorised } from '../framework/authorizedCheck';

export const registerAuthorisedCallback = (
  event: string,
  cb: (source: number, ...args: any[]) => any,
  permission: string | false = 'access'
) => {
  onClientCallback(event, (playerId, ...args) => {
    if (permission !== false && isAuthorised(source, permission)) return false;

    return cb(playerId, ...args);
  });
};
