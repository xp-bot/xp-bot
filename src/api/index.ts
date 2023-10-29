import apiAxios from '../clients/api-axios';
import { IXPGuild } from '../interfaces/connector/xp';

export default {
  guild: {
    getGuild: (guildId: string) =>
      apiAxios<IXPGuild>(`/guild/${guildId}`, {
        method: 'GET',
      }),
  },
};
