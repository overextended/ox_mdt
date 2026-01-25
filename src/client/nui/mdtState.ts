import { cache, getLocales, triggerServerCallback } from '@communityox/ox_lib/client';
import { DbCharge, Officer, ProfileCardData } from '@common/typings';
import { AnimManager } from '../animManager';
import { SendTypedNUIMessage } from '../utils';
import { PlayerManager } from '../playerManager';

export class MdtUiState {
  private static isLoaded = false;
  private static isOpen: boolean = false;

  static closeMDT(hideUi: boolean) {
    if (!MdtUiState.isOpen) return;

    MdtUiState.isOpen = false;

    if (hideUi) {
      SendTypedNUIMessage<boolean>('setVisible', false);
      SetNuiFocus(false, false);
    }

    AnimManager.clearAnim();
    AnimManager.deleteTablet();
  }

  static async openMdt() {
    const officerData = await triggerServerCallback<false | Partial<Officer>>('ox_mdt:openMDT', 500);

    if (!officerData) return;

    MdtUiState.isOpen = true;

    AnimManager.playAnim();
    AnimManager.createTablet();

    if (!MdtUiState.isLoaded) {
      const profileCards =
        ((await triggerServerCallback<ProfileCardData[]>('ox_mdt:getCustomProfileCards', null)) as ProfileCardData[]) ??
        [];
      const charges =
        ((await triggerServerCallback<Record<string, DbCharge[]>>('ox_mdt:getCustomProfileCards', null)) as Record<
          string,
          DbCharge[]
        >) ?? {};

      SendTypedNUIMessage<{
        profileCards: ProfileCardData[];
        locale: string;
        locales: {};
        charges: Record<string, DbCharge[]>;
      }>('setInitData', {
        profileCards,
        charges,
        locale: GetConvar('ox:locale', 'en'),
        locales: getLocales(),
      });

      MdtUiState.isLoaded = true;
    }

    SendTypedNUIMessage('setVisible', {
      ...PlayerManager.getOfficerData(),
      unit: LocalPlayer.state.mdtUnitId,
      group: PlayerManager.getGroupInfo(),
      permissions: PlayerManager.getPermissions(),
    });

    SetNuiFocus(true, true);
  }

  static setLoadedState(state: boolean) {
    MdtUiState.isLoaded = state;
  }
}

on('ox:playerLogout', () => {
  MdtUiState.closeMDT(true);
  MdtUiState.setLoadedState(false);
});

RegisterNuiCallback('hideMDT', (_: unknown, cb: ({}) => void) => {
  SetNuiFocus(false, false);
  MdtUiState.closeMDT(false);
})

on('onResourceStop', (resource: string) => {
  if (resource !== cache.resource) return;

  MdtUiState.closeMDT(true);
})

exports('openMDT', MdtUiState.openMdt);
