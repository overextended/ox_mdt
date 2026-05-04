import { locale, FlattenObjectKeys } from '@communityox/ox_lib';

type Locales = FlattenObjectKeys<typeof import('~/locales/en.json')>;

export const Locale = <T extends Locales>(str: T, ...args: any[]) => locale(str, ...args);
