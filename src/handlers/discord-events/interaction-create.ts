import { Client, Events } from 'discord.js';

export default (client: Client) => {
  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isCommand()) return;

    client.commands.get(interaction.commandName)?.execute?.(interaction);
  });
};
