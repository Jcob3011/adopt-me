import i18n from "i18next";
import {initReactI18next} from 'react-i18next'
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from './en/translation.json'
import translationPL from './pl/translation.json'

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        detection: {
            order: ['navigator']
        },
        resources: {
            en: {
                translation: translationEN
            },
            pl: {
                translation: translationPL
            }
        },
        lng: localStorage.getItem("i18nextLng") || 'en',
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false
        }
    })

export default  i18n