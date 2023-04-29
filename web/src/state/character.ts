import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

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
  key: 'character',
  default: {
    id: 'XYZ123',
    firstName: 'Svetozar',
    lastName: 'Miletić',
    title: 'LSPD Officer',
    grade: 4,
    callSign: 192,
  },
});

export const useCharacter = () => useRecoilValue(characterAtom);
export const useSetCharacter = () => useSetRecoilState(characterAtom);
