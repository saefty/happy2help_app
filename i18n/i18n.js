import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import de from './de';
import en from './en';

i18n.use(reactI18nextModule).init({
    fallbackLng: 'en',
    react: {
        wait: true
    },

    resources: {
        en,
        de
    },
    debug: true,

    interpolation: {
        escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    },
});

export default i18n;
