import { GuildMemberService } from '../../api/generated';
import Command, { CommandOptionType } from '../../classes/command';
import XPError, { XPErrorType } from '../../classes/xp-error';
import defaultEmbed, {
  DefaultEmbedType,
} from '../../helpers/messaging/default-embed';
import { ChatInputCommandInteraction } from 'discord.js';
import { t } from 'i18next';

const execute = async (interaction: ChatInputCommandInteraction) => {
  const guildMemberService_ = GuildMemberService;

  const userId =
    interaction.options.getUser('user', false)?.id || interaction?.user?.id;
  const guildId = interaction?.guildId;
  if (!guildId) throw new XPError(XPErrorType.INTERACTION_GUILD_UNRESOLVABLE);
  if (!userId) throw new XPError(XPErrorType.INTERACTION_USER_UNRESOLVABLE);

  const guildMember = await guildMemberService_.getGuildMember({
    guildId,
    userId,
  });

  if (guildMember.settings.incognito) {
    const embed = defaultEmbed(DefaultEmbedType.INFO);
    embed
      .setTitle(
        t('error.incognito.title', {
          ns: 'rank_command',
          lng: 'en',
        }),
      )
      .setDescription(
        interaction.user.id === userId
          ? t('error.incognito.description.self', {
              ns: 'rank_command',
              lng: 'en',
            })
          : t('error.incognito.description.other', {
              ns: 'rank_command',
              lng: 'en',
            }),
      );

    interaction.reply({ embeds: [embed] });
    return;
  }

  interaction.reply(
    `${process.env.API}rank/${guildId}/${userId}?${Date.now()}`,
  );
};

export default new Command(
  {
    name: 'rank',
    options: [
      {
        name: 'user',
        type: CommandOptionType.USER,
        required: false,
      },
    ],
  },
  execute,
);
