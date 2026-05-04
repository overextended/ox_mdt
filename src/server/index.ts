import { versionCheck, checkDependency, cache } from '@communityox/ox_lib/server';
import { OfficerManager } from './managers/officerManager';
import './callbacks';

versionCheck('communityox/ox_mdt');

const coreDepCheck: true | [false, string] = checkDependency('ox_core', '1.1.0');

if (coreDepCheck !== true) {
  setInterval(() => {
    console.error(coreDepCheck[1]);
  }, 1000);
}

on('onResourceStop', (resource: string) => {
  if (resource !== cache.resource) return;

  OfficerManager.getAll().forEach(({ unitId, playerId }) => {
    if (unitId) {
      Player(playerId).state.mdtUnitId = null;
    }
  });
});
