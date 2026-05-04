import { addKeybind, cache } from '@communityox/ox_lib/client';
import { MdtUiState } from './nui';
import { PlayerManager } from './playerManager';
import './nui';

addKeybind({
  defaultKey: 'm',
  description: 'Open police MDT',
  name: 'openMDT',
  onPressed: MdtUiState.openMdt,
});

let callsAreFocused: false | CitizenTimer = false;
addKeybind({
  defaultKey: 'GRAVE',
  description: 'Toggle MDT call focus',
  name: 'focusCalls',
  onPressed: () => {
    if (callsAreFocused !== false) {
      clearInterval(callsAreFocused);
      callsAreFocused = false;
      SetNuiFocus(false, false);
      SetNuiFocusKeepInput(false);
      return;
    }

    if (IsNuiFocused() || IsPauseMenuActive()) return;

    SetNuiFocus(true, true);
    SetNuiFocusKeepInput(true);
    SetCursorLocation(0.5, 0.5);

    callsAreFocused = setInterval(() => {
      DisablePlayerFiring(cache.playerId, true);
      DisableControlAction(0, 1, true);
      DisableControlAction(0, 2, true);
      DisableControlAction(2, 199, true);
      DisableControlAction(2, 200, true);
    }, 1);
  },
});

RegisterNuiCallback('setWaypoint', (data: [number, number], cb: (_: number) => void) => {
  SetNewWaypoint(data[0], data[1]);
  cb(1);
});

const blips: Record<string, number> = {};

onNet('ox_mdt:createCall', (data: { id: number; call: any }) => {
  data.call.id = data.id;

  const [x, y, z] = data.call.coords;
  const [streetHash] = GetStreetNameAtCoord(x, y, z);
  data.call.location = GetStreetNameFromHashKey(streetHash);

  PlaySoundFrontend(-1, 'Near_Miss_Counter_Reset', 'GTAO_FM_Events_Soundset', false);

  SendNuiMessage(
    JSON.stringify({
      action: 'addCall',
      data: data.call,
    })
  );
});

onNet('ox_mdt:editCallUnits', (data: { id: number; call: any }) => {
  SendNuiMessage(
    JSON.stringify({
      action: 'editCallUnits',
      data: data,
    })
  );
});

onNet('ox_mdt:updateCallCoords', (data: { id: number; coords: [number, number, number] }) => {
  SendNuiMessage(
    JSON.stringify({
      action: 'updateCallCoords',
      data: data,
    })
  );
});

onNet('ox_mdt:setCallUnits', (data: { id: number; units: any }) => {
  SendNuiMessage(
    JSON.stringify({
      action: 'setCallUnits',
      data: data,
    })
  );
});

onNet('ox_mdt:refreshUnits', (data: any) => {
  SendNuiMessage(
    JSON.stringify({
      action: 'refreshUnits',
      data: data,
    })
  );
});

onNet('ox_mdt:updateOfficerPositions', (data: any[]) => {
  if (!MdtUiState.isUiLoaded()) return;

  data.forEach((officer) => {
    if (officer.stateId !== PlayerManager.getPlayer().stateid) {
      let blip = blips[officer.stateId];

      if (!blip) {
        const blipName = `police:${officer.stateId}`;
        blip = AddBlipForCoord(officer.position[0], officer.position[1], officer.position[2]);
        blips[officer.stateId] = blip;

        SetBlipSprite(blip, 1);
        SetBlipDisplay(blip, 3);
        SetBlipColour(blip, 42);
        ShowFriendIndicatorOnBlip(blip, true);

        AddTextEntry(blipName, `${officer.firstName} ${officer.lastName} (${officer.callSign})`);
        BeginTextCommandSetBlipName(blipName);
        EndTextCommandSetBlipName(blip);
        SetBlipCategory(blip, 7);
      } else {
        SetBlipCoords(blip, officer.position[0], officer.position[1], officer.position[2]);
      }
    }
  });

  SendNuiMessage(
    JSON.stringify({
      action: 'updateOfficerPositions',
      data: data,
    })
  );
});
