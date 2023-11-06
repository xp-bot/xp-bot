import { GuildMemberService } from '../../api/generated';
import Command from '../../classes/command';
import XPError, { XPErrorType } from '../../classes/xp-error';
import defaultEmbed, {
  DefaultEmbedType,
} from '../../helpers/messaging/default-embed';
import formatNumber from '../../helpers/numbers/format-number';
import getRequiredXp from '../../helpers/numbers/get-required-xp';
import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { t } from 'i18next';
import { noop } from 'lodash';

const execute = async (interaction: ChatInputCommandInteraction) => {
  const guildMemberService_ = GuildMemberService;

  if (!interaction.guildId || !interaction.user.id) return;

  const level = interaction.options.getInteger('level');

  const guildMember = await guildMemberService_
    .getGuildMember({
      guildId: interaction.guildId,
      userId: interaction.user.id,
    })
    .catch((e) => {
      throw new XPError(XPErrorType.API_GUILD_MEMBER_FETCH, e);
    });

  if (!level) {
    throw new XPError(XPErrorType.INTERACTION_OPTIONS_INVALID);
  }

  const neededXp = getRequiredXp(level);
  const membersCurrentXp = guildMember.xp;
  const remainingXp = neededXp - membersCurrentXp;
  const msg = defaultEmbed(DefaultEmbedType.NORMAL).setTitle(
    `${t('level_n', { level })} = ${formatNumber(neededXp)}xp`,
  );
  const reachedPercent = Math.floor((100 * membersCurrentXp) / neededXp);
  if (remainingXp >= 0) {
    if (reachedPercent < 100)
      msg.setDescription(
        `> ${t('description.n_away_from_level', {
          lng: 'en',
          ns: 'level_command',
          percent: formatNumber(reachedPercent),
          xp: formatNumber(remainingXp),
          level: formatNumber(level),
        })}`,
      );
  }

  msg.setFooter({
    text: t('description.reached_n_of_level', {
      lng: 'en',
      ns: 'level_command',
      percent: formatNumber(reachedPercent),
      level: level,
    }),
  });

  interaction.reply({ embeds: [msg] }).catch(noop);
};

export default new Command(
  new SlashCommandBuilder().setName('level').addIntegerOption((option) =>
    option
      .setName('level')
      .setDescription('The level to check the required xp for.')
      .setNameLocalizations({
        de: t('command_info.option.level.name', {
          ns: 'level_command',
          lng: 'de',
        }),
        'en-US': t('command_info.option.level.name', {
          ns: 'level_command',
          lng: 'en',
        }),
      })
      .setDescriptionLocalizations({
        de: t('command_info.option.level.description', {
          ns: 'level_command',
          lng: 'de',
        }),
        'en-US': t('command_info.option.level.description', {
          ns: 'level_command',
          lng: 'en',
        }),
      })
      .setRequired(true),
  ),
  execute,
);
