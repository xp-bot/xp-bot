import getSanatisedStacktrace from './get-sanatised-stacktrace';
import XPError from '../../classes/xp-error';
import defaultEmbed, { DefaultEmbedType } from '../messaging/default-embed';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  InteractionReplyOptions,
  MessagePayload,
} from 'discord.js';

export default (error: XPError): MessagePayload | InteractionReplyOptions => {
  const errorEmbed = defaultEmbed(DefaultEmbedType.ERROR);
  errorEmbed.setTitle(error.title || 'Unknown Error');
  error.description && errorEmbed.setDescription(`> ${error.description}`);
  errorEmbed.setFooter({
    text: `Stack: ${getSanatisedStacktrace(error)}`,
  });

  const supportButton = new ButtonBuilder()
    .setLabel('Report this issue')
    .setStyle(ButtonStyle.Link)
    .setEmoji('📝')
    .setURL('https://discord.xp-bot.net/');
  const serviceButton = new ButtonBuilder()
    .setLabel('XP Status')
    .setStyle(ButtonStyle.Link)
    .setEmoji('📈')
    .setURL('https://status.xp-bot.net/');

  const errorActionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
    supportButton,
    serviceButton,
  );

  return {
    embeds: [errorEmbed],
    components: [errorActionRow],
    ephemeral: true,
  };
};
