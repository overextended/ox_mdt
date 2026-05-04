import { cache, sleep } from '@communityox/ox_lib';
import { requestAnimDict, requestModel } from '@communityox/ox_lib/client';

export class AnimManager {
  private static tabletAnimDict = 'amb@world_human_seat_wall_tablet@female@base';
  private static tabletEntity: number | null = null;

  static isPlayingAnim() {
    return IsEntityPlayingAnim(cache.ped, this.tabletAnimDict, 'base', 3);
  }

  static clearAnim() {
    if (!this.isPlayingAnim()) return;

    ClearPedSecondaryTask(cache.ped);
  }

  static async playAnim() {
    if (this.isPlayingAnim()) return;

    await requestAnimDict(this.tabletAnimDict);
    TaskPlayAnim(cache.ped, this.tabletAnimDict, 'base', 6.0, 3.0, -1, 49, 1.0, false, false, false);
    RemoveAnimDict(this.tabletAnimDict);
  }

  static async createTablet() {
    const model = await requestModel('prop_cs_tablet');

    if (!model) return;

    const [x, y, z] = GetEntityCoords(cache.ped, true);
    this.tabletEntity = CreateObject(model, x, y, z, true, true, true);
    AttachEntityToEntity(
      this.tabletEntity,
      cache.ped,
      GetPedBoneIndex(cache.ped, 28422),
      0.0,
      0.0,
      0.03,
      0.0,
      0.0,
      0.0,
      true,
      true,
      false,
      true,
      0,
      true
    );
    SetModelAsNoLongerNeeded(model);
  }

  static async deleteTablet() {
    if (!this.tabletEntity) return;

    if (DoesEntityExist(this.tabletEntity)) {
      await sleep(300);

      DeleteEntity(this.tabletEntity);
    }

    this.tabletEntity = null;
  }
}
