import { CallManager } from '../managers/callManager';
import { OfficerManager } from '../managers/officerManager';
import { registerAuthorisedCallback } from '../utils/callback';

registerAuthorisedCallback('ox_mdt:getCalls', (source, type: 'active' | 'completed') => {
  return CallManager.getCalls(type);
});

registerAuthorisedCallback('ox_mdt:attachToCall', (source, callId: number) => {
  const unitId = Player(source).state.mdtUnitId;

  if (!unitId) return false;

  return CallManager.addUnitToCall(callId, unitId);
});

registerAuthorisedCallback('ox_mdt:detachFromCall', (source, callId: number) => {
  const unitId = Player(source).state.mdtUnitId;

  if (!unitId) return false;

  return CallManager.removeUnitFromCall(callId, unitId);
});

registerAuthorisedCallback(
  'ox_mdt:completeCall',
  (source, callId: number) => {
    return CallManager.markCallComplete(callId);
  },
  'mark_call_completed'
);

type SetCallUnitsData = {
  id: number; // callId
  units: string[];
};
registerAuthorisedCallback('ox_mdt:setCallUnits', (source, data: SetCallUnitsData) => {
  const officer = OfficerManager.get(source);

  if (!officer || officer.group !== 'dispatch') return false;

  return CallManager.setUnitsOnCall(data.id, data.units);
});
