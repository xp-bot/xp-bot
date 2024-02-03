import Command from '../../classes/command';
import { Client, Events } from 'discord.js';

export default (client: Client) => {
  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isCommand()) return;

    (
      client.commands.get(interaction.commandName) as Command | undefined
    )?.exec?.(interaction);
  });
};
