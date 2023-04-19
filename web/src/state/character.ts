import { useAtomValue, useSetAtom } from 'jotai';
import { atom } from 'jotai';

interface Character {
  firstName: string;
  lastName: string;
  title: string;
  grade: number;
  image?: string;
}

const characterAtom = atom<Character>({
  firstName: 'Billy',
  lastName: 'bob',
  title: 'LSPD Officer',
  grade: 3,
});

export const useCharacter = () => useAtomValue(characterAtom);
export const useSetCharacter = () => useSetAtom(characterAtom);
