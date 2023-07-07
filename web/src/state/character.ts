import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Character } from '../typings';

const characterAtom = atom<Character>({
  stateId: 199351,
  firstName: '',
  lastName: '',
  title: '',
  grade: 0,
  callSign: 0,
});

export const useCharacter = () => useAtomValue(characterAtom);
export const useSetCharacter = () => useSetAtom(characterAtom);
export const useCharacterState = () => useAtom(characterAtom);
