import Command from '../../classes/command';
import eventErrorHandler from '../../helpers/event-error-handler';
import { Client, Events } from 'discord.js';

export default (client: Client) => {
  eventErrorHandler(Events.ClientReady, async () => {
    client.on(Events.InteractionCreate, async (interaction) => {
      if (!interaction.isCommand()) return;

      (
        client.commands.get(interaction.commandName) as Command | undefined
      )?.exec?.(interaction);
    });
  });
};
