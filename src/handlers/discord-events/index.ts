import { Client } from 'discord.js';
import discordClient from '../../clients/discord-client';
import ready from './ready';
import interactionCreate from './interaction-create';
import guildCreate from './guild-create';

export default (client?: Client) => {
  const c = client || discordClient;
  ready(c);
  interactionCreate(c);
  guildCreate(c);
};
