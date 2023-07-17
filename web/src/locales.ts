import { isEnvBrowser } from './utils/misc';
import locale from '../../locales/en.json';

const locales: Record<string, string | number> = {};

export function setLocale(data: typeof locale) {
  for (const key in locales) delete locales[key];
  for (const [key, value] of Object.entries(data)) {
    locales[key] = value;
  }
}

if (isEnvBrowser()) {
  setLocale(locale);
}

export default locales as typeof locale;
