import {
  CacheWithLimitsOptions,
  Client,
  GatewayIntentBits,
  Options,
} from 'discord.js';

const cachingOverrides: CacheWithLimitsOptions = {
  MessageManager: 0,
  PresenceManager: 0,
  ThreadManager: 0,
  ThreadMemberManager: 0,
  StageInstanceManager: 0,
  UserManager: 0,
  GuildBanManager: 0,
  GuildInviteManager: 0,
  GuildStickerManager: 0,
  GuildEmojiManager: 0,
  ReactionManager: 0,
  // GuildMemberManager: 0,
  ApplicationCommandManager: 0,
  AutoModerationRuleManager: 0,
  BaseGuildEmojiManager: 0,
  DMMessageManager: 0,
  GuildForumThreadManager: 0,
  GuildMessageManager: 0,
  GuildScheduledEventManager: 0,
  GuildTextThreadManager: 0,
  ReactionUserManager: 0,
};

const discordClient = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
  makeCache: Options.cacheWithLimits({
    ...Options.DefaultMakeCacheSettings,
    ...cachingOverrides,
  }),
  // Just some playing around
  // shards: [1, 2, 3, 4],
  // shardCount: 4,
  // ws: {
  //   buildStrategy: (manager) => {},
  // },
});

export default discordClient;
