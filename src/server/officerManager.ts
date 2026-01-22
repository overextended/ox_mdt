import { oxmysql } from '@communityox/oxmysql';
import { Officer } from '@common/typings';

export class OfficerManager {
  private static activeUpdating = false;
  private static activeOfficers: Map<number, Officer> = new Map();
  private static refreshInterval: number = Math.max(500, GetConvarInt('mdt:positionRefreshInterval', 5000));

  static startPositionUpdater() {
    if (this.activeUpdating) return;
    setInterval(() => {
      if (this.activeOfficers.size === 0) return;

      const officersArray: Officer[] = [];

      this.activeOfficers.forEach((officer, playerId) => {
        const ped = GetPlayerPed(playerId.toString());
        if (ped !== 0) {
          const coords = GetEntityCoords(ped);
          officer.position = [coords[0], coords[1]];
          officer.ped = ped;
        }
        officersArray.push(officer);
      });

      this.triggerEvent('ox_mdt:updateOfficerPositions', officersArray);
    }, this.refreshInterval);
  }

  public static async add(
    playerId: number,
    firstName: string,
    lastName: string,
    stateId: string,
    group: string,
    grade: number
  ) {
    const callSign = await oxmysql.prepare<string>(
      'SELECT `callSign` FROM `ox_mdt_profiles` WHERE stateId = ?',
      [stateId]
    );

    const officer: Officer = {
      firstName,
      lastName,
      stateId,
      callSign,
      playerId,
      ped: GetPlayerPed(playerId.toString()),
      position: [0, 0],
      group,
      grade
    };

    this.activeOfficers.set(playerId, officer);
  }

  public static remove(playerId: number) {
    this.activeOfficers.delete(playerId);
  }

  public static get(playerId: number): Officer | undefined {
    return this.activeOfficers.get(playerId);
  }

  public static getAll(): Map<number, Officer> {
    return this.activeOfficers;
  }

  public static triggerEvent(eventName: string, eventData: any) {
    for (const playerId of this.activeOfficers.keys()) {
      TriggerClientEvent(eventName, playerId, eventData);
    }
  }
}

OfficerManager.startPositionUpdater();
