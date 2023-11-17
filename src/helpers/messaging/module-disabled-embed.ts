import defaultEmbed, { DefaultEmbedType } from './default-embed';
import { t } from 'i18next';

export default (module: string) => {
  const embed = defaultEmbed(DefaultEmbedType.ERROR);
  embed
    .setTitle(t('error.module_disabled.title', { lng: 'en' }))
    .setDescription(
      t('error.module_disabled.description', {
        lng: 'en',
        module: `**${module}**`,
      }),
    );

  return embed;
};
