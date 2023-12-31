import registerCommands from '../../helpers/register-commands';
import { Client, Events } from 'discord.js';

export default (client: Client) => {
  client.on(Events.ClientReady, (c) => {
    registerCommands();
    console.log(`Ready! Logged in as shard ${c.shard?.ids[0] || 0 + 1}.`);
  });
};
