import { Events } from 'discord.js';
import dotenv from 'dotenv';
import discordClient from './clients/discord-client';
import handlers from './handlers/discord-events';
import customLogger from './helpers/custom-logger';
dotenv.config();

customLogger();

const client = discordClient;
const TOKEN_ = process.env.TOKEN;

// This is a last resort handler for errors which were not handled by any other event handler and should never be called.
client.on(Events.Error, (e) => {
  console.error(e, 'error');
});

handlers();

client.login(TOKEN_);
