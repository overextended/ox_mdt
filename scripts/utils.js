//@ts-check

import { stat, readdir, readFile } from 'fs/promises';
import { spawn } from 'child_process';

/**
 * Check if a filepath is valid.
 * @param path {string}
 */
export async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch (err) {}

  return false;
}

/**
 * Spawn a child process and executes the command asynchronously.
 * @param command {string}
 */
export function exec(command) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, { stdio: 'inherit', shell: true });

    child.on('exit', (code, signal) => {
      if (code === 0) {
        resolve({ code, signal });
      } else {
        reject(new Error(`Command '${command}' exited with code ${code} and signal ${signal}`));
      }
    });
  });
}

/**
 * Recursively read the files in a directory and return the paths.
 * @param args {string[]}
 * @return {Promise<string[]>}
 */
export async function getFiles(...args) {
  const files = await Promise.all(
    args.map(async (dir) => {
      try {
        const dirents = await readdir(`${dir}/`, { withFileTypes: true });
        const paths = await Promise.all(
          dirents.map(async (dirent) => {
            const path = `${dir}/${dirent.name}`;
            return dirent.isDirectory() ? await getFiles(path) : path;
          })
        );

        return paths.flat();
      } catch (err) {
        return [];
      }
    })
  );

  return files.flat();
}

export async function getPackage() {
  return JSON.parse(await readFile('package.json', 'utf8'));
}
