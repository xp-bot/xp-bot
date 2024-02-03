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
  const logInfo = (message: string) => console.log(`[VTM - INFO] ${message}`);
  const logAction = (message: string) =>
    console.log(`[VTM - ACTION] ${message}`);

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

// export default (client: Client) => {
//   client.on(Events.VoiceStateUpdate, async (oldState, newState) => {
//     const newUserChannel = newState.channel;
//     const oldUserChannel = oldState.channel;

//     const newSessionValid =
//       newUserChannel &&
//       !newState.selfMute &&
//       newUserChannel.members.size > 1 &&
//       newUserChannel.id !== newState.guild.afkChannelId;

//     const oldSessionValid =
//       oldUserChannel &&
//       !oldState.selfMute &&
//       oldUserChannel.members.size > 1 &&
//       oldUserChannel.id !== oldState.guild.afkChannelId;

//     if (oldUserChannel === null && newUserChannel !== null) {
//       console.log('[VTM - INFO] User has initially joined the channel.');

//       if (newSessionValid) {
//         console.log(
//           '[VTM - ACTION] User has joined the channel. Starting session.',
//         );
//         handleStartSession(newState.id, newState.guild.id);
//       } else {
//         console.log(
//           '[VTM - ACTION] User has joined an invalid session. Doing nothing.',
//         );
//       }
//     } else if (newUserChannel === null && oldSessionValid) {
//       console.log('[VTM - INFO] User has left the channel.');
//       console.log('[VTM - ACTION] User has left the channel. Ending session.');
//       handleEndSession(oldState.id, newState.guild.id);
//     } else {
//       console.log(
//         '[VTM - INFO] User has changed channels, is deafened, alone, in an AFK channel or has left / switched from and to an invalid session.',
//       );

//       if (!newSessionValid && oldSessionValid) {
//         console.log(
//           '[VTM - ACTION] User is deafened, alone, or in AFK channel. Ending session.',
//         );
//         handleEndSession(newState.id, newState.guild.id);
//       } else if (!oldSessionValid && newSessionValid) {
//         console.log(
//           '[VTM - ACTION] User has changed channels. Starting session.',
//         );
//         handleStartSession(newState.id, newState.guild.id);
//       } else if (!oldSessionValid && !newSessionValid) {
//         console.log('[VTM - ACTION] Doing nothing.');
//         // handleEndSession(newState.id, newState.guild.id);
//       }
//     }
//   });
// };
