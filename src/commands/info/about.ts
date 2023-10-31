import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';
import Command from '../../classes/command';
import defaultEmbed, {
  DefaultEmbedType,
} from '../../helpers/messaging/default-embed';
import { t } from 'i18next';

const execute = async (interaction: ChatInputCommandInteraction) => {
  if (!interaction.guildId || !interaction.user.id || !interaction.guild) {
    await interaction.reply({
      content: 'Invalid interaction.',
      ephemeral: true,
    });
    // TODO: Error Handling
    return;
  }

  const aboutInfoEmbed = defaultEmbed(DefaultEmbedType.NORMAL)
    .setTitle(`${t('title.title', { lng: 'en', ns: 'about_command' })}}`)
    .addFields(
      {
        name: t('fields.summary_title', {
          //'Top-Tier Leveling Solution'
          lng: 'en',
          ns: 'about_command',
        }),
        value: t('fields.summary_description', {
          //'Elevate your Community to the next Level with Top-Tier Leveling, endless Customisability and more.'
          lng: 'en',
          ns: 'about_command',
        }),
        inline: false,
      },
      {
        name: t('fields.server_title', {
          //'Join our Server'
          lng: 'en',
          ns: 'about_command',
        }),
        value: t('fields.server_link', {
          //'[Join XP](https://discord.com/invite/ccTAnzw)'
          lng: 'en',
          ns: 'about_command',
          link: 'https://discord.com/invite/ccTAnzw',
        }),
        inline: true,
      },
      {
        name: t('fields.vote_title', {
          //'Vote for XP!'
          lng: 'en',
          ns: 'about_command',
        }),
        value: t('fields.vote_link', {
          //'[top.gg](https://top.gg/bot/706935674800177193)'
          lng: 'en',
          ns: 'about_command',
          link: 'https://top.gg/bot/706935674800177193',
        }),
        inline: true,
      },
      {
        name: t('fields.status_title', {
          //'Service Status'
          lng: 'en',
          ns: 'about_command',
        }),
        value: t('fields.status_link', {
          //'[Status](https://xp-bot.net/status)'
          lng: 'en',
          ns: 'about_command',
          link: 'https://status.xp-bot.net',
        }),
        inline: true,
      },
    );

  const dashboardButton = new ButtonBuilder()
    .setLabel('Server Dashboard')
    .setStyle(ButtonStyle.Link)
    .setEmoji('🛠️')
    .setURL(`https://xp-bot.net/servers/${interaction.guildId}`);

  const accountSettingsButton = new ButtonBuilder()
    .setLabel('Account Settings')
    .setStyle(ButtonStyle.Link)
    .setEmoji('🙋')
    .setURL('https://xp-bot.net/me');

  const premiumButton = new ButtonBuilder()
    .setLabel('Premium')
    .setStyle(ButtonStyle.Link)
    .setEmoji('👑')
    .setURL('https://xp-bot.net/premium');

  const privacyPolicyButton = new ButtonBuilder()
    .setLabel('Privacy Policy')
    .setStyle(ButtonStyle.Link)
    .setEmoji('🔖')
    .setURL('https://xp-bot.net/privacy');

  const aboutActionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
    dashboardButton,
    accountSettingsButton,
  );

  const aboutActionRow2 = new ActionRowBuilder<ButtonBuilder>().addComponents(
    premiumButton,
    privacyPolicyButton,
  );

  try {
    await interaction.reply({
      embeds: [
        aboutInfoEmbed.setFooter({
          text: t('footer.response_shard_company_info', {
            lng: 'en',
            ns: 'about_command',
            response: Date.now() - interaction.createdTimestamp,
            shard: interaction.guild.shardId + 1,
            company: 'namespace.media',
          }),
        }),
      ],

      components: [aboutActionRow, aboutActionRow2],
    });
  } catch (error) {
    console.error(error);
    // TODO: Error Handling
  }
};

export default new Command(
  new SlashCommandBuilder()
    .setName('about')
    .setDescription('Get information about XP.'),
  execute,
);
