import XPError from './xp-error';
import discordClient from '../clients/discord-client';
import generateSlashCommand from '../helpers/command-handling/generate-slash-command';
import generateErrorEmbed from '../helpers/error-handling/generate-error-embed';
import getSanatisedStacktrace from '../helpers/error-handling/get-sanatised-stacktrace';
import {
  ChatInputCommandInteraction,
  Interaction,
  SlashCommandBuilder,
} from 'discord.js';
import { noop } from 'lodash';

type slashCommandBuilderData = Omit<
  SlashCommandBuilder,
  'addSubcommand' | 'addSubcommandGroup'
>;

export enum CommandOptionType {
  STRING,
  INTEGER,
  BOOLEAN,
  USER,
  CHANNEL,
  ROLE,
  MENTIONABLE,
  NUMBER,
}

export interface CommandPassthrough {
  name: string;
  options?: {
    name: string;
    type: CommandOptionType;
    required: boolean;
  }[];
}

export default class Command {
  private slashCommand: slashCommandBuilderData;
  deleteCommand: boolean = false;
  executeCallback: (interaction: ChatInputCommandInteraction) => Promise<void>;

  constructor(
    command: CommandPassthrough,
    executeCallback: (
      interaction: ChatInputCommandInteraction,
    ) => Promise<void>,
    deleteCommand?: boolean,
  ) {
    this.slashCommand = generateSlashCommand(command);
    this.deleteCommand = deleteCommand || false;
    this.executeCallback = executeCallback;
  }

  getRegistratorData = () => {
    return this.slashCommand.toJSON();
  };

  execute = async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;
    console.debug(`Recieved command request [${this.slashCommand.name}]`);
    this.executeCallback(interaction as ChatInputCommandInteraction)
      .then(() => {
        console.debug(
          `Successfully executed command [${this.slashCommand.name}]`,
        );
      })
      .catch((error: XPError) => {
        console.error(
          `${error.message} - [${
            this.slashCommand.name
          }] - '${getSanatisedStacktrace(error)}'`,
        );
        interaction.reply(generateErrorEmbed(error)).catch(noop);
      });
  };

  registerCommand = () => {
    discordClient.commands.set(this.slashCommand.name, this);
  };
}
