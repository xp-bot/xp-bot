import XPError from './xp-error';
import discordClient from '../clients/discord-client';
import sanatiseCommandName from '../helpers/command-handling/sanatise-command-name';
import generateErrorEmbed from '../helpers/error-handling/generate-error-embed';
import getSanatisedStacktrace from '../helpers/error-handling/get-sanatised-stacktrace';
import {
  ChatInputCommandInteraction,
  Interaction,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js';
import { t } from 'i18next';
import { forEach, noop } from 'lodash';

type slashCommandBuilderData =
  | SlashCommandBuilder
  | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;

export default class Command {
  private slashCommand: slashCommandBuilderData;
  deleteCommand: boolean = false;
  executeCallback: (interaction: ChatInputCommandInteraction) => Promise<void>;

  constructor(
    slashCommand: slashCommandBuilderData,
    executeCallback: (
      interaction: ChatInputCommandInteraction,
    ) => Promise<void>,
    deleteCommand?: boolean,
  ) {
    this.slashCommand = slashCommand;
    this.deleteCommand = deleteCommand || false;
    this.executeCallback = executeCallback;
  }

  getRegistratorData = () => {
    const fallbackString = `${this.slashCommand.name} command`;
    const sanatisedCommandName = sanatiseCommandName(this.slashCommand.name);
    this.slashCommand
      .setDescription(
        t(
          [
            'command_info.description',
            this.slashCommand.description || fallbackString,
          ],
          {
            ns: `${sanatisedCommandName}_command`,
            lng: 'en',
          },
        ),
      )
      .setNameLocalizations({
        de: t(['command_info.name', this.slashCommand.name], {
          ns: `${sanatisedCommandName}_command`,
          lng: 'de',
        }),
        'en-US': t(['command_info.name', this.slashCommand.name], {
          ns: `${sanatisedCommandName}_command`,
          lng: 'en',
        }),
      })
      .setDescriptionLocalizations({
        de: t(
          [
            'command_info.description',
            this.slashCommand.description,
            fallbackString,
          ],
          {
            ns: `${sanatisedCommandName}_command`,
            lng: 'de',
          },
        ),
        'en-US': t(
          [
            'command_info.description',
            this.slashCommand.description,
            fallbackString,
          ],
          {
            ns: `${sanatisedCommandName}_command`,
            lng: 'en',
          },
        ),
      });

    return this.slashCommand;
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
