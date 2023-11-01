import apiAxios from '../clients/api-axios';
import { Guild, GuildMember, User } from './generated';

export default {
  guild: {
    getGuild: (guildId: string) =>
      apiAxios<Guild>(`/guild/${guildId}`, {
        method: 'GET',
      }),
    updateGuild: (guildId: string, data: Partial<Guild>) =>
      apiAxios<Guild>(`/guild/${guildId}`, {
        method: 'PATCH',
        data,
      }),
  },
  guildMember: {
    getGuildMember: (guildId: string, userId: string) =>
      apiAxios<GuildMember>(`/guild/${guildId}/member/${userId}`, {
        method: 'GET',
      }),
    updateGuildMember: (
      guildId: string,
      userId: string,
      data: Partial<GuildMember>,
    ) =>
      apiAxios<GuildMember>(`/guild/${guildId}/member/${userId}`, {
        method: 'PATCH',
        data,
      }),
  },
  user: {
    getUser: (userId: string) =>
      apiAxios<User>(`/user/${userId}`, {
        method: 'GET',
      }),
    updateUser: (userId: string, data: Partial<User>) =>
      apiAxios<User>(`/user/${userId}`, {
        method: 'PATCH',
        data,
      }),
  },
};
