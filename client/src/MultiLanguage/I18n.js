import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translateEn from '../assets/i18n/translations/en.json';
import translateFr from '../assets/i18n/translations/fr.json';
import translateZh from '../assets/i18n/translations/zh.json';

const resources = {
  en:{ translation:translateEn },
  fr:{ translation:translateFr },
  zh:{ translation:translateZh }
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    //default language
    lng: 'en',
    //when specified language translations not present
    fallbackLng: 'en',
    //then fallbacklang translations loaded.
    debug: true,
    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    },
    react: {
      useSuspense: false,
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage',
        'sessionStorage', 'navigator', 'htmlTag',
        'path', 'subdomain'],
      caches: ['cookie'],
    },
  });


export default i18n;
