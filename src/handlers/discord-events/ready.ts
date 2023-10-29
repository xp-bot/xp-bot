import { Client, Events } from 'discord.js';
import registerCommands from "../../helpers/register-commands";

export default (client: Client) => {
  client.on(Events.ClientReady, (e) => {
    registerCommands();
  });
};
