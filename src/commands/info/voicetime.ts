import {
  GuildMemberService,
  GuildService,
  UserService,
} from '../../api/generated';
import Command, { CommandOptionType } from '../../classes/command';
import XPError, { XPErrorType } from '../../classes/xp-error';
import calculateMemberBoost from '../../helpers/member-processing/calculate-member-boost';
import defaultEmbed from '../../helpers/messaging/default-embed';
import calculateVoicetimeXp from '../../helpers/numbers/calculate-voicetime-xp';
import formatDuration from '../../helpers/numbers/format-duration';
import formatNumber from '../../helpers/numbers/format-number';
import calculateLevel from '../../helpers/numbers/xp/calculate-level';
import { ChannelType, ChatInputCommandInteraction } from 'discord.js';
import { t } from 'i18next';
import { max } from 'lodash';

const execute = async (interaction: ChatInputCommandInteraction) => {
  const guildId = interaction.guildId;
  const guild = interaction.guild;
  const userId = interaction.options.getUser('user')?.id || interaction.user.id;

  if (!guildId || !guild)
    throw new XPError(XPErrorType.INTERACTION_GUILD_UNRESOLVABLE);

  if (!userId) throw new XPError(XPErrorType.INTERACTION_USER_UNRESOLVABLE);

  const xpUser = await UserService.getUser({ userId }).catch((e) => {
    console.log(e);

    throw new XPError(XPErrorType.API_USER_FETCH, e);
  });

  const xpGuild = await GuildService.getGuild({ guildId }).catch((e) => {
    console.log(e);

    throw new XPError(XPErrorType.API_GUILD_FETCH, e);
  });

  const xpGuildMember = await GuildMemberService.getGuildMember({
    guildId,
    userId,
  }).catch((e) => {
    console.log(e);

    throw new XPError(XPErrorType.API_GUILD_MEMBER_FETCH, e);
  });

  const guildMember =
    guild.members.cache.get(userId) ||
    (await guild.members.fetch(userId).catch(() => {
      throw new XPError(XPErrorType.GUILD_MEMBER_UNRESOLVABLE);
    }));

  const voice = guildMember.voice;
  const joinedVoiceTimestamp = xpUser.timestamps?.join_voicechat || null;

  const embed = defaultEmbed();

  embed.setTitle(
    t('title', {
      ns: 'voicetime_command',
      username: guildMember.user.username,
    }),
  );

  if (!joinedVoiceTimestamp || !voice.channelId) {
    embed.setDescription(
      t('description.error.not_joined', { ns: 'voicetime_command' }),
    );

    interaction.reply({ embeds: [embed] });
    return;
  }

  const realDuration = Date.now() - joinedVoiceTimestamp;
  const duration =
    max([0, realDuration - (xpGuild.values?.voicejoincooldown || 0)]) ?? 0;
  const voiceTimeXp = calculateVoicetimeXp(duration, xpGuild);

  const oldLevel = calculateLevel(xpGuildMember.xp);
  const newLevel = calculateLevel(xpGuildMember.xp + voiceTimeXp);

  embed.setFields([
    {
      name: t('description.field.current_session', {
        ns: 'voicetime_command',
      }),
      value: formatDuration(realDuration),
    },
    {
      name: t('description.field.session_xp', {
        ns: 'voicetime_command',
      }),
      value: `${formatNumber(voiceTimeXp)}xp`,
      inline: true,
    },
    ...(newLevel > oldLevel
      ? [
          {
            name: t('description.field.new_level', {
              ns: 'voicetime_command',
            }),
            value: `${newLevel} -> ${oldLevel}`,
            inline: true,
          },
        ]
      : []),
  ]);

  const memberBoost = calculateMemberBoost(
    guildMember,
    interaction.channel?.type === ChannelType.GuildText
      ? interaction.channel
      : undefined,
    xpGuild,
  );

  memberBoost &&
    embed.setFooter({
      text: t('footer.boost_applied', {
        ns: 'voicetime_command',
        percent: memberBoost,
      }),
    });

  interaction.reply({ embeds: [embed] });
};

export default new Command(
  {
    name: 'voicetime',
    options: [{ name: 'user', required: false, type: CommandOptionType.USER }],
  },
  execute,
);
