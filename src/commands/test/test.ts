import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import Command from '../../classes/command';

const execute = async (interaction: ChatInputCommandInteraction) => {
  interaction.reply({ ephemeral: true, content: 'test' });

  // Provocating an error after the interaction has already been answered.
  interaction.isCommand() && (await interaction.client.guilds.fetch('123'));
};

export default new Command(
  new SlashCommandBuilder().setName('test').setDescription('Test command'),
  execute,
);
