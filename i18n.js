module.exports = {
  defaultLocale: 'en-US',
  locales: ['en-US', 'de', 'fr'],
  pages: {
    '*': ['common'], // We use one common file for all translations
  },
  loadLocaleFrom: (lang, ns) => import(`./src/locales/${lang}.${ns}.json`).then((m) => m.default),
};
