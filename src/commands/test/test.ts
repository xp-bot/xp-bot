import Command from '../../classes/command';
import XPError, { XPErrorType } from '../../classes/xp-error';
import { ChatInputCommandInteraction } from 'discord.js';

const execute = async (interaction: ChatInputCommandInteraction) => {
  // eslint-disable-next-line no-constant-condition
  if (true) throw new XPError(XPErrorType.INTERACTION_GUILD_UNRESOLVABLE);
  interaction.reply({ ephemeral: true, content: 'test' });

  // Provocating an error after the interaction has already been answered.
  interaction.isCommand() && (await interaction.client.guilds.fetch('123'));
};

export default new Command(
  {
    name: 'test',
    options: [],
  },
  execute,
);
