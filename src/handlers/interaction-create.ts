import console from 'console';
import { Client } from 'discord.js';

export default (client: Client) => {
  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    // TODO: Better exception handling
    client.commands.get(interaction.commandName)?.execute?.(interaction);
  });
};
