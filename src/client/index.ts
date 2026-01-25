import { addKeybind, cache } from '@communityox/ox_lib/client';
import { MdtUiState } from './nui';
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
