import { Client, Events } from 'discord.js';
import registerCommands from '../../helpers/register-commands';

export default (client: Client) => {
  client.on(Events.ClientReady, (c) => {
    registerCommands();
    console.log(`Ready! Logged in as ${c.shard?.ids[0] || 0 + 1}`);
  });
};
