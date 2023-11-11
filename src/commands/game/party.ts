import { GuildService, GuildMemberService } from '../../api/generated';
import Command, { CommandOptionType } from '../../classes/command';
import XPError, { XPErrorType } from '../../classes/xp-error';
import xpChanged from '../../handlers/internal/xp-changed';
import calculateBasicGame from '../../helpers/games/calculate-basic-game';
import defaultEmbed, {
  DefaultEmbedType,
} from '../../helpers/messaging/default-embed';
import moduleDisabledEmbed from '../../helpers/messaging/module-disabled-embed';
import formatNumber from '../../helpers/numbers/format-number';
import { IGameResult } from '../../interfaces/games';
import systemEmoji from '../../interfaces/system-emojis';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  Message,
  MessageComponentInteraction,
  User,
} from 'discord.js';
import { find, join, map, some } from 'lodash';

const execute = async (interaction: ChatInputCommandInteraction) => {
  const guildService_ = GuildService;
  const guildMemberService_ = GuildMemberService;
  const guild = interaction.guild;
  const guildId = interaction.guildId;
  const user = interaction.user;
  if (!guild || !guildId)
    throw new XPError(XPErrorType.INTERACTION_GUILD_UNRESOLVABLE);
  if (!user) throw new XPError(XPErrorType.INTERACTION_USER_UNRESOLVABLE);

  const xpGuild = await guildService_
    .getGuild({
      guildId,
    })
    .catch((e) => {
      throw new XPError(XPErrorType.API_GUILD_FETCH, e);
    });

  if (!xpGuild.modules.games) {
    interaction.reply({
      embeds: [moduleDisabledEmbed('games')],
      ephemeral: true,
    });
    return;
  }

  let maxPlayers = 10;

  const maxPlayersOption = interaction.options.getInteger(
    'participants',
    false,
  );
  if (maxPlayersOption) maxPlayers = maxPlayersOption;

  if (maxPlayers < 2) maxPlayers = 2;

  const onlyWinner = interaction.options.getBoolean('luck') || false;

  const participantsList: User[] = [interaction.user];

  const embed = defaultEmbed();
  embed.setAuthor({
    name: user.username,
    iconURL: user.avatarURL() || undefined,
  });
  embed.setTitle('New Party hosting!');
  embed.setFields([
    {
      name: 'Current Participants',
      value: `\`\`\`md\n${usersToList(participantsList)}\n\`\`\``,
    },
  ]);
  embed.setFooter({
    text: 'Party is starting in 15 seconds!',
  });

  const message = await interaction.reply({
    embeds: [embed],
    components: [
      new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setCustomId('joinParty')
          .setLabel('Join Party')
          .setStyle(ButtonStyle.Primary),
      ),
    ],
    fetchReply: true,
    ephemeral: false,
  });

  const filter = (i: MessageComponentInteraction) => i.customId === 'joinParty';

  const collector = (
    message as Message<boolean>
  ).createMessageComponentCollector({ filter: filter, time: 15000 });

  collector.on('collect', (i) => {
    const found = find(participantsList, ['id', i.user.id]);
    if (found || i.user.id === interaction.user.id) {
      i.reply({
        ephemeral: true,
        embeds: [
          defaultEmbed(DefaultEmbedType.ERROR).setDescription(
            `${systemEmoji.cross} You've already joined that party!`,
          ),
        ],
      });
    } else {
      participantsList.push(i.user);
      interaction.editReply({
        embeds: [
          embed.setFields({
            name: 'Current Participants',
            value: `\`\`\`md\n${usersToList(participantsList)}\n\`\`\``,
          }),
        ],
      });

      if (participantsList.length >= maxPlayers) {
        interaction.editReply({
          components: [],
        });
      }

      i.reply({
        ephemeral: true,
        embeds: [
          defaultEmbed(DefaultEmbedType.SUCCESS).setDescription(
            `${systemEmoji.checkmark} You've joined the party!`,
          ),
        ],
      });
    }
  });

  // collector.on('end', collected => { if (msg.deletable) msg.delete; });
  collector.on('end', async () => {
    if (participantsList.length < 2) {
      interaction.editReply({
        embeds: [
          defaultEmbed(DefaultEmbedType.ERROR).setDescription(
            'Not enough players registered to participate in this Party!',
          ),
        ],
        components: [],
      });
      return;
    }

    const memberResults = [];

    const resultEmbed = defaultEmbed(DefaultEmbedType.SUCCESS);

    if (onlyWinner)
      resultEmbed.setFooter({
        text: onlyWinner
          ? 'The party has been started in "luck"-mode, only the winner will receive xp!'
          : '',
      });

    const highest: { users: User[]; xp: number } = {
      users: [],
      xp: 0,
    };
    for (const participant of participantsList) {
      const obj: {
        user: User;
        fish?: IGameResult;
        roll?: IGameResult;
        loot?: IGameResult;
      } = {
        user: participant,
      };
      const guildMember = await guildMemberService_
        .getGuildMember({
          guildId,
          userId: participant.id,
        })
        .catch((e) => {
          throw new XPError(XPErrorType.API_GUILD_MEMBER_FETCH, e);
        });

      const [r, f, l] = await Promise.all([
        calculateBasicGame(
          xpGuild.values.rollXP || 0,
          xpGuild.values.gamecooldown || 0,
          guildMember.timestamps.game_roll || 0,
        ),
        calculateBasicGame(
          xpGuild.values.fishXP || 0,
          xpGuild.values.gamecooldown || 0,
          guildMember.timestamps.game_fish || 0,
        ),
        calculateBasicGame(
          xpGuild.values.lootXP || 0,
          xpGuild.values.gamecooldown || 0,
          guildMember.timestamps.game_loot || 0,
        ),
      ]);
      obj.roll = r;
      obj.fish = f;
      obj.loot = l;

      memberResults.push(obj);
      let xp = 0;
      let result = '';
      if (obj.fish) {
        result += `:fishing_pole_and_fish: Fish:\n${systemEmoji.blank} ${
          systemEmoji.blank
        } **${formatNumber(obj.fish.xp)}xp**\n`;
        xp += obj.fish.xp;
      } else {
        result += `:fishing_pole_and_fish: Fish:\n${systemEmoji.blank} ${systemEmoji.blank} **0xp**\n`;
      }

      if (obj.roll) {
        result += `:game_die: Roll:\n${systemEmoji.blank} ${
          systemEmoji.blank
        } **${formatNumber(obj.roll.xp)}xp**\n`;
        xp += obj.roll.xp;
      } else {
        result += `:game_die: Roll:\n${systemEmoji.blank} ${systemEmoji.blank} **0xp**\n`;
      }

      if (obj.loot) {
        result += `:package: Loot:\n${systemEmoji.blank} ${
          systemEmoji.blank
        } **${formatNumber(obj.loot.xp)}xp**\n`;
        xp += obj.loot.xp;
      } else {
        result += `:package: Loot:\n${systemEmoji.blank} ${systemEmoji.blank} **0xp**\n`;
      }

      if (highest.xp < xp || !highest.xp) {
        highest.users = [participant];
        highest.xp = xp;
      } else if (highest.xp == xp) {
        highest.users.push(participant);
      }

      resultEmbed.addFields([
        {
          name: participant.username,
          value: `${result}${systemEmoji.blank} **Reward:**\n${
            systemEmoji.blank
          } ${systemEmoji.blank} **${
            onlyWinner && !some(highest.users, ['id', obj.user.id])
              ? '0'
              : formatNumber(xp)
          }xp**`,
          inline: true,
        },
      ]);
    }

    //TODO: XP and timestamp assignment
    if (highest.users.length > 0) {
      for (let i = 0; i < highest.users.length; i++) {
        const element = highest.users[i];
        if (onlyWinner) {
        }
      }

      resultEmbed.setDescription(
        `**${join(
          highest.users,
          '** & **',
        )}** won the Party with **${formatNumber(highest.xp)}xp**!`,
      );
    } else
      resultEmbed.setDescription(
        'No one won the Party, better luck next time!',
      );
    interaction.editReply({
      embeds: [
        resultEmbed.setTitle('Party results').setThumbnail(
          guild.iconURL({
            extension: 'png',
          }) || null,
        ),
      ],
      components: [],
    });
  });
};

export default new Command(
  {
    name: 'party',
    options: [
      {
        name: 'participants',
        required: false,
        type: CommandOptionType.INTEGER,
      },
      {
        name: 'luck',
        required: false,
        type: CommandOptionType.BOOLEAN,
      },
    ],
  },
  execute,
);

const usersToList = (users: User[]) =>
  join(
    map(users, (u) => `- ${u.username}`),
    '\n',
  );
