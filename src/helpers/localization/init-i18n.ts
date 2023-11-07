import i18n from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

const i18nextConfig = {
  fallbackLng: 'en',
  fallbackNS: 'global',
  ns: [
    'global',
    'level_command',
    'test_command',
    'rank_command',
    'incognito_command',
    'addxp_command',
  ],
  debug: !!process.env.DEBUG_GUILD_ID,
};

export default i18n
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../../locales/${language}/${namespace}.json`),
    ),
  )
  .init(i18nextConfig);
