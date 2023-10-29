import { Collection } from 'discord.js';
import dotenv from 'dotenv';
import fs from 'fs';
import { endsWith, filter, size } from 'lodash';
import path from 'path';
import Command from '../classes/command';
import discordClient from '../clients/discord-client';
dotenv.config();

import { REST, Routes } from 'discord.js';

const TOKEN_ = process.env.TOKEN || '';
const APPLICATION_ID_ = process.env.APPLICATION_ID || '';
const DEBUG_GUILD_ID_ = process.env.DEBUG_GUILD_ID;

export default () => {
  discordClient.commands = new Collection();

  const foldersPath = path.join(__dirname, '..', 'commands');
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = filter(fs.readdirSync(commandsPath), (file) =>
      endsWith(file, '.ts')
    );
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const command: Command = require(filePath).default;
      if (!command.deleteCommand) {
        command.registerCommand();
      } else {
        // TODO: Delete commands flagged for deletion
        console.log('[WARNING] Command is to be deleted.');
      }
    }
  }

  const rest = new REST().setToken(TOKEN_);

  (async () => {
    try {
      console.log(
        `Started refreshing ${size(
          discordClient.commands
        )} application commands.`
      );

      if (!DEBUG_GUILD_ID_)
        await rest.put(Routes.applicationCommands(APPLICATION_ID_), {
          // Using legacy .map due to typing issues
          // eslint-disable-next-line lodash/prefer-lodash-method
          body: (discordClient.commands as Collection<string, Command>).map(
            (command) => command.getRegistratorData().toJSON()
          ),
        });
      else
        await rest.put(
          Routes.applicationGuildCommands(APPLICATION_ID_, DEBUG_GUILD_ID_),
          {
            // Using legacy .map due to typing issues
            // eslint-disable-next-line lodash/prefer-lodash-method
            body: (discordClient.commands as Collection<string, Command>).map(
              (command) => command.getRegistratorData().toJSON()
            ),
          }
        );

      console.log('Successfully reloaded application commands.');
    } catch (error) {
      // And of course, make sure you catch and log any errors!
      console.error(error);
    }
  })();
};
