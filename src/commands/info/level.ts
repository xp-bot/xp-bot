import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { noop } from 'lodash';
import api from '../../api';
import Command from '../../classes/command';
import defaultEmbed from '../../helpers/messaging/default-embed';
import formatNumber from '../../helpers/numbers/format-number';
import getRequiredXp from '../../helpers/numbers/get-required-xp';

const execute = async (interaction: ChatInputCommandInteraction) => {
  if (!interaction.guildId || !interaction.user.id) return;

  const level = interaction.options.getInteger('level');

  const guildMember = await api.guildMember.getGuildMember(
    interaction.guildId,
    interaction.user.id
  );
  if (!guildMember.success) return;

  // TODO: Error Handling
  if (!level) {
    return;
  }

  const neededXp = getRequiredXp(level);
  const membersCurrentXp = guildMember.content.xp;
  const remainingXp = neededXp - membersCurrentXp;
  const msg = defaultEmbed('normal').setTitle(`${formatNumber(neededXp)}xp`);
  if (remainingXp >= 0) {
    if (Math.floor((100 * membersCurrentXp) / neededXp) < 100)
      msg.setDescription(`\`\`\`js\n// You've reached ${Math.floor((100 * membersCurrentXp) / neededXp)}% of level\n${formatNumber(
        remainingXp
      )} xp\`\`\``);
  } else {
    msg.setDescription(`\`\`\`js\n${formatNumber(Math.abs(remainingXp))}xp\`\`\``);
  }

  interaction.reply({ embeds: [msg] }).catch(noop);
};

export default new Command(
  new SlashCommandBuilder()
    .setName('level')
    .setDescription('Check the required xp to reach a certain level.')
    .addIntegerOption((option) =>
      option
        .setName('level')
        .setDescription('The level to check the required xp for.')
        .setRequired(true)
    ),
  execute
);
