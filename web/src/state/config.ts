import { atom, useAtomValue, useSetAtom } from 'jotai';

interface Config {
  permissions: {
    announcements: {
      create: number;
      delete: number;
    };
  };
}

const configAtom = atom<Config>({
  permissions: {
    announcements: {
      create: 3,
      delete: 4,
    },
  },
});

export const useConfig = () => useAtomValue(configAtom);
export const useSetConfig = () => useSetAtom(configAtom);
