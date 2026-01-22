import { cache, getLocales, hideTextUI, requestAnimDict, sleep, waitFor } from '@communityox/ox_lib/client';
import { SendTypedNUIMessage, serverNuiCallback } from './utils';

let hasLoadedUi = false;
let isUiOpen = false;

function setupUi() {
  if (hasLoadedUi) return;

  SendNUIMessage({
    action: 'setInitData',
    data: {
      locales: getLocales(),
    },
  });

  hasLoadedUi = true;
}

RegisterNuiCallback('exit', async (_: any, cb: Function) => {
  cb(1);
  SetNuiFocus(false, false);

  isUiOpen = false;
});

serverNuiCallback('getDashboardData');
serverNuiCallback('transferOwnership');
serverNuiCallback('manageUser');
serverNuiCallback('removeUser');
serverNuiCallback('getAccountUsers');
serverNuiCallback('addUserToAccount');
serverNuiCallback('getAccounts');
serverNuiCallback('createAccount');
serverNuiCallback('deleteAccount');
serverNuiCallback('depositMoney');
serverNuiCallback('withdrawMoney');
serverNuiCallback('transferMoney');
serverNuiCallback('renameAccount');
serverNuiCallback('convertAccountToShared');
serverNuiCallback('getLogs');
serverNuiCallback('getInvoices');
serverNuiCallback('payInvoice');
