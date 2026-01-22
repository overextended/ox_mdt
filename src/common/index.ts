import { cache } from '@communityox/ox_lib';

export * from './locales';

export function LoadFile(path: string) {
  return LoadResourceFile(cache.resource, path);
}

export function LoadJsonFile<T = unknown>(path: string): T {
  return JSON.parse(LoadFile(path)) as T;
}

export const Config = LoadJsonFile<typeof import('~/data/config.json')>('data/config.json');
