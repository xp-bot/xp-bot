import {
  ChatInputCommandInteraction,
  Interaction,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js';
import discordClient from '../clients/discord-client';

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

  getRegistratorData = () => this.slashCommand;

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
