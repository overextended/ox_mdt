import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Character } from '../typings';
import { isEnvBrowser } from '../utils/misc';

const DEBUG_CHARACTER: Character = {
  stateId: '1993201',
  firstName: 'Svetozar',
  lastName: 'Miletić',
  title: 'LSPD Officer',
  grade: 4,
  callSign: 103,
  isDispatch: true,
};

const characterAtom = atom<Character>(
  isEnvBrowser()
    ? DEBUG_CHARACTER
    : {
        stateId: '',
        firstName: '',
        lastName: '',
        title: '',
        grade: 0,
        callSign: 0,
        isDispatch: false,
      }
);

export const useCharacter = () => useAtomValue(characterAtom);
export const useSetCharacter = () => useSetAtom(characterAtom);
export const useCharacterState = () => useAtom(characterAtom);
