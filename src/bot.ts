import { OpenAPI } from './api/generated';
import discordClient from './clients/discord-client';
import handlers from './handlers/discord-events';
import customLogger from './helpers/custom-logger';
import initI18n from './helpers/localization/init-i18n';
import { Events } from 'discord.js';
import dotenv from 'dotenv';
import { trimEnd } from 'lodash';
dotenv.config();

OpenAPI.TOKEN = process.env.API_TOKEN;
OpenAPI.BASE = trimEnd(process.env.API, '/');

const main = async () => {
  customLogger();

  const client = discordClient;
  const TOKEN_ = process.env.TOKEN;

  // This is a last resort handler for errors which were not handled by any other event handler and should never be called.
  client.on(Events.Error, (e) => {
    console.error(e, 'error');
  });

  await initI18n;

  handlers();

  client.login(TOKEN_);
};

main();
