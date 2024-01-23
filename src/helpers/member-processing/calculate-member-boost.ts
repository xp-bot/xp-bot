import { Guild } from '../../api/generated';
import { GuildMember, TextChannel } from 'discord.js';
import { find, reduce } from 'lodash';

export default (
  member: GuildMember,
  channel: TextChannel | null = null,
  xpGuild: Guild,
) => {
  const roleBoost = reduce(
    xpGuild.boosts?.roles,
    (boost, { id, percentage }) =>
      member.roles.cache.has(id) ? boost + percentage : boost,
    0,
  );

  const channelBoost =
    find(xpGuild.boosts?.channels, ({ id }) => id === channel?.id)
      ?.percentage || 0;

  return roleBoost + channelBoost;
};
