import { ActionRowBuilder, AuditLogEvent, ButtonBuilder, ButtonStyle, Client, EmbedBuilder } from 'discord.js';
import { isNil } from 'lodash';

export default (client: Client) => {
  client.on('guildCreate', async (guild) => {
    console.log(`Joined a new guild: ${guild.name}`);
    const auditLogCheck = (await guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.BotAdd})).entries.first()?.executorId || guild.ownerId;
    // Checks for the user who has added the bot to the guild. If the user is not found, it will mention the owner of the guild
        
    const auditLogUser = await guild.members.fetch(auditLogCheck);
    if (isNil(auditLogCheck)) return;

    const welcomeEmbed = new EmbedBuilder()
      .setThumbnail(guild.client.user?.displayAvatarURL())
      .setTitle('Welcome to XP 👋')
      .setColor('Blue')
      .setDescription('We are happy, that you chose XP for your server!\nXP is a leveling bot, that allows you to reward your members for their activity.\n\nIf you need help, feel free to join our [support server](https://discord.xp-bot.net)!')
      .setFields(
        {
          name: 'Read our tutorials',
          value: '- [Roles & Boosts](https://xp-bot.net/blog/guide_roles_and_boosts_1662020313458) \n- [Announcements](https://xp-bot.net/blog/guide_announcements_1660342055312) \n- [Values](https://xp-bot.net/blog/guide_values_1656883362214) \n- [XP, Moderation & Game Modules](https://xp-bot.net/blog/guide_xp__game_modules_1655300944128)',
          inline: false
        }
      );
    
    const dashboardButton = new ButtonBuilder()
      .setLabel('Server Dashboard')
      .setStyle(ButtonStyle.Link)
      .setEmoji('🛠️')
      .setURL(`https://xp-bot.net/servers/${guild.id}`);
    
    const announceSettingsButton = new ButtonBuilder()
      .setLabel('Announcement Settings')
      .setStyle(ButtonStyle.Link)
      .setEmoji('🙋')
      .setURL('https://xp-bot.net/me');

    const premiumButton = new ButtonBuilder()
      .setLabel('Premium')
      .setStyle(ButtonStyle.Link)
      .setEmoji('👑')
      .setURL('https://xp-bot.net/premium');
    
    const privacyPolicyButton = new ButtonBuilder()
      .setLabel('Privacy Policy')
      .setStyle(ButtonStyle.Link)
      .setEmoji('🔖')
      .setURL('https://xp-bot.net/privacy');

    const welcomeActionRow = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        dashboardButton,
        announceSettingsButton,
        premiumButton,
        privacyPolicyButton
      );

    try {
      await auditLogUser.send({
        embeds: [welcomeEmbed],
        components: [welcomeActionRow]
      });
    } catch (error) {
      // No need to catch error here
    }
  });
};
