import Command from '../../classes/command';
import defaultEmbed, {
  DefaultEmbedType,
} from '../../helpers/messaging/default-embed';
import systemEmoji from '../../interfaces/system-emojis';

import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

const execute = async (interaction: ChatInputCommandInteraction) => {
  const embed = defaultEmbed(DefaultEmbedType.SUCCESS);
  embed.setDescription(`${systemEmoji.checkmark}`);
  interaction.reply({ embeds: [embed] });
};

export default new Command(
  new SlashCommandBuilder().setName('incognito').addBooleanOption((o) =>
    o
      .setName('incognito')
      .setDescription('Whether you want to be incognito or not.')
      .setNameLocalizations({
        de: 'incognito',
        'en-US': 'incognito',
      })
      .setDescriptionLocalizations({
        de: 'Whether you want to be incognito or not.',
        'en-US': 'Whether you want to be incognito or not.',
      })
      .setRequired(true),
  ),

  execute,
);
