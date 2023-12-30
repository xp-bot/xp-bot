import { GuildMemberService, GuildService } from '../../api/generated';
import XPError, { XPErrorType } from '../../classes/xp-error';
import calculateLevel from '../../helpers/numbers/xp/calculate-level';
import calculateRequiredXp from '../../helpers/numbers/xp/calculate-required-xp';
import { User } from 'discord.js';
import { floor, isUndefined, max } from 'lodash';

/**
 * @param xpChange The amount of XP to change (Can be negative)
 * @param absoluteXP The absolute amount of XP the user has *only available if xpChange is undefined*
 */
export default async (
  guildId: string,
  user: User,
  xpChange?: number,
  absoluteXP?: number,
) => {
  if (isUndefined(xpChange) && isUndefined(absoluteXP))
    throw new XPError(XPErrorType.INTERNAL_UNKNOWN);
  const setAbsoluteXP = isUndefined(xpChange) && !isUndefined(absoluteXP);

  const guildService_ = GuildService;
  const guildMemberService_ = GuildMemberService;

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

  let newXp =
    max([
      0,
      setAbsoluteXP
        ? floor(absoluteXP)
        : floor(guildMember.xp + (xpChange || 0)),
    ]) || 0;
  const newLevel = calculateLevel(newXp);

  if (guild.modules.maximumlevel && guild.values.maximumlevel < newLevel)
    newXp = calculateRequiredXp(guild.values.maximumlevel);

  //TODO: Implement announcements

  await guildMemberService_
    .setGuildMemberXp({
      guildId,
      userId: user.id,
      requestBody: {
        userData: {
          avatar: user.avatar || undefined,
          banner: user.banner || undefined,
          username: user.displayName || user.username,
        },
        xp: newXp,
      },
    })
    .catch((e) => {
      throw new XPError(XPErrorType.API_GUILD_MEMBER_UPDATE, e);
    });

  return {
    newXp,
    newLevel,
  };
};
