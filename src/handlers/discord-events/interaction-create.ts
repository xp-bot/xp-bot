import { Client, Events } from 'discord.js';

export default (client: Client) => {
  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isCommand()) return;

    // TODO: Better exception handling
    client.commands.get(interaction.commandName)?.execute?.(interaction);
  });
};
