import i18n from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

const i18nextConfig = {
  fallbackLng: 'en',
  fallbackNS: 'global',
<<<<<<< HEAD
  ns: ['global', 'level_command', 'test_command'],
=======
  ns: ['global', 'level_command', 'test_command', 'rank_command'],
>>>>>>> 694fdef77b37237d452c560a0983a4a20a526f14
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
