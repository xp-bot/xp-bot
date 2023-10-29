export interface IXPGuild {
  values: { [name: string]: number };
  modules: { [name: string]: boolean };
  logs: { [name: string]: string | null };
  ignored: {
    roles: string[];
    channels: string[];
    categories: string[];
  };
  boosts: {
    roles: Array<{
      id: string;
      percentage: number;
    }>;
    channels: Array<{
      id: string;
      percentage: number;
    }>;
  };
  levelroles: Array<{
    id: string;
    level: number;
  }>;
  announce: {
    current: boolean;
    channelID: string | null;
    message: string;
    ping: boolean;
  };
  permissions: {
    channels: Array<{
      id: string;
      allowed: Array<string>;
    }>;
    roles: Array<{
      id: string;
      allowed: Array<string>;
    }>;
  };
  leaderboard_message: {
    enabled: boolean;
    messageID: string;
    channelID: string;
  };
  premiumUser: string;
}

export interface IXPGuildMember {
  xp: number;
  settings: { incognito: boolean };
  timestamps: {
    message_cooldown: number | null;
    game_daily: number | null;
    game_trivia: number | null;
    game_loot: number | null;
    game_fish: number | null;
    game_roll: number | null;
  };
  streaks: { game_daily: number; game_trivia: number };
  userData: IXPGuildMemberData;
}

export interface IXPGuildMemberData {
  username?: string;
  avatar?: string;
  banner?: string;
}
