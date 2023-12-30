import { GuildService, GuildMemberService } from '../../api/generated';
import Command from '../../classes/command';
import XPError, { XPErrorType } from '../../classes/xp-error';
import discordClient from '../../clients/discord-client';
import defaultEmbed from '../../helpers/messaging/default-embed';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
} from 'discord.js';
import { t } from 'i18next';

const execute = async (interaction: ChatInputCommandInteraction) => {
  const guildService_ = GuildService;
  const guildMemberService_ = GuildMemberService;
  const guildId = interaction.guildId;
  const user = interaction.user;
  if (!guildId) throw new XPError(XPErrorType.INTERACTION_GUILD_UNRESOLVABLE);
  if (!user) throw new XPError(XPErrorType.INTERACTION_USER_UNRESOLVABLE);

  // This is here, to accurately measure the ping. (Most commands first contact the api and then answer the interaction)
  await guildService_
    .getGuild({
      guildId,
    })
    .catch((e) => {
      throw new XPError(XPErrorType.API_GUILD_FETCH, e);
    });

  await guildMemberService_
    .getGuildMember({
      guildId,
      userId: user.id,
    })
    .catch((e) => {
      throw new XPError(XPErrorType.API_GUILD_MEMBER_FETCH, e);
    });

  const embed = defaultEmbed();
  embed.setTitle('Reimagine your Community');
  embed.setDescription(
    `**Top-Tier Leveling Solution**\n${t('info.description', {
      ns: 'about_command',
      lng: 'en',
    })}`,
  );
  embed.addFields([
    {
      inline: true,
      name: `${t('field.support.title', {
        ns: 'about_command',
        lng: 'en',
      })}`,
      value: `[${t('field.support.description', {
        ns: 'about_command',
        lng: 'en',
      })}](https://discord.xp-bot.net/)`,
    },
    {
      inline: true,
      name: `${t('field.vote.title', {
        ns: 'about_command',
        lng: 'en',
      })}`,
      value: '[top.gg](http://vote.xp-bot.net/)',
    },
    {
      inline: true,
      name: `${t('field.status.title', {
        ns: 'about_command',
        lng: 'en',
      })}`,
      value: `[${t('field.status.description', {
        ns: 'about_command',
        lng: 'en',
      })}](https://status.xp-bot.net/)`,
    },
  ]);

  embed.setFooter({
    text: `Response time: ${
      Date.now() - interaction.createdTimestamp
    }ms • Shard: ${
      (discordClient.shard?.ids[0] || 0) + 1
    } • by namespace.media`,
  });

  interaction.reply({
    embeds: [embed],
    components: [
      //   new ActionRowBuilder<ButtonBuilder>().addComponents(
      //     new ButtonBuilder()
      //       .setCustomId('joinParty')
      //       .setLabel(t('button.join', { ns: 'party_command', lng: 'en' }))
      //       .setStyle(ButtonStyle.Primary),
      //   ),
      //   new ActionRowBuilder<ButtonBuilder>().addComponents(
      //     new ButtonBuilder()
      //       .setLabel(t('button.join', { ns: 'party_command', lng: 'en' }))
      //       .setStyle(ButtonStyle.Link)
      //       .setURL(
      //         'https://discord.com/oauth2/authorize?client_id=812187154991243776&scope=bot%20applications.commands&permissions=8',
      //       ),
      //   ),
      new ActionRowBuilder<ButtonBuilder>().addComponents([
        ...(interaction.memberPermissions?.has('ManageGuild')
          ? [
              new ButtonBuilder()
                .setLabel(
                  `${t('button.server_dashboard', {
                    ns: 'about_command',
                    lng: 'en',
                  })}`,
                )
                .setEmoji('🛠️')
                .setStyle(ButtonStyle.Link)
                .setURL(`https://xp-bot.net/servers/${guildId}`),
            ]
          : []),
        new ButtonBuilder()
          .setLabel(
            `${t('button.user_dashboard', {
              ns: 'about_command',
              lng: 'en',
            })}`,
          )
          .setEmoji('🙋')
          .setStyle(ButtonStyle.Link)
          .setURL('https://xp-bot.net/me'),
        new ButtonBuilder()
          .setLabel(
            `${t('button.premium', {
              ns: 'about_command',
              lng: 'en',
            })}`,
          )
          .setEmoji('👑')
          .setStyle(ButtonStyle.Link)
          .setURL('https://premium.xp-bot.net/'),
      ]),
      new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setEmoji('📚')
          .setLabel('Terms of Service')
          .setURL('https://xp-bot.net/blog/terms_of_service'),
        new ButtonBuilder()
          .setLabel('Privacy agreement')
          .setEmoji('🔒')
          .setStyle(ButtonStyle.Link)
          .setURL('https://xp-bot.net/legal/privacy/'),
      ),
    ],
  });
};

export default new Command(
  {
    name: 'about',
    options: [],
  },
  execute,
);
