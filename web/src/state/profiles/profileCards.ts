import { atom, useAtomValue, useSetAtom } from 'jotai';
import { CustomProfileData } from '../../typings';

const profileCardsAtom = atom<{ [key: string]: CustomProfileData }>({});

export const useProfileCards = () => useAtomValue(profileCardsAtom);
export const useSetProfileCards = () => useSetAtom(profileCardsAtom);
