import i18n, { InitOptions } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

const i18nextConfig = {
  fallbackLng: 'en',
  fallbackNS: 'global',
  supportedLngs: ['en', 'de'],
  interpolation: {
    escapeValue: false,
  },
  ns: [
    'global',
    'level_command',
    'test_command',
    'rank_command',
    'incognito_command',
    'addxp_command',
    'removexp_command',
    'setxp_command',
    'leaderboard_command',
    'fish_command',
    'roll_command',
    'loot_command',
    'party_command',
    'about_command',
    'voicetime_command',
  ],
  // debug: !!process.env.DEBUG_GUILD_ID,
};

export default i18n
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../../locales/${language}/${namespace}.json`),
    ),
  )
  .init(i18nextConfig);
