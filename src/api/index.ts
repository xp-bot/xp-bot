import apiAxios from '../clients/api-axios';
import { IXPGuild, IXPGuildMember } from '../interfaces/connector/xp';

export default {
  guild: {
    getGuild: (guildId: string) =>
      apiAxios<IXPGuild>(`/guild/${guildId}`, {
        method: 'GET',
      }),
  },
  guildMember: {
    getGuildMember: (guildId: string, userId: string) =>
      apiAxios<IXPGuildMember>(`/guild/${guildId}/member/${userId}`, {
        method: 'GET',
      }),
  },
};
