import { versionCheck, checkDependency } from '@communityox/ox_lib/server';
import './callbacks';

versionCheck('communityox/ox_mdt');

const coreDepCheck: true | [false, string] = checkDependency('ox_core', '1.1.0');

if (coreDepCheck !== true) {
  setInterval(() => {
    console.error(coreDepCheck[1]);
  }, 1000);
}
