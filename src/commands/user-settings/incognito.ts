import api from '../../api';
import Command from '../../classes/command';
import XPError, { XPErrorType } from '../../classes/xp-error';
import defaultEmbed, {
  DefaultEmbedType,
} from '../../helpers/messaging/default-embed';
import systemEmoji from '../../interfaces/system-emojis';

import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { t } from 'i18next';

const execute = async (interaction: ChatInputCommandInteraction) => {
  const guildId = interaction.guildId;
  const userId = interaction.user.id;

  if (!guildId) throw new XPError(XPErrorType.INTERACTION_GUILD_UNRESOLVABLE);

  if (!userId) throw new XPError(XPErrorType.INTERACTION_USER_UNRESOLVABLE);

  const embed = defaultEmbed(DefaultEmbedType.SUCCESS);
  const newState = interaction.options.getBoolean('incognito', true);

  await api.guildMember
    .updateGuildMember(guildId, userId, {
      settings: {
        incognito: newState,
      },
    })
    .catch((e) => {
      throw new XPError(XPErrorType.API_GUILD_MEMBER_UPDATE, e);
    });

  embed.setDescription(
    `${systemEmoji.checkmark} ${t(
      newState ? 'description.enabled.title' : 'description.disabled.title',
      {
        ns: 'incognito_command',
      },
    )}\n\n> ${t(
      newState ? 'description.enabled.info' : 'description.disabled.info',
      {
        ns: 'incognito_command',
      },
    )}`,
  );
  interaction.reply({ embeds: [embed], ephemeral: true });
};

export default new Command(
  new SlashCommandBuilder().setName('incognito').addBooleanOption((o) =>
    o
      .setName('incognito')
      .setDescription(
        t('command_info.option.incognito.description', {
          ns: 'incognito_command',
        }),
      )
      .setNameLocalizations({
        de: t(['command_info.option.incognito.name', 'bla'], {
          ns: 'incognito_command',
          lng: 'de',
        }),
        'en-US': t('command_info.option.incognito.name', {
          ns: 'incognito_command',
        }),
      })
      .setDescriptionLocalizations({
        de: t('command_info.option.incognito.description', {
          ns: 'incognito_command',
          lng: 'de',
        }),
        'en-US': t('command_info.option.incognito.description', {
          ns: 'incognito_command',
        }),
      })
      .setRequired(true),
  ),

  execute,
);
