import Command, { CommandOptionType } from '../../classes/command';
import XPError, { XPErrorType } from '../../classes/xp-error';
import xpChanged from '../../handlers/internal/xp-changed';
import defaultEmbed, {
  DefaultEmbedType,
} from '../../helpers/messaging/default-embed';
import formatNumber from '../../helpers/numbers/format-number';
import systemEmoji from '../../interfaces/system-emojis';
import { ChatInputCommandInteraction } from 'discord.js';
import { floor, max } from 'lodash';

const execute = async (interaction: ChatInputCommandInteraction) => {
  const user = interaction.options.getUser('user', false);
  const xp = interaction.options.getInteger('xp', false);

  const guildId = interaction?.guildId;
  if (!user || !xp) throw new XPError(XPErrorType.INTERACTION_OPTIONS_INVALID);

  if (!guildId) throw new XPError(XPErrorType.INTERACTION_GUILD_UNRESOLVABLE);

  const newXp = max([0, floor(xp)]) || 0;
  const xpChangedResults = await xpChanged(guildId, user, undefined, newXp);

  const embed = defaultEmbed(DefaultEmbedType.SUCCESS);
  embed.setDescription(
    `${
      systemEmoji.checkmark
    } Successfully set the xp of ${user} to **${formatNumber(
      xpChangedResults.newXp,
    )}xp**!`,
  );

  interaction.reply({ embeds: [embed] });
};

export default new Command(
  {
    name: 'setxp',
    options: [
      {
        name: 'user',
        required: true,
        type: CommandOptionType.USER,
      },
      {
        name: 'xp',
        required: true,
        type: CommandOptionType.INTEGER,
      },
    ],
  },
  execute,
);
