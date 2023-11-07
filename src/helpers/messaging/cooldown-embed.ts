import defaultEmbed, { DefaultEmbedType } from './default-embed';
import breakDurationDown from '../numbers/break-duration-down';
import { t } from 'i18next';
import { filter, join, map, size, toPairs, trimEnd } from 'lodash';

export default (msRemaining: number) => {
  const breakdown = breakDurationDown(msRemaining);
  const timePairs = map(
    filter(toPairs(breakdown), ([, value]) => value > 0),
    ([key, value]) =>
      `**${t(trimEnd(key, 's'), { lng: 'en', count: value })}**`,
  );

  const embed = defaultEmbed(DefaultEmbedType.ERROR);
  embed.setTitle(t('error.cooldown_hit.title', { lng: 'en' })).setDescription(
    t('error.cooldown_hit.description', {
      lng: 'en',
      time:
        size(timePairs) > 0
          ? join(timePairs, ', ')
          : t('a_few_seconds', { lng: 'en' }),
    }),
  );

  return embed;
};
