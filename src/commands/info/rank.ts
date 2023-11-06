import Command from '../../classes/command';
import XPError, { XPErrorType } from '../../classes/xp-error';
import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { t } from 'i18next';

const execute = async (interaction: ChatInputCommandInteraction) => {
  const userId =
    interaction.options.getUser('user', false)?.id || interaction?.user?.id;
  const guildId = interaction?.guildId;
  if (guildId) throw new XPError(XPErrorType.INTERACTION_GUILD_UNRESOLVABLE);
  if (!userId) throw new XPError(XPErrorType.INTERACTION_USER_UNRESOLVABLE);

  interaction.reply(
    `https://bot-api.xp-bot.net/rank/${guildId}/${userId}?${Date.now()}`,
  );
};

export default new Command(
  new SlashCommandBuilder().setName('rank').addUserOption((o) =>
    o
      .setName('user')
      .setDescription('The user you want to recieve the RankingCard from.')
      .setNameLocalizations({
        de: t(['command_info.option.user.name', 'user'], {
          ns: 'rank_command',
          lng: 'de',
        }),
        'en-US': t(['command_info.option.user.name', 'user'], {
          ns: 'rank_command',
          lng: 'en',
        }),
      })
      .setDescriptionLocalizations({
        de: t(
          [
            'command_info.option.user.description',
            'The user you want to recieve the RankingCard from.',
          ],
          {
            ns: 'rank_command',
            lng: 'de',
          },
        ),
        'en-US': t(
          [
            'command_info.option.user.description',
            'The user you want to recieve the RankingCard from.',
          ],
          {
            ns: 'rank_command',
            lng: 'en',
          },
        ),
      })
      .setRequired(false),
  ),
  execute,
);
