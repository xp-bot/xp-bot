import { GuildMemberService, GuildService } from '../../api/generated';
import Command from '../../classes/command';
import XPError, { XPErrorType } from '../../classes/xp-error';
import xpChanged from '../../handlers/internal/xp-changed';
import calculateBasicGame from '../../helpers/games/calculate-basic-game';
import cooldownEmbed from '../../helpers/messaging/cooldown-embed';
import defaultEmbed, {
  DefaultEmbedType,
} from '../../helpers/messaging/default-embed';
import systemEmoji from '../../interfaces/system-emojis';
import { ChatInputCommandInteraction } from 'discord.js';
import i18next, { t } from 'i18next';
import { random } from 'lodash';

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

  const easterEggRoll = random(1, 10000);
  const easterEgg =
    i18next.exists(`game.result.easter_egg.${easterEggRoll}.title`, {
      ns: 'loot_command',
      lng: 'en',
    }) &&
    i18next.exists(`game.result.easter_egg.${easterEggRoll}.description`, {
      ns: 'loot_command',
      lng: 'en',
    });

  const lootResult = calculateBasicGame(
    guild.values.lootXP || 0,
    guild.values.gamecooldown || 0,
    guildMember.timestamps.game_loot || 0,
    easterEgg ? 10 : 0,
    easterEgg ? 14 : 6,
  );

  if (lootResult.hitCooldown) {
    const embed = cooldownEmbed(lootResult.countdownRemaining || 0);
    interaction.reply({
      embeds: [embed],
    });
    return;
  }

  const embed = defaultEmbed(
    easterEgg ? DefaultEmbedType.EASTEREGG : undefined,
  );

  if (easterEgg)
    embed
      .setTitle(
        t(`game.result.easter_egg.${easterEggRoll}.title`, {
          ns: 'loot_command',
          lng: 'en',
          user: `**${user.username}**`,
          xp: `**${lootResult.xp}xp**`,
        }),
      )
      .setDescription(
        t(`game.result.easter_egg.${easterEggRoll}.description`, {
          ns: 'loot_command',
          lng: 'en',
          user: `**${user.username}**`,
          xp: `**${lootResult.xp}xp**`,
        }),
      );
  else
    embed.setDescription(
      `${systemEmoji.crate} | ${t(`game.result.${lootResult.result}`, {
        ns: 'loot_command',
        lng: 'en',
        user: `**${user.username}**`,
        xp: `**${lootResult.xp}xp**`,
      })}`,
    );

  await guildMemberService_.patchGuildMember({
    guildId,
    userId: user.id,
    requestBody: {
      timestamps: {
        ...guildMember.timestamps,
        game_loot: Date.now(),
      },
      userData: {
        avatar: user.avatar || undefined,
        banner: user.banner || undefined,
        username: user.username,
      },
    },
  });

  await xpChanged(guildId, user, lootResult.xp);

  interaction.reply({
    embeds: [embed],
  });
};

export default new Command(
  {
    name: 'loot',
    options: [],
  },
  execute,
);
