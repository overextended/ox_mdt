import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

interface Config {
  permissions: {
    announcements: {
      create: number;
      delete: number;
    };
  };
}

const configAtom = atom<Config>({
  key: 'config',
  default: {
    permissions: {
      announcements: {
        create: 3,
        delete: 4,
      },
    },
  },
});

export const useConfig = () => useRecoilValue(configAtom);
export const useSetConfig = () => useSetRecoilState(configAtom);
