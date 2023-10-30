import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { t } from 'i18next';
import { noop } from 'lodash';
import api from '../../api';
import Command from '../../classes/command';
import defaultEmbed, {
  DefaultEmbedType,
} from '../../helpers/messaging/default-embed';
import formatNumber from '../../helpers/numbers/format-number';
import getRequiredXp from '../../helpers/numbers/get-required-xp';

const execute = async (interaction: ChatInputCommandInteraction) => {
  if (!interaction.guildId || !interaction.user.id) return;

  const level = interaction.options.getInteger('level');

  const guildMember = await api.guildMember.getGuildMember(
    interaction.guildId,
    interaction.user.id,
  );
  if (!guildMember.success) return;

  // TODO: Error Handling
  if (!level) {
    return;
  }

  const neededXp = getRequiredXp(level);
  const membersCurrentXp = guildMember.content.xp;
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
  new SlashCommandBuilder()
    .setName('level')
    .addIntegerOption((option) =>
      option
        .setName('level')
        .setDescription('The level to check the required xp for.')
        .setRequired(true),
    ),
  execute,
);
