import { Officer, Unit, Units, UnitType } from '@common/typings';
import { OfficerManager } from './officerManager';

export class UnitManager {
  private static units: Units = {};

  public static createUnit(unitId: string, unitName: string, unitType: UnitType) {
    const unitData: Unit = {
      id: unitId,
      name: unitName,
      members: [],
      type: unitType,
    };

    this.units[unitId] = unitData;

    return unitData;
  }

  public static updateUnitType(unitId: string, unitType: UnitType): boolean {
    const unit = this.units[unitId];

    if (!unit) return false;

    unit.type = unitType;

    OfficerManager.triggerEvent('ox_mdt:refreshUnits', this.units);

    return true;
  }

  public static removePlayerFromUnit(officer: Officer, state: StateBagInterface): boolean {
    const unitId = state.mdtUnitId as number;

    if (!unitId) return;

    const unit = this.units[unitId];

    // Unit gets deleted when the owner leaves it
    if (unit.id === officer.callSign) {
      unit.members.forEach(member => {
        delete member.unitId;
        Player(member.playerId).state.mdtUnitId = null;
      });

      delete this.units[unitId];

      OfficerManager.triggerEvent('ox_mdt:refreshUnits', this.units);
      return true;
    }

    const member = unit.members.findIndex((member) => member.stateId === officer.stateId);

    if (member === -1) return false;

    state.mdtUnitId = null;

    unit.members = unit.members.filter(member => member.stateId !== officer.stateId);

    if (unit.members.length === 0) {
      delete this.units[unitId];

      // ToDo: detach unit from all calls
    }

    OfficerManager.triggerEvent('ox_mdt:refreshUnits', this.units);

    return true;
  }

  public static addPlayerToUnit(playerId: number, unitId: string): boolean {
    const officer = OfficerManager.get(playerId);
    const unit = this.units[unitId];
    const state = Player(playerId).state;

    if (!officer || !unit) return false;

    if (state.mdtUnitId) this.removePlayerFromUnit(officer, state);

    unit.members.push(officer);
    officer.unitId = unitId;
    state.mdtUnitId = unitId;

    OfficerManager.triggerEvent('ox_mdt:refreshUnits', this.units);

    return true;
  }
}
