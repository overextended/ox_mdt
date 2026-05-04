//@ts-check

import { exists, exec, getFiles } from './utils.js';
import { createBuilder, createFxmanifest } from '@communityox/fx-utils';

const watch = process.argv.includes('--watch');
const web = await exists('./src/web');

createBuilder(
  watch,
  {
    dropLabels: !watch ? ['DEV'] : undefined,
  },
  [
    {
      name: 'server',
      options: {
        platform: 'node',
        target: ['node16'],
        format: 'cjs',
      },
    },
    {
      name: 'client',
      options: {
        platform: 'browser',
        target: ['es2021'],
        format: 'iife',
      },
    },
  ],
  async (outfiles) => {
    if (web) await exec(`cd ./src/web && vite build ${watch ? '--watch' : ''}`);

    const files = await getFiles('dist/web', 'data');

    await createFxmanifest({
      client_scripts: ['@ox_lib/init.lua', outfiles.client],
      server_scripts: ['@oxmysql/lib/MySQL.lua', outfiles.server],
      files: [...files, 'locales/*.json'],
      dependencies: ['/server:7290', '/onesync', 'ox_core', 'ox_lib', 'oxmysql'],
      metadata: {
        ui_page: 'dist/web/index.html',
        lua54: 'yes',
      },
    });
  }
);
