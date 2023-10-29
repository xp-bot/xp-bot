import { Client } from 'discord.js';
import discordClient from '../../clients/discord-client';
import interactionCreate from './interaction-create';
import ready from './ready';
import guildCreate from './guild-create';

export default (client?: Client) => {
  const c = client || discordClient;
  ready(c);
  interactionCreate(c);
  guildCreate(c);
};
