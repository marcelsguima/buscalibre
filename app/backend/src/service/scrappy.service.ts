import axios from 'axios';
import { AxiosError } from 'axios';
import { existsSync, mkdirSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import {JSDOM} from 'jsdom'

export function fetchPage(url: string): Promise<string | undefined> {
  const HTMLData = axios
    .get(url)
    .then(res => res.data)
    .catch((error: AxiosError) => {
      console.error(`Error: ${error.config?.url ?? 'unknown'}.`);
      console.error(error.toJSON());
    });

  return HTMLData;
}

export async function fetchFromWebOrCache(url: string, ignoreCache = false) {

  const cacheDir = resolve(__dirname, '.cache');

  if (!existsSync(cacheDir)) {
    mkdirSync(cacheDir);
  }
    console.log(`Fetching ${url}...`);
    if (
      !ignoreCache &&
      existsSync(
        resolve(__dirname, `.cache/${Buffer.from(url).toString('base64')}.html`),
      )
    ) {
      console.log(`${url} from cache`);
      const HTMLData = await readFile(
        resolve(__dirname, `.cache/${Buffer.from(url).toString('base64')}.html`),
        { encoding: 'utf8' },
      );

    const dom = new JSDOM(HTMLData);
    return dom.window.document;
    } else {
      console.log(`fetched new ${url} `);
      const HTMLData = await fetchPage(url);
      if (!ignoreCache && HTMLData) {
        writeFile(
          resolve(
            __dirname,
            `.cache/${Buffer.from(url).toString('base64')}.html`,
          ),
          HTMLData,
          { encoding: 'utf8' },
        );
      }
     const dom = new JSDOM(HTMLData);
     return dom.window.document;
    } 
  }