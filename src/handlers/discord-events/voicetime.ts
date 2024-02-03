import {
  GuildMemberService,
  GuildService,
  UserService,
} from '../../api/generated';
import XPError, { XPErrorType } from '../../classes/xp-error';
import calculateVoicetimeXp from '../../helpers/numbers/calculate-voicetime-xp';
import { Client, Events, VoiceBasedChannel, VoiceState } from 'discord.js';

const handleEndSession = async (userId: string, guildId: string) => {
  const user = await UserService.getUser({
    userId,
  }).catch(() => {
    throw new XPError(XPErrorType.API_USER_FETCH);
  });
  if (!user.timestamps.join_voicechat) return;

  const guild = await GuildService.getGuild({
    guildId,
  }).catch(() => {
    throw new XPError(XPErrorType.API_GUILD_FETCH);
  });
  const userGuildMember = await GuildMemberService.getGuildMember({
    guildId,
    userId,
  }).catch(() => {
    throw new XPError(XPErrorType.API_GUILD_MEMBER_FETCH);
  });

  const duration = Date.now() - user.timestamps.join_voicechat;
  const xp = userGuildMember.xp + calculateVoicetimeXp(duration, guild);
  await GuildMemberService.setGuildMemberXp({
    guildId,
    userId,
    requestBody: {
      xp,
      userData: {},
    },
  }).catch(() => {
    throw new XPError(XPErrorType.API_GUILD_MEMBER_UPDATE);
  });
};

const handleStartSession = async (userId: string, _guildId: string) => {
  await UserService.updateUser({
    userId,
    requestBody: {
      timestamps: {
        join_voicechat: Date.now(),
      },
    },
  }).catch(() => {
    throw new XPError(XPErrorType.API_USER_UPDATE);
  });
};

const isSessionValid = (state: VoiceState, channel: VoiceBasedChannel | null) =>
  channel &&
  // Preparations for the new VTM. This requires way more ram. So it's disabled for now.
  // TODO: If we intend to eventually implement this, a new handler to update other users in the voice channel will need to be created.
  // !state.selfMute &&
  // channel.members.size > 1 &&
  channel.id !== state.guild.afkChannelId;

export default (client: Client) => {
  const logInfo = (message: string) => console.debug(`[VTM - INFO] ${message}`);
  const logAction = (message: string) =>
    console.debug(`[VTM - ACTION] ${message}`);

  client.on(Events.VoiceStateUpdate, async (oldState, newState) => {
    const { channel: newUserChannel } = newState;
    const { channel: oldUserChannel } = oldState;

    const newSessionValid = isSessionValid(newState, newUserChannel);
    const oldSessionValid = isSessionValid(oldState, oldUserChannel);

    if (!oldUserChannel && newUserChannel) {
      logInfo('User has initially joined the channel.');
      if (newSessionValid) {
        logAction('Session Valid. Starting session.');
        handleStartSession(newState.id, newState.guild.id);
      } else {
        logAction('Session Invalid. Doing nothing.');
      }
    } else if (!newUserChannel && oldSessionValid) {
      logInfo('User has left the channel.');
      logAction('Session was Valid. Ending session.');
      handleEndSession(oldState.id, newState.guild.id);
    } else {
      logInfo('User has changed channels or has updated their voice state.');
      if (!newSessionValid && oldSessionValid) {
        logAction(
          'Old Session was Valid but the new Session is not. Ending session.',
        );
        handleEndSession(newState.id, newState.guild.id);
      } else if (!oldSessionValid && newSessionValid) {
        logAction(
          'Old Session was invalid but the new one is Valid. Starting session.',
        );
        handleStartSession(newState.id, newState.guild.id);
      } else {
        logAction('New and old session are invalid. Doing nothing.');
      }
    }
  });
};
