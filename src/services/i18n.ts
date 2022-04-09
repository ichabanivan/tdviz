import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '~constants/en.json';
import ua from '~constants/ua.json';
import config from '~constants/config';

export interface ITranslation {
  t: (value: string, options?: any) => string
}

export enum LANGUAGES {
  EN = 'en',
  UA = 'ua',
}

export const resources = {
  en: LANGUAGES.EN,
  ua: LANGUAGES.UA,
};

const customFormatter = (value: any, format: any, ignoredLanguage: any) => {
  const [ignoredAll, type = '', src = ''] = (format || '').match(/([^=]*)=(.*)/) || [];

  switch (type) {
    default: return value;
    case 'plural': return value === 1 ? '' : src;
    case 'single': return value !== 1 ? '' : src;
  }
};

// eslint-disable-next-line import/no-named-as-default-member
i18n
  // NOTE pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // NOTE init i18next
  // NOTE for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    lng: LANGUAGES.EN,
    fallbackLng: LANGUAGES.EN,
    debug: config.DEBUG,
    interpolation: {
      escapeValue: false, // NOTE not needed for react as it escapes by default
      formatSeparator: ':', // NOTE not needed for react as it escapes by default
      format: customFormatter, // NOTE not needed for react as it escapes by default
    },
    resources: {
      en,
      ua,
    }
  });

export default i18n;
