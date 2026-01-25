import { GetPlayer } from '@communityox/ox_core/server';

export const isAuthorised = (source: number, permission: string): boolean => {
  const player = GetPlayer(source);
  const group = player.get('activeGroup');

  if (!group) return false;

  return player.hasPermission(`group.${group}.mdt.${permission}`);
};
