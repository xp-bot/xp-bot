import { GuildMemberService } from '../../api/generated';
import Command, { CommandOptionType } from '../../classes/command';
import XPError, { XPErrorType } from '../../classes/xp-error';
import defaultEmbed, {
  DefaultEmbedType,
} from '../../helpers/messaging/default-embed';
import systemEmoji from '../../interfaces/system-emojis';

import { ChatInputCommandInteraction } from 'discord.js';
import { t } from 'i18next';

const execute = async (interaction: ChatInputCommandInteraction) => {
  const guildMemberService_ = GuildMemberService;
  const guildId = interaction.guildId;
  const userId = interaction.user.id;

  if (!guildId) throw new XPError(XPErrorType.INTERACTION_GUILD_UNRESOLVABLE);

  if (!userId) throw new XPError(XPErrorType.INTERACTION_USER_UNRESOLVABLE);

  const embed = defaultEmbed(DefaultEmbedType.SUCCESS);
  const newState = interaction.options.getBoolean('incognito', true);

  await guildMemberService_
    .updateGuildMember({
      guildId,
      userId,
      requestBody: {
        settings: {
          incognito: newState,
        },
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
  {
    name: 'incognito',
    options: [
      {
        name: 'incognito',
        type: CommandOptionType.BOOLEAN,
        required: true,
      },
    ],
  },
  execute,
);
