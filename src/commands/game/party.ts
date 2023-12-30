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
import { t } from 'i18next';
import {
  find,
  forEach,
  isUndefined,
  join,
  map,
  some,
  upperFirst,
} from 'lodash';

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
    name: user.displayName || user.username,
    iconURL: user.avatarURL() || undefined,
  });
  embed.setTitle(t('title.new_party', { ns: 'party_command', lng: 'en' }));
  embed.setFields([
    {
      name: t('field.current_participants', { ns: 'party_command', lng: 'en' }),
      value: `\`\`\`md\n${usersToList(participantsList)}\n\`\`\``,
    },
  ]);
  embed.setFooter({
    text: t('footer.party_starting_in_n', {
      ns: 'party_command',
      lng: 'en',
      time: t('second', { lng: 'en', count: 15 }),
    }),
  });

  const message = await interaction.reply({
    embeds: [embed],
    components: [
      new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setCustomId('joinParty')
          .setLabel(t('button.join', { ns: 'party_command', lng: 'en' }))
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
            `${systemEmoji.cross} ${t('info.error.already_joined', {
              ns: 'party_command',
              lng: 'en',
            })}`,
          ),
        ],
      });
    } else {
      participantsList.push(i.user);
      interaction.editReply({
        embeds: [
          embed.setFields({
            name: t('field.current_participants', {
              ns: 'party_command',
              lng: 'en',
            }),
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
            `${systemEmoji.checkmark} ${t('info.success.joined', {
              ns: 'party_command',
              lng: 'en',
            })}`,
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
            t('info.error.not_enough_participants', {
              ns: 'party_command',
              lng: 'en',
            }),
          ),
        ],
        components: [],
      });
      return;
    }

    const resultEmbed = defaultEmbed(DefaultEmbedType.SUCCESS);

    if (onlyWinner)
      resultEmbed.setFooter({
        text: onlyWinner
          ? t('footer.luck_mode', {
              ns: 'party_command',
              lng: 'en',
            })
          : '',
      });

    const highest: { users: User[]; xp: number } = {
      users: [],
      xp: 0,
    };

    const results = map(participantsList, async (p) => {
      const obj: {
        user: User;
        fish?: IGameResult;
        roll?: IGameResult;
        loot?: IGameResult;
        overallXP: number;
      } = {
        user: p,
        overallXP: 0,
      };
      const guildMember = await guildMemberService_
        .getGuildMember({
          guildId,
          userId: p.id,
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
      obj.overallXP = r.xp + f.xp + l.xp;
      highest.xp += obj.overallXP;

      if (highest.xp < obj.overallXP || isUndefined(highest.xp)) {
        highest.users = [p];
        highest.xp = obj.overallXP;
      } else if (highest.xp == obj.overallXP) {
        highest.users.push(p);
      }

      return obj;
    });

    forEach(await Promise.all(results), (r) => {
      let result = '';
      if (r.fish) {
        result += `:fishing_pole_and_fish: ${upperFirst(
          t('command_info.name', {
            ns: 'fish_command',
            lng: 'en',
          }),
        )}:\n${systemEmoji.blank} ${systemEmoji.blank} **${formatNumber(
          r.fish.xp,
        )}xp**\n`;
      } else {
        result += `:fishing_pole_and_fish: ${upperFirst(
          t('command_info.name', {
            ns: 'fish_command',
            lng: 'en',
          }),
        )}:\n${systemEmoji.blank} ${systemEmoji.blank} **0xp**\n`;
      }

      if (r.roll) {
        result += `:game_die: ${upperFirst(
          t('command_info.name', {
            ns: 'roll_command',
            lng: 'en',
          }),
        )}:\n${systemEmoji.blank} ${systemEmoji.blank} **${formatNumber(
          r.roll.xp,
        )}xp**\n`;
      } else {
        result += `:game_die: ${upperFirst(
          t('command_info.name', {
            ns: 'roll_command',
            lng: 'en',
          }),
        )}:\n${systemEmoji.blank} ${systemEmoji.blank} **0xp**\n`;
      }

      if (r.loot) {
        result += `:package: ${upperFirst(
          t('command_info.name', {
            ns: 'loot_command',
            lng: 'en',
          }),
        )}:\n${systemEmoji.blank} ${systemEmoji.blank} **${formatNumber(
          r.loot.xp,
        )}xp**\n`;
      } else {
        result += `:package: ${upperFirst(
          t('command_info.name', {
            ns: 'loot_command',
            lng: 'en',
          }),
        )}:\n${systemEmoji.blank} ${systemEmoji.blank} **0xp**\n`;
      }

      resultEmbed.addFields([
        {
          name: r.user.displayName || r.user.username,
          value: `${result}${systemEmoji.blank} **${t('field.reward', {
            ns: 'party_command',
            lng: 'en',
          })}:**\n${systemEmoji.blank} ${systemEmoji.blank} **${
            onlyWinner && !some(highest.users, ['id', r.user.id])
              ? '0'
              : formatNumber(r.overallXP)
          }xp**`,
          inline: true,
        },
      ]);
      if (!onlyWinner || some(highest.users, ['id', r.user.id]))
        xpChanged(guildId, r.user, r.overallXP);

      guildMemberService_.updateGuildMember({
        guildId,
        userId: r.user.id,
        requestBody: {
          timestamps: {
            game_fish: Date.now(),
            game_roll: Date.now(),
            game_loot: Date.now(),
          },
        },
      });
    });

    if (highest.users.length > 0) {
      resultEmbed.setDescription(
        t('info.success.won', {
          ns: 'party_command',
          lng: 'en',
          users: `**${join(map(highest.users, 'username'), '** & **')}**`,
          xp: ` **${formatNumber(highest.xp)}xp**`,
        }),
      );
    } else
      resultEmbed.setDescription(
        t('info.error.no_win', {
          ns: 'party_command',
          lng: 'en',
        }),
      );
    interaction.editReply({
      embeds: [
        resultEmbed
          .setTitle(
            t('title.results', {
              ns: 'party_command',
              lng: 'en',
            }),
          )
          .setThumbnail(
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
    map(users, (u) => `- ${u.displayName || u.username}`),
    '\n',
  );
