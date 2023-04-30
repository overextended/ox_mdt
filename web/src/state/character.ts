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
    id: '',
    firstName: '',
    lastName: '',
    title: '',
    grade: 0,
    callSign: 0,
  },
});

export const useCharacter = () => useRecoilValue(characterAtom);
export const useSetCharacter = () => useSetRecoilState(characterAtom);
