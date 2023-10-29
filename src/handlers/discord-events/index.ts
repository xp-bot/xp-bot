import { Client } from 'discord.js';
import discordClient from '../../clients/discord-client';
import interactionCreate from './interaction-create';
import ready from './ready';

export default (client?: Client) => {
  const c = client || discordClient;
  ready(c);
  interactionCreate(c);
};
