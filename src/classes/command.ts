import {
  ChatInputCommandInteraction,
  Interaction,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js';
import { t } from 'i18next';
import discordClient from '../clients/discord-client';
import sanatiseCommandName from '../helpers/command-handling/sanatise-command-name';

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
  };

  execute = async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;
    console.log(
      `[COMMAND] Recieved command request [${this.slashCommand.name}]`,
    );
    this.executeCallback(interaction as ChatInputCommandInteraction)
      .then(() => {
        console.log(
          `[COMMAND] Successfully executed command [${this.slashCommand.name}]`,
        );
      })
      .catch(() => {
        interaction
          .reply({
            content: 'An error occured while executing this command.',
            ephemeral: true,
          })
          .catch(() => {
            console.log('An error occured while executing this command.');
          });
      });
  };

  registerCommand = () => {
    discordClient.commands.set(this.slashCommand.name, this);
  };
}
