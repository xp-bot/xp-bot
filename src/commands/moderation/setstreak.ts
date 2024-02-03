import { GuildMemberService } from '../../api/generated';
import Command, { CommandOptionType } from '../../classes/command';
import XPError, { XPErrorType } from '../../classes/xp-error';
import defaultEmbed from '../../helpers/messaging/default-embed';
import systemEmoji from '../../interfaces/system-emojis';
import { ChatInputCommandInteraction } from 'discord.js';
import { t } from 'i18next';
import { toUpper, upperCase, upperFirst } from 'lodash';

const typeMap = {
  daily: 'game_daily',
  trivia: 'trivia',
};

const execute = async (interaction: ChatInputCommandInteraction) => {
  const user = interaction.options.getUser('user');
  const value = interaction.options.getInteger('value');
  const type = interaction.options.getString('type') as keyof typeof typeMap;

  if (!interaction.guildId)
    throw new XPError(XPErrorType.INTERACTION_GUILD_UNRESOLVABLE);

  if (!user || !value || !type)
    throw new XPError(XPErrorType.INTERACTION_OPTIONS_INVALID);

  const newGuildMember = await GuildMemberService.updateGuildMember({
    userId: user.id,
    guildId: interaction.guildId,
    requestBody: {
      streaks: {
        [typeMap[type]]: value,
      },
    },
  }).catch(() => {
    throw new XPError(XPErrorType.API_GUILD_MEMBER_UPDATE);
  });

  const embed = defaultEmbed();
  embed.setDescription(
    `${systemEmoji.checkmark} ${t('description', {
      value: `**${value}**`,
      user: `<@${user.id}>`,
      streak: `\`${upperFirst(type)}\``,
      ns: 'setstreak_command',
    })}`,
  );

  interaction.reply({ embeds: [embed] });
};

export default new Command(
  {
    name: 'setstreak',
    options: [
      {
        name: 'user',
        required: true,
        type: CommandOptionType.USER,
      },
      {
        name: 'value',
        required: true,
        type: CommandOptionType.INTEGER,
      },
      {
        name: 'type',
        required: true,
        type: CommandOptionType.STRING,
        choices: [
          {
            name: 'daily',
          },
          {
            name: 'trivia',
          },
        ],
      },
    ],
  },
  execute,
);
