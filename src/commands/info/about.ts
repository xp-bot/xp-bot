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
import XPError from '../../classes/xp-error';

const execute = async (interaction: ChatInputCommandInteraction) => {
  if (!interaction.guildId || !interaction.user.id || !interaction.guild) {
    await interaction.reply({
      content: 'Invalid interaction.',
      ephemeral: true,
    });
    throw new XPError('Failed to send /about embed');
  }

  const aboutInfoEmbed = defaultEmbed(DefaultEmbedType.NORMAL)
    .setTitle('Reimagine your Community')
    .addFields(
      {
        name: t('field.summary_title', {
          //'Top-Tier Leveling Solution'
          lng: 'en',
          ns: 'about_command',
        }),
        value: t('field.summary_description', {
          //'Elevate your Community to the next Level with Top-Tier Leveling, endless Customisability and more.'
          lng: 'en',
          ns: 'about_command',
        }),
        inline: false,
      },
      {
        name: t('field.server_title', {
          //'Join our Server'
          lng: 'en',
          ns: 'about_command',
        }),
        value: t('field.server_description', {
          //'[Join XP](https://discord.com/invite/ccTAnzw)'
          lng: 'en',
          ns: 'about_command',
        }),
        inline: true,
      },
      {
        name: t('field.vote_title', {
          //'Vote for XP!'
          lng: 'en',
          ns: 'about_command',
        }),
        value: '[top.gg](https://top.gg/bot/706935674800177193)',
        inline: true,
      },
      {
        name: t('field.status_title', {
          //'Service Status'
          lng: 'en',
          ns: 'about_command',
        }),
        value: t('field.status_description', {
          //'[Status](https://xp-bot.net/status)'
          lng: 'en',
          ns: 'about_command',
        }),
        inline: true,
      },
    );

  const dashboardButton = new ButtonBuilder()
    .setLabel(
      t('button.dashboard', {
        // Server Dashboard
        lng: 'en',
        ns: 'about_command',
      }),
    )
    .setStyle(ButtonStyle.Link)
    .setEmoji('🛠️')
    .setURL(`https://xp-bot.net/servers/${interaction.guildId}`);

  const accountSettingsButton = new ButtonBuilder()
    .setLabel(
      t('button.account_settings', {
        // Account Settings
        lng: 'en',
        ns: 'about_command',
      }),
    )
    .setStyle(ButtonStyle.Link)
    .setEmoji('🙋')
    .setURL('https://xp-bot.net/me');

  const premiumButton = new ButtonBuilder()
    .setLabel(
      t('button.premium', {
        // Premium
        lng: 'en',
        ns: 'about_command',
      }),
    )
    .setStyle(ButtonStyle.Link)
    .setEmoji('👑')
    .setURL('https://xp-bot.net/premium');

  const privacyPolicyButton = new ButtonBuilder()
    .setLabel(
      t('button.privacy_policy', {
        // Privacy Policy
        lng: 'en',
        ns: 'about_command',
      }),
    )
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
          text: `${t('footer.response_time_n', {
            lng: 'en',
            ns: 'about_command',
            response: Date.now() - interaction.createdTimestamp,
          })} • ${t('footer.shard_n', {
            lng: 'en',
            ns: 'about_command',
            shard: interaction.guild.shardId + 1,
          })} • ${t('footer.by_company', {
            lng: 'en',
            ns: 'about_command',
            company: 'namespace.media',
          })}`,
        }),
      ],

      components: [aboutActionRow, aboutActionRow2],
    });
  } catch (error) {
    throw new XPError('Failed to send /about embed with buttons in line 136');
  }
};

export default new Command(
  new SlashCommandBuilder()
    .setName('about')
    .setDescription('Get information about XP.'),
  execute,
);
