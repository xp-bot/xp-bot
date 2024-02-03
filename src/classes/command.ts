import XPError from './xp-error';
import discordClient from '../clients/discord-client';
import generateSlashCommand from '../helpers/command-handling/generate-slash-command';
import generateErrorEmbed from '../helpers/error-handling/generate-error-embed';
import getSanatisedStacktrace from '../helpers/error-handling/get-sanatised-stacktrace';
import * as Sentry from '@sentry/node';
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
  adminOnly?: boolean;
  options?: (
    | {
        name: string;
        type:
          | CommandOptionType.BOOLEAN
          | CommandOptionType.INTEGER
          | CommandOptionType.USER
          | CommandOptionType.CHANNEL
          | CommandOptionType.ROLE
          | CommandOptionType.MENTIONABLE;
        required: boolean;
      }
    | {
        name: string;
        type: CommandOptionType.STRING | CommandOptionType.NUMBER;
        choices: {
          name: string;
        }[];
        required: boolean;
      }
  )[];
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

  getRegistratorData = () => this.slashCommand.toJSON();

  exec = async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;
    console.debug(`Received command request [${this.slashCommand.name}]`);
    this.executeCallback(interaction as ChatInputCommandInteraction)
      .then(() => {
        console.debug(
          `Successfully executed command [${this.slashCommand.name}]`,
        );
      })
      .catch((error: XPError) => {
        Sentry.captureException(error);
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
