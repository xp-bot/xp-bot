import { GuildMemberService, GuildService } from '../../api/generated';
import Command from '../../classes/command';
import XPError, { XPErrorType } from '../../classes/xp-error';
import xpChanged from '../../handlers/internal/xp-changed';
import calculateBasicGame from '../../helpers/games/calculate-basic-game';
import cooldownEmbed from '../../helpers/messaging/cooldown-embed';
import defaultEmbed from '../../helpers/messaging/default-embed';
import systemEmoji from '../../interfaces/system-emojis';
import { ChatInputCommandInteraction } from 'discord.js';
import { t } from 'i18next';

const execute = async (interaction: ChatInputCommandInteraction) => {
  const guildService_ = GuildService;
  const guildMemberService_ = GuildMemberService;
  const guildId = interaction.guildId;
  const user = interaction.user;
  if (!guildId) throw new XPError(XPErrorType.INTERACTION_GUILD_UNRESOLVABLE);
  if (!user) throw new XPError(XPErrorType.INTERACTION_USER_UNRESOLVABLE);

  const guild = await guildService_
    .getGuild({
      guildId,
    })
    .catch((e) => {
      throw new XPError(XPErrorType.API_GUILD_FETCH, e);
    });

  const guildMember = await guildMemberService_
    .getGuildMember({
      guildId,
      userId: user.id,
    })
    .catch((e) => {
      throw new XPError(XPErrorType.API_GUILD_MEMBER_FETCH, e);
    });

  const rollResult = calculateBasicGame(
    guild.values.rollXP || 0,
    guild.values.gamecooldown || 0,
    guildMember.timestamps.game_roll || 0,
  );

  if (rollResult.hitCooldown) {
    const embed = cooldownEmbed(rollResult.countdownRemaining || 0);
    interaction.reply({
      embeds: [embed],
    });
    return;
  }

  const embed = defaultEmbed();

  embed.setDescription(
    `${systemEmoji.dice} | ${t('game.result', {
      ns: 'roll_command',
      lng: 'en',
      result: `**${rollResult.result}**`,
      user: `**${user.username}**`,
      xp: `**${rollResult.xp}xp**`,
    })}`,
  );

  await guildMemberService_.patchGuildMember({
    guildId,
    userId: user.id,
    requestBody: {
      timestamps: {
        ...guildMember.timestamps,
        game_roll: Date.now(),
      },
      userData: {
        avatar: user.avatar || undefined,
        banner: user.banner || undefined,
        username: user.username,
      },
      xp: guildMember.xp + rollResult.xp,
    },
  });

  await xpChanged(guildId, user, rollResult.xp);

  interaction.reply({
    embeds: [embed],
  });
};

export default new Command(
  {
    name: 'roll',
    options: [],
  },
  execute,
);
