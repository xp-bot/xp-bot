import Command from '../classes/command';

// Extend the discordjs client type
declare module 'discord.js' {
  export interface Client {
    commands: Collection<string, Command>;
  }
}
