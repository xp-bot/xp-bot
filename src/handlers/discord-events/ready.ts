import XPError, { XPErrorType } from '../../classes/xp-error';
import eventErrorHandler from '../../helpers/event-error-handler';
import registerCommands from '../../helpers/register-commands';
import { Client, Events } from 'discord.js';

export default (client: Client) => {
  eventErrorHandler(Events.ClientReady, async () => {
    client.on(Events.ClientReady, async (c) => {
      registerCommands();
      console.log(`Ready! Logged in as shard ${c.shard?.ids[0] || 0 + 1}.`);
    });
  });
};
