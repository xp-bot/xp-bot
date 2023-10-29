import { Events } from 'discord.js';
import dotenv from 'dotenv';
import discordClient from './clients/discord-client';
import handlers from './handlers';
dotenv.config();

const client = discordClient;
const TOKEN_ = process.env.TOKEN;

// This is a last resort handler for errors which were not handled by any other event handler and should never be called.
client.on(Events.Error, (e) => {
  console.error(e, 'error');
});

client.once(Events.ClientReady, async (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

handlers();

client.login(TOKEN_);
