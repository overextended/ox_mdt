import { Call, CallData, Calls } from '@common/typings';
import { OfficerManager } from './officerManager';
import { UnitManager } from './unitManager';

// ToDo:
// add interval to clear completed calls on an hourly basis

export class CallManager {
  private static callId: number = 0;
  private static activeCalls: Calls = [];
  private static completedCalls: Calls = [];

  public static createCall(data: CallData) {
    const call: Call = {
      id: this.callId,
      code: data.code,
      offense: data.offense,
      completed: false,
      units: {},
      coords: data.coords,
      blip: data.blip,
      // ToDo ? - is it implemented
      // isEmergency: data.isEmergency,
      time: Date.now(),
      location: '',
      info: data.info,
    };

    this.activeCalls[this.callId] = call;

    OfficerManager.triggerEvent('ox_mdt:createCall', {
      id: this.callId,
      call,
    });

    this.callId++;

    return call.id;
  }

  public static updateCallCoords(callId: number, coords: [number, number]) {
    const call = this.activeCalls[callId];
    if (!call) return;

    call.coords = coords;

    OfficerManager.triggerEvent('ox_mdt:updateCallCoords', {
      id: callId,
      coords,
    });
  }

  public static markCallComplete(callId: number) {
    const call = this.activeCalls[callId];

    if (!call) return false;

    call.completed = Date.now();
    this.completedCalls[callId] = call;
    delete this.activeCalls[callId];

    return true;
  }

  public static setUnitsOnCall(callId: number, units: string[]) {
    const call = this.activeCalls[callId];

    if (!call) return;

    units.forEach((unitId) => {
      const unit = UnitManager.getUnit(unitId);
      if (unit) call.units[unitId] = unit;
    });

    OfficerManager.triggerEvent('ox_mdt:setCallUnits', {
      id: callId,
      units: call.units,
    });

    return true;
  }

  public static addUnitToCall(callId: number, unitId: string) {
    const call = this.activeCalls[callId];

    if (!call || call.units[unitId]) return false;

    const unit = UnitManager.getUnit(unitId);
    if (unit) call.units[unitId] = unit;

    OfficerManager.triggerEvent('ox_mdt:editCallUnits', {
      id: callId,
      units: call.units,
    });

    return true;
  }

  public static removeUnitFromCall(callId: number, unitId: string) {
    const call = this.activeCalls[callId];

    if (!call || !call.units[unitId]) return false;

    delete call.units[unitId];

    OfficerManager.triggerEvent('ox_mdt:editCallUnits', {
      id: callId,
      units: call.units,
    });

    return true;
  }

  public static getCalls(type: 'active' | 'completed') {
    return type === 'completed' ? this.completedCalls : this.activeCalls;
  }
}

exports('createCall', (data: CallData) => CallManager.createCall(data));
exports('updateCallCoords', (id: number, coords: [number, number]) => CallManager.updateCallCoords(id, coords));
