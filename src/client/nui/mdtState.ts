import { getLocales, triggerServerCallback } from '@communityox/ox_lib/client';
import { AnimManager } from '../animManager';
import { SendTypedNUIMessage } from '../utils';
import { DbCharge, Officer, ProfileCardData } from '@common/typings';

import {} from '@communityox/ox_lib/client';
import { PlayerManager } from '../playerManager';

export class MdtUiState {
  private static isLoaded = false;
  private static isOpen = false;

  static closeMDT(hideUi: boolean) {
    if (!this.isOpen) return;

    this.isOpen = false;

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

    this.isOpen = true;

    AnimManager.playAnim();
    AnimManager.createTablet();

    if (!this.isLoaded) {
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

      this.isLoaded = true;
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
    this.isLoaded = state;
  }
}

on('ox:playerLogout', () => {
  MdtUiState.closeMDT(true);
  MdtUiState.setLoadedState(false);
});
