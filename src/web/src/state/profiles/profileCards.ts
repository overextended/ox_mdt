import { atom, useAtomValue, useSetAtom } from 'jotai';
import { CustomProfileData } from '../../typings';

const profileCardsAtom = atom<CustomProfileData[]>([]);

export const useProfileCards = () => useAtomValue(profileCardsAtom);
export const useSetProfileCards = () => useSetAtom(profileCardsAtom);
