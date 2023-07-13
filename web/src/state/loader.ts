import { atom, useAtom, useSetAtom } from 'jotai';

const loaderAtom = atom(false);

export const useSetLoader = () => useSetAtom(loaderAtom);
export const useLoaderState = () => useAtom(loaderAtom);
