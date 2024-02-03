import guildCreate from './guild-create';
import interactionCreate from './interaction-create';
import ready from './ready';
import voicetime from './voicetime';
import discordClient from '../../clients/discord-client';
import { Client } from 'discord.js';

export default (client?: Client) => {
  const c = client || discordClient;
  ready(c);
  interactionCreate(c);
  guildCreate(c);
  voicetime(c);
};
