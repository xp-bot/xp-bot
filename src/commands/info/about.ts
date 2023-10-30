import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import defaultEmbed from '../../helpers/messaging/default-embed';
import Command from '../../classes/command';

const execute = async (interaction: ChatInputCommandInteraction) => {
  if (!interaction.guildId || !interaction.user.id || !interaction.guild) return;

  const aboutInfoEmbed = defaultEmbed('normal')
    .setTitle('Reimagine your Community')
    .addFields(
      {
        name: 'Top-Tier Leveling Solution',
        value: 'Elevate your Community to the next Level with Top-Tier Leveling, endless Customisability and more.',
        inline: false
      },
      {
        name: 'Official Support Server',
        value: '[Join XP](https://discord.com/invite/ccTAnzw)',
        inline: true
      },
      {
        name: 'Vote for XP!',
        value: '[top.gg](https://top.gg/bot/706935674800177193)',
        inline: true
      },
      {
        name: 'Service Status',
        value: '[Status](https://xp-bot.net/status)',
        inline: true
      }
    );

  const dashboardButton = new ButtonBuilder()
    .setLabel('Server Dashboard')
    .setStyle(ButtonStyle.Link)
    .setEmoji('🛠️')
    .setURL(`https://xp-bot.net/servers/${interaction.guildId}`);
    
  const accountSettingsButton = new ButtonBuilder()
    .setLabel('Account Settings')
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

  const aboutActionRow = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
      dashboardButton,
      accountSettingsButton
    );
  
  const aboutActionRow2 = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
      premiumButton,
      privacyPolicyButton
    );

  try {
    await interaction.reply({ 
      embeds: [
        aboutInfoEmbed.setFooter({
          text: `Response time: ${Date.now() - interaction.createdTimestamp}ms • Shard: ${interaction.guild.shardId + 1} • by namespace.media`
        })
      ], 
      
      components: [aboutActionRow, aboutActionRow2] 
    });
    
  } catch (error) {
    console.error(error);
    // TODO: Error Handling
  } 
};

export default new Command(
  new SlashCommandBuilder()
    .setName('about')
    .setDescription('Get information about XP.'),
  execute
);