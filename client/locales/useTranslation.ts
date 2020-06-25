import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { useTranslation, initReactI18next } from 'react-i18next';
import en from './locale-en';
import es from './locale-es';

i18n
  .use(Backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: en // Use the English translation in the locale-end file
      },
      es: {
        translation: es // Use the English translation in the locale-end file
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// eslint-disable-next-line react-i18n/no-dynamic-translation-keys
export const translate = (key: string) => i18n.t(key);

export default useTranslation;
