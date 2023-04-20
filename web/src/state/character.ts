import { useAtomValue, useSetAtom } from 'jotai';
import { atom } from 'jotai';

interface Character {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  grade: number;
  image?: string;
  callSign: number;
}

const characterAtom = atom<Character>({
  id: 'XYZ123',
  firstName: 'Svetozar',
  lastName: 'Miletić',
  title: 'LSPD Officer',
  grade: 3,
  callSign: 192,
});

export const useCharacter = () => useAtomValue(characterAtom);
export const useSetCharacter = () => useSetAtom(characterAtom);
