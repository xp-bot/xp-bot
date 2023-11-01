import {
  ChatInputCommandInteraction,
  Interaction,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js';
import { t } from 'i18next';
<<<<<<< HEAD
=======
import { noop } from 'lodash';
>>>>>>> 694fdef77b37237d452c560a0983a4a20a526f14
import discordClient from '../clients/discord-client';
import sanatiseCommandName from '../helpers/command-handling/sanatise-command-name';
import XPError from './xp-error';

type slashCommandBuilderData =
  | SlashCommandBuilder
  | SlashCommandSubcommandsOnlyBuilder
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
<<<<<<< HEAD
    this.slashCommand
      .setDescription(
        t(['command_info.description', fallbackString], {
          ns: `${this.slashCommand.name}_command`,
          lng: 'en',
        }),
      )
      .setNameLocalizations({
        de: t(['command_info.name', this.slashCommand.name], {
          ns: `${this.slashCommand.name}_command`,
          lng: 'de',
        }),
        'en-US': t(['command_info.name', this.slashCommand.name], {
          ns: `${this.slashCommand.name}_command`,
=======
    const sanatisedCommandName = sanatiseCommandName(this.slashCommand.name);
    return this.slashCommand
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
>>>>>>> 694fdef77b37237d452c560a0983a4a20a526f14
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
<<<<<<< HEAD
            ns: `${this.slashCommand.name}_command`,
=======
            ns: `${sanatisedCommandName}_command`,
>>>>>>> 694fdef77b37237d452c560a0983a4a20a526f14
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
<<<<<<< HEAD
            ns: `${this.slashCommand.name}_command`,
=======
            ns: `${sanatisedCommandName}_command`,
>>>>>>> 694fdef77b37237d452c560a0983a4a20a526f14
            lng: 'en',
          },
        ),
      });
  };

  execute = async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;
<<<<<<< HEAD
    console.log(
      `[COMMAND] Recieved command request [${this.slashCommand.name}]`,
    );
    this.executeCallback(interaction as ChatInputCommandInteraction)
      .then(() => {
        console.log(
          `[COMMAND] Successfully executed command [${this.slashCommand.name}]`,
=======
    console.log(`Recieved command request [${this.slashCommand.name}]`);
    this.executeCallback(interaction as ChatInputCommandInteraction)
      .then(() => {
        console.log(
          `Successfully executed command [${this.slashCommand.name}]`,
>>>>>>> 694fdef77b37237d452c560a0983a4a20a526f14
        );
      })
      .catch((error: XPError) => {
        console.error(`${error.message}.`, [
          { command: this.slashCommand.name },
          ...(error.details || []),
        ]);
        interaction
          .reply({
            content: 'An error occured while executing this command.',
            ephemeral: true,
          })
          .catch(noop);
      });
  };

  registerCommand = () => {
    discordClient.commands.set(this.slashCommand.name, this);
  };
}
