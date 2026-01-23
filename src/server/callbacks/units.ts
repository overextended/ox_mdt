import { isUnitTypeValid, UnitType } from '@common/typings';
import { registerAuthorisedCallback } from '../utils/callback';
import { OfficerManager } from '../officerManager';
import { UnitManager } from '../unitManager';

registerAuthorisedCallback(
  'ox_mdt:createUnit',
  (source, unitType: UnitType) => {
    const officer = OfficerManager.get(source);

    if (!officer || !officer.callSign) return;

    const unitId = officer.callSign;
    const unitName = `Unit ${unitId}`;

    UnitManager.createUnit(unitId, unitName, unitType);
    const result = UnitManager.addPlayerToUnit(source, unitId);

    return result ? { id: unitId, name: unitName } : false;
  },
  'create_unit'
);

registerAuthorisedCallback('ox_mdt:joinUnit', (source, unitId) => {
  return UnitManager.addPlayerToUnit(source, unitId);
});

registerAuthorisedCallback('ox_mdt:leaveUnit', (source) => {
  const officer = OfficerManager.get(source);

  if (!officer) return false;

  const state = Player(source).state;

  return UnitManager.removePlayerFromUnit(officer, state);
});

registerAuthorisedCallback('ox_mdt:getUnits', () => {
  return UnitManager.getUnits();
});

registerAuthorisedCallback('ox_mdt:setUnitOfficers', (source, data: { id: string; officers: string[] }) => {
  const officer = OfficerManager.get(source);

  if (!officer || officer.group !== 'dispatch') return false;

  return UnitManager.addPlayerToUnit(data.officers.map(parseInt), data.id);
});

registerAuthorisedCallback('ox_mdt:setUnitType', (source, data: { id: string; value: UnitType }) => {
  const officer = OfficerManager.get(source);

  if (!officer || officer.group !== 'dispatch' || officer.callSign !== data.id) return false;
  if (!isUnitTypeValid(data.value)) return false;

  return UnitManager.updateUnitType(data.id, data.value);
});
