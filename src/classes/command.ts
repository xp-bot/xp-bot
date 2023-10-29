import {
  ChatInputCommandInteraction,
  Interaction,
  SlashCommandBuilder,
} from 'discord.js';
import discordClient from '../clients/discord-client';

interface CommandData {
  commandName: string;
  commandDescription: string;
}

export default class Command {
  private commandData: CommandData;
  deleteCommand: boolean = false;
  executeCallback: (interaction: ChatInputCommandInteraction) => Promise<void>;

  constructor(
    commandData: CommandData,
    executeCallback: (
      interaction: ChatInputCommandInteraction
    ) => Promise<void>,
    deleteCommand?: boolean
  ) {
    this.commandData = commandData;
    this.deleteCommand = deleteCommand || false;
    this.executeCallback = executeCallback;
  }

  getRegistratorData = () =>
    new SlashCommandBuilder()
      .setName(this.commandData.commandName)
      .setDescription(this.commandData.commandDescription);

  execute = async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;
    console.log(
      `[COMMAND] Recieved command request [${this.commandData.commandName}]`
    );
    this.executeCallback(interaction as ChatInputCommandInteraction)
      .then(() => {
        console.log(
          `[COMMAND] Successfully executed command [${this.commandData.commandName}]`
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
    discordClient.commands.set(this.commandData.commandName, this);
  };
}
