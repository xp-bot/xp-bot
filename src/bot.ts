import { OpenAPI } from './api/generated';
import discordClient from './clients/discord-client';
import handlers from './handlers/discord-events';
import customLogger from './helpers/custom-logger';
import initI18n from './helpers/localization/init-i18n';
import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';
import { Events } from 'discord.js';
import dotenv from 'dotenv';
import { trimEnd } from 'lodash';
dotenv.config();

// You can also use CommonJS `require('@sentry/node')` instead of `import`

// Sentry.init({
//   dsn: process.env.SENTRY_DSN,
//   integrations: [new ProfilingIntegration()],
//   environment: process.env.NODE_ENV || 'development',
//   tracesSampleRate: 1.0,
//   profilesSampleRate: 1.0,
// });

OpenAPI.TOKEN = process.env.API_TOKEN;
OpenAPI.BASE = trimEnd(process.env.API_URL, '/');

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
