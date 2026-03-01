import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'fr',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      fr: {
        translation: {
          nav: { home: "Accueil", about: "À propos", interventions: "Interventions", realisations: "Réalisations", contact: "Contact" }
        }
      },
      mg: {
        translation: {
          nav: { home: "Fandraisana", about: "Momba anay", interventions: "Hetsika", realisations: "Zavatra vita", contact: "Mifandraisa" }
        }
      },
      en: {
        translation: {
          nav: { home: "Home", about: "About", interventions: "Interventions", realisations: "Achievements", contact: "Contact" }
        }
      },
      es: {
        translation: {
          nav: { home: "Inicio", about: "Sobre nosotros", interventions: "Intervenciones", realisations: "Logros", contact: "Contacto" }
        }
      }
    }
  });

export default i18n;