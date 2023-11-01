import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import Command from '../../classes/command';
import XPError, { XPErrorType } from '../../classes/xp-error';

const execute = async (interaction: ChatInputCommandInteraction) => {
  if (true) throw new XPError(XPErrorType.INTERACTION_GUILD_UNRESOLVABLE);
  interaction.reply({ ephemeral: true, content: 'test' });

  // Provocating an error after the interaction has already been answered.
  interaction.isCommand() && (await interaction.client.guilds.fetch('123'));
};

export default new Command(
  new SlashCommandBuilder().setName('test').setDescription('Test command'),
  execute,
);
