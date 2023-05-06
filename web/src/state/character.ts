import { atom, useAtomValue, useSetAtom } from 'jotai';

export interface Character {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  grade: number;
  image?: string;
  callSign: number;
}

const characterAtom = atom<Character>({
  id: '',
  firstName: '',
  lastName: '',
  title: '',
  grade: 0,
  callSign: 0,
});

export const useCharacter = () => useAtomValue(characterAtom);
export const useSetCharacter = () => useSetAtom(characterAtom);
