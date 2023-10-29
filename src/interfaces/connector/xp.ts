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
