import Command from '../../classes/command';
import XPError, { XPErrorType } from '../../classes/xp-error';
import { ChatInputCommandInteraction } from 'discord.js';

const execute = async (interaction: ChatInputCommandInteraction) => {
  if (!interaction.guildId)
    throw new XPError(XPErrorType.INTERACTION_GUILD_UNRESOLVABLE);
  interaction.reply(`${process.env.DASHBOARD_URL}lb/${interaction.guildId}`);
};

export default new Command(
  {
    name: 'leaderboard',
    options: [],
  },
  execute,
);
